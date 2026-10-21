# Weatherproofing

## Goal

New **node boxes** (one per truss segment: PixLite + switch) and a **brain box**
(show computer, gateway), all watertight, living **inside the truss next to the
power boxes**. Power and data never share a box.

## Known today

- V1 node boxes: one per PixLite, with a 12 V supply inside. Enclosure model and
  rating unknown.
- Boxes stay powered all day in the sun, inside a sealed outer box; the lights
  only run at night.

## Requirements

- Watertight and dust-tight. Target IP rating to be chosen (IP65 or better is the
  usual starting point for outdoor electronics).
- Fits inside the truss profile, beside its power box.
- Holds, per node box: the PixLite E4-S Mk3 (115 × 86 × 33 mm, DIN-mountable), a
  switch (USW-Ultra: 203 × 76 × 33 mm), and DC input from the power box. No AC.
- Brain box: show computer, UCG gateway, and whatever the touch screen needs.
- Cable entries: sealed glands or bulkhead connectors for pixel outputs, Ethernet
  in and out, the WAN port, expansion ports, and DC in.
- Thermal: interior must stay inside every part's rating with the sun on the box
  all day. The weakest parts so far: switch 60 °C, PixLite 70 °C.
- Serviceable on site: open, swap a part, close, still sealed.

## Decisions already made (don't re-ask)

- Power boxes are separate from node/brain boxes (user, 2026-10-21).
- Boxes live inside the truss (user, 2026-10-21).

## Open questions

1. Truss profile and the space available inside it for a box.
2. Bulkhead connectors at the box wall (faster to service) or cable glands (cheaper,
   fewer failure points)?
3. Shading: does the truss itself shade the boxes, or do they need a sun shield?
4. Expansion ports: brought out to the box wall now, or added when needed?
5. Box material: polycarbonate (light, radio-transparent) or metal (sheds heat,
   tougher)?

## Progress

- [ ] Measure the truss and the available volume
- [ ] Log the temperature inside a V1 box in the sun
- [ ] Choose an enclosure family and connector strategy
