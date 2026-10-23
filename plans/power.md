# Power

> **Who wrote this.** Most of this plan is an AI draft. 🧑 with a ledger id
> (H12) marks what a person said or approved (`docs/human-input.md`); 🤖 marks
> the AI's own call; anything unmarked is the AI's too. The site marks the
> same content block by block, and takes reviews and feedback on it.

## Goal

Replace V1's non-weatherproof 110 VAC cables and plugs with **watertight,
daisy-chained segments permanently installed in each of the 16 truss segments**.
Joining the truss segments joins the power; nothing is run by hand on site.

## Known today

See `docs/v1-hardware.md` → Power distribution and Node boxes.

- 110 VAC reaches the truss over ordinary cables and plugs (not weatherproof).
- Each node box has a 12 V supply. The networking plan adds a ~54 V supply per box
  for the switch and PoE (`plans/networking.md`).

- **V1 distribution** (`EG AC Power.pdf`, 2026-10-21): a 6-circuit 50 ft
  bundle up the truss leg by the stage; circuits 1–5 each feed three segments
  through 3-way extension cords, circuit 6 the network switch and segment P.
  The drawing lists "Circuit Loads" of 15 A for 1–5 and 5 A for 6: 80 A at
  120 V, 9.6 kVA. **They are estimated max draw** (🧑 H31), not
  measured: "the strips never really draw what everyone expects". That
  estimate is more than the L14-30 feed's 5.76 kVA continuous, and 128
  spokes would double it.

## Requirements

- **Rain-proof** locking connectors at every segment joint (🧑 H24:
  "rain proof is enough for us. we're not going underwater"); joints stay off
  the ground. Box entries sealed.
- Permanently installed in the truss: a segment arrives with its power run in place.
- Daisy-chain from segment to segment around the ring, from **one feed**.
- Power lives in **power boxes**, never in the node/brain boxes
  (`docs/requirements.md`). DC crosses to the node box on its own cable.
- Sized for the full load, with margin: pixels at full white plus the per-box
  supplies plus PoE expansion (`plans/expansion.md`).
- Protection: overcurrent per branch, and ground-fault protection appropriate to a
  wet outdoor public installation.
- **Local outlets** (🧑 H23): each segment's power box also has "a
  handful" of 120 V outlets for things mounted in that segment, behind the
  segment's ground-fault protection. **Four per box, 20 A** (🧑 H25
  approved four; 🧑 H33: "20A outlets at our in-truss spider boxes"), so each segment's
  ground-fault breaker is 20 A too (1492-MCGAT120, or a 20 A breaker +
  GSIA2), with 12 AWG from it to the outlets. The user calls the power boxes
  "spider boxes".
  In the budget (`power-outlets`): a die-cast 2-gang weatherproof box bolted
  to the power box, two 20 A weather-resistant duplexes, an extra-duty in-use
  cover; $45–97 a box, $773–1,656 for 17 (`docs/pricing-joint-cords-2026-10.md`
  §6). Watertight receptacles would be $323–480 a box plus a watertight plug
  on every load cord.

## Decisions already made (don't re-ask)

Each line says who decided it: 🧑 with a ledger id is what a person said
(`docs/human-input.md`); 🤖 is the AI's own call, not yet reviewed.

- **One feed for the whole ring.** 🧑 H17: "a single twist lock plug that
  powers the whole ring in a single loop. I'd love 3-phase, but 2-phase would
  be enough… a 30-50A waterproof twist-lock", or an RV connector only if
  twist-lock and waterproof. 🤖 This supersedes "3–6 separately fed chains"
  from the first pricing research.
- **The feed connector is whatever rental generators commonly have.** 🧑 H18:
  "the most important thing is what's commonly available in rental
  generators". 🤖 Ranking that ahead of phase count and rating is the AI's
  reading.
- **Size for the real load, not full white.** 🧑 H18: V1 averages about
  1,500–2,000 W. 🧑 H31: the V1 drawing's circuit loads are "estimated max
  draw". 🤖 "Full white is a theoretical ceiling" is the AI's framing.
- **The design.** 🧑 H20 approved the AI's proposal: an **L14-30 feed** plus the
  CS6365-to-L14-30 adapter for towables, an **8/4 UL SOOW trunk**, an **open
  loop** fed at one joint and capped at the far end, and **a Class A GFCI in
  each segment's power box**. 🤖 The open loop (rather than H17's "single
  loop") and every part number are the AI's.
- ⚠ **Open conflict: three-phase.** After approving L14-30 (H20), 🧑 H50 said
  "30A 3 phase should be enough. but let's price out 50A and 100A just in
  case", and 🧑 H60 confirmed true three-phase (L21-30) was meant. 🤖 The AI's
  pricing (`docs/pricing-feed-options-2-2026-10.md`) still recommends L14-30
  (LED drivers load the neutral, so about 23 A usable on 8/5; no rental
  generator has the outlet), and the site marks L21-30 "ruled out". **Not
  decided by a person.** The site shows this as ≠.
- **Joints: rain-proof is enough.** 🧑 H24: "rain proof is enough for us.
  we're not going underwater".
- **Joints from cut extension cords.** 🧑 H22: "let's find off the shelf
  'extension' cables we can cut in half and use". ⚠ 🤖 After the ring grew to
  60 ft (H29) the AI switched the leading choice to **loose AC Works
  ASL1430P plugs and ASL1430R connectors** (cULus E237606; $21.38 + $26.99)
  **on bulk 8/4 SOOW cut to length** (240 ft), under Twist and Seal Cord Vault
  covers: about **$140 a joint**, $2.5K for 16 + 2 spares. The 10 ft cords'
  5 ft halves are too short for an 11.8 ft segment; the fallback is AC Works
  25 ft 8/4 cords cut in half ($268 each, about $5K). Unknown: whether the
  loose ends' cord grip takes 24 mm 8/4. Trial-fit one joint first. Not yet
  checked with the user.
- **The Gate is 60 ft across.** 🧑 H29 (James Logistic). 🤖 So about
  **188.5 ft** around, each segment about **11.8 ft**.
- **No remote reset.** 🧑 H48: "no remote reset. we can point the breakers
  down and use a stick to reset." 🤖 The breaker is an Ericson 1075-AR (20 A,
  UL 943 Class A, NEMA 4/4X face, powers itself up after an outage) mounted
  through the power box's floor; an insulated pole resets it. The remote-reset
  research (`docs/pricing-remote-reset-2026-10.md`) stays as background.
- **Local outlets.** 🧑 H23: "a handful of local power plugs in each truss
  segment"; 🧑 H25 approved four per box; 🧑 H33: "20A outlets at our in-truss
  spider boxes". 🤖 The box, receptacles and 12 AWG are the AI's.
- **No brightness cap in the software.** 🧑 H21. 🤖 What that leaves open is
  under "Capacity" below: whether full white fits in 30 A is settled by
  measuring a spoke.
- **Power and data never share a box.** 🧑 H14.
- 🤖 Hubbell SW is the watertight alternative (its inlet stays at the feed
  box). The feeder is an uncut AC Works SDL1430PR-050 (50 ft).

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
- **Trunk: 8/4 UL SOOW** ($6.09/ft, 24 mm, about 7 lb per 11.8 ft segment). It carries
  32.8 A at 50 °C. 10/4 holds only 24.6 A at 50 °C, so it would need a 25 A
  breaker. Event wiring must be UL listed (NEC 525.20); unlisted cord is
  thinner but doesn't qualify. The trunk needs M32–M40 glands, not M20.
- **Feed box** at the feed joint: the inlet, a 2-pole 30 A breaker, and an outlet
  for segment 1.
- **Ground faults: a 1-pole Class A GFCI in each power box.**
  - One 5 mA GFCI for the ring would see 2–5 mA of leakage with the legs
    balanced, and 8–18 mA if they aren't: nuisance trips.
  - Options: Allen-Bradley 1492-MCGAT120 (20 A) DIN GFCI breaker (about $276, replaces the
    plain breaker), or an inline Leviton GSIA2 ($43, auto-reset).
  - A generator whose L14-30R is itself GFCI-protected might trip the same way.
    Not checked.
- **Capacity:** 30 A split-phase is 5.76 kVA continuous, about 3× the
  1.5–2 kW average. On the Assumed strip specs, full white doesn't fit
  (4.5–9.0 kW at 64 spokes); it would fit at about 60–74 % brightness (64
  spokes) or 30–67 % (128). There is no software cap (🧑 H21), so if
  a pattern did hold full white long enough, the feed breaker or the
  generator's would trip and the whole ring would go dark. **Measure one
  spoke at full white before buying**: if it fits, nothing changes; if not,
  the choices are a 50 A feed (towables only) or living with the risk.
- **Closed loop: no.** NEC 310.10(G) allows paralleled conductors only at 1/0 AWG
  and up. A loop fed from both ends would also leave a live male plug exposed
  wherever it's broken. Feed at one joint, run one way, and cap the last
  connector. Voltage drop on 8/4 was 1.9 % at 24 A balanced on the old 157 ft
  ring; on the 188.5 ft ring it scales to about 2.2 % (Assumed: proportional
  to length, 40 ft feeder), and stays around 1 % at the real load.
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

## Feed options, all six (researched 2026-10-22)

`docs/pricing-feed-options-2-2026-10.md` extends the 30 A vs 50 A comparison
after the user's "30A 3 phase should be enough. but let's price out 50A and
100A just in case." Same basis (60 ft ring, rain-proof joints, 50 ft feeder,
20 A GFCI and four outlets per segment); shared lines from today's budget, so
30 A and 50 A are about $350 higher than in the first comparison. Subtotals
before the 15 % contingency:

| Option                                 | Power subtotal | Continuous                    | Plugs straight into                                  |
| -------------------------------------- | -------------- | ----------------------------- | ---------------------------------------------------- |
| **30 A split-phase, L14-30 (current)** | $10,298–16,101 | 5.76 kVA                      | Portables' L14-30R                                   |
| 30 A three-phase, L21-30 on 8/5        | $10,906–20,804 | 8.65 on paper, really 5.1–6.4 | No rental generator                                  |
| 50 A split-phase, CS6364/65 on 6/4     | $12,769–22,186 | 9.6 kVA                       | Towables' CS6369                                     |
| 100 A split-phase, cam-lok, single #2  | $15,046–30,382 | 19.2 kVA                      | 36–45 kVA towables (cam-loks or lugs)                |
| 100 A three-phase                      | $17,104–34,090 | 28.8 kVA                      | 45 kVA towables                                      |
| 2 × 50 A half-rings                    | $13,935–23,931 | 19.2 kVA                      | Any towable's two CS6369                             |
| 3 × 30 A thirds                        | $13,774–20,334 | 17.3 kVA                      | Generac MLG20IF4 (three L14-30R), or three portables |

- **30 A three-phase isn't really 30 A:** LED drivers make the neutral a
  current-carrying conductor, so 8/5 cord carries only 23 A at 50 °C (a 20 A
  breaker, 25 A at a 40 °C design ambient); no L21-30 takes 6/5. Split 6/5/5
  across phases it gives no more usable capacity than today, for $600–4,700
  more, and no rental generator has an L21-30R (a cam-lok-to-L21-30R box:
  ~$580 home-made and unlisted, ~$3,900 listed, or rented).
- **100 A is impractical in a lifted truss:** SOOW tops out at 52 A at
  50 °C, so single #2 conductors; 7.8–14 kg a segment instead of 3.6 (70–160
  kg more on the ring); 64–80 single-pole connections at every setup; 8–10
  entries per power box; no rain boots for those connectors. Pin-and-sleeve
  instead is $14.5–37K in joints alone.
- **Recommendation: keep 30 A split-phase.** For headroom, wire the ring as
  two halves running opposite ways from joint 0: about $60–170 now, about
  $1.1K later for 11.5 kVA (a second L14-30 feed). Or two 50 A halves for
  19.2 kVA. Not 100 A.
- **Rain cover warning:** the Twist and Seal Cord Vault's published closed
  depth (1.75 in) is smaller than the 58 mm plug bodies, so it may not fit the
  L14-30 joints either. Trial-fit one; find another cover if not.

## Open questions

- (2026-10-21) **Feed ampacity: 30 A or 50 A?** The V1 "Circuit Loads" are
  estimated max draw (🧑 H31). The user is open to more ampacity for maximum
  expansion, or to showing both options with prices. Researched
  (`docs/pricing-feed-options-2026-10.md`, 2026-10-21; subtotals before the
  15 % contingency):

  |                           | 30 A (L14-30, 8/4) | 50 A (CS6364/65/69, 6/4)    |
  | ------------------------- | ------------------ | --------------------------- |
  | Power subtotal            | $9,950–15,801      | $12,420–21,886              |
  | Continuous capacity       | 5.76 kVA           | 9.6 kVA (8.64 at 45 A)      |
  | vs V1 estimated max 9.6   | 60 %               | 100 %, no margin            |
  | vs 128 spokes (~19.2 kVA) | 30 %               | 50 %                        |
  | vs real load 1.5–2 kW     | 2.9–3.8×           | 4.8–6.4×                    |
  | Voltage drop full / 2 kW  | 2.2 % / 0.8 %      | 2.4 % / 0.5 %               |
  | Plugs straight into       | Portables          | Towables, 50 A spider boxes |
  - 6/4 SOOW carries only 45.1 A at 50 °C: a 50 A breaker is compliant only
    at 40 °C or below, otherwise 45 A.
  - The 50 A option's portable adapter needs no breaker ($40–124); the 30 A
    option's towable adapter must have one ($467–557).
  - A mated 50 A pair (about 205 × 65 mm) won't fit the Cord Vault: boots
    instead, AC Works ($180 a joint with ends, unrated) or Leviton ($359,
    IP55 mated).
  - 4.4 kg of cord a segment against 3.2 kg.
  - For 128 spokes at the estimated max: two 50 A feeds, one per half-ring,
    from a towable's 2–3 CS6369 outlets (19.2 kVA). Three-phase doesn't beat
    it.
  - Unknowns: whether the estimated max is near real full white (measure a
    spoke); the AC Works 50 A cord grip on 27.3 mm 6/4; whether the boots
    seal; whether towable outlets are GFCI-protected.

  The site keeps 30 A in the V2 goal and shows 50 A as an option with its
  price. **Decision needed:** stay at 30 A, move the V2 goal to 50 A, or tie
  50 A to the 128-spoke stretch goal?

- (2026-10-21) **For James** (generators): what generator(s) does the Gate
  actually run on, and do their L14-30 outlets have built-in GFCI (which
  could trip on the ring's summed leakage)?

0. ~~Confirm the leading design~~: confirmed (🧑 H20), now under
   Decisions.
1. (2026-10-21) **Joints: off-the-shelf extension cords, cut in half** (🧑 H22,
   finding $355 a joint too expensive). One listed L14-30
   generator cord per joint: its plug half ends one segment, its connector
   half starts the next, cord already attached. Researched 2026-10-21
   (`docs/pricing-joint-cords-2026-10.md`):
   - **Most generator cords don't qualify.** The common 10/4 molded STW/SJ
     cords (AC Works STW, Reliance, Parkworld, Amazon brands) are 60 °C cord:
     17.4 A at 50 °C, which would force a 15 A feed. SJ is "hard usage";
     NEC 525.20 wants extra-hard usage. A molded end is listed only as part
     of the whole cord set, so a cut half is no longer a listed assembly.
   - **The one that fits: AC Works SDL1430PR-010**, 10 ft of 8/4 SOOW with
     field-attachable (separately listed) ends, $129.99. Cut in half, it is
     the same kind of assembly as the Hubbell route. With a Twist and Seal
     Cord Vault over each mated joint ($12.95): about **$143 a joint, $2,573
     for 16 + 2 spares**, against about $7,358 for Hubbell SW plus its trunk
     cord. It also replaces all 157 ft of 8/4 trunk cord.
   - **The catch: rain-resistant, not watertight.** The Cord Vault is about
     Type 3R / IP44; the joints would have to stay off the ground. That
     breaks the requirement "watertight connectors at every segment joint".
   - **To check before buying 18:** the jacket print says 90 °C (unmarked
     means 60 °C, i.e. a 20 A feed); a mated pair fits the Cord Vault; 10 ft
     reaches across a 9.8 ft segment (the 25 ft cord, $267.99, loses the
     saving). Trial-fit one.
   - **If watertight stays required:** field-built Leviton Wetguard on 8/4,
     about $5.7K for the ring; factory watertight cords don't help.
   - Ampacity: keep 8/4 and the 30 A feed. Any 10/4 means a 25 A feed (still
     4.8 kVA continuous, 2.4× the average).
     **Decided** (🧑 H24): rain-proof is enough. ⚠ 🤖 The AI then replaced
     the cut cords with loose AC Works ends on bulk 8/4, once the ring turned
     out to be 60 ft (see Decisions). The 9.8 ft and 157 ft above are the old
     geometry. The earlier framing, kept for reference:
     **The 16 truss joints** (each an HBL2711SW plug + HBL2713SW
     connector, about $355, $5.7K for the ring) don't have to match the
     generator; only the feed does. The user asked which connectors would
     replace them. What the joint needs: 4 poles, 30 A at 50 °C, watertight
     mated and capped, locking, takes 24 mm 8/4 cord, and **UL listed** (event
     wiring, NEC 525). Already looked at: Leviton Wetguard L14-30 (about $264 a
     joint, saves about $1,500, rated only to 60 °C); IEC 60309 pin-and-sleeve
     (dearer, $644+ a joint, no twist-lock); Harting Han E (16 A a contact: too
     small); Amphenol Socapex 19-pin (25 A, no US price). Not yet looked at:
     4-pole circular industrial connectors (Bulgin Buccaneer, Wieland RST,
     Amphenol, Phoenix Contact), most of which are UL _recognised_ components
     rather than _listed_ devices, which an event inspector may not accept.
     Recommendation: price Wetguard with shade as the default saving, and
     research one circular family to see if it's listed.
2. ~~Brightness cap in the software~~: no (🧑 H21), now under
   Decisions.
   2a. ~~(2026-10-21)~~ **Dropped (🧑 H48): no remote reset; reset with a pole.** Kept for reference: **Remote, human-triggered reset of a segment's tripped
   ground-fault breaker, with no home runs** (🧑 H19 asked). The user said yes
   to researching it (2026-10-21). **Findings**
   (`docs/pricing-remote-reset-2026-10.md`):
   - **No UL 943 Class A GFCI, DIN or inline, has a remote reset input,
     motor operator or reset accessory** (searched Allen-Bradley, Littelfuse,
     Eaton, Square D, Leviton, Hubbell, Woodhead, Siemens, Ericson). Bender
     LifeGuard has a reset terminal but lists as UL 508A, not UL 943, and has
     no public price. UL 943C applies only above 150 V to ground; UL 1053
     relays and IEC RCDs with motor reclose are equipment protection. None
     of these satisfies NEC 525.23 at 120 V.
   - **Recommended: reset by a remote power cycle, with listed parts.** A
     normally-closed 2-pole relay (Finder 62.32, 24 V DC coil, 70 °C) ahead
     of an Ericson 1075-AR (hard-wired Class A GFCI that re-powers itself
     after an outage, −35 to 66 °C, $58.56). A network relay in the node box
     (ICP DAS tPET-PD2R1, PoE, 75 °C, about $116 from Europe; US option
     ControlByWeb X-401-E $330–366) opens it for about 2 s when an operator
     asks. A small 120 V sense relay tells the app which segment tripped.
   - **The network supply gets its own Class A GFCI** ($59–126), not the
     unprotected line side proposed below: that is marginal under
     525.23(A)(2) and unsafe on a metal-case supply. A pixel fault then can't
     take down the relay that sends the reset.
   - **Cost:** $344–731 a segment, **$5.8–12.4K for 17**, about $5.1–7.5K
     more than the GFCI line already budgeted. Fallback (below): $6.8–13.6K.
   - **Hinges on a bench test:** does the 1075-AR (or GSIA2) re-arm when its
     power is cycled after a ground-fault trip? UL 943 forbids self-reset
     after a fault but requires it after a power loss; which one a cycled
     trip counts as isn't stated. If not, the fallback is a second GFCI per
     segment that the relay switches the load onto: one remote recovery per
     segment between visits.
   - Other unknowns: whether inspectors accept a remote human reset; box
     interiors vs the parts' 55–75 °C ratings; the tPET may be discontinued,
     no US price; Bender needs a quote (needs the user's go-ahead). The 2023
     wording of 525.23 wasn't read (2017/2020 text used).
     **Decision needed:** put it in the budget (in the V2 goal, or as a
     stretch goal), after the bench test? Not in the budget yet.
     The original proposal, kept for reference:
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
