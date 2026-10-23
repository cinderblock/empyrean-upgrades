/**
 * Who opened what: one record per event, to Workers Analytics Engine (the
 * `VISITS` binding, kept 3 months and queried with SQL by `bun run visits`)
 * and as a JSON line to Workers Logs (kept a few days, read in the dashboard).
 *
 * No IP addresses, and never a wrong password guess: a mistyped guess can be
 * someone's other password. Assets (scripts, styles, fonts) aren't recorded,
 * only pages and the lock's own events.
 */

/** The Analytics Engine binding (`analytics_engine_datasets` in wrangler.jsonc). */
export interface Dataset {
  writeDataPoint(point: {
    indexes?: string[];
    blobs?: string[];
    doubles?: number[];
  }): void;
}

export type Event =
  /** A page: its HTML, or a client-side navigation reported to VIEW_PATH. */
  | "view"
  /** A right password, typed (`form`) or in a link (`link`). */
  | "unlock"
  /** A wrong one (`form` or `link`), or a revoked one (`revoked`). */
  | "refused"
  /** Too many tries. */
  | "limited"
  /** The lock page, shown to a visitor without a working cookie. */
  | "locked";

export interface Visit {
  event: Event;
  /** `main`, a pattern password, or empty for nobody known. */
  who: string;
  path: string;
  status: number;
  /** How: `load`/`nav` for a view, `form`/`link`/`revoked` for the lock. */
  detail?: string;
}

/** Where the browser reports a client-side navigation. */
export const VIEW_PATH = "/__view";

/**
 * The column order in the dataset. Queries name columns by position
 * (`blob1`...), so add new fields at the end and never reorder.
 */
export const BLOBS = [
  "event",
  "who",
  "path",
  "detail",
  "country",
  "region",
  "city",
  "colo",
  "userAgent",
  "referrer",
] as const;
/** `double1` is the response status. */
export const DOUBLES = ["status"] as const;

/** What Cloudflare tells the Worker about where a request came from. */
interface Place {
  country?: string;
  region?: string;
  city?: string;
  colo?: string;
}

function clip(s: string | null | undefined, max = 256): string {
  return (s ?? "").slice(0, max);
}

/**
 * One spelling per page: the HTML is served at `/budget/` but the router
 * reports `/budget`, so the trailing slash goes.
 */
function tidy(path: string): string {
  const q = path.indexOf("?");
  const [page, query] =
    q === -1 ? [path, ""] : [path.slice(0, q), path.slice(q)];
  return (page.length > 1 ? page.replace(/\/+$/, "") : page) + query;
}

/** Record one event. Never throws: logging must not break the site. */
export function record(
  request: Request,
  dataset: Dataset | undefined,
  visit: Visit,
): void {
  const cf = (request as { cf?: Place }).cf ?? {};
  const fields: Record<(typeof BLOBS)[number], string> = {
    event: visit.event,
    who: clip(visit.who, 96),
    path: clip(tidy(visit.path), 512),
    detail: clip(visit.detail),
    country: clip(cf.country),
    region: clip(cf.region),
    city: clip(cf.city),
    colo: clip(cf.colo),
    userAgent: clip(request.headers.get("user-agent")),
    referrer: clip(request.headers.get("referer"), 512),
  };
  try {
    console.log(JSON.stringify({ visit: fields, status: visit.status }));
    dataset?.writeDataPoint({
      // The sampling key: each person's events are kept or dropped together.
      indexes: [fields.who || "-"],
      blobs: BLOBS.map((k) => fields[k]),
      doubles: [visit.status],
    });
  } catch (err) {
    console.error("visit not recorded", err);
  }
}

/** Whether a request is for a page, as opposed to an asset. */
export function isPage(request: Request, path: string): boolean {
  if (request.method !== "GET") return false;
  if (path.startsWith("/assets/")) return false;
  const last = path.slice(path.lastIndexOf("/") + 1);
  return !last.includes(".") || last.endsWith(".html");
}
