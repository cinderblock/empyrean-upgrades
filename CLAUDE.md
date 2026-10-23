# Working in Empyrean Upgrades

This repo plans the V2 hardware upgrade of the Empyrean Gate. It holds documents,
not code (yet). Read `README.md`, then the plan for the category you are working on.

## Ground rules

- **Mark who drove it.** Most of this repo is AI-drafted; never let that blur.
  When the user states a fact or makes a decision, add it to the ledger
  (`app/content/human.ts`, next H-id, their words trimmed, nothing private:
  the repo is public), run `bun run ledger`, and credit it where it lands: `by`
  / `todayBy` / `v2By` in the site content, 🧑 H-id in `plans/`. Your own
  choices are uncredited on the site and 🤖 in the plans. Credit only what was
  said or approved, not what is merely consistent with it; when your call
  goes against what the user said, record a `conflict` and a ⚠ in the plan.
  See `plans/review-system.md`.
- **Feedback from the site** is read with `bun run feedback` (`--local` for
  the dev server). Act on it, then resolve it; `bun run feedback sync` turns
  review verdicts into `app/content/reviews.json`.

- **Separate facts from guesses.** In `docs/v1-hardware.md` every fact carries a
  confidence (Confirmed / Reported / Assumed / Unknown) and a source. Keep that up:
  a plan built on an unmarked guess is how wrong parts get bought.
- **Sources of truth for V1.** The Empyrean software repo (`../Empyrean`) records
  most of what is known: `README.md`, `plans/empyrean-gate.md` (physical
  installation, show machine), `plans/gate-network.md` (network decisions). Cite
  the file when you copy a fact over. When the user states a fact directly, record
  it as Reported with the date.
- **Check specs against the manufacturer.** Use datasheets and official spec pages
  for ratings (temperature, IP rating, voltage range, current). Link them. Retailer
  listings are marketing.
- **No purchases, orders or quotes requested** without the user's explicit go-ahead
  for that specific item.
- **One plan per category** in `plans/`, kept current: Goal, Known today,
  Requirements, Decisions already made (don't re-ask), Options, Open questions,
  Dependencies, Progress. Update the plan in the same turn as a finding.
- **Cross-category decisions** go in `docs/requirements.md` when every category
  has to respect them (example: power never shares a box with data).
- Units: feet for the ring geometry (that is how the rig is described), metric
  for everything else; temperatures in °C.
