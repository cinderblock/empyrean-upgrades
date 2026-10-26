import { beforeAll, describe, expect, spyOn, test } from "bun:test";
import worker from "./index";
import {
  COOKIE,
  UNLOCK_PATH,
  accessToken,
  MAIN,
  patternCookie,
  type Env,
} from "./lock";
import { BLOBS, type Dataset, VIEW_PATH } from "./visits";

const PASSWORD = "ring of light";
const PATTERN = String.raw`Guest\d\d`;

// Every request logs a line; keep the test output readable.
beforeAll(() => {
  spyOn(console, "log").mockImplementation(() => {});
});

/** Assets that answer every path with its own name, so a test can tell. */
const assets = {
  async fetch(request: Request) {
    return new Response(`asset ${new URL(request.url).pathname}`, {
      headers: { "cache-control": "public, max-age=0, must-revalidate" },
    });
  },
};

function env(over: Partial<Env> = {}): Env {
  return {
    ASSETS: assets,
    SITE_LOCK: "on",
    SITE_PASSWORD: PASSWORD,
    SITE_PASSWORD_PATTERN: PATTERN,
    ...over,
  };
}

function get(path: string, headers: Record<string, string> = {}) {
  return new Request(`https://v2.empyreangate.org${path}`, { headers });
}

function post(password: string, next = "/") {
  const body = new URLSearchParams({ password, next });
  return new Request(`https://v2.empyreangate.org${UNLOCK_PATH}`, {
    method: "POST",
    body,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
}

function cookieValue(response: Response): string | undefined {
  const set = response.headers.get("set-cookie");
  return set?.match(new RegExp(`${COOKIE}=([^;]+)`))?.[1];
}

describe("lock off", () => {
  test("serves the site to anyone", async () => {
    const res = await worker.fetch(get("/"), env({ SITE_LOCK: "off" }));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("asset /");
    expect(res.headers.get("x-robots-tag")).toContain("noindex");
  });

  test("needs no password at all", async () => {
    const res = await worker.fetch(
      get("/budget/"),
      env({ SITE_LOCK: "off", SITE_PASSWORD: undefined }),
    );
    expect(await res.text()).toBe("asset /budget/");
  });
});

describe("lock on", () => {
  test("asks for the password", async () => {
    const res = await worker.fetch(get("/budget/"), env());
    expect(res.status).toBe(401);
    const body = await res.text();
    expect(body).toContain('type="password"');
    expect(body).toContain('value="/budget/"');
    expect(res.headers.get("cache-control")).toBe("no-store");
  });

  test("fails closed with no password set", async () => {
    const res = await worker.fetch(get("/"), env({ SITE_PASSWORD: undefined }));
    expect(res.status).toBe(503);
    expect(await res.text()).not.toContain("asset");
  });

  test("a right password sets the cookie and goes back", async () => {
    const res = await worker.fetch(post(PASSWORD, "/budget/"), env());
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/budget/");
    const set = res.headers.get("set-cookie")!;
    expect(set).toContain("HttpOnly");
    expect(set).toContain("Secure");
    expect(set).not.toContain(PASSWORD);
    expect(cookieValue(res)).toBe(await accessToken(PASSWORD));
  });

  test("a wrong password does not", async () => {
    const res = await worker.fetch(post("nope"), env());
    expect(res.status).toBe(401);
    expect(res.headers.get("set-cookie")).toBeNull();
    expect(await res.text()).toContain("Try again");
  });

  test("never redirects off the site", async () => {
    for (const next of ["https://evil.example/", "//evil.example/", "x"]) {
      const res = await worker.fetch(post(PASSWORD, next), env());
      expect(res.headers.get("location")).toBe("/");
    }
  });

  test("the cookie opens the site, privately cached", async () => {
    const token = await accessToken(PASSWORD);
    const res = await worker.fetch(
      get("/", { cookie: `other=1; ${COOKIE}=${token}` }),
      env(),
    );
    expect(await res.text()).toBe("asset /");
    expect(res.headers.get("cache-control")).toBe("private, no-cache");
  });

  test("a cookie for an old password does not", async () => {
    const stale = await accessToken("the old one");
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${stale}` }),
      env(),
    );
    expect(res.status).toBe(401);
  });

  test("?key= unlocks and drops the key from the address", async () => {
    const res = await worker.fetch(
      get(`/plans/power/?key=${encodeURIComponent(PASSWORD)}&x=1`),
      env(),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/plans/power/?x=1");
    expect(cookieValue(res)).toBe(await accessToken(PASSWORD));
  });

  test("a wrong ?key= shows the form", async () => {
    const res = await worker.fetch(get("/?key=nope"), env());
    expect(res.status).toBe(401);
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  test("rate limits password tries", async () => {
    const limited = env({
      UNLOCK_LIMIT: { limit: async () => ({ success: false }) },
    });
    const res = await worker.fetch(post(PASSWORD), limited);
    expect(res.status).toBe(429);
    expect(res.headers.get("set-cookie")).toBeNull();
  });

  test("a pattern password gets a cookie of its own", async () => {
    for (const guess of ["Guest07", "Guest42"]) {
      const res = await worker.fetch(post(guess, "/budget/"), env());
      expect(res.status).toBe(303);
      expect(res.headers.get("location")).toBe("/budget/");
      expect(cookieValue(res)).toBe(await patternCookie(guess, PATTERN));
    }
    expect(await patternCookie("Guest07", PATTERN)).not.toBe(
      await patternCookie("Guest42", PATTERN),
    );
  });

  test("the pattern must match the whole password", async () => {
    for (const guess of [
      "Guest7",
      "Guest123",
      "xGuest07",
      "Guest07 ",
      "guest07",
    ]) {
      const res = await worker.fetch(post(guess), env());
      expect(res.status).toBe(401);
      expect(res.headers.get("set-cookie")).toBeNull();
    }
  });

  test("?key= takes a pattern password too", async () => {
    const res = await worker.fetch(get("/?key=Guest99"), env());
    expect(res.status).toBe(303);
    expect(cookieValue(res)).toBe(await patternCookie("Guest99", PATTERN));
  });

  test("a pattern password's cookie opens the site", async () => {
    const token = await patternCookie("Guest07", PATTERN);
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${token}` }),
      env(),
    );
    expect(await res.text()).toBe("asset /");
  });

  test("a cookie can't be changed to another password", async () => {
    const real = await patternCookie("Guest07", PATTERN);
    const forged = "Guest08" + real.slice(real.indexOf("."));
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${forged}` }),
      env(),
    );
    expect(res.status).toBe(401);
  });

  test("a password the pattern no longer matches is out", async () => {
    const token = await patternCookie("Guest07", PATTERN);
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${token}` }),
      env({ SITE_PASSWORD_PATTERN: String.raw`Guest\d\d|Other` }),
    );
    expect(res.status).toBe(401);
  });

  test("changing the pattern logs out only its own", async () => {
    const changed = env({ SITE_PASSWORD_PATTERN: String.raw`Friend\d\d` });
    const old = await patternCookie("Guest07", PATTERN);
    const stale = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${old}` }),
      changed,
    );
    expect(stale.status).toBe(401);
    const main = await accessToken(PASSWORD);
    const kept = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${main}` }),
      changed,
    );
    expect(await kept.text()).toBe("asset /");
  });

  test("a revoked password is refused, and so is its cookie", async () => {
    const revoked = env({ SITE_PASSWORD_REVOKED: "Guest03, Guest07\nGuest11" });
    expect((await worker.fetch(post("Guest07"), revoked)).status).toBe(401);
    expect((await worker.fetch(get("/?key=Guest07"), revoked)).status).toBe(
      401,
    );
    const token = await patternCookie("Guest07", PATTERN);
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${token}` }),
      revoked,
    );
    expect(res.status).toBe(401);
    // Everyone else is unaffected.
    expect((await worker.fetch(post("Guest08"), revoked)).status).toBe(303);
    expect((await worker.fetch(post(PASSWORD), revoked)).status).toBe(303);
  });

  test("the old shared pattern cookie no longer works", async () => {
    const shared = await accessToken(PATTERN, "empyrean-v2-access-pattern");
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${shared}` }),
      env(),
    );
    expect(res.status).toBe(401);
  });

  test("no pattern set: only the password works", async () => {
    const plain = env({ SITE_PASSWORD_PATTERN: undefined });
    expect((await worker.fetch(post("Guest07"), plain)).status).toBe(401);
    expect((await worker.fetch(post(PASSWORD), plain)).status).toBe(303);
  });

  test("a pattern that doesn't compile matches nothing", async () => {
    const broken = env({ SITE_PASSWORD_PATTERN: "Guest(" });
    expect((await worker.fetch(post("Guest("), broken)).status).toBe(401);
    expect((await worker.fetch(post(PASSWORD), broken)).status).toBe(303);
  });

  test("the icon and robots.txt stay open", async () => {
    const icon = await worker.fetch(get("/favicon.svg"), env());
    expect(await icon.text()).toBe("asset /favicon.svg");
    const robots = await worker.fetch(get("/robots.txt"), env());
    expect(await robots.text()).toContain("Disallow: /");
  });

  test("escapes the page it was asked for", async () => {
    const res = await worker.fetch(get('/"><script>x</script>'), env());
    expect(await res.text()).not.toContain("<script>x");
  });
});

/** A dataset that keeps what is written, as named fields. */
function dataset() {
  const points: Record<string, string | number>[] = [];
  const visits: Dataset = {
    writeDataPoint({ blobs = [], doubles = [], indexes = [] }) {
      const row: Record<string, string | number> = { index: indexes[0]! };
      BLOBS.forEach((k, i) => (row[k] = blobs[i]!));
      row.status = doubles[0]!;
      points.push(row);
    },
  };
  return { points, visits };
}

/** A request as Cloudflare delivers it, with where it came from. */
function fromPlace(request: Request): Request {
  Object.defineProperty(request, "cf", {
    value: { country: "US", region: "Nevada", city: "Reno", colo: "SJC" },
  });
  request.headers.set("user-agent", "TestBrowser/1");
  return request;
}

function beacon(path: string, cookie?: string) {
  return new Request(`https://v2.empyreangate.org${VIEW_PATH}`, {
    method: "POST",
    body: path,
    headers: cookie ? { cookie: `${COOKIE}=${cookie}` } : {},
  });
}

describe("visits", () => {
  test("an unlock records who, where and how", async () => {
    const { points, visits } = dataset();
    await worker.fetch(
      fromPlace(post("Guest07", "/budget/")),
      env({ VISITS: visits }),
    );
    expect(points).toEqual([
      {
        index: "Guest07",
        event: "unlock",
        who: "Guest07",
        path: "/budget",
        detail: "form",
        country: "US",
        region: "Nevada",
        city: "Reno",
        colo: "SJC",
        userAgent: "TestBrowser/1",
        referrer: "",
        status: 303,
      },
    ]);
  });

  test("a link unlock records the page without the key", async () => {
    const { points, visits } = dataset();
    await worker.fetch(
      get(`/plans/power/?key=${encodeURIComponent(PASSWORD)}`),
      env({ VISITS: visits }),
    );
    expect(points[0]).toMatchObject({
      event: "unlock",
      who: MAIN,
      path: "/plans/power",
      detail: "link",
    });
  });

  test("a wrong guess is recorded, but never the guess", async () => {
    const { points, visits } = dataset();
    await worker.fetch(post("my bank password"), env({ VISITS: visits }));
    await worker.fetch(get("/?key=another%20secret"), env({ VISITS: visits }));
    expect(points.map((p) => [p.event, p.who, p.detail])).toEqual([
      ["refused", "", "form"],
      ["refused", "", "link"],
    ]);
    expect(JSON.stringify(points)).not.toContain("bank");
    expect(JSON.stringify(points)).not.toContain("another");
  });

  test("a link names whoever opens it, even someone already in", async () => {
    const { points, visits } = dataset();
    const res = await worker.fetch(
      get("/budget/?key=Guest42&x=1", {
        cookie: `${COOKIE}=${await accessToken(PASSWORD)}`,
        referer: "https://v2.empyreangate.org/?key=Guest07",
      }),
      env({ VISITS: visits }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/budget/?x=1");
    expect(cookieValue(res)).toBe(
      `Guest42.${(await patternCookie("Guest42", PATTERN)).split(".")[1]}`,
    );
    expect(points[0]).toMatchObject({
      event: "unlock",
      who: "Guest42",
      path: "/budget?x=1",
      referrer: "https://v2.empyreangate.org/",
    });
  });

  test("a wrong link only drops out of the address for someone in", async () => {
    const { points, visits } = dataset();
    const res = await worker.fetch(
      get("/budget/?key=nope", {
        cookie: `${COOKIE}=${await accessToken(PASSWORD)}`,
      }),
      env({ VISITS: visits }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/budget/");
    expect(cookieValue(res)).toBeUndefined();
    expect(points.map((p) => [p.event, p.who])).toEqual([["refused", ""]]);
    expect(JSON.stringify(points)).not.toContain("nope");
  });

  test("with the lock off, a link still names the visitor", async () => {
    const { points, visits } = dataset();
    const res = await worker.fetch(
      get("/?key=Guest07"),
      env({ VISITS: visits, SITE_LOCK: "off" }),
    );
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toBe("/");
    expect(cookieValue(res)).toBe(await patternCookie("Guest07", PATTERN));
    expect(points[0]).toMatchObject({ event: "unlock", who: "Guest07" });
    const wrong = await worker.fetch(
      get("/?key=nope"),
      env({ SITE_LOCK: "off" }),
    );
    expect(wrong.status).toBe(303);
  });

  test("a revoked password is recorded by name", async () => {
    const { points, visits } = dataset();
    await worker.fetch(
      post("Guest07"),
      env({ VISITS: visits, SITE_PASSWORD_REVOKED: "Guest07" }),
    );
    expect(points[0]).toMatchObject({
      event: "refused",
      who: "Guest07",
      detail: "revoked",
    });
  });

  test("page views name the visitor; assets aren't recorded", async () => {
    const { points, visits } = dataset();
    const cookie = `${COOKIE}=${await patternCookie("Guest42", PATTERN)}`;
    for (const path of ["/budget/", "/assets/app.js", "/favicon.svg", "/"]) {
      await worker.fetch(get(path, { cookie }), env({ VISITS: visits }));
    }
    expect(points.map((p) => [p.event, p.who, p.path, p.detail])).toEqual([
      ["view", "Guest42", "/budget", "load"],
      ["view", "Guest42", "/", "load"],
    ]);
  });

  test("the lock page is recorded, and a stale cookie noted", async () => {
    const { points, visits } = dataset();
    await worker.fetch(get("/budget/"), env({ VISITS: visits }));
    await worker.fetch(
      get("/", { cookie: `${COOKIE}=old` }),
      env({ VISITS: visits }),
    );
    expect(points.map((p) => [p.event, p.path, p.detail])).toEqual([
      ["locked", "/budget", ""],
      ["locked", "/", "stale cookie"],
    ]);
  });

  test("too many tries are recorded", async () => {
    const { points, visits } = dataset();
    await worker.fetch(
      post(PASSWORD),
      env({
        VISITS: visits,
        UNLOCK_LIMIT: { limit: async () => ({ success: false }) },
      }),
    );
    expect(points[0]).toMatchObject({ event: "limited", who: "" });
  });

  test("the beacon records a client-side navigation", async () => {
    const { points, visits } = dataset();
    const res = await worker.fetch(
      beacon("/plans/power", await patternCookie("Guest42", PATTERN)),
      env({ VISITS: visits }),
    );
    expect(res.status).toBe(204);
    expect(points[0]).toMatchObject({
      event: "view",
      who: "Guest42",
      path: "/plans/power",
      detail: "nav",
    });
  });

  test("a page is spelled one way, slash or not", async () => {
    const { points, visits } = dataset();
    const cookie = await patternCookie("Guest42", PATTERN);
    const e = env({ VISITS: visits });
    await worker.fetch(
      get("/budget/?x=1", { cookie: `${COOKIE}=${cookie}` }),
      e,
    );
    await worker.fetch(beacon("/budget?x=1", cookie), e);
    await worker.fetch(beacon("/", cookie), e);
    expect(points.map((p) => p.path)).toEqual([
      "/budget?x=1",
      "/budget?x=1",
      "/",
    ]);
  });

  test("while locked, the beacon ignores strangers", async () => {
    const { points, visits } = dataset();
    const res = await worker.fetch(beacon("/budget/"), env({ VISITS: visits }));
    expect(res.status).toBe(204);
    expect(points).toEqual([]);
  });

  test("with the lock off, views are still recorded", async () => {
    const { points, visits } = dataset();
    const open = env({ VISITS: visits, SITE_LOCK: "off" });
    await worker.fetch(get("/budget/"), open);
    await worker.fetch(beacon("/"), open);
    const main = `${COOKIE}=${await accessToken(PASSWORD)}`;
    await worker.fetch(get("/", { cookie: main }), open);
    expect(points.map((p) => [p.who, p.path, p.detail])).toEqual([
      ["", "/budget", "load"],
      ["", "/", "nav"],
      [MAIN, "/", "load"],
    ]);
  });

  test("a dataset that throws doesn't break the site", async () => {
    const broken: Dataset = {
      writeDataPoint() {
        throw new Error("down");
      },
    };
    const error = spyOn(console, "error").mockImplementation(() => {});
    const token = await accessToken(PASSWORD);
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${token}` }),
      env({ VISITS: broken }),
    );
    expect(await res.text()).toBe("asset /");
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });
});
