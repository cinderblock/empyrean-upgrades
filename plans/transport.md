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

Researched 2026-10-21: `docs/pricing-container-carts-2026-10.md`. On the site
as a big project, goal $49,000 (parts $15.9–42.2K before contingency).

- **A 20 ft box is too small.** With 12" truss the Gate needs about 21–24 m²
  of floor; a 20 ft has 13.9 m², a 40 ft 28.3 m². **A one-trip 40 ft high
  cube with doors at both ends**: $3,690 at Western Container Sales' Oakland
  depot, $6,564 delivered to Reno (Reno dealers sell Oakland stock). Nearly
  full with the Gate alone; hoists and solar both riding along need a second
  20 ft box ($2.6–5.3K). 20.5" truss overflows one 40 ft box.
- **No truss dolly on the market has playa wheels** (all 4" casters). One
  custom cart on 12–16" pneumatic or flat-free wheels, built 4 times (2 arc,
  2 leg), plus a hub cart, three 16" Uline wagons, utility carts, road cases.
- Fit-out: ramp, E-track, load bars, shelving, dust-filtered vents, solar
  lights, lockbox, reflective roof coating: $2.4–9.3K.
- **Yearly, not in the goal:** $1.9–3.9K stored near the playa (Temen,
  $2.75/sq ft/yr), $3.2–8K in a Reno yard, $7.4–15.4K in the Bay Area.
  Mostly estimates; playa hauling is quote-only. Burning Man puts containers
  in camps, not at art sites; delivery goes through its Outside Services
  program or the project hauls it.
- Add-ons if bought: hoist transport $3.1–8.4K, solar kit transport
  $1.8–3.7K.

## Open questions

1. How is V1 stored and moved today?
2. Where would the container live between events (near the playa, Reno, the
   Bay Area, someone's land)?
3. One-time costs only on the site (as now), or the yearly cost too?
4. Truss profile; how far the V2 boxes stick out of the truss; leg section
   lengths and whether the legs are owned; how the hub breaks down; whether
   the spokes coil.
5. Which events; at Burning Man, open-playa art or with a camp?
6. Do the hoists or the solar kit ride in the box?
7. Permission to request quotes later (hauling, custom carts).

## Dependencies

- Rigging and solar: if they happen, they ride in the same container.

## Progress

- [x] Plan created (2026-10-21)
- [x] Research the container and carts (2026-10-21)
- [x] On the site as a category and a big project ($49,000), 2026-10-22
