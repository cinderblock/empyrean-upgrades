import { describe, expect, test } from "bun:test";
import worker from "./index";
import {
  COOKIE,
  UNLOCK_PATH,
  accessToken,
  patternToken,
  type Env,
} from "./lock";

const PASSWORD = "ring of light";
const PATTERN = String.raw`Guest\d\d`;

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

  test("a password matching the pattern sets the pattern's cookie", async () => {
    for (const guess of ["Guest07", "Guest42"]) {
      const res = await worker.fetch(post(guess, "/budget/"), env());
      expect(res.status).toBe(303);
      expect(res.headers.get("location")).toBe("/budget/");
      expect(cookieValue(res)).toBe(await patternToken(PATTERN));
      expect(res.headers.get("set-cookie")).not.toContain(guess);
    }
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
    expect(cookieValue(res)).toBe(await patternToken(PATTERN));
  });

  test("the pattern's cookie opens the site", async () => {
    const token = await patternToken(PATTERN);
    const res = await worker.fetch(
      get("/", { cookie: `${COOKIE}=${token}` }),
      env(),
    );
    expect(await res.text()).toBe("asset /");
  });

  test("changing the pattern logs out only its own", async () => {
    const changed = env({ SITE_PASSWORD_PATTERN: String.raw`Friend\d\d` });
    const old = await patternToken(PATTERN);
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
