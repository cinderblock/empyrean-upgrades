/**
 * The site's only server code: a password in front of the static site.
 *
 * The Worker runs first on every request (`assets.run_worker_first: true` in
 * wrangler.jsonc). While `SITE_LOCK` is "on", a visitor without the access
 * cookie gets the password page instead of the site; a right password, typed
 * in or carried as `?key=` in a link, sets the cookie. With `SITE_LOCK` "off"
 * every request goes straight to the assets. Turning the lock off is a
 * one-line change to wrangler.jsonc and a push.
 *
 * The password is the Worker secret `SITE_PASSWORD`, never committed. The
 * cookie is an HMAC of a fixed label keyed by the password, so changing the
 * password logs everyone out and the cookie never contains the password.
 * Lock on with no password set fails closed: 503, nothing served.
 */

import { INDEXABLE, SAFETY_HEADERS, UNLISTED_ROBOTS } from "./headers";

/** The subset of the Workers runtime this file uses. */
interface Fetcher {
  fetch(request: Request): Promise<Response>;
}
/** The Workers rate-limiting binding (`ratelimits` in wrangler.jsonc). */
interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  ASSETS: Fetcher;
  /** "on" asks for the password; anything else serves the site openly. */
  SITE_LOCK?: string;
  /** The password (a Worker secret). */
  SITE_PASSWORD?: string;
  /** Password attempts per visitor. Absent locally: then no limit. */
  UNLOCK_LIMIT?: RateLimit;
}

export const COOKIE = "v2_access";
/** Where the password form posts. Never a page of the site. */
export const UNLOCK_PATH = "/__unlock";
/** How long one unlock lasts: a donor reopening a link next month is fine. */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90;
/** Answered even while locked: the password page needs its icon. */
const ALWAYS_OPEN = new Set(["/favicon.svg", "/robots.txt"]);

const encoder = new TextEncoder();

function base64url(bytes: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** The cookie value for a password. */
export async function accessToken(password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode("empyrean-v2-access"),
  );
  return base64url(mac);
}

/** Equal strings, compared without an early exit. */
function same(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** A guess, checked as tokens so the comparison is constant-length. */
async function rightPassword(guess: string, env: Env): Promise<boolean> {
  return same(
    await accessToken(guess),
    await accessToken(env.SITE_PASSWORD ?? ""),
  );
}

function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
  }
  return undefined;
}

function accessCookie(token: string): string {
  return `${COOKIE}=${token}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`;
}

/** Only a path on this site, so the form can't bounce anyone elsewhere. */
function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) return "/";
  if (next.startsWith(UNLOCK_PATH)) return "/";
  return next;
}

function withHeaders(
  response: Response,
  extra: Record<string, string> = {},
): Response {
  const out = new Response(response.body, response);
  for (const [k, v] of Object.entries({ ...SAFETY_HEADERS, ...extra })) {
    out.headers.set(k, v);
  }
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}

/** The password page: self-contained, so it needs nothing behind the lock. */
export function lockPage(next: string, message?: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Empyrean Gate V2</title>
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center;
    font: 16px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: #f2f0f7; background: radial-gradient(50rem 50rem at 70% -10%, rgba(65,63,146,.35), transparent 60%), #06060f; }
  main { width: min(22rem, calc(100vw - 2.5rem)); text-align: center; }
  svg { width: 7rem; height: 7rem; margin-bottom: 1rem; }
  h1 { font: 500 1.9rem/1.2 Georgia, serif; margin: 0 0 .25rem; letter-spacing: .02em; }
  p { color: #a9a6bd; margin: 0 0 1.5rem; }
  form { display: grid; gap: .75rem; }
  input[type=password] { font: inherit; padding: .7rem .9rem; border-radius: 8px; border: 1px solid rgba(255,255,255,.18);
    background: #0d0d1c; color: inherit; }
  input[type=password]:focus-visible, button:focus-visible { outline: 2px solid #ffb5d7; outline-offset: 2px; }
  button { font: inherit; font-weight: 600; padding: .7rem; border: 0; border-radius: 8px; background: #32d5d2; color: #061213; cursor: pointer; }
  .error { color: #ffb5d7; margin: 0; }
  .hidden { display: none; }
</style>
</head>
<body>
<main>
  <svg viewBox="-50 -50 100 100" aria-hidden="true">
    <circle r="46" fill="none" stroke="#32d5d2" stroke-opacity=".5" stroke-width="1.5"/>
    <circle r="16" fill="none" stroke="#ffb5d7" stroke-opacity=".6" stroke-width="1.5"/>
    <g stroke="#413f92" stroke-width="1.2">${Array.from(
      { length: 16 },
      (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const [x1, y1, x2, y2] = [16, 16, 46, 46].map((r, j) =>
          (j % 2 === 0 ? Math.sin(a) * r : -Math.cos(a) * r).toFixed(1),
        );
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
      },
    ).join("")}</g>
  </svg>
  <h1>Empyrean Gate V2</h1>
  <p>The plans are shared by invitation for now.</p>
  <form method="post" action="${UNLOCK_PATH}">
    <input class="hidden" type="text" name="username" value="v2.empyreangate.org" autocomplete="username" tabindex="-1" aria-hidden="true">
    <input type="hidden" name="next" value="${escapeHtml(next)}">
    <label class="hidden" for="password">Password</label>
    <input id="password" type="password" name="password" placeholder="Password" autocomplete="current-password" required autofocus>
    ${message ? `<p class="error" role="alert">${escapeHtml(message)}</p>` : ""}
    <button type="submit">Open</button>
  </form>
</main>
</body>
</html>
`;
}

function html(status: number, body: string): Response {
  return withHeaders(
    new Response(body, {
      status,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    }),
  );
}

function redirect(location: string, cookie?: string): Response {
  const headers: Record<string, string> = {
    location,
    "cache-control": "no-store",
  };
  if (cookie) headers["set-cookie"] = cookie;
  return withHeaders(new Response(null, { status: 303, headers }));
}

/** Whether this visitor may try a password now. */
async function mayTry(request: Request, env: Env): Promise<boolean> {
  if (!env.UNLOCK_LIMIT) return true;
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  return (await env.UNLOCK_LIMIT.limit({ key: ip })).success;
}

const TOO_MANY = "Too many tries. Wait a minute and try again.";

async function unlock(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return redirect("/");
  const form = await request.formData();
  const next = safeNext(form.get("next")?.toString());
  if (!(await mayTry(request, env))) return html(429, lockPage(next, TOO_MANY));
  const guess = form.get("password")?.toString() ?? "";
  if (!(await rightPassword(guess, env))) {
    return html(401, lockPage(next, "That isn't it. Try again."));
  }
  return redirect(next, accessCookie(await accessToken(guess)));
}

/** Locked responses stay out of shared caches. */
function privately(response: Response, path: string): Response {
  return withHeaders(response, {
    "cache-control": path.startsWith("/assets/")
      ? "private, max-age=31536000, immutable"
      : "private, no-cache",
  });
}

/** Every request the Worker sees. */
export async function handle(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/robots.txt" && !INDEXABLE) {
    // Always the unlisted robots.txt, whatever the build put in assets.
    return withHeaders(
      new Response(UNLISTED_ROBOTS, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      }),
    );
  }

  if (env.SITE_LOCK !== "on") {
    return withHeaders(await env.ASSETS.fetch(request));
  }
  if (!env.SITE_PASSWORD) {
    return html(
      503,
      lockPage("/", "This site is locked and no password is set yet."),
    );
  }
  if (ALWAYS_OPEN.has(path)) {
    return withHeaders(await env.ASSETS.fetch(request));
  }
  if (path === UNLOCK_PATH) return unlock(request, env);

  const want = await accessToken(env.SITE_PASSWORD);
  const have = readCookie(request, COOKIE);
  if (have && same(have, want)) {
    return privately(await env.ASSETS.fetch(request), path);
  }

  // A link carrying the password: unlock, then drop it from the address.
  const key = url.searchParams.get("key");
  const here = () => {
    url.searchParams.delete("key");
    return url.pathname + url.search + url.hash;
  };
  if (key !== null) {
    if (!(await mayTry(request, env))) {
      return html(429, lockPage(here(), TOO_MANY));
    }
    if (await rightPassword(key, env)) {
      return redirect(here(), accessCookie(want));
    }
    return html(
      401,
      lockPage(here(), "That link's password isn't right any more."),
    );
  }

  return html(401, lockPage(path + url.search));
}
