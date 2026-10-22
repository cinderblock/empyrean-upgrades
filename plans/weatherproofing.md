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

## Findings from the pricing research

Source: `docs/pricing-2026-10.md` (research, 2026-10-21).

- **Node box:** Hammond PCJ14126H (14 × 12 × 6 in, $91–$98), fits the Ultra and
  PixLite on DIN rows with room for 8 pixel outputs. **Hammond PCJ is IP66, not
  IP67**; NEMA 4X, UV f1. If the target becomes IP67, Fibox ARCA (IP66/IP67) is
  the option (brain-box size $356).
- **Power box:** Hammond PCJ12106H (12 × 10 × 6 in), fits the SDR-240's depth.
- **Brain box:** Hammond PCJ181610H ($139–$145) fits an SFF PC plus gateway.
- **Glands:** Lapp SKINTOP ST-M M20, IP68; 11 per node box (4 pixel, 1 DC,
  6 Ethernet with RJ45s crimped inside).
- **Vents:** the Gore PMF100318 is undersized (M12 × 1, boxes up to 5 L). Amphenol
  LTW VENT-PS1YBK-O8002 (M12 × 1.5, about $3) is the budgeted part.
- **Sun shields:** no maker sells one for these boxes. nVent Hoffman's wall-mount
  shield ($357) measured about 56 % less temperature rise, so shading works;
  DIY white aluminium on standoffs is budgeted at $40–$120 a box (33 boxes).
- **Loggers:** Onset HOBO MX2303 (probes −40 to 100 °C, $255) or Elitech RC-5+ TE
  ($21, only to 70 °C).
- **Parts rated at or below what a box in the sun may reach:** USW-Ultra 60 °C,
  consumer PCs 35–40 °C, UCG 40 °C, APC UPS 40 °C, powerCON 40 °C (IEC 60320-1),
  breakers calibrated at 40 °C. Log a real box first.

## Open questions

1. Truss profile and the space available inside it for a box.
2. Bulkhead connectors at the box wall (faster to service) or cable glands (cheaper,
   fewer failure points)?
3. Shading: does the truss itself shade the boxes, or do they need a sun shield?
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

4. Expansion ports: brought out to the box wall now, or added when needed?
5. Box material: polycarbonate (light, radio-transparent) or metal (sheds heat,
   tougher)?

## Progress

- [ ] Measure the truss and the available volume
- [ ] Log the temperature inside a V1 box in the sun
- [x] Price an enclosure family (Hammond PCJ) and a connector strategy
- [ ] Decide the IP target (IP66 boxes as budgeted, or IP67)
