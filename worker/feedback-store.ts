/**
 * Where the deployed site keeps feedback: one SQLite-backed Durable Object
 * (`FEEDBACK` in wrangler.jsonc), a row per item holding its JSON. One
 * instance holds everything; the crew's feedback is small.
 *
 * The Worker talks to it over fetch, through `durableStore`, so nothing here
 * needs the `cloudflare:workers` module and the handler stays testable under
 * Bun with a memory store.
 */

import type { Feedback, State, Store } from "./feedback";

/** The subset of the Durable Objects runtime this file uses. */
interface SqlStorage {
  exec(
    query: string,
    ...bindings: unknown[]
  ): { toArray(): Record<string, unknown>[] };
}
interface DurableObjectState {
  storage: { sql: SqlStorage };
}
interface Stub {
  fetch(request: Request): Promise<Response>;
}
export interface DurableObjectNamespace {
  idFromName(name: string): unknown;
  get(id: unknown): Stub;
}

export class FeedbackStore {
  private sql: SqlStorage;

  constructor(state: DurableObjectState) {
    this.sql = state.storage.sql;
    this.sql.exec(
      "CREATE TABLE IF NOT EXISTS feedback (id TEXT PRIMARY KEY, at TEXT NOT NULL, json TEXT NOT NULL)",
    );
  }

  private all(): Feedback[] {
    return this.sql
      .exec("SELECT json FROM feedback ORDER BY at")
      .toArray()
      .map((row) => JSON.parse(String(row.json)) as Feedback);
  }

  async fetch(request: Request): Promise<Response> {
    const op = new URL(request.url).pathname;
    if (op === "/list") return Response.json(this.all());
    const body = (await request.json()) as Record<string, unknown>;
    if (op === "/add") {
      const f = body as unknown as Feedback;
      this.sql.exec(
        "INSERT INTO feedback (id, at, json) VALUES (?, ?, ?)",
        f.id,
        f.at,
        JSON.stringify(f),
      );
      return new Response(null, { status: 204 });
    }
    if (op === "/update") {
      const row = this.sql
        .exec("SELECT json FROM feedback WHERE id = ?", body.id)
        .toArray()[0];
      if (!row) return new Response(null, { status: 404 });
      const f = JSON.parse(String(row.json)) as Feedback;
      if (body.status) f.status = body.status as State;
      if (typeof body.reply === "string") f.reply = body.reply;
      this.sql.exec(
        "UPDATE feedback SET json = ? WHERE id = ?",
        JSON.stringify(f),
        f.id,
      );
      return Response.json(f);
    }
    return new Response(null, { status: 404 });
  }
}

/** The Worker's side: a Store that forwards to the one instance. */
export function durableStore(ns: DurableObjectNamespace): Store {
  const stub = ns.get(ns.idFromName("all"));
  const call = (op: string, body?: unknown) =>
    stub.fetch(
      new Request(`https://feedback${op}`, {
        method: body === undefined ? "GET" : "POST",
        body: body === undefined ? undefined : JSON.stringify(body),
      }),
    );
  return {
    async add(feedback) {
      await call("/add", feedback);
    },
    async list() {
      return (await (await call("/list")).json()) as Feedback[];
    },
    async update(id, patch) {
      const res = await call("/update", { id, ...patch });
      return res.ok ? ((await res.json()) as Feedback) : undefined;
    },
  };
}
