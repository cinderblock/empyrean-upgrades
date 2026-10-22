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

- **Solar and battery are their own dedicated stretch category** (user, 2026-10-22):
  as the site has it, a big project with its own page and goal.
- **No panels on top of the ring** (user, 2026-10-22): a separate array.
- Solar is a stretch goal; the speakers are a "possibly" (user, 2026-10-21).

## Options

Research under way: `docs/pricing-solar-2026-10.md` (energy budget, battery,
array and inverter sizing, products, a hybrid with a small generator, and how
other camps do it).

## Panels on top of the ring?

**Idea (user, 2026-10-22): solar panels, or a service walkway, on top of
the ring**, which would also shade the boxes in the truss ("moot if we add
solar on top... not sure though. could be nice to add a platform on top for
walking for service... doubles as shade"). Rough numbers (reasoning, not
researched):

- The ring top is 16 arcs of about 3.57 m on a 0.3 m (12") truss. Panels
  (about 2.3 × 1.1 m, 460 W) laid along it fit about one per arc: **about
  7.4 kW**. Laid across, two or three per arc overhang about 1 m each side:
  12–22 kW, enough for the solar goal's 12 kW (26 panels).
- **Weight at 21 ft**: 26 panels are about 650 kg, plus racking, on a
  **light-duty** truss; the self-climbing hoists would lift it too. Needs
  Tomcat's load table for the TC 1212 and a wind check (panels are sails).
- **A walkway** for service at 21 ft needs a rated deck, fall-arrest anchors
  and a truss rated for people and point loads; light-duty truss may not be.
- If it happens, the sun shields (and maybe the solar racking line) go away.

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
- [x] Research the sizing and products (`docs/pricing-solar-2026-10.md`,
      2026-10-21): option C recommended, $25–50K
- [x] On the site as a category and a big project (option C; goal $57,500),
      2026-10-21
