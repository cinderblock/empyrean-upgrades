/**
 * Who opened what: reads the visit records (worker/visits.ts) back out of
 * Workers Analytics Engine, over its SQL API.
 *
 *   bun run visits                  each person: views, pages, first and last seen
 *   bun run visits log              every event, newest first
 *   bun run visits who <password>   one person's events ("main" for the main one)
 *
 * Add `--days N` to any of them (default 30; the dataset keeps about 90).
 *
 * Needs VISITS_API_TOKEN, a token with Account → Account Analytics → Read.
 * Keep it in .env.local (gitignored; Bun loads it). Not CLOUDFLARE_API_TOKEN:
 * wrangler would pick that up and try to deploy with a read-only token.
 * CLOUDFLARE_ACCOUNT_ID defaults to the account the worker lives in.
 */

import { BLOBS } from "../worker/visits";

const DATASET = "empyreangate_v2_visits";
const ACCOUNT =
  process.env.CLOUDFLARE_ACCOUNT_ID ?? "c5987fbfdbb396ef3121459c26125cc0";
const ZONE = "America/Los_Angeles";

type Row = Record<(typeof BLOBS)[number], string> & {
  timestamp: string;
  status: number;
  weight: number;
};

function usage(message?: string): never {
  if (message) console.error(message);
  console.error("usage: bun run visits [log | who <password>] [--days N]");
  process.exit(1);
}

async function query(days: number): Promise<Row[]> {
  const token = process.env.VISITS_API_TOKEN;
  if (!token) {
    usage(
      "Put VISITS_API_TOKEN (Account Analytics: Read) in .env.local first.",
    );
  }
  const columns = BLOBS.map((k, i) => `blob${i + 1} AS ${k}`).join(", ");
  const sql = `SELECT timestamp, ${columns}, double1 AS status,
    _sample_interval AS weight FROM ${DATASET}
    WHERE timestamp > NOW() - INTERVAL '${days}' DAY
    ORDER BY timestamp DESC LIMIT 10000 FORMAT JSON`;
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/analytics_engine/sql`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body: sql,
    },
  );
  const text = await res.text();
  if (!res.ok) {
    console.error(`Analytics Engine answered ${res.status}: ${text}`);
    process.exit(1);
  }
  return (JSON.parse(text) as { data: Row[] }).data.map((r) => ({
    ...r,
    status: Number(r.status),
    weight: Number(r.weight) || 1,
  }));
}

/** Analytics Engine timestamps are UTC, as `YYYY-MM-DD HH:MM:SS`. */
function when(timestamp: string): string {
  const date = new Date(timestamp.replace(" ", "T") + "Z");
  const local = date.toLocaleString("en-US", {
    timeZone: ZONE,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${local} (${timestamp.slice(11, 16)}Z)`;
}

function place(r: Row): string {
  return [r.city, r.region, r.country].filter(Boolean).join(", ");
}

function who(name: string): string {
  return name || "(nobody yet)";
}

function summary(rows: Row[]): void {
  const people = new Map<
    string,
    {
      views: number;
      pages: Set<string>;
      unlocks: number;
      first: string;
      last: string;
      places: Set<string>;
    }
  >();
  for (const r of rows) {
    if (r.event !== "view" && r.event !== "unlock") continue;
    const p = people.get(r.who) ?? {
      views: 0,
      pages: new Set<string>(),
      unlocks: 0,
      first: r.timestamp,
      last: r.timestamp,
      places: new Set<string>(),
    };
    if (r.event === "view") {
      p.views += r.weight;
      p.pages.add(r.path.split("?")[0]!);
    } else {
      p.unlocks += r.weight;
    }
    if (r.timestamp < p.first) p.first = r.timestamp;
    if (r.timestamp > p.last) p.last = r.timestamp;
    if (place(r)) p.places.add(place(r));
    people.set(r.who, p);
  }
  const refused = rows.filter((r) => r.event === "refused").length;
  const locked = rows.filter((r) => r.event === "locked").length;
  console.table(
    [...people.entries()]
      .sort((a, b) => (a[1].last < b[1].last ? 1 : -1))
      .map(([name, p]) => ({
        who: who(name),
        views: p.views,
        pages: p.pages.size,
        unlocks: p.unlocks,
        "first seen": when(p.first),
        "last seen": when(p.last),
        from: [...p.places].join(" / "),
      })),
  );
  console.log(
    `Also: ${locked} lock page${locked === 1 ? "" : "s"} shown, ${refused} refused.`,
  );
}

function log(rows: Row[]): void {
  console.table(
    rows.map((r) => ({
      when: when(r.timestamp),
      event: r.event,
      who: who(r.who),
      path: r.path,
      how: r.detail,
      status: r.status,
      from: place(r),
      browser: r.userAgent.slice(0, 60),
    })),
  );
}

const args = process.argv.slice(2);
let days = 30;
const daysAt = args.indexOf("--days");
if (daysAt !== -1) {
  days = Number(args[daysAt + 1]);
  if (!Number.isInteger(days) || days < 1)
    usage("--days takes a whole number.");
  args.splice(daysAt, 2);
}
const [command, name] = args;
const rows = await query(days);
if (!command) summary(rows);
else if (command === "log") log(rows);
else if (command === "who" && name !== undefined) {
  log(rows.filter((r) => r.who === name));
} else usage();
