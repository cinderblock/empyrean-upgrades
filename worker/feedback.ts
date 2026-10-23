/**
 * Feedback left on the site: a comment on a section, a selection, an image,
 * a whole page, or a review verdict on one item (app/content/review.ts).
 *
 * One handler, three homes: the Worker stores feedback in a Durable Object
 * (worker/feedback-store.ts), `bun run dev` in `.feedback/dev.jsonl`, and the
 * preview server Playwright tests against in memory (vite.config.ts). They
 * differ only in the `Store` they pass.
 *
 * Who left it comes from the access cookie, never from the request: `main`
 * or a pattern password. Nobody known, nothing stored. The browser only
 * writes: nobody reads feedback on the site. Agents read, resolve and delete
 * it with `bun run feedback`, the main password as a bearer token.
 */

export const FEEDBACK_PATH = "/__feedback";

export type Kind = "comment" | "wrong" | "question" | "review";
const KINDS: readonly Kind[] = ["comment", "wrong", "question", "review"];

export type Verdict = "ok" | "wrong" | "unsure";
const VERDICTS: readonly Verdict[] = ["ok", "wrong", "unsure"];

export type State = "open" | "done" | "wontfix";
const STATES: readonly State[] = ["open", "done", "wontfix"];

/** What on the page it is about. Every field optional: a page comment has none. */
export interface Target {
  /** A reviewable item's id (data-rid). */
  rid?: string;
  /** A CSS path to the element, for anything without a rid. */
  selector?: string;
  /** The element's own label: a heading, alt text, a table caption. */
  label?: string;
  /** Selected text, with a little either side to find it again. */
  quote?: { exact: string; prefix?: string; suffix?: string };
  /** Where on the element, 0–1 each way: a spot on a diagram or image. */
  point?: { x: number; y: number };
  /** The element's tag: `img`, `svg`, `table`, `p`. */
  tag?: string;
}

export interface Feedback {
  id: string;
  at: string;
  /** From the cookie: `main`, a pattern password, or `dev` locally. */
  who: string;
  /** Optional, typed by the visitor. */
  name?: string;
  page: string;
  kind: Kind;
  body: string;
  verdict?: Verdict;
  /** The item's text hash when reviewed, so an edit makes it stale. */
  hash?: string;
  target?: Target;
  /** The deployed commit, when the build knows it. */
  build?: string;
  viewport?: { w: number; h: number };
  status: State;
  reply?: string;
}

export interface Store {
  add(feedback: Feedback): Promise<void>;
  list(): Promise<Feedback[]>;
  update(
    id: string,
    patch: { status?: State; reply?: string },
  ): Promise<Feedback | undefined>;
  /** False when there was no such item. */
  remove(id: string): Promise<boolean>;
}

/** Who is asking, as the caller worked it out. */
export interface Caller {
  /** From the cookie; empty for nobody known. */
  who: string;
  /** May read, resolve and delete: the bearer token only. */
  admin: boolean;
}

const LIMITS = { body: 4000, name: 60, page: 512, text: 1000, short: 200 };

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

const str = (v: unknown, max: number): string | undefined =>
  typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined;

const unit = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v)
    ? Math.min(1, Math.max(0, v))
    : undefined;

function target(raw: unknown): Target | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const t: Target = {
    rid: str(r.rid, LIMITS.short),
    selector: str(r.selector, LIMITS.text),
    label: str(r.label, LIMITS.short),
    tag: str(r.tag, 20),
  };
  const q = r.quote as Record<string, unknown> | undefined;
  const exact = q && str(q.exact, LIMITS.text);
  if (exact) {
    t.quote = {
      exact,
      prefix: str(q.prefix, LIMITS.short),
      suffix: str(q.suffix, LIMITS.short),
    };
  }
  const p = r.point as Record<string, unknown> | undefined;
  const x = p && unit(p.x);
  const y = p && unit(p.y);
  if (x !== undefined && y !== undefined) t.point = { x, y };
  const kept = Object.entries(t).filter(([, v]) => v !== undefined);
  return kept.length ? (Object.fromEntries(kept) as Target) : undefined;
}

/** A visitor's submission, checked and trimmed; a string says what's wrong. */
export function parse(
  raw: unknown,
  who: string,
  now = new Date(),
  id: string = crypto.randomUUID(),
): Feedback | string {
  if (!raw || typeof raw !== "object") return "Expected a JSON object.";
  const r = raw as Record<string, unknown>;
  const kind = r.kind as Kind;
  if (!KINDS.includes(kind)) return "Unknown kind.";
  const page = str(r.page, LIMITS.page);
  if (!page?.startsWith("/")) return "A page path is required.";
  const verdict = r.verdict as Verdict | undefined;
  if (kind === "review" && !VERDICTS.includes(verdict!)) {
    return "A review needs a verdict.";
  }
  const body = str(r.body, LIMITS.body) ?? "";
  if (kind !== "review" && !body) return "Say something.";
  const t = target(r.target);
  if (kind === "review" && !t?.rid) return "A review needs an item.";
  const v = r.viewport as Record<string, unknown> | undefined;
  const feedback: Feedback = {
    id,
    at: now.toISOString(),
    who,
    name: str(r.name, LIMITS.name),
    page,
    kind,
    body,
    verdict: kind === "review" ? verdict : undefined,
    hash: str(r.hash, 20),
    target: t,
    build: str(r.build, 40),
    viewport:
      v && typeof v.w === "number" && typeof v.h === "number"
        ? { w: Math.round(v.w), h: Math.round(v.h) }
        : undefined,
    status: "open",
  };
  return Object.fromEntries(
    Object.entries(feedback).filter(([, v]) => v !== undefined),
  ) as unknown as Feedback;
}

/**
 * A POST must come from the site itself: JSON (which a cross-site form can't
 * send without a preflight) and, when the browser says, the same origin.
 */
function sameSite(request: Request): boolean {
  const type = request.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) return false;
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

/** Every request under FEEDBACK_PATH. */
export async function handleFeedback(
  request: Request,
  caller: Caller,
  store: Store,
): Promise<Response> {
  const url = new URL(request.url);
  const rest = url.pathname.slice(FEEDBACK_PATH.length).replace(/^\//, "");
  if (!caller.who && !caller.admin) {
    return json(403, { error: "Feedback is open to people let in only." });
  }

  if (rest === "me" && request.method === "GET") {
    return json(200, { who: caller.who });
  }

  if (rest === "" && request.method === "GET") {
    if (!caller.admin) return json(403, { error: "Read with the token." });
    const page = url.searchParams.get("page");
    const all = await store.list();
    return json(200, page ? all.filter((f) => f.page === page) : all);
  }

  if (rest === "" && request.method === "POST") {
    if (!sameSite(request)) return json(415, { error: "Send JSON." });
    let raw: unknown;
    try {
      raw = await request.json();
    } catch {
      return json(400, { error: "Expected a JSON object." });
    }
    const feedback = parse(raw, caller.who || "admin");
    if (typeof feedback === "string") return json(400, { error: feedback });
    await store.add(feedback);
    return json(201, feedback);
  }

  // Resolving and deleting: `bun run feedback`, with the bearer token.
  if (rest && request.method === "DELETE") {
    if (!caller.admin) return json(403, { error: "Not yours to delete." });
    return (await store.remove(decodeURIComponent(rest)))
      ? new Response(null, { status: 204 })
      : json(404, { error: "No such item." });
  }

  if (rest && request.method === "POST") {
    if (!caller.admin) return json(403, { error: "Not yours to resolve." });
    let raw: Record<string, unknown>;
    try {
      raw = (await request.json()) as Record<string, unknown>;
    } catch {
      return json(400, { error: "Expected a JSON object." });
    }
    const status = raw.status as State | undefined;
    if (status !== undefined && !STATES.includes(status)) {
      return json(400, { error: "Unknown status." });
    }
    const updated = await store.update(decodeURIComponent(rest), {
      status,
      reply: str(raw.reply, LIMITS.body),
    });
    return updated ? json(200, updated) : json(404, { error: "No such item." });
  }

  return json(405, { error: "Not here." });
}

/** For any Store that keeps everything in one array (memory, a file). */
export function arrayStore(
  load: () => Promise<Feedback[]>,
  save: (all: Feedback[]) => Promise<void>,
): Store {
  return {
    async add(feedback) {
      const all = await load();
      all.push(feedback);
      await save(all);
    },
    list: load,
    async update(id, patch) {
      const all = await load();
      const f = all.find((x) => x.id === id);
      if (!f) return undefined;
      if (patch.status) f.status = patch.status;
      if (patch.reply !== undefined) f.reply = patch.reply;
      await save(all);
      return f;
    },
    async remove(id) {
      const all = await load();
      const kept = all.filter((x) => x.id !== id);
      if (kept.length === all.length) return false;
      await save(kept);
      return true;
    },
  };
}

export function memoryStore(): Store {
  let all: Feedback[] = [];
  return arrayStore(
    async () => all,
    async (next) => {
      all = next;
    },
  );
}
