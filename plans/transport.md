# Transport: a dedicated container and carts

## Goal

A shipping container that belongs to the Gate, and carts that make it easy to
roll everything in and out of it (user, 2026-10-21). Load-in and strike get
faster, and the Gate's parts stop living in borrowed space.

## Known today

See `docs/v1-hardware.md` → Structure and geometry.

- 16 curved truss segments (about 11.8 ft along the arc), 8 vertical legs,
  an inner hub about 11–13 ft across, 64 LED spokes (about 21 ft each).
- In V2 each segment carries its node box, power box and wiring, so segments
  travel with their boxes on.
- Maybe also: 8 hoists and a controller (`plans/rigging.md`), a solar system
  (`plans/solar.md`).
- **Unknown:** how V1 is stored and shipped today, the truss profile, and
  where the container would live between events.

## Requirements

- Everything for the Gate fits in one container, with room to grow.
- Carts roll on playa dust and uneven ground, and lock down for the drive.
- Segments ride with their boxes installed, without damage.

## Decisions already made (don't re-ask)

- A dedicated shipping container and transport carts are an upgrade category
  (user, 2026-10-21).

## Options

Research under way: `docs/pricing-container-carts-2026-10.md` (20 ft vs 40 ft,
new vs used, modifications, carts and casters, delivery and storage costs).

## Open questions

1. How is V1 stored and moved today?
2. Where would the container live between events?
3. One-time costs only on the site, or also the yearly transport and storage?
4. Where does this sit among the stretch goals?

## Dependencies

- Rigging and solar: if they happen, they ride in the same container.

## Progress

- [x] Plan created (2026-10-21)
- [ ] Research the container and carts
- [ ] Add the category and its stretch goal to the site
