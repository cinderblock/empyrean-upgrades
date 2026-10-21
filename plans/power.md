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
- Daisy-chain from segment to segment around the ring, from **one feed**.
- Power lives in **power boxes**, never in the node/brain boxes
  (`docs/requirements.md`). DC crosses to the node box on its own cable.
- Sized for the full load, with margin: pixels at full white plus the per-box
  supplies plus PoE expansion (`plans/expansion.md`).
- Protection: overcurrent per branch, and ground-fault protection appropriate to a
  wet outdoor public installation.

## Decisions already made (don't re-ask)

- Power and data never share a box (user, 2026-10-21).
- **One feed for the whole ring** (user, 2026-10-21): a single **waterproof
  twist-lock** plug, **30–50 A**, powers the whole ring in one loop.
  **Three-phase preferred; split-phase (120/240 V, two hots) is enough.** An
  "RV" connector is acceptable only if it is twist-lock and waterproof. This
  supersedes "3–6 separately fed chains" from the first pricing research.

## Options to evaluate

- Locking IP-rated AC connector families suited to daisy-chaining (for example
  Neutrik powerCON TRUE1 TOP; others to survey). Check IP rating mated and
  unmated, current rating, and availability of panel-mount and cable-mount parts.
- ~~One feed point vs. several feeds~~: decided, one feed (above).
- Feed connector family, 30–50 A, watertight twist-lock: NEMA L14-30 (split,
  30 A), 50 A California-style / marine shore power (split), NEMA L21-30
  (3φ, 30 A), IEC 60309 pin-and-sleeve (3φ 60 A, IP67, but screw-ring, not
  twist). Being researched: `docs/pricing-power-feed-2026-10.md`.
- Cable: outdoor- and UV-rated flexible cord, gauge set by the per-run current.

## The single feed: what it implies

My working, from the load estimate below (Assumed strip specs; to be checked
by the feed research, `docs/pricing-power-feed-2026-10.md`):

- **Architecture.** One inlet; a multi-conductor trunk (L1, L2, [L3,] N, G)
  runs segment to segment through each power box (trunk in, trunk out) and a
  watertight locking joint at each of the 16 joints. Each power box taps one
  leg, legs alternated to balance (8 + 8 on split-phase; 6 + 5 + 5 on 3φ),
  through its own breaker. So the joints carry the **full feed current on 4
  or 5 poles**: powerCON TRUE1 (20 A, single-phase) no longer fits the trunk.
- **Capacity vs full white** (64 spokes: 3.6–8.1 kW AC):
  - Split-phase 30 A: 7.2 kVA, 5.8 kVA continuous (80 %). Low estimate only.
  - Split-phase 50 A: 12 kVA, 9.6 kVA continuous. Covers the high estimate
    (about 34 A a leg balanced).
  - 3φ 208Y/120 30 A: 10.8 kVA, 8.6 kVA continuous. Just covers it.
  - 128 spokes roughly doubles the pixel load (up to about 15 kW): 3φ 60 A
    class, or a second feed.
  - Real patterns average far below full white; sizing for full white is the
    safe floor, and the software could cap master brightness to fit.
- **"One loop": open or closed?** If both ends of the trunk are tied back at
  the feed (a closed electrical ring), each side carries about half, but US
  practice doesn't allow paralleled conductors that small, and if one joint
  opens the other side silently carries everything. Recommendation: a loop
  physically, open electrically (a radial chain), trunk sized for the feed
  breaker. To confirm.
- **GFCI.** One 5 mA GFCI at the feed for the whole ring risks nuisance trips
  from the summed leakage of 30+ switch-mode supplies, and any fault darkens
  the whole Gate. Per-segment ground-fault protection in each power box is
  more selective. The research checks the supplies' leakage specs.
- **Trunk cable** is heavy: 6/4 SOOW for 50 A is roughly 25 mm across. It has
  to fit the joint connectors' cord grips and bend inside the truss.

## Findings from the pricing research

Source: `docs/pricing-2026-10.md` (research, 2026-10-21).

- **Load (Assumed: 12 V WS2815, 60 LED/m).** Full white is 0.13–0.30 W per
  pixel by maker pages, so 3.2–7.3 kW DC for the ring: **30–67 A at 120 V**.
  One 20 A single-phase chain can't carry it. The research suggested 3–6
  separately fed 20 A chains; **superseded** by the single 30–50 A multi-phase
  feed decided above.
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

0. (New, 2026-10-21) What will the feed plug into: the camp's generator
   (which outlets: L14-30, 14-50, CS6365?) or a distro? The inlet should match
   it, or the Gate carries an adapter cord. And "one loop": open electrically
   (recommended) or closed?

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
