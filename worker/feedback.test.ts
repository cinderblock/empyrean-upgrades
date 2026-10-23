import { beforeAll, describe, expect, spyOn, test } from "bun:test";
import { FEEDBACK_PATH, memoryStore, parse, type Store } from "./feedback";
import { COOKIE, accessToken, handle, patternCookie, type Env } from "./lock";

const PASSWORD = "ring of light";
const PATTERN = String.raw`Guest\d\d`;
const ORIGIN = "https://v2.empyreangate.org";

beforeAll(() => {
  spyOn(console, "log").mockImplementation(() => {});
});

const env = (over: Partial<Env> = {}): Env => ({
  ASSETS: { fetch: async () => new Response("asset") },
  SITE_LOCK: "on",
  SITE_PASSWORD: PASSWORD,
  SITE_PASSWORD_PATTERN: PATTERN,
  ...over,
});

const main = async () => `${COOKIE}=${await accessToken(PASSWORD)}`;
const guest = async (who: string) =>
  `${COOKIE}=${await patternCookie(who, PATTERN)}`;

function req(
  path: string,
  init: {
    method?: string;
    cookie?: string;
    body?: unknown;
    auth?: string;
  } = {},
) {
  const headers: Record<string, string> = {};
  if (init.cookie) headers.cookie = init.cookie;
  if (init.auth) headers.authorization = `Bearer ${init.auth}`;
  if (init.body !== undefined) headers["content-type"] = "application/json";
  return new Request(`${ORIGIN}${FEEDBACK_PATH}${path}`, {
    method: init.method ?? (init.body === undefined ? "GET" : "POST"),
    headers,
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
}

const comment = (page = "/plans/power/", body = "Too expensive") => ({
  kind: "comment",
  page,
  body,
  target: { rid: "power.v2", quote: { exact: "twist-lock" } },
});

async function call(store: Store, request: Request, over?: Partial<Env>) {
  return handle(request, env(over), store);
}

describe("feedback", () => {
  test("is refused to nobody known", async () => {
    const store = memoryStore();
    const res = await call(store, req("", { body: comment() }));
    expect(res.status).toBe(403);
    expect(await store.list()).toEqual([]);
  });

  test("is refused to nobody known with the lock off, too", async () => {
    const res = await call(memoryStore(), req("/me"), { SITE_LOCK: "off" });
    expect(res.status).toBe(403);
  });

  test("takes who from the cookie, not the body", async () => {
    const store = memoryStore();
    const res = await call(
      store,
      req("", {
        cookie: await guest("Guest07"),
        body: { ...comment(), who: "main" },
      }),
    );
    expect(res.status).toBe(201);
    const [f] = await store.list();
    expect(f.who).toBe("Guest07");
    expect(f.status).toBe("open");
    expect(f.target?.quote?.exact).toBe("twist-lock");
  });

  test("main sees everyone's; a guest sees their own", async () => {
    const store = memoryStore();
    await call(
      store,
      req("", { cookie: await guest("Guest07"), body: comment() }),
    );
    await call(
      store,
      req("", { cookie: await guest("Guest42"), body: comment() }),
    );
    await call(store, req("", { cookie: await main(), body: comment("/") }));

    const all = await (
      await call(store, req("", { cookie: await main() }))
    ).json();
    expect(all).toHaveLength(3);
    const mine = await (
      await call(store, req("", { cookie: await guest("Guest07") }))
    ).json();
    expect(mine.map((f: { who: string }) => f.who)).toEqual(["Guest07"]);
    const page = await (
      await call(store, req("?page=%2F", { cookie: await main() }))
    ).json();
    expect(page).toHaveLength(1);
  });

  test("says who you are, and whether you see everything", async () => {
    const store = memoryStore();
    const me = await (
      await call(store, req("/me", { cookie: await guest("Guest07") }))
    ).json();
    expect(me).toEqual({ who: "Guest07", all: false });
    const boss = await (
      await call(store, req("/me", { cookie: await main() }))
    ).json();
    expect(boss).toEqual({ who: "main", all: true });
  });

  test("refuses a cross-site post", async () => {
    const store = memoryStore();
    const request = new Request(`${ORIGIN}${FEEDBACK_PATH}`, {
      method: "POST",
      headers: {
        cookie: await main(),
        "content-type": "application/json",
        origin: "https://evil.example",
      },
      body: JSON.stringify(comment()),
    });
    expect((await call(store, request)).status).toBe(415);
    const form = new Request(`${ORIGIN}${FEEDBACK_PATH}`, {
      method: "POST",
      headers: { cookie: await main(), "content-type": "text/plain" },
      body: JSON.stringify(comment()),
    });
    expect((await call(store, form)).status).toBe(415);
    expect(await store.list()).toEqual([]);
  });

  test("the bearer token reads everything and resolves", async () => {
    const store = memoryStore();
    await call(
      store,
      req("", { cookie: await guest("Guest07"), body: comment() }),
    );
    const [f] = await (await call(store, req("", { auth: PASSWORD }))).json();
    const res = await call(
      store,
      req(`/${f.id}`, {
        auth: PASSWORD,
        body: { status: "done", reply: "Fixed" },
      }),
    );
    expect(res.status).toBe(200);
    expect((await store.list())[0]).toMatchObject({
      status: "done",
      reply: "Fixed",
    });
  });

  test("a wrong token is refused, and a guest can't resolve", async () => {
    const store = memoryStore();
    expect((await call(store, req("", { auth: "nope" }))).status).toBe(401);
    await call(
      store,
      req("", { cookie: await guest("Guest07"), body: comment() }),
    );
    const [f] = await store.list();
    const res = await call(
      store,
      req(`/${f.id}`, {
        cookie: await guest("Guest07"),
        body: { status: "done" },
      }),
    );
    expect(res.status).toBe(403);
  });

  test("without a store it says so", async () => {
    const res = await handle(req("/me", { cookie: await main() }), env());
    expect(res.status).toBe(503);
  });
});

describe("parse", () => {
  const now = new Date("2026-10-23T20:00:00Z");

  test("trims, clamps and drops what it doesn't know", () => {
    const f = parse(
      {
        kind: "comment",
        page: "/",
        body: `  ${"x".repeat(5000)}  `,
        target: { point: { x: 2, y: -1 }, junk: 1 },
        status: "done",
        extra: true,
      },
      "main",
      now,
      "id1",
    );
    if (typeof f === "string") throw new Error(f);
    expect(f.body).toHaveLength(4000);
    expect(f.target).toEqual({ point: { x: 1, y: 0 } });
    expect(f.status).toBe("open");
    expect(f).not.toHaveProperty("extra");
  });

  test("a review needs a verdict and an item", () => {
    expect(parse({ kind: "review", page: "/" }, "main", now)).toBe(
      "A review needs a verdict.",
    );
    expect(
      parse({ kind: "review", page: "/", verdict: "ok" }, "main", now),
    ).toBe("A review needs an item.");
    const ok = parse(
      {
        kind: "review",
        page: "/review/",
        verdict: "ok",
        target: { rid: "power.v2" },
        hash: "abc",
      },
      "main",
      now,
    );
    expect(typeof ok).toBe("object");
  });

  test("refuses what isn't feedback", () => {
    expect(parse(null, "main", now)).toBe("Expected a JSON object.");
    expect(parse({ kind: "spam", page: "/", body: "x" }, "main", now)).toBe(
      "Unknown kind.",
    );
    expect(parse({ kind: "comment", page: "x", body: "x" }, "main", now)).toBe(
      "A page path is required.",
    );
    expect(parse({ kind: "comment", page: "/" }, "main", now)).toBe(
      "Say something.",
    );
  });
});
