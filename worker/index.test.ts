import { describe, expect, test } from "bun:test";
import worker, { COOKIE, UNLOCK_PATH, accessToken, type Env } from "./index";

const PASSWORD = "ring of light";

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
