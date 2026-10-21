# Power

## Goal

Replace V1's non-weatherproof 110 VAC cables and plugs with **watertight,
daisy-chained segments permanently installed in each of the 16 truss segments**.
Joining the truss segments joins the power; nothing is run by hand on site.

## Known today

See `docs/v1-hardware.md` → Power distribution and Node boxes.

- 110 VAC reaches the truss over ordinary cables and plugs (not weatherproof).
- Each node box has a 12 V supply. The networking plan adds a ~54 V supply per box
  for the switch and PoE (`plans/networking.md`).

## Requirements

- Watertight connectors at every segment joint and box entry.
- Permanently installed in the truss: a segment arrives with its power run in place.
- Daisy-chain from segment to segment around the ring.
- Power lives in **power boxes**, never in the node/brain boxes
  (`docs/requirements.md`). DC crosses to the node box on its own cable.
- Sized for the full load, with margin: pixels at full white plus the per-box
  supplies plus PoE expansion (`plans/expansion.md`).
- Protection: overcurrent per branch, and ground-fault protection appropriate to a
  wet outdoor public installation.

## Decisions already made (don't re-ask)

- Power and data never share a box (user, 2026-10-21).

## Options to evaluate

- Locking IP-rated AC connector families suited to daisy-chaining (for example
  Neutrik powerCON TRUE1 TOP; others to survey). Check IP rating mated and
  unmated, current rating, and availability of panel-mount and cable-mount parts.
- One feed point with a full daisy chain, vs. several feeds around the ring (limits
  current through any one connector and keeps a fault to part of the ring).
- Cable: outdoor- and UV-rated flexible cord, gauge set by the per-run current.

## Open questions

1. What is the pixel strip voltage and chipset, and its watts per pixel at full
   white? Everything else is sized from this.
2. Where are the pixel power supplies today, and how many per segment?
3. What does the existing 12 V supply in each node box feed?
4. Power source: generator or grid? How many circuits, and how many amps each?
5. 120 V only, or is 240 V available?
6. Does V2 keep the existing pixel supplies, or replace them?

## Dependencies

- Weatherproofing: the power box design and its glands.
- Networking: the per-box 54 V supply (switch + PoE).
- Expansion: the PoE budget per node.

## Progress

- [ ] Fill the Unknowns in `docs/v1-hardware.md` → Power distribution
- [ ] Load calculation: per segment and for the whole ring
- [ ] Choose a connector family
- [ ] Feed topology and protection
