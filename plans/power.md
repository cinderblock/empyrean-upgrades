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
- **The feed connector is whatever rental generators commonly have** (user,
  2026-10-21): that is the most important criterion, ahead of phase count and
  rating. The watertight version of that connector is the one to pick.
- **Size for the real load, not full white**: V1 averages about 1,500–2,000 W
  for the whole Gate (user, 2026-10-21). Full white is a theoretical ceiling
  the software can cap.

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

## The feed research: L14-30 (leading)

Source: `docs/pricing-power-feed-2026-10.md` (research, 2026-10-21). This is
what the site's budget now uses.

- **What rental generators have** (maker spec sheets):
  - **Portables** (31 models, 5–18 kW): almost every 120/240 V model has exactly
    one **L14-30R**. Only one (Westinghouse iGen8200TFc) has none.
  - **Towables** (15 models: MultiQuip, Generac Mobile, Atlas Copco, Wacker): all
    have 2–3 **CS6369** (50 A twist-lock), and none has an L14-30R.
  - **Three-phase:** no rental unit has a three-phase twist-lock. Three-phase
    comes only on lugs or optional cam-loks.
- **So: L14-30 feed** (30 A, 125/250 V split-phase, 3-pole 4-wire), plus a
  **CS6365-to-L14-30 adapter with its own 30 A breaker** for towables (about
  $470–560, Estimate). No single twist-lock fits both.
- **Leading parts: Hubbell Watertight Safety-Shroud.** Plug HBL2711SW $171.43,
  connector HBL2713SW $184.29, inlet HBL2715SW $211.82. IP66, −40 to 75 °C,
  certified to break full current. Leviton Wetguard seals better (IP69K) and
  costs about $1,500 less, but it is rated only to 60 °C. Eaton's parts take
  10 AWG at most.
- **Trunk: 8/4 UL SOOW** ($6.09/ft, 24 mm, about 6 lb a segment). It carries
  32.8 A at 50 °C. 10/4 holds only 24.6 A at 50 °C, so it would need a 25 A
  breaker. Event wiring must be UL listed (NEC 525.20); unlisted cord is
  thinner but doesn't qualify. The trunk needs M32–M40 glands, not M20.
- **Feed box** at the feed joint: the inlet, a 2-pole 30 A breaker, and an outlet
  for segment 1.
- **Ground faults: a 1-pole Class A GFCI in each power box.**
  - One 5 mA GFCI for the ring would see 2–5 mA of leakage with the legs
    balanced, and 8–18 mA if they aren't: nuisance trips.
  - Options: Allen-Bradley 1492-MCGAT115 DIN GFCI breaker ($276, replaces the
    plain breaker), or an inline Leviton GSIA2 ($43, auto-reset).
  - A generator whose L14-30R is itself GFCI-protected might trip the same way.
    Not checked.
- **Capacity:** 30 A split-phase is 5.76 kVA continuous, about 3× the
  1.5–2 kW average. Full white doesn't fit (4.5–9.0 kW at 64 spokes), so **the
  software needs a brightness cap**: about 60–74 % at 64 spokes, 30–67 % at 128,
  on the mid and high strip estimates. Measuring a spoke sets the real cap.
- **Closed loop: no.** NEC 310.10(G) allows paralleled conductors only at 1/0 AWG
  and up. A loop fed from both ends would also leave a live male plug exposed
  wherever it's broken. Feed at one joint, run one way, and cap the last
  connector. Voltage drop on 8/4 is 1.9 % at 24 A balanced, and under 1 % at
  the real load.
- **Three-phase (not recommended):** Hubbell L21-30 with 8/5 SOOW is about
  $13.9–18.2K, plus a cam-lok distro, and it plugs into no rental directly.
- **Cost:** about $9.3–13.7K all in for the feed, trunk, joints and protection.
  The joints dominate (16 × about $355).

## The single feed: what it implies

My working, from the load estimate below (Assumed strip specs; to be checked
by the feed research, `docs/pricing-power-feed-2026-10.md`):

- **Architecture.** One inlet; a multi-conductor trunk (L1, L2, [L3,] N, G)
  runs segment to segment through each power box (trunk in, trunk out) and a
  watertight locking joint at each of the 16 joints. Each power box taps one
  leg, legs alternated to balance (8 + 8 on split-phase; 6 + 5 + 5 on 3φ),
  through its own breaker. So the joints carry the **full feed current on 4
  or 5 poles**: powerCON TRUE1 (20 A, single-phase) no longer fits the trunk.
- **Capacity vs the real load.** V1 averages 1,500–2,000 W (Reported): about
  13–17 A at 120 V, or 6–8 A a leg on split-phase. Any 30 A feed carries that
  with a wide margin (split-phase 30 A: 7.2 kVA, 5.8 kVA continuous), even
  with 128 spokes at double the average. So the feed rating can follow the
  generators, and the trunk and joints can be sized for 30 A (e.g. 10/4 SOOW)
  rather than 50 A.
- **Capacity vs full white** (64 spokes: 3.6–8.1 kW AC; a ceiling, not the
  load):
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

0. (2026-10-21) Confirm the leading design: an L14-30 feed (plus the towable
   adapter), 8/4 trunk, open loop capped at the far end, a GFCI per segment.
   Recommendation: yes.
1. (2026-10-21) The joints don't have to match the generator; only the feed
   does. A cheaper watertight 4-pole 30 A connector at the 16 joints (or
   Wetguard, with shade) would cut the largest power cost (about $5.7K). Worth
   a look? Recommendation: price one alternative before buying.
2. (2026-10-21) The software needs a brightness cap so full white stays
   inside 30 A. Agreed? (A change in the Empyrean app.)
   2a. (2026-10-21) **Remote, human-triggered reset of a segment's tripped
   ground-fault breaker, with no home runs** (user asked). Proposed, not yet
   researched:
   - The control rides the ring network that already reaches every
     segment. A small network relay in each node box drives a reset
     actuator in the power box beside it, over a short control cable. An
     operator presses "reset segment 7" in the Empyrean app.
   - The catch: if the GFCI also feeds the 54 V supply, a trip kills that
     segment's switch and relay, so nothing is left to send the reset. Fix:
     put the 54 V supply (switch and relay) on its own small breaker on the
     line side of the GFCI, which then protects only the pixel supplies, the
     part that meets rain. The ring keeps every node; RSTP handles the rest
     anyway. Needs a code check: an outdoor supply not behind a GFCI.
   - The actuator: a motor operator or remote-reset accessory on the GFCI
     breaker, or an industrial ground-fault relay with a remote-reset input
     driving a contactor. Most remote-operable DIN parts are IEC (30 mA
     RCDs), not UL 943 Class A (5 mA). Finding a UL 943 part with remote
     reset is the research.
   - Resetting into a fault that's still there just trips again within a
     few tens of milliseconds, so a person-pressed remote reset is about as
     safe as walking over.

3. What is the pixel strip voltage and chipset, and its watts per pixel at full
   white? Everything else is sized from this.
4. Where are the pixel power supplies today, and how many per segment?
5. What does the existing 12 V supply in each node box feed?
6. Power source: generator or grid? How many circuits, and how many amps each?
7. 120 V only, or is 240 V available?
8. Does V2 keep the existing pixel supplies, or replace them?

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
