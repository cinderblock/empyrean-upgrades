/**
 * Headers every response carries, whether the Worker answers it or the static
 * assets do. scripts/postbuild.ts writes them into `_headers` too, for any
 * asset Cloudflare serves without the Worker.
 *
 * The site is unlisted: nothing links to it and it asks search engines not to
 * index it, locked or not. Flip `INDEXABLE` when that changes.
 */
export const INDEXABLE = false;

export const SAFETY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "frame-ancestors 'none'",
  "X-Frame-Options": "DENY",
  ...(INDEXABLE ? {} : { "X-Robots-Tag": "noindex, nofollow" }),
};

/** robots.txt while the site is unlisted: crawl nothing. */
export const UNLISTED_ROBOTS = `User-agent: *
Disallow: /
`;
