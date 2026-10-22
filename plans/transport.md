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
- **The container lives in Oakland** between events; "we probably have a
  storage solution" (user, 2026-10-22). So buy it there ($3,690 at Western
  Container Sales' Oakland depot) and budget storage at about $0.
- **"We might already have a container"** (user, 2026-10-22). The budget's
  container line is now $0–4,800: $0 if the existing one serves. It only
  serves if it's a 40 ft (a 20 ft is too small, see the sizing check); a
  high cube also leaves room for the sail rack.
- **The Gate goes to other events too** (user, 2026-10-22).
- **At Burning Man it is with a camp, on the Esplanade** (user, 2026-10-22),
  which is where containers are allowed.
- **A rack to hang the sails**, so the LEDs can stay in them (user,
  2026-10-22: today the LEDs come out of the sails at every event, after they
  were damaged once when left in; the user thinks that was a bad call, and
  leaving them in makes setup easier).

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

## Sizing check against the 26 ft truck

The user asked how the research got "a 20 ft is too small" (2026-10-22):
the agent estimated 21–24 m² of floor from assumed footprints (16 arcs on
two carts, legs, hub, cases). The user's figure agrees: **V1 fills a 26 ft
box truck**. Typical inside sizes (Assumed, not measured):

| Box             | Inside, about            | Floor   |
| --------------- | ------------------------ | ------- |
| 20 ft container | 19'4" × 7'8"             | 13.8 m² |
| 26 ft box truck | 26' × 8'                 | 19.3 m² |
| 40 ft high cube | 39'5" × 7'8", 8'10" high | 28.1 m² |

So a 20 ft container is about a third shorter than the truck, not slightly;
a 40 ft has about 40 % more floor, which the carts need, and the high cube's
extra height takes the sail rack above them.

## Open questions

0. The container the crew may already have: 20 ft or 40 ft, high cube or
   standard, its condition (doors, floor, rust), and where it is.
1. The sails: how many, their size, and how the LEDs attach (sizes the rack).
2. One-time costs only on the site (as now), or the yearly hauling too?
3. How far the V2 boxes stick out of the truss; leg section lengths and
   whether the legs are owned.
4. Which other events, and how far from Oakland (sets the yearly hauling).
5. Do the hoists or the solar kit ride in the box?
6. Permission to request quotes later (hauling, custom carts).

## Dependencies

- Rigging and solar: if they happen, they ride in the same container.

## Progress

- [x] Plan created (2026-10-21)
- [x] Research the container and carts (2026-10-21)
- [x] On the site as a category and a big project ($49,000), 2026-10-22
