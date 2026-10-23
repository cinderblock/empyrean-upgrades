# Human review: who wrote what, and collecting reviews

## Goal

Most of this repo's plans were drafted by AI. Make it obvious, everywhere,
which parts a human said or decided and which parts are AI guesses, and let
the crew review the AI parts and leave feedback on anything, right on
v2.empyreangate.org. Agents then act on what they leave.

The user's asks:

1. (2026-10-23 12:27 PM PDT (19:27Z)) Mark AI guesses and human-driven plans
   far more clearly.
2. Go back over the conversation history and mark which things the user
   specified and which the AI guessed to make the plan complete.
3. A system to walk through the plans and get most things human reviewed.
4. A built-in feedback system on the site for sections, selections, text,
   images, everything; possibly switched off with a URL flag.
5. (2026-10-23, after the first build) "review doesn't need a UI. we'll let
   agents download reviews and resolve/delete them."

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
- 🧑 **No review UI** (user, 2026-10-23): the site only collects reviews and
  feedback. Agents download, resolve and delete them (`bun run feedback`).
  So there is no `/review` page and no list of past feedback in the
  browser, and only the bearer token (the main password) can read the API;
  a `main` cookie can't.
- 🧑 **Everyone let in sees the marks and the Feedback button**, Entheos
  pattern-password guests included (user, 2026-10-23: "yes").
- 🤖 **Default is on**: review marks and feedback show for everyone let in,
  `?review=off` turns them off (sticky in the browser), `?review=on` back on.
  Print never shows them. One constant, `REVIEW_DEFAULT` in
  `app/content/review.ts`.
- 🤖 **Absence means AI.** Content carries a credit only where a human drove
  it. Anything uncredited is an AI draft. This keeps the markup small and
  makes the honest default the easy one.
- 🤖 **Origins, plus a review overlay**: Human (a ledger id), Human + AI (a
  person set the direction, the AI chose details; still needs review), From a
  document, AI draft. On top: Reviewed / Flagged / Not sure / Changed since
  review (the text hash moved).
- 🤖 **Conflicts are shown**, not buried: where the AI's call differs from
  what the user said, the item carries `conflict` and its mark shows ≠.
- 🤖 **Reviews are left from the marks**: each mark's tip has Looks right /
  Not sure / Wrong… / Comment…. "Wrong" on an item is recorded as a review
  verdict with the note. A visitor sees their own verdicts at once, until
  they reload; everyone sees them once `sync` commits them.
- 🤖 **Feedback storage: a SQLite Durable Object** in the same Worker. No
  separate resource to provision in the dashboard, consistent reads. Cost:
  Cloudflare doesn't generate version (preview) URLs for a Worker with a
  Durable Object; Workers Builds previews are off for this worker anyway.
  The first deploy (`b093320`) created it.
- 🤖 Who wrote feedback comes from the access cookie (`main`, or the pattern
  password), plus an optional name. With the lock off and no cookie,
  feedback is refused.
- 🤖 The quotes in the ledger are short and trimmed: the repo is public. No
  passwords, no password pattern, nothing private.

## Plan / steps

1. ✅ Extract every user message from the transcripts.
2. ✅ Ledger of human input with ids, dates (PDT) and what it changed.
3. ✅ Credits and conflicts on the site content (`categories.ts`, `budget.ts`).
4. ✅ Review registry (`app/content/review.ts`), committed reviews
   (`app/content/reviews.json`).
5. ✅ Site: marks on every reviewable block, the `?review=` flag, the
   feedback layer (pick, select, page).
6. ✅ Worker: `/__feedback` API, Durable Object store; dev and preview
   servers answer the same API from a local file / memory.
7. ✅ `bun run feedback`: list, download, resolve, delete, sync.
8. ✅ Mark the plans in `plans/` with 🧑 / 🤖 and ledger ids; fix
   misattributed "(user, date)" tags.
9. ✅ Tests, README, CLAUDE.md rule.
10. ✅ No review UI: `/review` and the in-browser feedback list removed;
    reads are token-only; delete added.
11. ✅ Pushed (user's yes, 2026-10-23) and checked live.

## Findings / gotchas

- Git Bash's mingw curl 8.8.0 fails `-o <file>` with "(43) A libcurl
  function was given a bad argument" and prints status `000`: check the
  live API with `bun -e` and `fetch` instead.

- The plans' old "(user, date)" tags often covered AI elaboration too. For
  example networking's "not the 210 W brick": the user said "maybe with the
  210W adapter... or an aftermarket one". Power's "No remote reset" bullet
  also named the Ericson 1075-AR, an AI pick. Now split per clause.
- "8 hand at other events" was read as "eight hand chain hoists". It could
  mean eight people. Marked as an AI reading of H52.
- Seven items where the AI went against what was said, all marked ≠: L21-30
  "ruled out" (user: "30A 3 phase should be enough"), joints from loose plug
  ends rather than cut extension cords (H22), the USB-C console dock (H37),
  a third self-climbing option (H34), and the three budget lines that carry
  the first two.
- Counts at the start (2026-10-23): 203 reviewable items; 19 Human, 57 mixed
  (Human + AI), 3 from a document, 124 AI drafts.
- The ledger covers plan content. Site-build requests (light mode, logging,
  the password pattern) stay in `plans/v2-site.md` as before; they aren't
  plan content to review, and the password and pattern must never be quoted.
- React warns on `<html>` attribute mismatches; the pre-paint script that
  sets `data-review` needs `suppressHydrationWarning` on `<html>`.
- The selection chip listens for `selectionchange`, not `pointerup`:
  keyboard and long-press selections fire no pointerup, and Playwright's
  `selectText()` caught it. It also checks once when the API answers, since a
  selection made before then was missed (a race seen in the full suite).
- `Said` renders spans only: marks sit inside `<p>`s, and a `<ul>` there ends
  the paragraph in the prerendered HTML and breaks hydration.
- `plans/expansion.md` has no Decisions section: nothing in it was decided by
  a person beyond the category itself (H15).
- The preview server answers unknown paths with the SPA fallback (200), so a
  test can't assert a 404 status for a removed route there.

## Progress log

- [x] Transcripts extracted and read
- [x] Ledger written (H01–H62): 62 statements, 2026-10-19 → 2026-10-22 PDT
- [x] Content credited, plans marked (`c362e71`)
- [x] Marks, feedback UI and API (`bbca1d0`)
- [x] Checked in a browser on the dev server: marks, tips, pointing at the
      segment diagram, selecting text, a verdict recorded,
      `bun run feedback --local` and `sync` (test data removed afterwards)
- [x] Review UI removed; `download` and `delete` added and tried locally
- [x] Tests passing locally (typecheck, unit, Playwright on 3 engines)
- [x] Pushed `b093320` (user's yes); Workers Builds succeeded 2026-10-23
      1:10 PM PDT (20:10Z), CI green. Checked live: no cookie → 403 on
      `/__feedback/me`; a `main` cookie can post but gets 403 listing and
      deleting; the token lists and deletes (a test comment posted and
      deleted, store left empty); `/review/` is 404; the power page carries
      45 marks and the pre-paint script.

## Open questions for the user

1. ~~OK to push?~~ Yes (2026-10-23).
2. ~~Entheos guests see the marks and feedback?~~ Yes, as built (user,
   2026-10-23, answered on its own).
3. H52: does "8 hand" mean eight hand chain hoists, or eight people?
4. Three-phase: the user's L21-30, or the AI's L14-30 recommendation?

## Things not to do

- Don't mark something 🧑 because it is _consistent_ with what the user
  said. Only what the user said or explicitly approved.
- Don't quote passwords or the password pattern into the ledger, a test, or
  anything else in the repo.
- Don't edit `reviews.json` by hand; `bun run feedback sync` writes it.
- Don't add a review page or a feedback list back to the site (the user,
  2026-10-23): agents handle reviews.
