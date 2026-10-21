# Cross-cutting requirements

Constraints every category's design has to meet. Add to this file when a decision
binds more than one category.

## Decided

- **Power never shares a box with data.** AC power and its supplies live in
  power boxes; node and brain boxes hold controllers, switches and compute. DC
  crosses between them on dedicated cables. (User, 2026-10-21.)
- **Boxes live inside the truss**, node/brain boxes next to their power boxes.
  (User, 2026-10-21.)
- **Permanent per-segment installation.** Each of the 16 truss segments carries its
  own power and data runs, and segments daisy-chain to their neighbours, so setup
  is "join the segments", not "run cables". (User, 2026-10-21.)
- **Watertight.** Everything exposed must survive rain and dust. (Target IP rating
  not yet chosen; see `plans/weatherproofing.md`.)
- **The network is a ring**: a switch in every node box, daisy-chained, ring closed
  so RSTP routes around a dead segment. (`plans/networking.md`.)

## Site conditions (design for these)

- Desert sun on sealed boxes, with electronics powered all day even though the
  lights are off. Expect enclosure interiors well above ambient. Confirm with a
  logged temperature in one real box before trusting any part's rating.
- Fine alkaline dust: no open vents, no fans pulling outside air unfiltered.
- Night use until after 5 am; cold nights.
- Wind and handling: connectors and glands take strain, people kick cables.
- No guaranteed internet. Anything that needs configuring must be configurable on
  site (the UCG runs the UniFi controller locally).

## Serviceability

- Any one node box must be swappable on site without tools beyond a screwdriver,
  and without powering down its neighbours. (Proposed, not yet confirmed.)
- Label everything with its segment number (1–16); the same number names the
  segment, its node box, its PixLite, its switch and its power box. (Proposed.)
- Spares: at least one complete node box. (Proposed.)

## Open

1. Budget for V2 overall, and per category.
2. Deadline: which event must V2 be ready for?
3. Which of the "Proposed" items above to adopt.
