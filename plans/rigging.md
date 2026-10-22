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

Research under way: `docs/pricing-self-climbing-2026-10.md` (lifting gear,
sleeve blocks, arcs with pass-throughs, top sections, a controller, safety,
and manual alternatives).

## Open questions

1. What truss is it (make, profile, e.g. 12" or 20.5" box), and how tall are
   the legs?
2. How much does the ring weigh with everything on it?
3. How is V1 raised today (forklift, telehandler, hand chain hoists)?
4. Motorised (electric hoists and a controller) or manual (hand chain hoists
   or a winch per leg)?
5. Where does this sit among the stretch goals?

## Dependencies

- Power: electric hoists need their own supply (three-phase for most
  entertainment hoists; check single-phase models).
- Power and networking: cables up the legs must allow for the ring moving.

## Progress

- [x] Plan created; the user's two options recorded (2026-10-21)
- [ ] Research both options (`docs/pricing-self-climbing-2026-10.md`)
- [ ] Add the category and its stretch goal to the site
