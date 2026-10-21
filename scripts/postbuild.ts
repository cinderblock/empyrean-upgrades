/**
 * Post-build fixups that the prerenderer doesn't do itself.
 *
 * 1. Copy the prerendered not-found page to `404.html`, the filename
 *    Cloudflare's `not_found_handling: "404-page"` looks for.
 * 2. Write `_headers` and `robots.txt` from worker/headers.ts. The Worker
 *    sets the same headers on everything it serves; these cover anything
 *    Cloudflare serves without it.
 */

import { copyFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { INDEXABLE, SAFETY_HEADERS, UNLISTED_ROBOTS } from "../worker/headers";

const OUT = "build/client";

await copyFile(join(OUT, "404/index.html"), join(OUT, "404.html"));
console.log(`Emitted ${join(OUT, "404.html")}`);

const headers = [
  "/*",
  ...Object.entries(SAFETY_HEADERS).map(([k, v]) => `  ${k}: ${v}`),
  "",
].join("\n");
await writeFile(join(OUT, "_headers"), headers, "utf8");
console.log(`Emitted ${join(OUT, "_headers")}`);

if (!INDEXABLE) {
  await writeFile(join(OUT, "robots.txt"), UNLISTED_ROBOTS, "utf8");
  console.log(`Emitted ${join(OUT, "robots.txt")} (unlisted: disallow all)`);
}
