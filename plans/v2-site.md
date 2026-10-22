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
  `master`. Remote `origin` = github.com/cinderblock/empyrean-upgrades
  (public, created 2026-10-21).
- Cloudflare: worker `empyreangate-v2` in "Cameron Tacklind's Account"
  (`c5987fbfdbb396ef3121459c26125cc0`; wrangler's login sees several
  accounts, so pass `CLOUDFLARE_ACCOUNT_ID`), custom domain
  `v2.empyreangate.org`, both from ops `7b23091`.
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
- The GitHub repo is **public** (user, 2026-10-21). So the password never goes
  in the repo, a plan or a commit; it lives only in the Worker secret.
- The ops change (worker + domain) was approved (user, 2026-10-21) and applied.
- The password was given by the user in chat (2026-10-21) and set as the
  `SITE_PASSWORD` secret on `empyreangate-v2`.
- **Contingency 15 %, goals rounded up to $500** (user, 2026-10-21: "good
  idea. round up").
- **The industrial PC is in the V2 goal** (user, 2026-10-21). The consumer
  build is now a considered option. "Built for the heat" holds only the
  industrial switches. V2 goal $43,000; cumulative $47,500 / $49,500 /
  $62,000.
- **Larger gifts: James Logistic** (user, 2026-10-21). The site names him
  and points through Entheos; no email published yet (the repo is public).

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
11. [ ] User review of the local site (dev server).
12. [x] **Power: one waterproof twist-lock feed for the whole ring** (user,
        2026-10-21). Site updated from `docs/pricing-power-feed-2026-10.md`:
        an L14-30 feed, Hubbell watertight joints, 8/4 trunk, a GFCI per
        segment, a towable adapter; one feed on the ring diagram. V2 goal now
        $40,500 (power $13.7–18.7K); $42,500 after the local outlets;
        **$37,000** after the joints became cut AC Works cords under rain
        covers (rain-proof is enough, user, 2026-10-21). ← awaiting the
        user's review
13. [x] Publish (live 2026-10-21).

    - [x] GitHub repo, public; master pushed (2026-10-21).
    - [x] ops entry: pushed as ops `7b23091` from a worktree off origin/master
          (the shared ops checkout has other threads' uncommitted edits in the
          same file). Dry run and the `Cloudflare` CI run (39723784768) both: 2 to
          create (the worker, its domain), 0 to update, 0 to delete; the verify
          pass was 0/0/0.
    - [x] `SITE_PASSWORD` secret set on `empyreangate-v2` with
          `wrangler secret put` (2026-10-21).
    - [x] **Workers Builds**: connected by the user in the Cloudflare dashboard
          (2026-10-21), settings as in README → Deployment. The GitHub app
          ("Cloudflare Workers and Pages") needed access to the new repo.
          Connecting doesn't build; the first build waits for a push.
    - [x] Verified live after the first Workers Build (24bc0769, success): the
          lock page (401, no figures, noindex, `no-store`); a wrong password
          refused (401); the right one 303s to `next` with an HttpOnly, Secure,
          SameSite=Lax cookie (90 days); `?key=` unlocks and drops the key; every
          page 200 with meta noindex and a private, no-cache Cache-Control;
          nosniff, Referrer-Policy, X-Frame-Options and X-Robots-Tag present;
          robots.txt disallows all; a miss is 404. Script:
          `tmp/verify-live.ts <password>` (gitignored; copy it out if it should
          be kept).

14. [ ] **Feed ampacity: show 30 A and 50 A side by side** (user, 2026-10-21:
        open to more ampacity for maximum expansion, or both options with
        prices). Research: `docs/pricing-feed-options-2026-10.md`. ← current
15. [ ] **New category: Rigging, a self-climbing ring** (user, 2026-10-21),
        two options: pass-through arcs, or a shelf on each vertical. A
        stretch goal. Plan `plans/rigging.md`; research
        `docs/pricing-self-climbing-2026-10.md`. Done 2026-10-21: a "big
        project" (its own goal, off the cumulative ladder), $197,000.
16. [ ] **New stretch goal: solar**, possibly enough for the speakers (user,
        2026-10-21). Plan `plans/solar.md`; research
        `docs/pricing-solar-2026-10.md`. Done 2026-10-21: a big project,
        $57,500 (option C, the hybrid).

17. [ ] **New category: Transport**, a dedicated shipping container and carts
        to roll everything in and out (user, 2026-10-21). Plan
        `plans/transport.md`; research `docs/pricing-container-carts-2026-10.md`.
        ← current

18. [ ] **New stretch goal: a VJ console** (user, 2026-10-22), on the ladder
        under Compute. A 5-step tier ramp validates on both surfaces (dark
        #9ec5f4 … #184f95; print #104281 … #86b6ef), already in the CSS.
        Research: `docs/pricing-vj-console-2026-10.md`. ← current

## The ops change (applied 2026-10-21, ops `7b23091`)

In `cloudflare/config/projects/empyreangate.yaml`, after the empyreangate.org
entry (the committed comment is longer):

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

The shared ops checkout held another thread's uncommitted edits in this same
file (removing the parent's `previews: true`), so the change was made in a
worktree off origin/master (`~/.t3/worktrees/ops/empyreangate-v2`), not on top
of them.

## Findings / gotchas

- **Big projects are off the tier ladder** (2026-10-21). A 7-step single-hue
  ordinal ramp fails the dataviz validator (adjacent steps too close), and
  rigging/solar/transport are independent asks, not rungs. So `Tier.project`
  names the category; `tierTotals()` is the ladder, `projectTotals()` the
  projects; each project category takes a categorical slot (6 green, 7
  violet; 8 red is left for transport), validated on both surfaces.
- **The print handout is one page with almost no slack.** Adding the big
  projects line pushed the footer to page 2; shortening the power and
  networking "today" text fixed it. Check `tmp/printpdf.ts`-style before
  adding anything to the sheet.

- **The Gate is 60 ft across, not 50 ft** (James Logistic, 2026-10-21). The
  50 ft came from the Empyrean repo, where it was a guess. Corrected in
  `site.ts` (`GATE.outerDiameterFt`), the print sheet, README, v1-hardware,
  the power trunk and joints (segments are 11.8 ft, so the 10 ft cut cords
  no longer fit) and the network cable (about 325 ft). The Empyrean repo
  still says 50 ft.
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
- [x] Repo public, ops applied, password secret set (2026-10-21)
- [x] The same at-rest spoke bug fixed in empyreangate.org: PR #3 against
      its `dev` (github.com/cinderblock/empyreangate.org/pull/3), with a test
- [x] Workers Builds connected (user, dashboard, 2026-10-21)
- [x] First deploy verified (2026-10-21)

## Open questions for the user

1. The "Give" button points at the Givsum page empyreangate.org uses (Entheos
   Community Village). User, 2026-10-21: "entheos? i gotta ask james".
   Waiting on James.
2. Publish a direct email for James Logistic as the larger-gifts contact?
   The repo is public, so an address there gets harvested; the site itself
   is behind the password. Recommendation: only with James's OK, and
   ideally a role address rather than a personal one.
3. The stretch-goal tiers and their order (Built for the heat, now just the
   industrial switches at $4,500; Eyes and ears; 128 spokes) are my
   proposal. Keep, rename, reorder, or fold "Built for the heat" into V2?
4. Sun shields on all 33 boxes ($1,320–$3,960). User, 2026-10-21: "maybe
   excessive? how much does this help? i guess if it's built into the truss
   it's easy". Answered with the Hoffman figure; proposal: one shield per
   segment over both boxes. Waiting on the user.
5. Remove the draft banner? Recommendation: after the open prices above
   settle.

## Things not to do

- Don't link to v2 from empyreangate.org.
- Don't touch the ops checkout or Cloudflare without per-change approval.
- Don't commit the password anywhere: the repo is public.
- Don't `wrangler deploy` by hand: Workers Builds deploys (ops' rule).
- Don't create a branch named `v2` in the empyreangate.org repo.
