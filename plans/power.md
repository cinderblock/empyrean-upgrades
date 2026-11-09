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
- **Feed: three-phase L21-30** (🧑 H69, 2026-10-24: "I'm leaning 3-phase.
  L21."). A lean, not final, but the site now leads with it. 🤖 The design:
  L21-30 joints (Hubbell HBL2811 / AC Works ASL2130R) on **8/5 UL SOOW**, a
  **25 A** three-pole main (Eaton FAZ-C25/3-NA; 8/5 carries 28.7 A at 50 °C
  with the neutral not counted, 30 A only at 45 °C or below), and a cam-lok →
  L21-30 adapter box for three-phase towables ($580 field-built to $3,900 for
  the listed Motion Labs box) in place of the CS6365 adapter. About **7.2 kVA
  continuous in the heat** (8.6 below 45 °C), against the L14-30's 5.76.
  Supplies wired leg to leg (H64) rotate across the three leg pairs.
  Portables can't feed it. The power category comes to about $600–4,700
  more than the L14-30 design (`docs/pricing-feed-options-2-2026-10.md` §2).
- **Room to split the power in half** (🧑 H70: "we never want to light half
  of it. Or you mean for power dist? I guess we should include the option to
  split the power in half"). 🤖 The feed box gets a second output; the two
  halves run opposite ways from the feed joint and are capped where they
  meet. One feed powers both; a second feeder, inlet and breaker later
  (about $800–1,400) double it. In the budget as `power-half-split`
  ($60–170).
- ~~⚠ **Open conflict: three-phase.**~~ Settled by H69 (above); kept for the
  history. After approving L14-30 (H20), 🧑 H50 said
  "30A 3 phase should be enough. but let's price out 50A and 100A just in
  case", and 🧑 H60 confirmed true three-phase (L21-30) was meant. 🤖 The AI's
  pricing (`docs/pricing-feed-options-2-2026-10.md`) still recommends L14-30
  (LED drivers load the neutral, so about 23 A usable on 8/5; no rental
  generator has the outlet). With 240 V supplies (H64) the neutral argument
  falls away, so the site now marks L21-30 "considered", not "ruled out";
  what remains against it is that only three-phase towables can feed it.
  **Not decided by a person.** The site shows this as ≠.
- **Supplies run at 240 VAC, line to line.** 🧑 H64: "I want to run the power
  supplies from 240VAC... they get more efficient I think." 🤖 Checked:
  Mean Well's HLG-600H draws 7 A at 115 VAC and 3.3 A at 230 VAC, about 6 %
  less input for the same output, and takes 90–305 VAC, so 240 V
  (split-phase) and 208 V (three-phase) both work. Consequences, not yet
  worked through: each segment needs a **two-pole** ground-fault breaker (the
  Ericson 1075-AR is single-pole 120 V); the local outlets stay 120 V; and
  supplies across two legs barely load the neutral, which removes the main
  objection to L21-30 below.
- ⚠ **"3 phase triples the total power of 2 phase"** (🧑 H65). 🤖 At the same
  30 A a leg it is **1.5×**: L14-30 is 240 × 30 = 7.2 kVA (5.76 continuous),
  L21-30 is √3 × 208 × 30 = 10.8 kVA (8.64 continuous). Three-phase is 3×
  single-phase 120 V, not 3× split-phase.
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

- ⚠ **James wants the California Standard connector** (🧑 H77, 2026-11-08:
  "while there are 3-phase camlocks, he's pushing for the california
  generator standard, which is i think 2 phase"). 🤖 California Standard is
  the 50 A **CS6364/CS6365** pair (receptacle CS6369): 125/250 V, 3-pole
  4-wire, so **split-phase** (two hots 180° apart, a neutral, a ground), the
  same service as an L14-30 at 50 A. Not two-phase and not three-phase; the
  three-phase California Standard parts are CS8364/CS8365. It is the outlet
  on most towable rentals, and the plan already prices it (the 50 A row
  below: 9.6 kVA continuous). **Open, for the user:** L21-30 (H69) or
  James's CS6365. With a battery in every box (below) the feed only has to
  carry the chargers, and either works.

## Battery in each power box (🧑 H78, considered)

🧑 H78 (2026-11-08): "what if we put 100Ah 12V LiFePo4 cells ($300ea on
amazon) in each node box to directly run strings. then have a 'charger' input
from AC. also probably include a small MPPT, ideally with the right capacity
to charge the pack to full on a sunny day... Is a 20A charger enough? 60A?
120A?" 🤖 Everything below is the AI's arithmetic from figures already in
this repo; nothing is measured.

**Where it goes.** 🤖 In the **power box**, not the node box: a battery is
power, and H14 keeps power apart from data. The strips' 12 V comes from the
battery instead of a Mean Well supply.

**The load per box (64 spokes).** The Gate averages 1.5–2.0 kW while lit
(🧑 H18), of which 0.3–0.6 kW is electronics (Assumed,
`docs/pricing-solar-2026-10.md` §1a), which stay on AC. That leaves about
0.9–1.7 kW AC for the pixels, 0.85–1.6 kW DC: **about 55–100 W a box**
(16 boxes, four spokes each). The night is 10–11 h, so **0.55–1.1 kWh a box
a night**.

**The battery.** A 12.8 V 100 Ah LiFePO4 holds 1.28 kWh, about 1.15 kWh
used to 90 %. **One carries a full night at 64 spokes**, with little to
spare in the high case. 128 spokes needs two a box (or the charger running
at night); 256 needs four. Full white at 64 spokes is 200–450 W a box
(17–38 A), inside a 100 A BMS; at 256 spokes it is up to 150 A, past one
battery's BMS. Typical spec (LiTime 12 V 100 Ah, maker and retailer pages):
charge **0–50 °C**, discharge −20 to 60 °C, 100 A BMS, recommended charge
20 A (0.2 C), **about 10–11 kg**.

**The charger: 20 A is the right size; 60 A and 120 A are too big.**

- _Recharge by day, battery only at night:_ refilling 1.2 kWh takes about
  4–5 h at 20 A (about 280 W), 8–9 h at 10 A.
- _Charger always on, battery as a buffer:_ the night's average is only
  4–8 A at 13 V, so a 20 A charger carries the show from AC and the battery
  takes the peaks. The battery is nearly full at dawn.
- _What the feed sees:_ 16 × 20 A × 14.4 V ÷ 0.9 ≈ **5 kW at most**,
  whatever the show does: inside the L14-30's 5.76 kVA, the L21-30's 7.2
  and the CS6365's 9.6. 60 A chargers would draw about 15 kW (twice any
  30 A feed) and charge at 0.6 C, past the cells' recommended rate; 120 A
  would be 31 kW and past the 100 A BMS.
- ~~Candidate: Victron Blue Smart IP67 12/25~~ (sealed, $178–196). Out
  after 🧑 H82 asked for the charge rate in software: it is set only over
  Bluetooth, in Victron's app.
- 🤖 Candidate now: **Mean Well NPB-750-12** (14.4 V, up to 43 A, 90–264
  VAC, so 208 or 240 V line to line). It has a **CANBus interface for
  control and monitoring**, and its curve is programmable (retailer and
  Mean Well Australia pages; protocol not yet read). One part covers 1× to
  4× the pixels, with software setting the current. To check: its IP
  rating and temperature derating (it is a fan-cooled bench charger, not a
  sealed one), and that CAN sets the current, not only reads it. To check: setting its charge voltage to
  14.0–14.2 V, since the strips sit on the battery while it charges and
  WS2815's maximum voltage isn't checked.

**The solar controller: one ~400 W panel and a 30 A MPPT per box.** A box
needs about 1.2 kWh a day into the battery. At a 20° tilt the playa gives
about 5.7 kWh per kW of panel on a mean day and 4.1 on the worst day in the
TMY (`docs/pricing-solar-2026-10.md` §2b); flat is about 10 % less. So
0.3 kW refills it on the worst day; **a 400–460 W panel** gives margin for
dust. At 12 V that is up to 35 A: a **Victron SmartSolar MPPT 100/30**
(440 W at 12 V) fits; a 100/20 (290 W) only with a 300 W panel. Prices not
checked.

**Where the panels go: on top of the ring** (🧑 H81, 2026-11-08: "they
would go on top of the ring and be a shade for the boxes too"; replaces
H49 for panels). 🤖 Each segment's top is an arc of about 3.57 m on a
0.3 m truss. **Two ~430 W panels (about 1.72 × 1.13 m) laid along it fit**
(3.44 m), overhanging about 0.4 m each side: the overhang is the boxes'
shade. That is **about 0.86 kW a box, 13.8 kW for the ring**, more than
the central system's 12 kW. With the electronics on DC too (below), a box
needs 1.0–2.0 kWh a day: two panels refill that on the worst day, and
cover 2× the pixels on a mean day. Two in series suit a **SmartSolar
150/60** (860 W at 12 V). Against: about 21 kg a panel, **about 700 kg of
panels plus racking at 21 ft**, and 32 panels catching the wind on a
light-duty truss (`plans/rigging.md`). Needs Tomcat's load table and a
wind check before anything is bought.

**Everything lights on DC; AC for the speakers** (🧑 H82: "we'll use the AC
power for speakers we hang, and ideally just DC for everything lights").
🤖 Read as the strips _and_ the boxes' electronics: the PixLite and the
show computer take 12 V DC directly (the Nuvo-9160GC takes 8–48 V); the
switch's 54 V PoE needs a 12 → 54 V DC-DC converter (not chosen). That
adds the 300–600 W of electronics, all day: 19–38 W a box, 0.45–0.9 kWh a
day. A night (10–11 h) is then **0.75–1.5 kWh a box**: one battery in the
low case, **two in the high case**. But with speakers on AC the generator
runs at night anyway, so the chargers carry the show and the battery is a
buffer and a ride-through, not the night's whole supply.

**Monitoring and control: a small Ethernet board in each node box**
(🧑 H82: "Do we need a mini something to get that data on the network in
each node box?"). 🤖 Yes. Nothing in the box today can read a serial port.
Proposed:

- **An ESP32 board with Ethernet and PoE** (for example Olimex
  ESP32-POE-ISO, an industrial −40 to 85 °C version exists; not checked),
  powered from one of the node switch's spare PoE ports. About $30–50.
- **MPPT:** wired **VE.Direct** (Victron's serial port, isolated) to the
  ESP32. It reads volts, amps, yield and state, and can set the MPPT's
  maximum current (register 0xEDF0, 0.1 A units, per Victron's HEX docs
  and forum; it writes to flash, so set it rarely, not as a control loop).
  ESPHome has a VE.Direct component (krahabb/esphome-victron-vedirect).
- **Charger:** the ESP32's built-in CAN controller plus a transceiver talks
  to the NPB charger: **set the charge current in software**, read its
  state.
- **Battery:** a cheap cell's BMS speaks only Bluetooth. A **Victron
  SmartShunt** (VE.Direct, about $130, price not checked) gives a wired
  state of charge.
- Data goes out on the ring's network (MQTT or ESPHome's API) to the show
  machine, which logs it and sets each box's charge rate. That is
  software work in the Empyrean repo, not a cost here.
- Not a Raspberry Pi: rated 0–50 °C, and the box gets hotter. Victron's
  own GX (Venus OS) would do all of this but costs about $300+ a box and
  doesn't drive a Mean Well charger.

**What it buys.** A generator outage or a tripped feed no longer darkens the
Gate (a night on battery); the feed and generator can be smaller, and the
feed-connector choice matters less; the 12 V pixel supplies go away; a
panel per box could carry the lights with no generator on sunny days.

**Against it.** About 170 kg of batteries in the truss at 21 ft (rigging
load); cells stop charging above 50 °C, and a power box in the sun gets
there, on the very afternoons solar would charge (shade them; heat also
ages them); a DC fuse (Class T or MRBF) and disconnect at every battery;
shipping and storing 17 lithium batteries; and a cheap cell's BMS is the
only protection.

**Rough cost** (🤖, before H81–H82): battery $300, charger $180–200, fuse,
disconnect and cable $50–100: about $530–600 a box, **$9,000–10,200 for 17**
(16 + a spare), before contingency and less the pixel supplies it replaces.
A panel and MPPT add about $350–530 a box, **$6,000–9,000**. Not in the
budget until chosen. 🤖 Since H81–H82 (none checked): the NPB charger
instead of the Victron, two panels and a 150/60 a box, the ESP32 board and
shunt, a second battery in the high case, a DC-DC for the switch, and
racking on top. Not repriced yet.

### Pursued: load, wind and price (🧑 H84, 2026-11-08)

🧑 H84: "yes" to pursuing it. Research notes:
`docs/load-wind-panels-2026-11.md` and `docs/pricing-battery-per-box-2026-11.md`
(not engineering; every figure tagged there).

**Gravity is fine; wind is the problem.**

- **Load table (Confirmed, Tomcat catalogue via a dealer):** 12" light-duty
  plated truss carries 2,120 lb UDL on a 20 ft span, 1,290 lb on 30 ft.
  🤖 Interpolated to the 23.6 ft between legs, about 1,750–1,800 lb,
  treated as straight. The added load (4 panels, racking, 4–8 batteries) is
  about 330–440 lb a span, **20–25 %** of that. But Tomcat publishes
  nothing for the circle (it bows 2.3 ft off the chord, so gravity twists
  it too), nothing for uplift or sideways load, and nothing on its safety
  factor: only Tomcat or an engineer can rate the ring. The spokes', hub's
  and boxes' weights are still unknown.
- **Wind (Reasoning, ASCE-style, force coefficient 1.2–1.5 on 62 m² of
  panel):** Burning Man's weather page warns of wind "exceeding 75 mph in an
  instant" (Confirmed); a 52 mph gust was logged at the BRC airport in 2025
  (Reported). Uplift on 32 near-flat panels is **20–25 kN at 52 mph, 41–51 kN
  at 75 mph, 59–74 kN at 90 mph**: about the rig's whole weight at 52 mph
  (roughly 18–20 kN plus the unknowns) and about **twice it at 75 mph**.
  Unheld, the ring would lift; about 2.8 kN (620 lbf) net up per leg at
  75 mph. Each panel's uplift is about 6× its weight. Burning Man's ground
  anchors are rated 3,000 lb in tension, "NOT rated for shear".
- **Stowing doesn't work:** 32 panels of 21 kg can't come down from 21 ft in
  the minutes before a playa storm, so the design has to survive with them up.
- 🤖 **What it would take:** an engineer's package (Burning Man asks for one
  over 20 ft: drawings, anchors, uplift, rigging and wind loads); Tomcat's
  rating for uplift and torsion; engineered clamps at every panel; hold-downs
  at each leg; a logging anemometer and a wind plan.
- ⚠ **Conflict with 🧑 H81** (panels on top, shading the boxes). 🤖 The AI's
  recommendation: **panels on the ground**, ballasted at a low tilt near the
  legs (the ballast also anchors), DC run up the legs; keep the planned sun
  shields ($50–150 a segment) for the boxes' shade. Or, if on top: fewer
  panels (one a segment halves the uplift) and the engineering first. For
  the user.

**Heat, the second problem.** In a 50 °C box three parts sit at or past
their limits: the SmartShunt (rated to 50 °C), the MPPT (full output only
to 40 °C; derates to 60 °C) and the batteries' charging (0–50 °C). The NPB
charger is fan-cooled with no IP rating, and gives full output only to
about 50 °C. 🤖 So the power box needs filtered airflow and shade, or the
MPPT and charger mount outside the sealed part, shaded. Not yet designed.

**Parts, checked against datasheets where linked in the notes:**

- **Charger: Mean Well NPB-750-12**, $175–250 (DigiKey $197.60; $174.70 at
  25). Its CAN commands **set** output voltage and current and the charge
  curve (`VOUT_SET`, `IOUT_SET`, `CURVE_*`), so software sets the rate.
  10.5–21 V settable, 90–264 VAC in. Limit it to about 20 A for one 100 Ah
  battery (Mean Well suggests 150–500 Ah). No sealed, fanless, wired-
  controllable 12 V charger was found from Mean Well or Victron.
- **Batteries:** LiTime **Smart ComFlex** 12 V 100 Ah, $307, with **RS485
  and CAN** for its BMS (a wired state of charge, which could replace the
  SmartShunt); plain ones $208–290 have only Bluetooth.
- **MPPT: SmartSolar 150/60**, $351–370 (860 W at 12 V, VE.Direct).
- **Panels:** 410 W class, $0.29–0.47/W, about $120–195 each, pallets of
  31–35, freight extra.
- **Racking:** $200–400 a segment (Estimate; not designed for the wind
  above).
- **Monitoring:** Olimex **ESP32-POE-ISO-IND** (−40 to 85 °C; the plain one
  stops at 70), about $30–40; a CAN transceiver $4–5; VE.Direct cable
  $5–30. SmartShunt 500 A $100–131 (not needed with ComFlex batteries).
- **54 V for the switch:** no good 12 → 54 V converter found (the Murata
  SPC-54 takes only 11–13.2 V in, below the 14.4 V charging bus). 🤖 Since
  the USW-Ultra needs 50–57 V, either keep its 54 V supply on AC (the
  network then isn't on the battery), or a PoE switch that takes 12 V
  directly (PLANET ISW-504PT and similar; not priced). Open.
- **DC protection and cable:** Class T fuse and holder, disconnect, 2/0
  cable, $170–330 a box.
- **Shipping:** each battery is 1,280 Wh, fully regulated UN3480 Class 9:
  ground only, the maker's UN 38.3 summary, labels, a trained shipper. The
  usual path is freight to a warehouse, then the team's own truck (34
  batteries, about 375 kg).

**Repriced (17 boxes, 34 batteries, 34 panels; before contingency, freight,
tax and enclosures): about $30,700–44,900.** Chargers $3.0–4.2K, batteries
$7.8–10.4K, MPPTs $6.0–6.3K, panels $4.1–6.6K, racking $3.4–6.8K,
monitoring $0.6–0.9K, shunts $1.7–2.2K, 54 V converters $1.2–1.8K, DC
protection $2.9–5.6K. Less the 12 V pixel supplies it replaces. Ground-
mounted panels would swap the racking for ballasted ground frames and
longer DC runs (not priced).

### With 2× or 4× the pixels (🧑 H80)

🧑 H80 (2026-11-08): "what if we double or 4x the number of pixels". 🤖 The
same arithmetic, scaled; per box unless marked. It holds whether the pixels
come from more spokes (128, 256) or denser strip, as long as each pixel
averages what today's do.

- **Night's energy:** 0.55–1.1 kWh (1×), 1.1–2.2 (2×), 2.2–4.4 (4×).
- **Batteries to carry the night alone:** 1, 2, 4 (1.15 kWh usable each).
- **Full-white current at 12 V:** 17–38 A, 34–76 A, 68–150 A. At 4× that
  is 2/0 battery cable and a 200 A Class T fuse per box; parallel batteries
  share it (each BMS is 100 A).
- **Charger, two ways:**
  - _Battery carries the night, recharge in ~6 h by day:_ 20 A, 30–40 A,
    60–80 A. The ring at 4× would draw up to 16 × 80 A ≈ 20 kW: past any
    one feed in the plan.
  - _Charger on all night, battery as buffer:_ it only has to match the
    average, 4–8 A, 8–15 A, 17–30 A. So 20 A, 25 A, 30–40 A (two 12/25s at
    4×). Fewer batteries needed for energy, though 4× still needs two for
    current.
  - 🤖 **Recommendation: cap each box's charger at about 28 A**
    (16 × 28 A × 14.4 V ÷ 0.9 ≈ 7.2 kW, the L21-30's continuous rating in
    the heat) and let the batteries ride out the rest. At 4× that is only
    just above the high-case average, so 4× wants four batteries or the
    second feed already in the 256-spoke goal.
- **Solar to refill on the worst day** (4.1 kWh/kW, plus dust margin):
  ~0.4 kW, ~0.8 kW, ~1.6 kW of panel; MPPT 100/30, 100/50 (700 W at 12 V),
  150/100 class. At 4× that is 64 panels, about 26 kW for the ring: more
  than the 12 kW central system, and a central array beats 16 small ones
  well before this.
- **Weight on the ring:** about 170 kg, 340 kg, 680 kg of batteries at
  21 ft. 4× needs the truss's load table and the hoists rechecked.
- **Rough cost, batteries + chargers + fusing, 16 boxes + a spare:**
  $9–10K, about $15K, about $28K (two 12/25 chargers a box at 4×; cable
  and fuses grow with the current). Solar on top: $6–9K, $12–18K, $25–35K.

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

## The feed research: L14-30 (the first pick; the lean is now L21-30, H69)

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

| Option                                 | Power subtotal | Continuous                                                         | Plugs straight into                                  |
| -------------------------------------- | -------------- | ------------------------------------------------------------------ | ---------------------------------------------------- |
| **30 A split-phase, L14-30 (current)** | $10,298–16,101 | 5.76 kVA                                                           | Portables' L14-30R                                   |
| 30 A three-phase, L21-30 on 8/5        | $10,906–20,804 | 8.65; 5.1–6.4 if supplies were 120 V (H64 makes them line to line) | No rental generator                                  |
| 50 A split-phase, CS6364/65 on 6/4     | $12,769–22,186 | 9.6 kVA                                                            | Towables' CS6369                                     |
| 100 A split-phase, cam-lok, single #2  | $15,046–30,382 | 19.2 kVA                                                           | 36–45 kVA towables (cam-loks or lugs)                |
| 100 A three-phase                      | $17,104–34,090 | 28.8 kVA                                                           | 45 kVA towables                                      |
| 2 × 50 A half-rings                    | $13,935–23,931 | 19.2 kVA                                                           | Any towable's two CS6369                             |
| 3 × 30 A thirds                        | $13,774–20,334 | 17.3 kVA                                                           | Generac MLG20IF4 (three L14-30R), or three portables |

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

- (2026-11-08) **Batteries in the power boxes: pursued** (🧑 H84). Still
  to do: measure one box's real draw for a night, check the strip's
  maximum voltage and the box temperature in the sun.
- (2026-11-08) **Panels on top or on the ground?** ⚠ 🧑 H81 wants them on
  top as shade; at 75 mph their uplift is about twice the rig's weight.
  🤖 Recommendation: on the ground, ballasted, with the sun shields for
  shade.
- (2026-11-08) **L21-30 or James's CS6365?** (🧑 H69, H77.) 🤖
  Recommendation: if the batteries go in, take James's CS6365; it is on the
  rentals, and the chargers cap the load well under it.

- (2026-10-24) **Follow-ons of the three-phase feed** (H69), not yet worked
  through: the two-pole (208 V) ground-fault breaker per segment; how the
  sixteen segments rotate across the three leg pairs (6/5/5) and which
  segment takes the outlets' 120 V; whether the crew's generators (James) can
  run three-phase 208Y/120; the solar inverter, priced split-phase, needs a
  three-phase output.

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
- [x] Battery-per-box option sized (2026-11-08, H78): 20 A charger, one
      100 Ah a box at 64 spokes, ~400 W panel + 30 A MPPT
- [x] User: pursue batteries? Yes (H84, 2026-11-08)
- [x] Load table, wind check, repricing (2026-11-08): gravity fine, wind
      uplift ~2× the rig at 75 mph, $30.7–44.9K
- [ ] User: panels on top (H81) or on the ground (AI recommendation)?
- [ ] User: L21-30 or CS6365 (H77)?
- [ ] Power-box thermal design for charger, MPPT and batteries
- [ ] 54 V for the switch on battery: a 12 V-input PoE switch?
