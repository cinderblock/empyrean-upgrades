# Empyrean Upgrades

Planning for **Version 2** of the Empyrean Gate's physical installation: power,
networking, compute, weatherproofing, and room to expand.

The Gate is a 60 ft ring of 16 truss segments carrying 64 LED spokes over a dance
floor, driven over sACN by the [Empyrean](../Empyrean) software. V1 works, but its
power and enclosures are not weatherproof, its network is one central switch, and
its show computer is an integrated-graphics mini PC. This repo is where the V2
upgrade is worked out before anything is bought or built, and it builds
**[v2.empyreangate.org](https://v2.empyreangate.org)**, the site that shows the
plans and the budget to the people we're asking to fund them.

## Upgrade categories

| Category        | Goal                                                                                                                                                  | Plan                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Power           | Replace V1's non-weatherproof 110 VAC cables and plugs with rain-proof, daisy-chained segments permanently installed in each of the 16 truss segments | [plans/power.md](plans/power.md)                     |
| Networking      | A switch in every node box, daisy-chained around the ring, with spare ports for expansion                                                             | [plans/networking.md](plans/networking.md)           |
| Compute         | A new show computer with a better GPU                                                                                                                 | [plans/compute.md](plans/compute.md)                 |
| Weatherproofing | New node and brain boxes, living inside the truss beside separate power boxes                                                                         | [plans/weatherproofing.md](plans/weatherproofing.md) |
| Expansion       | Future PoE devices: cameras, streaming audio to speakers                                                                                              | [plans/expansion.md](plans/expansion.md)             |
| Rigging         | A self-climbing ring that raises itself up its legs (stretch goal)                                                                                    | [plans/rigging.md](plans/rigging.md)                 |
| Solar           | A solar power system for the Gate, maybe the speakers too (stretch goal)                                                                              | [plans/solar.md](plans/solar.md)                     |
| Transport       | A dedicated shipping container and carts to roll everything in and out (stretch goal)                                                                 | [plans/transport.md](plans/transport.md)             |

## Reference

- [docs/v1-hardware.md](docs/v1-hardware.md): what is installed today, with how
  sure we are of each fact and where it came from.
- [docs/requirements.md](docs/requirements.md): constraints every category shares
  (site conditions, the power/data separation rule, serviceability).
- [docs/pricing-2026-10.md](docs/pricing-2026-10.md): the price research behind
  the budget, with links.
- [docs/human-input.md](docs/human-input.md): **everything a person has said
  that shaped the plans**, with ids (H01…). Anything not traced to it is an AI
  draft. Generated from `app/content/human.ts` by `bun run ledger`.
- [plans/v2-site.md](plans/v2-site.md): the working plan for the site itself.
- [plans/review-system.md](plans/review-system.md): who wrote what, and the
  review and feedback system.

## The site

v2.empyreangate.org is unlisted: nothing links to it, it asks search engines
not to index it, and for now it asks for a password. It is built from
[cinderblock/ssg-base](https://github.com/cinderblock/ssg-base) (remote
`template`), like [empyreangate.org](https://empyreangate.org): React 19 +
React Router 8, Vite, TypeScript, Bun, Playwright, oxfmt + lefthook. Fully
prerendered; the only server code is the password Worker.

```sh
bun install
bun run dev
```

| Script                   | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `bun run dev`            | Dev server on :5173                                            |
| `bun run build`          | Prerender to `build/client`, then 404.html, `_headers`, robots |
| `bun run preview`        | Serve the built site on :4181 (no Worker, so no password)      |
| `bun run preview:worker` | Build, then run it under the real Worker on :8788              |
| `bun run test`           | Playwright, against a fresh build (not the dev server)         |
| `bun run test:unit`      | Bun unit tests: the budget arithmetic, the Worker              |
| `bun run typecheck`      | `react-router typegen && tsc`                                  |
| `bun run fmt`            | Format with oxfmt (CRLF, see `.gitattributes`)                 |

### Pages

- `/`: the overview. The ask, the goal and stretch goals as one bar, where V2's
  money goes (a donut with its table), a card per upgrade, an interactive
  diagram of the ring, and a mini demo of the gate's patterns with a switch
  between today's 64 spokes and the stretch goal's 128.
- `/budget`: every line item, with quantity, unit price, total and how sure we
  are of the price (tap the label for the source).
- `/plans/<category>`: today vs V2, how, a diagram, the parts, and what we still
  need to find out.
- `/review`: who wrote what, a walk-through of everything still needing a
  person's check (conflicts with what was said first, then the biggest AI
  decisions), and the ledger of what people said.

**Printing.** Ctrl+P on the overview prints a one-page handout (Letter) instead
of the page: the ask, the donut, the tiers, a table of the upgrades, and a QR
code back to the site. It reads in greyscale too: the donut's slices and keys
are hatched, and labelled. It is `app/components/PrintSheet.tsx`, hidden on
screen; the Playwright suite checks it stays on one sheet.

### Where the numbers live

Every dollar figure on the site is computed from
[`app/content/budget.ts`](app/content/budget.ts): line items with a quantity, a
unit price (exact when quoted, `[low, high]` when estimated), a confidence
(Quoted, Estimate, Assumed) and a source. Each tier adds a 15% contingency; the
amount to raise is the high end plus contingency, rounded up to $500. Set
`DRAFT` to `false` there once the figures are firm, and the draft banner goes.
The words about each upgrade are in
[`app/content/categories.ts`](app/content/categories.ts); the plans in `plans/`
stay the working notes behind them.

The demo is the live render from empyreangate.org, copied (`app/gate/`,
`app/components/GateDemo.tsx`, from its commit `f6f02be`). The full pattern
playground stays there, and the demo links to it.

### Review marks and feedback

Most of the plans are AI drafts, and the site says so. Every reviewable block
(each category's today and V2 statements, points, part choices and unknowns,
every tier and line item) carries a mark: **Human** (a ledger entry backs it),
**Human + AI** (a person set the direction, the AI chose the details), **From
a doc**, **AI draft**, or, once checked, **Reviewed** / **Flagged** / **Not
sure** / **Changed** (edited since its review). **≠** marks where the AI's call
goes against what a person said. Tap a mark for the quotes and the review
buttons.

- **Credits** live with the content: `by`, `todayBy`, `v2By` and `conflict`
  in `app/content/categories.ts` and `budget.ts`, naming ids in
  `app/content/human.ts`. No credit means an AI draft. The list of
  reviewable items is `app/content/review.ts`.
- **Feedback**: the button at the bottom right. Point at anything (a section,
  an item, a spot on a diagram), select text and comment on it, or comment on
  the page. Who left it comes from the access cookie (`main` sees everyone's;
  a pattern password sees its own), plus an optional name.
- **On and off**: on by default (`REVIEW_DEFAULT` in `review.ts`).
  `?review=off` on any page hides the marks and the button and the browser
  remembers it; `?review=on` brings them back. They never print.
- **Storage**: a SQLite Durable Object in the Worker (`FEEDBACK`,
  `worker/feedback-store.ts`), created by the deploy. `bun run dev` keeps
  feedback in `.feedback/dev.jsonl`; the preview server, in memory.

Reading it and closing the loop:

```sh
SITE_PASSWORD=... bun run feedback          # open feedback, by page
bun run feedback --local                    # what bun run dev stored
bun run feedback resolve <id> "Fixed in 1a2b3c4"
bun run feedback sync                       # review verdicts -> app/content/reviews.json
```

`sync` writes the newest verdict per item into `app/content/reviews.json`,
with a hash of the text reviewed, and marks those records done ("wrong"
stays open until fixed). Commit it: that is what shows a review on the built
site. Live reviews show at once for whoever made them.

### The lock

`worker/lock.ts` (entry `worker/index.ts`) runs in front of every request.
While `SITE_LOCK` is `"on"` in [`wrangler.jsonc`](wrangler.jsonc), a visitor
without the access cookie gets a password page. The password is the Worker secret `SITE_PASSWORD`:

```sh
bunx wrangler secret put SITE_PASSWORD           # production
bunx wrangler preview secret put SITE_PASSWORD   # Previews
```

A link can carry it: `https://v2.empyreangate.org/?key=<password>` unlocks and
drops the key from the address. The cookie is an HMAC keyed by the password, so
changing the password logs everyone out. Lock on with no password set answers
503 rather than serving the site. Password tries are rate-limited per visitor.

A second way in, so different people can get different passwords: the optional
secret `SITE_PASSWORD_PATTERN`, a regular expression the **whole** password must
match (for example `Guest\d\d` lets in `Guest07` and `Guest42`, not `Guest7`).
It is a secret, not a var, because the repo is public. Each such password gets
its own signed cookie naming it, so visits can be told apart (below). Changing
the pattern logs out just the people who came in through it. A pattern that
doesn't compile lets nobody in through it.

To shut out one pattern password and leave everyone else in, list it (commas or
whitespace between several) in the secret `SITE_PASSWORD_REVOKED`. It is
refused at the form, in links and as a cookie.

```sh
bunx wrangler secret put SITE_PASSWORD_PATTERN
bunx wrangler secret put SITE_PASSWORD_REVOKED
```

**To open the site to everyone**, set `"SITE_LOCK": "off"` in both `vars`
blocks of `wrangler.jsonc` and push. To make it findable as well, set
`INDEXABLE` in [`worker/headers.ts`](worker/headers.ts) to `true`.

To try the lock locally:

```sh
echo SITE_PASSWORD=test > .dev.vars
bun run preview:worker      # http://localhost:8788
```

### Visits

[`worker/visits.ts`](worker/visits.ts) records who opened what: every page
view (the HTML request, plus a beacon to `/__view` for each client-side
navigation), every unlock, refusal, rate limit and lock page. Each record has
who (`main`, the pattern password, or empty), the page, how, the status, the
rough place Cloudflare reports (country, region, city, data centre), the browser
and the referrer. No IP addresses, and never a wrong password guess, since a
mistyped guess can be someone's other password. Scripts, styles and fonts
aren't recorded.

Records go to Workers Analytics Engine (dataset `empyreangate_v2_visits`, kept
about 3 months) and, as a JSON line, to Workers Logs (a few days, in the
dashboard). To read them, with a Cloudflare API token that has Account
Analytics: Read:

```sh
export CLOUDFLARE_API_TOKEN=...
bun run visits                  # each person: views, pages, first and last seen
bun run visits log              # every event, newest first
bun run visits who Guest07      # one person ("main" for the main password)
bun run visits log --days 7
```

### Deployment

Same as empyreangate.org: **Cloudflare Workers Builds** builds the repo with
`bun run build` and ships it as Workers static assets using `wrangler.jsonc`
(worker `empyreangate-v2`). GitHub Actions runs the checks and never deploys.
The worker and its custom domain, `v2.empyreangate.org`, are provisioned by
[cinderblock/ops](https://github.com/cinderblock/ops)
(`cloudflare/config/projects/empyreangate.yaml`); ops never touches the code.
The `SITE_PASSWORD`, `SITE_PASSWORD_PATTERN` and `SITE_PASSWORD_REVOKED`
secrets are set on the worker by hand (above), since a person needs to know
them.

Workers Builds settings (Workers & Pages → `empyreangate-v2` → Settings →
Build), matching empyreangate.org's:

| Setting           | Value                                            |
| ----------------- | ------------------------------------------------ |
| Repository        | `cinderblock/empyrean-upgrades`                  |
| Production branch | `master`                                         |
| Build command     | `bun install --frozen-lockfile && bun run build` |
| Deploy command    | `bunx wrangler deploy`                           |
| Build variables   | `SKIP_DEPENDENCY_INSTALL=1`, `BUN_VERSION=1.4.2` |
| Non-production    | off (or on, after setting the Preview secret)    |

`BUN_VERSION` should match the Bun that wrote `bun.lock`; the image's default
Bun is older. Every push to master publishes.

## Status

Seeded 2026-10-21. The plans have designs and prices, but **most of it is AI
drafted** from a few days of conversation: of 203 reviewable items on the
site, 19 are fully a person's and 57 more follow a person's direction with AI
details (2026-10-23). `/review` is the way through the rest. Networking is
furthest along, because it was worked through in the Empyrean repo first
(`plans/gate-network.md` there).

## Related repos

- `../Empyrean`: the show software (TomSawyerLabs/empyrean-gate). Its README and
  `plans/` hold most of what is known about V1 hardware.
- `../ops`: infrastructure-as-code for the servers. Gate network devices are not in
  it yet.
