# Solar: running the Gate on sunlight

## Goal

A full solar power system for the Gate, possibly big enough to run the
speakers too, so the Gate needs less or no generator. A stretch goal (user,
2026-10-21).

## Known today

See `docs/v1-hardware.md` → Power distribution and Site and operation.

- The Gate averages about **1.5–2 kW while lit** (Reported, user). The lights
  run at night; the electronics stay powered all day.
- The V1 pixels' estimated max is about 9.6 kVA, never really reached (user).
- V2 takes one 120/240 V split-phase feed into an L14-30 twist-lock; a 50 A
  feed is being compared (`plans/power.md`).
- **Unknown:** the speakers' draw and hours, and how many days the system must
  run.

## Requirements

- Delivers 120/240 V split-phase into the Gate's feed connector, so it simply
  replaces the generator.
- Carries the Gate through the night from a battery charged by day, with a
  margin for dusty or cloudy days.
- Survives playa heat (batteries and inverter in 40–50 °C), dust on the
  panels, and wind on the array.

## Decisions already made (don't re-ask)

- Solar is a stretch goal; the speakers are a "possibly" (user, 2026-10-21).

## Options

Research under way: `docs/pricing-solar-2026-10.md` (energy budget, battery,
array and inverter sizing, products, a hybrid with a small generator, and how
other camps do it).

## Open questions

1. The speakers: what system, how many watts on average, and for how many
   hours a night?
2. Must solar carry everything, or is a small generator as backup fine?
3. Buy, or rent where rental exists?
4. Where does this sit among the stretch goals?

## Dependencies

- Power: the feed connector and capacity (30 A or 50 A) set the inverter's
  output.

## Progress

- [x] Plan created (2026-10-21)
- [ ] Research the sizing and products (`docs/pricing-solar-2026-10.md`)
- [ ] Add the category and its stretch goal to the site
