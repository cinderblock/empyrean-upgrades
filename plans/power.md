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

## Findings from the pricing research

Source: `docs/pricing-2026-10.md` (research, 2026-10-21).

- **Load (Assumed: 12 V WS2815, 60 LED/m).** Full white is 0.13–0.30 W per
  pixel by maker pages, so 3.2–7.3 kW DC for the ring: **30–67 A at 120 V**.
  One daisy chain can't carry it. Plan on **3–6 separately fed chains**, each on
  its own GFCI (3 segments per 20 A circuit at the high figure, 6 at the low).
  Doubling to 128 spokes doubles the pixel load. Measure one V1 spoke at full
  white to pin this down.
- **Connectors.** The powerCON TRUE1 TOP _cable_ parts (NAC3MX-W-TOP) are being
  phased out; the successor -S takes 14 AWG only, so use **NAC3M/NAC3F-TRUE1-L**
  (12 AWG, 10–16 mm cord). The TOP _panel_ parts (NAC3MPX-TOP, NAC3FPX-TOP) are
  current. IP65/67 only when mated or capped: every open end needs a cap.
  Rated −5 to 40 °C under IEC 60320-1 (80 °C material): shade them.
- **Cord.** 12/3 SOOW (15.4 mm) fits the -L; **10/3 SOOW (16.9 mm) fits no TRUE1
  connector.** Confirm 12/3 on the -L with Neutrik (its certified-cable list
  stops at 14/3).
- **Alternative:** Bulgin Buccaneer 900 (IP68/IP69K, 32 A), about $3,500 against
  about $820 for Neutrik, 26-week lead, no load-break rating stated.
- **54 V supply:** Mean Well SDR-240-48 ($95), adjustable 48–55 V, full load to
  60 °C. The NDR-240-48 derates from 50 °C: not for a hot box.
- **Breakers** (Eaton FAZ, UL 489) are calibrated at 40 °C and trip about 4–6 %
  lower at 50–55 °C.
- **GFCI:** Leviton GSIA2 inline, **auto-reset** (the show must come back alone
  after a power cut), 20 A, −35 to 66 °C. Listed for SJTW; SOOW fit unverified,
  so feeders may need SJOOW.
- **Pixel supplies, if replaced:** Mean Well HLG-320H-12 or HLG-600H-12. The
  HLG-600H-12 is **480 W at 12 V, not 600 W.** Mount them outside the sealed box,
  shaded. $1,743–$5,135 for the ring, depending on the load.
- **GFCI distro**, if the event has none: $1,522–$3,226.

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
- [x] Load calculation from assumed strip specs (`docs/pricing-2026-10.md`)
- [ ] Measure one V1 spoke at full white to replace the assumption
- [x] Price connector families: powerCON TRUE1-L + TOP panel leads
- [ ] Confirm with Neutrik: 12/3 cord on the -L; -L mates with TOP panel parts
- [ ] Feed topology and protection
