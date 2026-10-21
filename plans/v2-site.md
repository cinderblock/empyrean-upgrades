# v2.empyreangate.org: the V2 plans site

## Goal

A website at **https://v2.empyreangate.org** that shows people the plans for the
Gate's V2 upgrade in detail, with hard numbers, so the crew knows what it needs and
wants to raise, and donors can see where their money goes.

- The root view is quick and to the point: the ask, where it goes, the tiers.
- Drill-in is available for anyone who wants it: detail pages, hovers, sources,
  component tables, diagrams.
- Visual aids: a budget pie, stretch goals, ring/box diagrams.
- Ctrl+P on the root gives a clean **single sheet**, in colour or greyscale.
- A mini demo of the gate's patterns, linking to the full playground on
  empyreangate.org.
- Simple password protection for now, easy to switch off with one push.
- Unlisted: empyreangate.org does not link to it; noindex.

## Environment / context

- This repo: `C:\Users\camer\git\Personal Projects\Empyrean Upgrades`, branch
  `master`. No GitHub remote yet.
- Started from `cinderblock/ssg-base` (remote `template`), merged with
  `--allow-unrelated-histories`, the same way empyreangate.org was started.
- Parent site: `../empyreangate.org` (github.com/cinderblock/empyreangate.org).
  Published by **Cloudflare Workers Builds** as Workers static assets; ops
  (`../ops`, `cloudflare/config/projects/empyreangate.yaml`) provisions the empty
  worker `empyreangate-org`, attaches the custom domain and owns redirects.
- empyreangate.org has `previews: true`: every branch of the _parent_ repo gets a
  Preview at `<branch>.empyreangate.org` via a Cloudflare-managed wildcard record.
  An explicit custom domain `v2.empyreangate.org` wins over that wildcard, but a
  branch named `v2` in the parent repo would then never get its Preview there.
- `dev.empyreangate.org` is behind Cloudflare Access (email OTP, crew allow list).
  That is not a fit for donors, hence a password in the Worker (below).

## Decisions already made (don't re-ask)

- Subdomain `v2.empyreangate.org`, published like the parent (user, 2026-10-21).
- Don't link to it from empyreangate.org (user, 2026-10-21).
- Build and review locally before publishing (user, 2026-10-21).
- Start from ssg-base (user, 2026-10-21).
- Simple password protection, easy to turn off with a push (user, 2026-10-21).

## Design

- **Numbers live in one place**: `app/content/budget.ts` (line items with qty,
  unit price, source, confidence, tier). Every chart, total and table on the site
  is computed from it. The markdown plans in `plans/` stay the working notes.
- **Password**: the Worker runs first on every request (`run_worker_first`).
  `SITE_LOCK` in `wrangler.jsonc` turns the lock on or off; the password is the
  Worker secret `SITE_PASSWORD`. A correct password sets an HMAC-signed cookie.
  `?key=<password>` in a link does the same, so a donor can get a one-click link.
  Lock on with no secret set fails closed (503). Turning it off: set
  `SITE_LOCK` to `"off"` and push.

## Plan / steps

1. [x] Initial commit of the planning docs (`956c54a`, before this thread).
2. [x] Merge ssg-base (`14a45e3`); Workers static assets setup like the parent.
3. [x] Budget data model (`app/content/budget.ts`), with draft figures.
4. [x] Real prices from the research (`docs/pricing-2026-10.md`,
       `e7fe35b`): V2 $27,000 to raise, $52,000 with every stretch goal.
5. [x] Overview: the ask, tier ladder, donut, category cards, ring diagram.
6. [x] Category pages and the segment diagram; /budget.
7. [x] Print: a dedicated one-page handout, colour and greyscale.
8. [x] Mini demo (render copied from empyreangate.org `f6f02be`) with a
       64/128-spoke switch + link to the playground.
9. [x] Password Worker, unit tests, checked under wrangler dev.
10. [x] Playwright suite (3 engines), CI workflow, README.
11. [ ] User review of the local site (dev server). ← current
12. [ ] Publish: GitHub repo, ops entry, Workers Builds, the password secret.
        Needs the user's go-ahead for each piece (see Open questions).

## Proposed ops change (NOT applied, not written to the ops repo yet)

Add to `cloudflare/config/projects/empyreangate.yaml`, after the empyreangate.org
entry, once the user approves:

```yaml
# V2 plans and the donor pitch (github.com/cinderblock/empyrean-upgrades), a
# separate static site on its own worker. Unlisted: nothing links to it, it
# marks itself noindex, and its Worker asks for a password while SITE_LOCK is on.
# The explicit custom domain wins over empyreangate-org's *.empyreangate.org
# Preview wildcard.
- domain: v2.empyreangate.org
  worker:
    name: empyreangate-v2
    external: true
    provision: true
```

(Schema to be checked against `cloudflare/config/schema.json` when applying; the
ops checkout had another thread's uncommitted changes in this very file on
2026-10-21, so stage on top of whatever is there then.)

## Findings / gotchas

- **Pricing research, 2026-10-21** (`docs/pricing-2026-10.md`): full white may
  need 3–6 separately fed power chains (not one daisy chain); only the
  industrial PC is rated for a sealed box in the sun; TRUE1 TOP cable connectors
  are being phased out; the Ultra is $142 with surcharge, and its 202 W PoE
  budget on a third-party supply is unconfirmed. Each category plan has the
  details.

- **workerd refuses non-handler named exports from the main module.**
  `wrangler dev` failed with "Incorrect type for map entry 'COOKIE': the
  provided value is not of type 'function or ExportedHandler'" while
  worker/index.ts exported constants for its tests. Fix: the logic lives in
  worker/lock.ts; index.ts exports only `default { fetch }`. Bun unit tests
  don't catch this; only the real runtime does.
- **Git Bash rewrites curl arguments that look like paths**: `-d next=/budget/`
  reached the Worker as `C:/Program Files/Git/budget/`. Use
  `MSYS_NO_PATHCONV=1` when testing redirects by hand.
- **oxfmt has no "auto" end of line.** Pinned `endOfLine: crlf` and
  `.gitattributes * text=auto eol=crlf`, so checkouts are CRLF on Windows and
  on CI alike (the parent site chose LF instead).
- **The prerendered print sheet must not carry a second h1** (Playwright caught
  it): its title is a styled `<p>`.
- **Tip stale closure**: a hover-open followed by a click closed the tip when
  the hover's render hadn't committed. The click reads a ref now.
- The dev server logs "transport was disconnected, cannot call fetchModule"
  once when many files change at once (a mass `oxfmt --write`). It restarts
  itself; not a bug in the site.
- Print checks without poppler: `tmp/print-shot.ts` (gitignored) screenshots
  print media at Letter width, in colour and greyscale; the Playwright suite
  counts PDF pages.

## Progress log

- [x] Read the repo docs, parent site README/deploy, ops config
- [x] Scaffold, pages, print, demo, lock, tests, CI (`efd4101`, `245977a`)
- [x] Real prices in budget.ts (`e7fe35b`); findings copied into each
      category plan
- [ ] `DRAFT = false` only when the user agrees
- [ ] Publish

## Open questions for the user

1. GitHub repo for this project: create `cinderblock/empyrean-upgrades` (private)?
   Workers Builds needs one. Recommendation: yes, private.
2. Apply the ops change above (worker + custom domain)?
3. The password itself (set as a Worker secret, never committed).
4. The "Give" button points at the same Givsum page empyreangate.org uses
   (Entheos Community Village). Is that the right place for V2 money, or does
   V2 want its own fund/page? Recommendation: confirm with whoever holds it.
5. Contact for larger gifts: the site says "reach the crew through Entheos".
   Want a direct email instead?
6. The stretch-goal tiers and their order (Built for the heat, Eyes and
   ears, 128 spokes) are my proposal. Reorder or rename?
7. Contingency 15%, rounding to $500: OK?
8. Compute in the V2 goal is a ~$1,600–$2,000 consumer build (rated to about
   35–40 °C); the industrial PC rated for the heat is the first stretch goal.
   Put the industrial PC in the V2 goal instead (+about $5K)? Recommendation:
   decide after logging a real box's temperature.
9. Sun shields on all 33 boxes are in the V2 goal ($1,320–$3,960). Keep?

## Things not to do

- Don't link to v2 from empyreangate.org.
- Don't touch the ops checkout or Cloudflare without per-change approval.
- Don't create a branch named `v2` in the empyreangate.org repo.
