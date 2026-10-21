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
2. [ ] Merge ssg-base; Workers static assets setup like the parent. ← current
3. [ ] Budget data model + pricing research (`docs/pricing-2026-10.md`).
4. [ ] Root page: the ask, pie, tiers, category cards.
5. [ ] Category detail pages, diagrams.
6. [ ] Print stylesheet (single sheet, colour and greyscale).
7. [ ] Mini demo (GateRender port from empyreangate.org) + link to the playground.
8. [ ] Password Worker + tests.
9. [ ] Publish: GitHub repo, ops entry, Workers Builds. Needs the user's go-ahead
       for each piece (see Open questions).

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

- (none yet)

## Progress log

- [x] Read the repo docs, parent site README/deploy, ops config
- [ ] Scaffold

## Open questions for the user

1. GitHub repo for this project: create `cinderblock/empyrean-upgrades` (private)?
   Workers Builds needs one. Recommendation: yes, private.
2. Apply the ops change above (worker + custom domain)?
3. The password itself (set as a Worker secret, never committed).

## Things not to do

- Don't link to v2 from empyreangate.org.
- Don't touch the ops checkout or Cloudflare without per-change approval.
- Don't create a branch named `v2` in the empyreangate.org repo.
