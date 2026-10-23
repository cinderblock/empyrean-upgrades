# Human review: who wrote what, and a way to check it

## Goal

Most of this repo's plans were drafted by AI. Make it obvious, everywhere,
which parts a human said or decided and which parts are AI guesses, and give
the crew a fast way to review the AI parts and leave feedback on anything,
right on v2.empyreangate.org.

The user's four asks (2026-10-23 12:27 PM PDT (19:27Z)):

1. Mark AI guesses and human-driven plans far more clearly.
2. Go back over the conversation history and mark which things the user
   specified and which the AI guessed to make the plan complete.
3. A system to walk through the plans and get most things human reviewed.
4. A built-in feedback system on the site for sections, selections, text,
   images, everything; possibly switched off with a URL flag.

## Environment / context

- Site: React Router 8, prerendered, Bun, Workers static assets with one
  Worker (`worker/`) in front. See README.
- Transcripts read for item 2 (user-typed messages only, notifications and
  tool output dropped, T3 inline quote-comments decoded):
  - This repo: `~/.claude/projects/C--Users-camer-git-Personal-Projects-Empyrean-Upgrades/`
    `3231f66c…` (main thread, 2026-10-21 → 23), `1586e4bb…` (password,
    logging), `09e1a0a5…` (light mode), `73c055d0…` (this task).
  - Empyrean repo: `…-Empyrean/38362ca4…` (the network discussion,
    2026-10-19/20, and the seed of this repo, 2026-10-21 1:48 PM PDT).
- The result is the ledger, `app/content/human.ts` (H01…), rendered to
  `docs/human-input.md` by `bun run ledger` (a unit test keeps them in step).

## Decisions already made (don't re-ask)

- 🧑 Feedback can be switched off by a URL flag (user, 2026-10-23).
- 🤖 **Default is on**: review marks and feedback show for everyone let in,
  `?review=off` turns them off (sticky in the browser), `?review=on` back on.
  Print never shows them. One constant, `REVIEW_DEFAULT` in
  `app/content/review.ts`.
- 🤖 **Absence means AI.** Content carries a credit only where a human drove
  it. Anything uncredited is an AI draft. This keeps the markup small and
  makes the honest default the easy one.
- 🤖 **Three origins, one overlay**: Human (a ledger id), From a document
  (V1 drawings, the Empyrean repo; read by AI), AI draft. A review on top:
  Reviewed / Flagged / Changed since review.
- 🤖 **Conflicts are shown**, not buried: where the AI's call differs from
  what the user said (L21-30 "ruled out" against "30A 3 phase should be
  enough"; loose plug ends instead of "extension cables we can cut in half"),
  the item carries `conflict` and is first in the walk-through.
- 🤖 **Feedback storage: a SQLite Durable Object** in the same Worker. No
  separate resource to provision in the dashboard, consistent reads. Cost:
  Cloudflare doesn't generate version (preview) URLs for a Worker with a
  Durable Object; Workers Builds previews are off for this worker anyway.
  Deploying creates the DO namespace: **needs the user's yes before push.**
- 🤖 Who wrote feedback comes from the access cookie (`main`, or the pattern
  password), plus an optional name. `main` sees everyone's feedback; others
  see their own. With the lock off and no cookie, feedback is refused.
- 🤖 The quotes in the ledger are short and trimmed: the repo is public. No
  passwords, no password pattern, nothing private.

## Plan / steps

1. ✅ Extract every user message from the transcripts.
2. ✅ Ledger of human input with ids, dates (PDT) and what it changed.
3. ✅ Credits and conflicts on the site content (`categories.ts`, `budget.ts`).
4. ✅ Review registry (`app/content/review.ts`), committed reviews
   (`app/content/reviews.json`).
5. ✅ Site: marks on every reviewable block, the `?review=` flag, `/review`
   walk-through, feedback layer (pick, select, page).
6. ✅ Worker: `/__feedback` API, Durable Object store; dev and preview
   servers answer the same API from a local file / memory.
7. ✅ `bun run feedback` to read, resolve, and sync reviews into the repo.
8. ✅ Mark the plans in `plans/` with 🧑 / 🤖 and ledger ids; fix
   misattributed "(user, date)" tags.
9. ✅ Tests, README, CLAUDE.md rule.
10. ⏳ **Push** (deploys, creates the Durable Object): waiting on the user.

## Findings / gotchas

- The plans' old "(user, date)" tags often covered AI elaboration too. For
  example networking's "not the 210 W brick": the user said "maybe with the
  210W adapter... or an aftermarket one". Power's "No remote reset" bullet
  also named the Ericson 1075-AR, an AI pick. Now split per clause.
- "8 hand at other events" was read as "eight hand chain hoists". It could
  mean eight people. Marked as an AI reading of H52.
- AI went against the user twice, both now flagged: L21-30 three-phase
  "ruled out" (user: "30A 3 phase should be enough"), and joints from loose
  plug ends rather than cut extension cords (H22; the AI's reason was the
  60 ft geometry making the 10 ft cords too short).
- React warns on `<html>` attribute mismatches; the pre-paint script that
  sets `data-review` needs `suppressHydrationWarning` on `<html>`.

## Progress log

- [x] Transcripts extracted and read
- [x] Ledger written (H01–H62): 62 statements, 2026-10-19 → 2026-10-22 PDT
- [x] Content credited
- [x] Review UI and walk-through
- [x] Feedback UI and API
- [x] Plans marked
- [x] Checked in a browser on the dev server: marks, tips, pointing at the
      segment diagram, selecting text, the walk-through recording a verdict,
      `bun run feedback --local` and `sync` (test data removed afterwards)
- [x] Tests passing locally: typecheck, 77 unit, 94 Playwright passed across 3 engines (2 skipped: the PDF check is Chromium-only)
- [ ] Pushed and checked live (needs the user's yes)
- [ ] The user walks `/review` for the first time

## Open questions for the user

1. OK to push? It deploys the Durable Object (a new Cloudflare resource
   created by the deploy itself). Recommend yes.
2. Should Entheos-password guests see the marks and feedback button, or
   only `main`? Built: everyone let in. Recommend keeping it, since their
   comments are the point.
3. H52: does "8 hand" mean eight hand chain hoists, or eight people?

- Counts at the start (2026-10-23): 203 reviewable items; 19 Human, 57 Human
  idea + AI details, 3 from a document, 124 AI drafts; 7 conflicts.
- The ledger covers plan content. Site-build requests (light mode, logging,
  the password pattern) stay in `plans/v2-site.md` as before; they aren't
  plan content to review, and the password and pattern must never be quoted.
- The selection chip listens for `selectionchange`, not `pointerup`:
  keyboard and long-press selections fire no pointerup, and Playwright's
  `selectText()` caught it. It also checks once when the API answers, since a
  selection made before then was missed (a race seen in the full suite).
- The walk-through's key handler must not assume `e.target` is an Element.
- `Said` renders spans only: marks sit inside `<p>`s, and a `<ul>` there ends
  the paragraph in the prerendered HTML and breaks hydration.
- `plans/expansion.md` has no Decisions section: nothing in it was decided by
  a person beyond the category itself (H15).

## Things not to do

- Don't mark something 🧑 because it is _consistent_ with what the user
  said. Only what the user said or explicitly approved.
- Don't quote passwords or the password pattern into the ledger.
- Don't edit `reviews.json` by hand; `bun run feedback sync` writes it.
