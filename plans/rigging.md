# Rigging: a self-climbing ring

## Goal

The ring raises itself up its legs, so setup no longer depends on lifting a
60 ft ring by other means. A stretch goal (user, 2026-10-21).

## Known today

See `docs/v1-hardware.md` → Structure and geometry.

- A 60 ft ring of 16 curved truss segments (about 11.8 ft each) on **8 vertical
  truss legs**, 45° apart, with an inner hub about 11–13 ft across and 64 LED
  spokes between them (Reported / scaled from the V1 drawings).
- Each segment carries a node box and a power box; the main power bundle and
  the network switch come up the leg by the stage.
- **Unknown:** the truss make and profile (box size), the legs' height, the
  ring's weight with everything on it, and how V1 is raised today.

## Requirements

- Lifts the whole ring, with its boxes, spokes and hub, level at all 8 legs.
- Safe for a load over people: rated lifting gear, a way to lock the ring at
  height that doesn't rely on the lifting gear, and whatever an event
  inspector expects.
- Works in desert heat, dust and wind.

## Decisions already made (don't re-ask)

- Two options to compare (user, 2026-10-21):
  1. **Pass-through arcs:** replace half of the arced segments (the 8 that meet
     the legs) with arcs that have a pass-through for the vertical, so the
     ring rides up the legs.
  2. **Shelf on the verticals:** a "shelf" that hangs off each vertical; the
     ring sits on the shelves and the arcs stay as they are.

## Options

Researched 2026-10-21: `docs/pricing-self-climbing-2026-10.md`. Ranges assume
a 12" (F34-class) ring; a 20.5" ring moves everything to the high end. Many
prices are search snippets or estimates (rigging dealers sell by quote).

| Whole rig, 8 legs                                   | Electric (8 × D8+ 500 kg) | Manual (hand chain hoists) |
| --------------------------------------------------- | ------------------------- | -------------------------- |
| **1b: stock sleeve blocks, V1 arcs kept** (leaning) | $82–171K                  | $54–115K                   |
| 1a: custom pass-through arcs, 60 ft kept            | $100–231K                 | $71–174K                   |
| 2: shelf on sleeve blocks, ring unchanged           | $85–184K                  | $57–128K                   |

- **A stock 4-way ground-support sleeve block already is a pass-through**:
  the leg runs through it and the arcs bolt to two faces. So option 1 needs
  no special arc (1b): all 16 V1 arcs stay, 8 sleeve blocks go in at the
  legs, and the ring grows about 1.0–1.3 m across (less if V1 already has a
  junction block at each leg; Unknown). Keeping exactly 60 ft needs custom
  arcs (1a, quote-only).
- **Option 2's limit is the cantilever**: Prolyte rates a sleeve 400 kg at
  0.5 m, 200 kg at 1 m. Enough for a 12" ring, marginal for 20.5".
- **Hoists**: 8 × 500 kg D8+ (double brake), cheapest Chainmaster D8+ Ultra
  at $3,199. **All are 3-phase**, while V2's feed is split-phase: a 3-phase
  supply just for setup and strike. None is rated past 40 °C at full duty:
  lift in the cool hours, lock off, shade or remove the hoists.
- **Manual is viable** for one lift up and one down per event: 8 people in
  step, slow, saves about $29–56K.
- **Safety must-haves**: double-brake hoists (or rated secondaries), a
  mechanical lock-off at every sleeve at height, a cleared floor while it
  moves, an 8-channel controller with a kill switch, load monitoring that
  cuts the motors, guys or ballast to an anchor plan, a logging anemometer
  and wind plan, and an engineer's package (Burning Man asks for one over
  20 ft; the legs would be about 20–26 ft).
- The spread comes from: reusing the V1 legs or not, load monitoring
  ($2–25K), and the engineering fee ($3–15K).

## Open questions

1. What truss is it (make, profile, e.g. 12" or 20.5" box, connector type),
   and how do the legs meet the ring today (a junction block at each leg?)?
2. How tall are the legs, and how high does the ring sit?
3. How much does the ring weigh with everything on it? Does the hub hang
   from the spokes?
4. How is V1 raised today (forklift, telehandler, hand chain hoists)?
5. Motorised (electric hoists and a controller) or manual (hand chain hoists)?
6. Own or rent the lifting gear? Is 3-phase power available at setup?
7. Which events, and who inspects?
8. Permission to request quotes (custom arcs, load monitoring, engineering)?
9. Where does this sit among the stretch goals?

## Dependencies

- Power: electric hoists need their own supply (three-phase for most
  entertainment hoists; check single-phase models).
- Power and networking: cables up the legs must allow for the ring moving.

## Progress

- [x] Plan created; the user's two options recorded (2026-10-21)
- [x] Research both options (`docs/pricing-self-climbing-2026-10.md`, 2026-10-21)
- [ ] Add the category and its stretch goal to the site
