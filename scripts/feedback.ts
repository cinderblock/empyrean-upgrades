/**
 * Read and act on feedback left on the site (worker/feedback.ts). The site
 * only collects it; reading, resolving and deleting happen here, by agents.
 *
 *   bun run feedback                  open feedback, by page
 *   bun run feedback --all            done and won't-fix too
 *   bun run feedback --json           as JSON, for a script or an agent
 *   bun run feedback download [file]  everything, as JSON (.feedback/live.json)
 *   bun run feedback resolve <id> [reply] [--wontfix]
 *   bun run feedback delete <id> [<id>...]
 *   bun run feedback sync             reviews -> app/content/reviews.json
 *
 * Add `--local` to use what `bun run dev` stored (.feedback/dev.jsonl)
 * instead of the live site. The live site needs the main password:
 *
 *   SITE_PASSWORD=... bun run feedback
 *
 * `sync` keeps the newest verdict per item, merged with what reviews.json
 * already has, and marks the review records it took as done. Commit the
 * reviews.json change: that is what makes a review show on the built site.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { REVIEW_BY_ID, pacific, type Review } from "../app/content/review";
import type { Feedback, State } from "../worker/feedback";
import { LOCAL_FILE, fileStore } from "./feedback-file";

const REVIEWS_FILE = "app/content/reviews.json";
const SITE = process.env.V2_URL ?? "https://v2.empyreangate.org";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(name);
  if (i === -1) return false;
  args.splice(i, 1);
  return true;
};
const local = flag("--local");
const all = flag("--all");
const asJson = flag("--json");
const wontfix = flag("--wontfix");
const [command = "list", ...rest] = args;

interface Source {
  list(): Promise<Feedback[]>;
  update(
    id: string,
    status: State,
    reply?: string,
  ): Promise<Feedback | undefined>;
  /** False when there was no such item. */
  remove(id: string): Promise<boolean>;
}

function remote(): Source {
  const password = process.env.SITE_PASSWORD;
  if (!password) {
    console.error(
      "Set SITE_PASSWORD to the site's main password, or use --local for the dev server's feedback.",
    );
    process.exit(1);
  }
  const call = async (path: string, body?: unknown, method?: string) => {
    const res = await fetch(`${SITE}/__feedback${path}`, {
      method: method ?? (body === undefined ? "GET" : "POST"),
      headers: {
        authorization: `Bearer ${password}`,
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (res.status === 404 && method === "DELETE") return false;
    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.status === 204 ? true : res.json();
  };
  return {
    list: () => call(""),
    update: (id, status, reply) =>
      call(`/${encodeURIComponent(id)}`, { status, reply }),
    remove: (id) => call(`/${encodeURIComponent(id)}`, undefined, "DELETE"),
  };
}

function fromFile(): Source {
  const store = fileStore(LOCAL_FILE);
  return {
    list: () => store.list(),
    update: (id, status, reply) => store.update(id, { status, reply }),
    remove: (id) => store.remove(id),
  };
}

const source = local ? fromFile() : remote();

function about(f: Feedback): string {
  const t = f.target;
  if (!t) return "the page";
  const parts = [];
  if (t.rid) parts.push(`[${t.rid}]`);
  if (t.quote) parts.push(`“${t.quote.exact}”`);
  else if (t.label) parts.push(t.label);
  if (t.point)
    parts.push(
      `at ${Math.round(t.point.x * 100)}%, ${Math.round(t.point.y * 100)}%`,
    );
  if (!t.rid && t.selector) parts.push(`(${t.selector})`);
  return parts.join(" ");
}

async function list() {
  const items = (await source.list()).filter((f) => all || f.status === "open");
  if (asJson) {
    console.log(JSON.stringify(items, null, 2));
    return;
  }
  if (items.length === 0) {
    console.log(all ? "No feedback." : "No open feedback.");
    return;
  }
  const pages = new Map<string, Feedback[]>();
  for (const f of items) pages.set(f.page, [...(pages.get(f.page) ?? []), f]);
  for (const [page, fs] of pages) {
    console.log(`\n${page}`);
    for (const f of fs) {
      const what = f.kind === "review" ? `review: ${f.verdict}` : f.kind;
      const stale =
        f.target?.rid &&
        f.hash &&
        REVIEW_BY_ID.get(f.target.rid)?.hash !== f.hash
          ? " (text changed since)"
          : "";
      console.log(
        `  ${f.id}  ${pacific(f.at)}  ${f.name ? `${f.name} (${f.who})` : f.who}  ${what}${f.status === "open" ? "" : ` [${f.status}]`}`,
      );
      console.log(`    on ${about(f)}${stale}`);
      if (f.body) console.log(`    ${f.body.replace(/\n/g, "\n    ")}`);
      if (f.reply) console.log(`    reply: ${f.reply}`);
    }
  }
}

async function resolve() {
  const [id, ...reply] = rest;
  if (!id) {
    console.error("Usage: bun run feedback resolve <id> [reply] [--wontfix]");
    process.exit(1);
  }
  const f = await source.update(
    id,
    wontfix ? "wontfix" : "done",
    reply.join(" ") || undefined,
  );
  if (!f) {
    console.error(`No feedback ${id}.`);
    process.exit(1);
  }
  console.log(`${f.id} is ${f.status}.`);
}

async function sync() {
  const items = await source.list();
  const existing = JSON.parse(await readFile(REVIEWS_FILE, "utf8")) as Record<
    string,
    Review
  >;
  const next = { ...existing };
  const taken: Feedback[] = [];
  for (const f of [...items].sort((a, b) => a.at.localeCompare(b.at))) {
    const rid = f.target?.rid;
    if (f.kind !== "review" || !rid || !f.verdict || !f.hash) continue;
    if (!REVIEW_BY_ID.has(rid)) {
      console.warn(`Skipping a review of ${rid}: no such item any more.`);
      continue;
    }
    if (f.status === "open") taken.push(f);
    if (next[rid] && next[rid].at >= f.at) continue;
    next[rid] = {
      hash: f.hash,
      verdict: f.verdict,
      who: f.name ? `${f.name} (${f.who})` : f.who,
      at: f.at,
      ...(f.body ? { note: f.body } : {}),
    };
  }
  const sorted = Object.fromEntries(
    Object.entries(next).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(REVIEWS_FILE, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  for (const f of taken) {
    // A "wrong" stays open: it still needs a fix, not just a record.
    if (f.verdict !== "wrong")
      await source.update(f.id, "done", `In ${REVIEWS_FILE}.`);
  }
  const wrong = taken.filter((f) => f.verdict === "wrong").length;
  console.log(
    `${Object.keys(sorted).length} reviews in ${REVIEWS_FILE} (${taken.length} new${wrong ? `, ${wrong} flagged wrong and left open to fix` : ""}). Run bun run fmt, then commit it.`,
  );
}

async function download() {
  const file = rest[0] ?? ".feedback/live.json";
  const items = await source.list();
  await mkdir(dirname(file), { recursive: true });
  await writeFile(
    file,
    `${JSON.stringify(items, null, 2)}
`,
    "utf8",
  );
  console.log(`Wrote ${items.length} items to ${file}.`);
}

async function remove() {
  if (rest.length === 0) {
    console.error("Usage: bun run feedback delete <id> [<id>...]");
    process.exit(1);
  }
  let missing = 0;
  for (const id of rest) {
    if (await source.remove(id)) console.log(`Deleted ${id}.`);
    else {
      console.error(`No feedback ${id}.`);
      missing++;
    }
  }
  if (missing) process.exit(1);
}

const commands: Record<string, () => Promise<void>> = {
  list,
  download,
  resolve,
  delete: remove,
  sync,
};
const run = commands[command];
if (!run) {
  console.error(
    `Unknown command ${command}. Try list, download, resolve, delete or sync.`,
  );
  process.exit(1);
}
await run();
