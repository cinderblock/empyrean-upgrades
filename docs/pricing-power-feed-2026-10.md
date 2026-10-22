# Power feed and trunk: pricing, October 2026

> **Correction (2026-10-21):** the Gate is **60 ft** across, not 50 ft (James
> Logistic). The ring is about **188.5 ft** around and each segment about
> **11.8 ft**, not 157 ft and 9.8 ft. Lengths below that use the old figures
> scale by 1.2. `plans/power.md` carries the corrected design.

This file prices a **single feed for the whole ring**. The owner decided on
2026-10-21: one waterproof twist-lock plug, 30–50 A, feeds one trunk around all 16
segments. Three-phase is preferred; split-phase 120/240 V is enough. Each segment's
power box taps one leg (legs alternated) through its own breaker.

The same day the owner added two facts that set the priorities:

- **V1 draws an average of only 1,500–2,000 W** for the whole Gate (Reported,
  2026-10-21). That is the real operating load. Full white is a theoretical
  ceiling that the software can cap.
- **The most important criterion for the feed connector is what is commonly
  available on rental generators.** So section 1 (generators) leads, and the
  connector choice follows from it.

**Method.** Prices and specs were checked on **2026-10-21** by read-only browsing.
Nothing was ordered, carted or quoted, and no account was created. Specs come from
manufacturer pages, datasheets and manuals, linked per line. Prices come from
distributors (Platt, Elliott, Standard Electric Supply, EMI Supply, MRO Supply)
or retailers where no distributor price was reachable. The web-search budget ran
out before every URL could be rechecked. Where a URL was truncated in the notes,
the table says so: search the MPN on the named site.

All prices are USD before tax and shipping. Ring geometry is in feet, everything
else metric and °C.

**Confidence key** (same as `docs/pricing-2026-10.md`)

| Mark         | Meaning                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------ |
| **Quoted**   | Price seen today on the distributor or maker page at the URL given                               |
| **Quoted\*** | Price seen only in a search snippet or aggregator because the page blocked the fetch. Recheck it |
| **Estimate** | A range from comparable parts, or no US price found                                              |
| **Assumed**  | Depends on an unknown fact; the assumption is named                                              |

For specs, generator receptacle data is marked **Confirmed** (maker spec sheet,
manual or store page) or **Reported** (retailer, rental house or search snippet).
Anything marked **(reasoning)** is my inference, not a cited fact.

---

## Summary

- **Most common feed connector: L14-30 (30 A 125/250 V twist-lock).** Nearly every
  5–18 kW portable has one L14-30R. **None of the 15 towable rental units checked
  has one.** Towables all carry **CS6369** (50 A 125/250 V twist-lock), 2–3 per
  machine. **No rental unit of either kind has a three-phase twist-lock
  (L21-30R)**; three-phase comes out of towables only on lugs or optional cam-loks.
- **Leading split-phase option:** a watertight **Hubbell Twist-Lock Watertight
  Safety-Shroud (SW) L14-30** at every joint and at the feed, **8/4 UL SOOW**
  trunk on a 30 A 2-pole breaker, and a 1-pole Class A GFCI in each power box. For
  towables, add a CS6365-to-L14-30 adapter with its own 30 A breaker. All in, with
  connectors, cable and protection: **about $9,300–13,600**.
- **Leading three-phase option** (not recommended): Hubbell SW L21-30, 8/5 UL SOOW
  on a 25 A 3-pole breaker, per-segment GFCI. **About $13,900–18,200**, plus a
  cam-lok to L21-30 distro (not priced). No rental generator plugs into it directly.
- **Capacity:** 30 A split-phase gives **5.76 kVA continuous**. That is about 3× the
  1.5–2 kW average, and 1.4–1.9× an assumed 3–4 kW average at 128 spokes. Full white
  does not fit (64 spokes: 4.5–9.0 kW; 128 spokes: 8.1–17.1 kW). **A software
  brightness cap is mandatory:** 60 % of full white at 64 spokes (high estimate),
  30 % at 128.
- **Closed ring: no.** NEC 310.10(G) allows parallel conductors only at 1/0 AWG and
  larger. Use an **open radial ring**, fed at one joint and running one way. The
  last segment's connector stays open and capped.

---

## 1. What rental generators offer (lead section)

### 1a. Towable rental units (20–70 kW)

| Model                     | Maker                    | kW prime (kVA)    | Modes                              | Receptacles                                                                   | 3-phase twist-lock? | Source                                                                                                                                                                                                    | Conf.                     |
| ------------------------- | ------------------------ | ----------------- | ---------------------------------- | ----------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| DCA25SSIU4F               | MultiQuip WhisperWatt    | 20 (25)           | 3φ 208–240Y / 416–480Y; 1φ 240/120 | **2× CS6369 50 A**, 2× 5-20R GFCI duplex, 5 lugs; cam-lok optional            | No                  | [ops manual rev 13](https://www.multiquip.com/multiquip/pdfs/DCA25SSIU4F_60_hz_rev_13_ops_manual.pdf)                                                                                                     | Confirmed                 |
| DCA45SSIU4F               | MultiQuip                | 36 (45)           | same                               | **3× CS6369**, 2× 5-20R GFCI duplex, lugs; cam-lok optional                   | No                  | [data sheet](https://www.multiquip.com/multiquip/pdfs/DCA45SSIU4F_Data_Sheet.pdf), [manual](https://www.multiquip.com/multiquip/pdfs/DCA45SSIU4F_rev_11_60_hz_ops_manual.pdf)                             | Confirmed                 |
| DCA70SSJU4F               | MultiQuip                | 56 (70)           | same                               | **3× CS6369**, 2× 5-20R GFCI duplex, lugs; cam-lok optional                   | No                  | [ops manual rev 7](https://www.multiquip.com/multiquip/pdfs/DCA70SSJU4F_rev_7_60_hz_ops_manual.pdf)                                                                                                       | Confirmed                 |
| MDG25IF4                  | Generac Mobile           | 20 (25)           | 1φ 120/240; 3φ 208/120; 3φ 480/277 | **3× CS6369**, 2× 5-20R GFCI duplex, lugs; cam-lok optional                   | No                  | [spec sheet](https://generac.com/globalassets/products/business/mobile-power--light-solutions/mobile-generators/spec-sheets/mdg25if4_diesel-generator_spec-sheet_english.pdf)                             | Confirmed                 |
| MDG75DF4                  | Generac Mobile           | 60 (75)           | same                               | **3× CS6369**, 2× 5-20R GFCI duplex, lugs; cam-lok optional (6 sets)          | No                  | [spec sheet](https://generac.com/globalassets/products/business/mobile-power--light-solutions/mobile-generators/spec-sheets/mdg75df4_diesel-generator_spec-sheet_english.pdf)                             | Confirmed                 |
| MMG45IF4                  | Generac Mobile           | 38 (47)           | same                               | 3× "Non-NEMA 6369" 50 A, 2× 5-20R GFCI duplex                                 | No                  | Ferguson listing (search snippet only)                                                                                                                                                                    | Reported                  |
| QAS 25 / QAS 45 ID        | Atlas Copco (US)         | 20 / 36           | 3φ 480Y, 3φ 240Y–208Y, 1φ 240/120  | **2× CS6369**, 2× 5-20R GFCI, terminal board; cam-lok optional (5× 400 A)     | No                  | [QAS 25-45 data sheet](https://www.atlascopco.com/content/dam/atlas-copco/local-countries/united-states/documents/ptna-usa/generators/datasheets-2026/2.)%20QAS%2025-45%20ID%20T4F%20Data%20Sheet%20.pdf) | Confirmed                 |
| QAS 70 ID                 | Atlas Copco              | 56                | same                               | **2× CS6369**, 2× 5-20R GFCI, cam-lok 5× 400 A (standard on some variants)    | No                  | [QAS 70 data sheet](https://www.atlascopco.com/content/dam/atlas-copco/local-countries/united-states/documents/ptna-usa/generators/datasheets-2026/2.)%20QAS%2070%20ID%20T4F%20Data%20Sheet.pdf)          | Confirmed                 |
| G25 / G35 / G50 / G70     | Wacker Neuson            | 20 / 28 / 38 / 58 | 1φ and 3φ by selector              | **2× (G25) or 3× CS6369**, 2× 5-20R GFCI duplex, lugs; cam-lok optional       | No                  | [Mobile Generators line sheet](https://cdn.mediapool.wackerneusongroup.com/asset/491085414967/document_6qel8f66rh01r3k5n64crpjg3o)                                                                        | Confirmed                 |
| PG25 / PG40 / PG50 / PG70 | Bobcat (formerly Doosan) | 20–56             | 208/240/480 3φ, 120/240 1φ         | "240V single phase twist-lock" + 120 V GFCI; type and count **not published** | No                  | [PG50 page](https://www.bobcat.com/na/en/equipment/portable-power/portable-generators/pg50)                                                                                                               | Confirmed (type unstated) |

These are the units rental houses actually send out. Cooper Equipment Rentals'
[36 kW](https://cooperequipment.ca/rental-equipment/36-kw-towable-generators) class
is a DCA45, its [56 kW](https://cooperequipment.ca/rental-equipment/56-kw-towable-generators)
class is a Wacker G70, and its [25 kW](https://cooperequipment.ca/rental-equipment/25-kw-towable-generators)
class lists Atlas Copco, Doosan, MultiQuip and Wacker. Sunbelt, United Rentals and
Herc pages blocked automated reading.

**What the CS6369 delivers depends on the selector position:**

- **MultiQuip:** the CS6369s work "only … when the voltage selector switch is placed
  in the single-phase 240/120V position" (all three manuals above).
- **Atlas Copco:** live in every position. They give 240/120 in 1φ, **208/120** in
  3φ 208, and **240/139** in the 3φ 240 and 480 positions (QAS 25-45 data sheet,
  voltage chart).
- **Our loads are all 120 V line-to-neutral, so 208/120 is fine (reasoning).**
  139 V is outside the rating of 120 V GFCI breakers. Require the 1φ 120/240 or 3φ
  208Y position.

### 1b. Large portables (5–18 kW)

| Model                     | Maker        | Running W               | Locking 120/240 V                                        | Other receptacles                                     | Source                                                                                                                                                                                                                                                                                                                          | Conf.     |
| ------------------------- | ------------ | ----------------------- | -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| EU7000iS                  | Honda        | 5,500                   | 1× L14-30R                                               | 2× 5-20R GFCI, 1× L5-30R. **22.9 A per leg at 240 V** | Honda Canada page and owner's manual (snippets; [Honda.ca](https://integration-powerequipment.honda.ca/generators/ultra-quiet-7000i-es))                                                                                                                                                                                        | Reported  |
| EB10000                   | Honda        | 9,000                   | 1× L14-30R, **1× 50 A 120/240 V locking** (type unnamed) | 2× 5-20R GFCI, 1× L5-30R                              | [Honda EB10 handout](https://cdn.powerequipment.honda.com/pe/pdf/misc/receptacle/Consumer_Handout_EB10_AC_Receptacle_Selection.pdf)                                                                                                                                                                                             | Confirmed |
| EM6500 / EB6500           | Honda        | 5,500                   | 1× L14-30R                                               | 2× 5-20R GFCI, 1× L5-30R                              | [Zoro EM6500](https://www.zoro.com/honda-portable-generator-gasoline-5-500-w-rated-7-000-w-surge-electric-recoil-start-120240v-ac-em6500xan2/i/G2780608)                                                                                                                                                                        | Reported  |
| EF7200DE / EF6300iSDE     | Yamaha       | 6,000 / 5,500           | 1× L14-30R                                               | 5-20R GFCI, L5-30R                                    | [EF7200DE](https://yamahamotorsports.com/models/ef7200de-d/features), [EF6300iSDE](https://yamahamotorsports.com/models/ef6300isde/features)                                                                                                                                                                                    | Confirmed |
| GP8000E                   | Generac      | 8,000                   | 1× L14-30R                                               | 2× 5-20R GFCI duplex                                  | [spec sheet](https://generac.com/globalassets/products/residential/portable-generators/products/8929/8929-gp8000e-spec-sheet.pdf)                                                                                                                                                                                               | Confirmed |
| GP9500E                   | Generac      | 9,500                   | 1× L14-30R                                               | 5-20R GFCI duplex, 1× 14-50R (40 A breaker)           | [spec sheet](https://www.generac.com/globalassets/products/residential/portable-generators/products/8063/8063-portable-spec-sheet.pdf)                                                                                                                                                                                          | Confirmed |
| GP15500EFI / GP18000EFI   | Generac      | 15,500 / 18,000         | 1× L14-30R                                               | 5-20R, L5-30R, 1× 14-50R                              | [7705](https://www.generac.com/globalassets/products/residential/portable-generators/spec-sheets/7705-gp15500efi-portable-generator-spec-sheet.pdf), [8917](https://www.generac.com/globalassets/products/residential/portable-generators/spec-sheets/8917-gp18000efi-50st-portable-generator-spec-sheet.pdf)                   | Confirmed |
| 201302 / 201438 / 201241  | Champion     | 9,200 / 10,000 / 13,500 | 1× L14-30R                                               | 2× 5-20R GFCI, 1× 14-50R (38–42 A)                    | [201302](https://www.championpowerequipment.com/product/201302-9200w-electric-start-dual-fuel-generator/), [201438](https://www.championpowerequipment.com/product/201438-10000w-electric-start-tri-fuel-generator/), [201241](https://www.championpowerequipment.com/product/201241-13500w-electric-start-tri-fuel-generator/) | Confirmed |
| WGen9500DFc / WGen14500DF | Westinghouse | 9,500 / 14,500          | 1× L14-30R                                               | 2× 5-20R GFCI, 1× 14-50R                              | [WGen9500DFc](https://westinghouse.com/products/wgen9500dfc-efi-dual-fuel-with-co-sensor) (other pages on westinghouse.com)                                                                                                                                                                                                     | Confirmed |
| iGen8200TFc               | Westinghouse | 6,600                   | **none**                                                 | 5-20R GFCI, TT-30R, 14-50R                            | westinghouse.com (product page)                                                                                                                                                                                                                                                                                                 | Confirmed |
| P08004                    | Firman       | 8,000                   | 1× L14-30R                                               | 1× 5-20R, 1× L5-30R, 1× 14-50R (33.3 A)               | [firmanpowerequipment.com/products/p08004](https://www.firmanpowerequipment.com/products/p08004)                                                                                                                                                                                                                                | Confirmed |
| XP13000EH / XP15000EH     | DuroMax      | 10,500 / 12,500         | 1× L14-30R                                               | 5-20R GFCI, L5-30R, 14-50R                            | duromaxpower.com product pages (exact URL not captured)                                                                                                                                                                                                                                                                         | Confirmed |
| SOLIX F3800 (battery)     | Anker        | 6,000                   | 1× L14-30R                                               | 6× 5-20R, 1× 14-50R                                   | [ankersolix.com/products/f3800](https://www.ankersolix.com/products/f3800)                                                                                                                                                                                                                                                      | Confirmed |

The full survey covered 31 portable models. Every 120/240 V model with a locking
outlet has exactly one L14-30R; the iGen8200TFc has none. Only the Honda EB10000
has a 50 A twist-lock.

### 1c. Conclusion: which twist-lock is most universal

- **Portables: L14-30R, on essentially all of them.** The second most common
  120/240 V outlet is the **14-50R**, a straight blade (not locking), on most
  models of 9 kW and up. Its real limit is often 33–42 A, set by the generator.
- **Towables: CS6369, on all of them, 2–3 per machine.** No towable has an
  L14-30R, L5-30R or 14-50R.
- **Three-phase twist-lock: no rental unit of either kind.** Three-phase leaves a
  towable only on lugs, a terminal board, or optional 400 A cam-loks.
- **For a 1.5–2 kW load, L14-30 is the most universal choice (reasoning).** A
  portable (or a battery station) is enough, and those are the generators camps
  own or rent. The towable fleet is the second case, covered by a **CS6365-plug
  to L14-30 adapter with a 30 A 2-pole breaker** (section 4b).
- **RV connectors fail the "twist-lock and waterproof" rule.** RV 50 A service is
  the NEMA 14-50 straight blade ([rvtravel.com](https://rvtravel.com), Reported).
  TT-30 is straight blade too. SmartPlug (section 4b) is push-in, not twist-lock.

**Burning Man context.** Camps range from a single generator with everyone
plugged in, to twist-lock grids with spider boxes, to three-phase cam-lok trees
([ePlaya "Professional Playa Power Protocols"](https://eplaya.burningman.org/viewtopic.php?p=976810),
Reported). Burning Man's [Electrical Safety page](https://burningman.org/black-rock-city/preparation/camping-tips/electrical-safety/)
says "Don't daisy chain extension cords", "Match extension cord wire size and
connector type to load", and "Never suspend cables from connectors". It gives no
GFCI or cable-type rule for art. The [Lighting Your Art](https://burningman.org/black-rock-city/bring-your-art/art-installation-guidelines/lighting-your-art/)
guide asks for at least 10.5 h of power a night and a generator in a baffle box.
In 2025, 63 % of art installations used solar
([Burning Man Journal, 2026-07](https://journal.burningman.org/2026/07/black-rock-city/leaving-no-trace/the-race-to-decarbonize-black-rock-city/)).

---

## 2. Load and capacity

**Loads.**

| Case                       | AC load                                                                                | Source                                                               |
| -------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **V1 average, whole Gate** | **1.5–2.0 kW**                                                                         | Owner, Reported 2026-10-21                                           |
| 128 spokes, average        | 3–4 kW                                                                                 | Assumed: average pixel load doubles                                  |
| 64 spokes, full white      | Pixels 3.6 / 6.5 / 8.1 kW, plus 0.96 kW switches and PixLites = **4.5 / 7.4 / 9.0 kW** | `docs/pricing-2026-10.md` §2 (low / mid / high, Assumed strip specs) |
| 128 spokes, full white     | Pixels 7.2 / 12.9 / 16.1 kW, plus 0.96 = **8.1 / 13.9 / 17.1 kW**                      | same, pixel load doubled                                             |

**Capacity.** Continuous capacity is 80 % of the breaker rating for a continuous
load. The "Cap" columns give the **brightness cap** that keeps full white within
continuous capacity, after 0.96 kW for switches. Each is shown as low / mid / high
load estimate.

| Feed                                                       | kVA  | Continuous kVA | Average (1.5–2 kW) | 128 average (3–4 kW) | 64 full white  | 128 full white | Cap, 64 spokes      | Cap, 128 spokes    |
| ---------------------------------------------------------- | ---- | -------------- | ------------------ | -------------------- | -------------- | -------------- | ------------------- | ------------------ |
| Split 25 A (10/4 trunk)                                    | 6.0  | 4.8            | OK (31–42 %)       | OK (63–83 %)         | Low only       | No             | 100 / 60 / 48 %     | 54 / 30 / 24 %     |
| **Split 30 A, L14-30 (8/4 trunk)**                         | 7.2  | **5.76**       | **OK (26–35 %)**   | **OK (52–69 %)**     | Low only       | No             | **100 / 74 / 60 %** | **67 / 37 / 30 %** |
| Split 30 A on a Honda EU7000iS (22.9 A per leg)            | 5.5  | 5.5 (rated)    | OK (27–36 %)       | OK (55–73 %)         | Low only       | No             | 100 / 70 / 56 %     | 63 / 35 / 28 %     |
| Split 50 A, CS6369                                         | 12.0 | 9.6            | OK                 | OK                   | Yes, all three | Low only       | 100 %               | 100 / 67 / 54 %    |
| 3φ 208Y 30 A, L21-30                                       | 10.8 | 8.65           | OK                 | OK                   | Low, mid       | Low only       | 100 / 100 / 95 %    | 100 / 60 / 48 %    |
| 3φ 208Y 25 A (8/5 thermal limit, section 5)                | 9.0  | 7.2            | OK                 | OK                   | Low only       | No             | 100 / 97 / 77 %     | 87 / 48 / 39 %     |
| 3φ 208Y 60 A, IEC 60309 (needs about 4/5 cord, not priced) | 21.6 | 17.3           | OK                 | OK                   | Yes            | Yes, just      | 100 %               | 100 %              |

kVA = V × A for split-phase (240 V × A), √3 × 208 V × A for three-phase.

**Verdict.**

- **30 A split-phase carries the real load with about 3× margin**, and the 128-spoke
  average (assumed) with 1.4–1.9×.
- **Full white needs a software cap.** At 64 spokes, mid or high estimate: cap at
  60–74 %. At 128 spokes: 30–67 %.
- **A bigger feed doesn't remove the cap.** Only the 60 A three-phase option
  carries full white at 128 spokes, and nothing rents with that connector.
- **Balance.** 8 segments per leg; continuous is 24 A per leg (2.88 kW).
- **Per segment:** the highest full-white load is 564 W (4.7 A), well inside a
  15 A tap breaker.

---

## 3. Topology, code and voltage drop

**Closed ring: not allowed, and no help here.**

- **The code rule.** NEC 310.10(G) (2020/2023 numbering; 310.10(H) in 2017) allows
  conductors "connected in parallel (electrically joined at both ends)" only at
  **1/0 AWG and larger**. The exceptions (control power, 360 Hz and up, existing
  2 and 1 AWG neutrals) don't apply.
  ([ECM, parallel conductors](https://www.ecmweb.com/national-electrical-code/qa/article/21260929/stumped-by-the-code-nec-requirements-paralleling-of-conductors),
  [EC&M, exceptions](https://www.ecmag.com/magazine/articles/article-detail/codes-standards-divide-and-conquer).)
  Tying both ends of a 10, 8 or 6 AWG trunk together at the feed is exactly that.
- **What a closed loop would do (reasoning):**
  - An open joint is invisible: current reroutes and nothing tells you.
  - Each half must carry full current after an open joint anyway, so there's no
    saving.
- **Recommend an open, one-direction radial ring.** Feed at joint 0, between
  segments 16 and 1. Run 1 → 16 with each segment's **plug facing the feed** and
  its connector facing downstream. Segment 16's connector stays open, capped.
- **Don't feed both directions from the feed (reasoning).** With every segment
  oriented the same way, the break would expose a **live male plug**. Feeding one
  way keeps every exposed end female (connectors and receptacles), and the feed
  box has a male inlet fed from a female connector.
- **If a joint opens:** every segment downstream goes dark. The RSTP data ring
  carries on; power does not.

**Cord rules (NEC 400 and 525).**

- **Article 525, cords:** listed for extra-hard usage, wet locations, sunlight
  resistant. No splice or tap between boxes. Connectors off the ground unless
  listed for wet locations
  ([ECM on Art. 525](https://www.ecmweb.com/national-electrical-code/code-basics/article/20888369/applying-article-525-in-amusement-venues)).
  Cord may not replace fixed wiring of a structure (400.12), and joints need
  strain relief (400.14)
  ([ECM on Art. 400](https://ecmweb.com/national-electrical-code/article/21238124/nec-flexible-cords-and-cables)).
- **Use UL-listed SOOW (reasoning).** The cheap non-UL Southwire SOOW (MSHA only)
  fails "listed".
- **Wire each segment as two cord pieces (reasoning).** Joint plug → power box
  (terminal blocks, the tap and its breaker) → joint connector. The tap is then
  made inside a box, not as a splice in the cord.
- **525.23 GFCI:** required for 15/20 A 125 V **non-locking** receptacles accessible
  to the public, and for public-accessible equipment on 15/20 A 120 V circuits. Not
  required on locking receptacles
  ([ECM 2022, 525.23](https://www.ecmweb.com/national-electrical-code/qa/article/21246467/code-qa-gfci-protection-requirements-at-carnivals-circuses-and-fairs)).
  A truss people touch and climb is "equipment accessible to the public"
  (reasoning), so this file plans GFCI per segment.

**Voltage drop.** Resistance at 75 °C, stranded uncoated copper (NEC Ch. 9 Table 8):
10 AWG 1.24, 8 AWG 0.778, 6 AWG 0.491 Ω/1000 ft
([ExpertCE](https://expertce.com/learn-articles/nec-chapter-9-table-8-conductor-properties/)).
At 90 °C, multiply by 1.048.

The model (reasoning): a 40 ft feeder at full current, plus the 157 ft ring with
its load spread evenly (equivalent to full current over half its length). That is
about **120 ft effective, one way**. Balanced legs leave almost no neutral current,
so the drop is on the hot only. The worst case puts the whole load on one leg, which
doubles the drop.

| Case                                                 | 10 AWG        | 8 AWG         |
| ---------------------------------------------------- | ------------- | ------------- |
| Average 2 kW, balanced (8.3 A per leg)               | 1.2 V (1.0 %) | 0.8 V (0.6 %) |
| 80 % of breaker, balanced (10/4: 20 A; 8/4: 24 A)    | 3.0 V (2.5 %) | 2.2 V (1.9 %) |
| 80 % of breaker, all on one leg                      | 6.0 V (5.0 %) | 4.5 V (3.7 %) |
| Bound: 24 A lumped at the far end of 197 ft, one leg | —             | 7.4 V (6.1 %) |

Every load is a switch-mode supply rated 88–264 VAC (SDR-240) or 90–305 VAC (HLG),
so the drop costs efficiency, not function. At the real average load it is
negligible. For three-phase with 8/5 at 20 A per phase, balanced: 1.9 V
line-to-neutral (1.6 %).

---

## 4. Connectors

Every family is sealed only **when mated, or capped or closed**. None states a
rating unmated and uncapped, so every open end needs its cap.

### 4a. L14-30 watertight (30 A 125/250 V, 3-pole 4-wire): **the leading family**

| #   | Role                      | Maker / MPN                                                | IP mated / unmated                                                            | Temp             | UV                        | Cord OD                       | Wire             | Load-break                                                     | Price                                | Price URL                                                                                                                                    | Datasheet                                                                                                                                                                                                            | Conf.    |
| --- | ------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------- | ------------------------- | ----------------------------- | ---------------- | -------------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| F1  | Plug                      | **Hubbell HBL2711SW** (Watertight Safety-Shroud)           | IP66 "suitability", NEMA 4/4X/12. Page lists a Santoprene closure plug, no PN | −40 to **75 °C** | Not stated on page        | 9–29 mm (0.35–1.15 in)        | #16–#8           | **"Certified for current interrupting at full rated current"** | **$171.43**                          | [Standard Electric](https://www.standardelectricsupply.com/Hubbell-HBL2711SW-Locking-Plug)                                                   | [hubbell.com p/170109](https://www.hubbell.com/hubbell/en/p/170109)                                                                                                                                                  | Quoted   |
| F2  | Connector (inline female) | **Hubbell HBL2713SW**                                      | IP66; closure cap included                                                    | −40 to 75 °C     | Not stated                | 9–29 mm                       | #16–#8           | as F1                                                          | **$184.29**                          | [Standard Electric](https://www.standardelectricsupply.com/Hubbell-HBL2713SW-Locking-Connector)                                              | hubbell.com p/170150                                                                                                                                                                                                 | Quoted   |
| F3  | Flanged inlet             | **Hubbell HBL2715SW**                                      | CSA Type 4/4X/12; closure cap included                                        | −40 to 75 °C     | —                         | panel                         | #16–#8           | as F1                                                          | **$211.82** (11 in stock)            | [Elliott](https://www.elliottelectric.com/P/Item/HWD/HBL2715SW/Alternate)                                                                    | hubbell.com p/170153                                                                                                                                                                                                 | Quoted   |
| F4  | Receptacle                | Hubbell HBL2710SW                                          | not checked                                                                   | —                | —                         | panel                         | —                | —                                                              | $162.86 (Master Electronics $207.63) | Standard Electric (URL not captured). Elliott: "not in current inventory"                                                                    | hubbell.com p/170104                                                                                                                                                                                                 | Quoted\* |
| F5  | Plug                      | Leviton Wetguard 28W74                                     | **IP66/67/69K mated or capped**; IP68 temporary immersion                     | −40 to **60 °C** | "UV stability" (brochure) | 15.9–28.6 mm (0.625–1.125 in) | #12–#8           | "full rated current" (UL 498); interrupt not plainly stated    | $99.66                               | EMI Supply (URL truncated; search 28W74)                                                                                                     | [leviton.com/products/28w74](https://leviton.com/products/28w74), [Wetguard brochure](https://www.leviton.com/content/dam/leviton/commercial-industrial/product_documents/brochure/Wetguard%20Brochure%20Q-653I.pdf) | Quoted   |
| F6  | Connector                 | Leviton 29W74                                              | IP69K mated or capped; ships with cap 50W54 (IP66)                            | −40 to 60 °C     | as F5                     | 15.9–28.6 mm                  | #12–#8           | as F5                                                          | $164.27                              | EMI Supply (URL truncated; search 29W74)                                                                                                     | [leviton.com/products/29w74](https://leviton.com/products/29w74)                                                                                                                                                     | Quoted   |
| F7  | Plug cap                  | Leviton 28W                                                | IP66                                                                          | —                | —                         | —                             | —                | —                                                              | $36.71                               | Crescent Electric (snippet)                                                                                                                  | —                                                                                                                                                                                                                    | Quoted\* |
| F8  | Flanged inlet             | Leviton 68W74 (mates the **78W74-C** connector, not 29W74) | IP66, NEMA 4/4X/12 with lid closed                                            | −40 to 60 °C     | —                         | panel                         | #12–#8           | —                                                              | $387.36, probably CAD                | lumen.ca (snippet)                                                                                                                           | [leviton.com/products/68w74](https://leviton.com/products/68w74)                                                                                                                                                     | Quoted\* |
| F9  | Plug / connector          | Eaton Arrow Hart L1430PW / L1430CW                         | IP67 mated (retailer); no cap found; no watertight inlet found                | −40 to 75 °C (R) | —                         | 10.9–29.2 mm                  | **#18–#10 only** | not stated                                                     | $63.91 / $74.32 (0 in stock)         | [Elliott L1430PW](https://www.elliottelectric.com/P/Item/EWD/L1430PW), [Elliott L1430CW](https://www.elliottelectric.com/P/Item/EWD/L1430CW) | [Elliott L1430CW sheet](https://www.elliottelectric.com/Media/L1430CW-EWD)                                                                                                                                           | Quoted   |

**Hubbell SW vs. Leviton Wetguard:**

- **Hubbell SW:** 75 °C against 60 °C, interrupting at full current certified, and
  a complete, priced set (plug, connector, inlet) whose inlet mates the standard
  connector.
- **Wetguard:** better sealing (IP69K, caps with part numbers and IP ratings), and
  $92 less per joint. But its inlet needs a special connector with no price found,
  and its 60 °C limit is close to what a dark connector reaches in desert sun
  (reasoning).
- **Eaton:** cheapest, but its 10 AWG terminal limit forces the 25 A / 10/4 design,
  and no inlet or cap was found.

### 4b. 50 A split-phase locking (SS2-50 / CS6364 / CS6365 / CS6369): **adapter only**

CS6365 = SS2-50P. Marine 50 A 125/250 V "SS-2" parts are the same configuration
([AC Works](https://www.acworks.com), Reported; Marinco "NEMA SS-2", Confirmed).

| #   | Role                        | Maker / MPN                                                   | IP                                   | Cord OD / wire               | Temp         | Price                            | Price URL                                                                                                                                 | Conf.             |
| --- | --------------------------- | ------------------------------------------------------------- | ------------------------------------ | ---------------------------- | ------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| S1  | Plug                        | Hubbell CS6365C                                               | **IP20** bare                        | 19.1–28.6 mm (0.75–1.125 in) | −40 to 75 °C | $141.71                          | [Standard Electric](https://www.standardelectricsupply.com/Hubbell-CS6365C-Locking-Plug)                                                  | Quoted            |
| S2  | Plug boot                   | Hubbell HBL77CM16                                             | IP55                                 | —                            | —            | $29.29                           | (snippet)                                                                                                                                 | Quoted\*          |
| S3  | Connector                   | Leviton CS6364W (the "W" is not Wetguard: "Environment: Dry") | none                                 | 17.3–28.6 mm; #10–#4         | −40 to 75 °C | $213.36                          | [Platt](https://www.platt.com/p/0931925/leviton/locking-connector/078477093122/levcs6364w)                                                | Quoted            |
| S4  | Connector boot              | Leviton 7717CR                                                | IP55                                 | —                            | —            | $30.87                           | EMI Supply (URL truncated)                                                                                                                | Quoted            |
| S5  | Marine plug / connector     | Hubbell HBL63CM65 / HBL63CM64                                 | IP20 ("indoor/dry unless protected") | 11.1–29 mm; to 6 AWG         | −40 to 75 °C | $161.43 / $210.00 each (5-packs) | [Standard Electric HBL63CM64](https://www.standardelectricsupply.com/Hubbell-HBL63CM64-Female-Connector)                                  | Quoted            |
| S6  | Marine connector boot       | Hubbell HBL77CM15 (stainless threaded sealing ring)           | **IP56**                             | —                            | —            | $62.00 each (5-pack)             | Standard Electric                                                                                                                         | Quoted            |
| S7  | Marine inlet                | Hubbell HBL504SS                                              | IP56, NEMA 4X, self-closing cover    | panel                        | −40 to 75 °C | $334.29                          | [Standard Electric](https://www.standardelectricsupply.com/Hubbell-HBL504SS-Shore-Power-Inlet)                                            | Quoted            |
| S8  | Plug / connector            | Marinco 6365CRN / 6364CRN                                     | none published (dust seal)           | up to 30.5 mm; to 6 AWG      | −40 to 75 °C | $124.95 / $113.95                | [nomadicsupply.com](https://nomadicsupply.com/marinco-50a-125-250v-locking-shore-power-connector/) (6364CRN)                              | Quoted            |
| S9  | Sealing ring / plug cover   | Marinco 7715CRN / 7717N                                       | none published                       | —                            | —            | $25.49 / $21.56                  | [Wholesale Marine 7715CRN](https://www.wholesalemarine.com/marinco-weatherproof-cover-for-50-amp-connectors/); 7717N Home Depot (snippet) | Quoted / Quoted\* |
| S10 | Marine inlet                | Marinco 6373EL                                                | none published                       | panel                        | —            | $203.99 (Defender) – $320.73     | mealeymarine.com; Defender (snippet)                                                                                                      | Quoted\*          |
| S11 | Watertight plug             | Woodhead (Molex) Watertite CS63W65                            | IP67 (family)                        | not found                    | not found    | $342.25                          | [North Coast](https://www.northcoast.com/product/detail/47291)                                                                            | Quoted            |
| S12 | SmartPlug inlet / connector | SmartPlug Systems BM50S / BF50                                | IP56 claimed for the system          | —                            | —            | $247.50 / $161.10                | navstore.com; Defender (snippet)                                                                                                          | Quoted / Quoted\* |

- **No confirmed watertight 50 A twist-lock family exists.** The industrial and
  marine parts are IP20 bare, and reach IP55/56 only with add-on boots. Woodhead
  Watertite is the one IP67 candidate: the connector, cord range and inlet weren't
  found. Load-break isn't stated for any 50 A part.
- **SmartPlug is push-in with side latches, not twist-lock.** It mates only its own
  inlet, so it needs adapter cords to reach any SS2-50 device.
- **6/4 UL SOOW (27.3 mm) fits every 50 A grip.**

**Towable adapter, CS6369 → watertight L14-30, with a 30 A breaker.** The CS6369 on
a towable sits behind a 50 A breaker. An L14-30 feeder (8 AWG max at its terminals)
can't be protected at 50 A, so the adapter carries its own 30 A 2-pole breaker
(reasoning, NEC 240.5).

| Part                                                 | Price        | Conf.             |
| ---------------------------------------------------- | ------------ | ----------------- |
| Hubbell CS6365C plug (S1) + HBL77CM16 boot (S2)      | $171.00      | Quoted / Quoted\* |
| 6 ft 6/4 UL SOOW tail (section 5)                    | $52.74       | Quoted            |
| Small sealed box, 2-pole 30 A breaker, gland         | $80–170      | Estimate          |
| Watertight L14-30 receptacle, Hubbell HBL2710SW (F4) | $162.86      | Quoted\*          |
| **Adapter total**                                    | **$467–557** | Estimate          |

Keep the 6/4 tail short and shaded. 6/4 Column B is 55 A, and derated it is 50.1 A
at 40 °C but only 47.9 A at 45 °C.

### 4c. Three-phase

| #   | Role                                 | Maker / MPN                                             | IP mated / unmated                                                 | Temp               | Cord OD / wire           | Load-break                              | Price                | Price URL                                                                                                                                                                                                                                                                          | Conf.    |
| --- | ------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------ | ------------------ | ------------------------ | --------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| T1  | L21-30 plug                          | **Hubbell HBL2811SW**                                   | IP66, UL 4X                                                        | −40 to 75 °C       | 8.9–29 mm; #16–#8        | as F1 (family)                          | $260.56              | Crescent Electric (snippet)                                                                                                                                                                                                                                                        | Quoted\* |
| T2  | L21-30 connector                     | **Hubbell HBL2813SW**                                   | UL 4X; closure cap included                                        | −40 to 75 °C       | ~8.9–29 mm (unconfirmed) | —                                       | $346.40              | [North Coast](https://www.northcoast.com/product/detail/135127/hubbell-kellems-hbl2813sw)                                                                                                                                                                                          | Quoted   |
| T3  | L21-30 inlet                         | **Hubbell HBL2815SW**                                   | IP66, UL 4X; closure cap included                                  | −40 to 75 °C       | panel; #12–#8            | —                                       | $339.66              | [North Coast](https://www.northcoast.com/product/detail/136973/hubbell-kellems-hbl2815sw)                                                                                                                                                                                          | Quoted   |
| T4  | L21-30 receptacle                    | Hubbell HBL2810SW                                       | —                                                                  | —                  | —                        | —                                       | $190–262             | Standard Electric / Master Electronics (snippets)                                                                                                                                                                                                                                  | Quoted\* |
| T5  | L21-30 plug                          | Leviton Wetguard 28W81                                  | IP66/67/69K mated or capped; cap 28W                               | −40 to 60 °C       | 15.9–28.6 mm; #12–#8     | rated to interrupt (UL 498)             | $115.29              | [EMI Supply](https://www.emisupply.com/lev-28w81-leviton-28w81-industrial-grade-wetguard-plug-30-amp-120-208-volt-3py)                                                                                                                                                             | Quoted   |
| T6  | L21-30 connector                     | Leviton 29W81                                           | IP69K mated or capped; cap 50W54                                   | −40 to 60 °C       | 15.9–28.6 mm             | as T5                                   | $159.49 (0 in stock) | [Platt](https://www.platt.com/p/0427514/leviton/wetguard-locking-connector/078477968826/lev29w81)                                                                                                                                                                                  | Quoted   |
| T7  | L21-30 inlet                         | Leviton 68W81                                           | IP66, NEMA 4/4X/12 with cover                                      | −40 to 60 °C       | panel                    | as T5                                   | $307.11 (0 in stock) | [Platt](https://www.platt.com/p/0288186/leviton/inlet-with-cover/078477519424/lev68w81)                                                                                                                                                                                            | Quoted   |
| T8  | L21-30 receptacle                    | Leviton 99W81-S                                         | IP66 with cover                                                    | −40 to 60 °C       | panel                    | —                                       | ~$289, probably CAD  | lumen.ca (snippet)                                                                                                                                                                                                                                                                 | Quoted\* |
| T9  | Caps                                 | Leviton 28W / 50W54                                     | IP66                                                               | —                  | —                        | —                                       | $31.72 / $35.64      | [Crescent 50W54](https://www.crescentelectric.com/product/727111/cap-for-use-with-all-wetguard-locking-connectors-in-30-amp-wetguard-ip66-yellow)                                                                                                                                  | Quoted\* |
| T10 | L21-30 plug (rubber)                 | Hubbell HBL28W81                                        | UL 4/4X/6/6P. Its cap HBL50W54 is a **loose dust cap, not a seal** | −40 to 60 °C       | 9.5–25.4 mm (max 10/5)   | UL 498                                  | $103.64 (min 5)      | [MRO Supply](https://www.mrosupply.com/products/5018077/as-markdown/)                                                                                                                                                                                                              | Quoted   |
| T11 | IEC 60309 60 A 4P5W plug, blue 9h    | Leviton 560P9WLEV                                       | IP66/67/68/69K; cap needed                                         | cold-tested −35 °C | 22–37 mm; #8–#2          | **certified to interrupt full current** | $428.39              | [Platt](https://www.platt.com/p/1846026/leviton/lev-series-iec-pin-sleeve-plug-60a-208v-blue/078477901472/lev560p9wlev)                                                                                                                                                            | Quoted   |
| T12 | IEC 60309 60 A connector / inlet     | Leviton 560C9WLEV / 560B9WLEV                           | as T11; lid                                                        | —                  | as T11                   | as T11                                  | $376.82 / $410.18    | Home Depot / Standard Electric (snippets)                                                                                                                                                                                                                                          | Quoted\* |
| T13 | IEC 60309 60 A plug cap              | Hubbell PC60 (fits Hubbell; a Leviton cap wasn't found) | —                                                                  | —                  | —                        | —                                       | $79.93 (min 6)       | [MRO Supply](https://www.mrosupply.com/products/1032660/as-markdown/)                                                                                                                                                                                                              | Quoted   |
| T14 | IEC 60309 30 A 4P5W plug / connector | Leviton 530P9WLEV / 530C9WLEV                           | IP66–69K                                                           | —                  | 14.7–28.6 mm; #12–#8     | —                                       | $310.86 / $333.60    | [EMI plug](https://www.emisupply.com/catalog/leviton-530p9wlev-industrial-grade-plug-watertight-30amp-120208-volt-3phase-p-19324.html), [EMI connector](https://www.emisupply.com/catalog/leviton-530c9wlev-industrial-grade-watertight-connector-120208-volt-3phase-p-19378.html) | Quoted   |

- **No 50 A three-phase twist-lock with a neutral exists.**
  - NEMA locking stops at 30 A.
  - CS8364/CS8365 is 50 A 3φ 250 V **3-pole 4-wire with no neutral**, so no 120 V
    ([Legrand CS8364](https://www.legrand.ca/p/print/CS8364.pdf)). No watertight
    version was found.
- **Pin-and-sleeve does not twist-lock.** IEC 60309 holds the plug with a
  **threaded locking ring**, plus the latching gasketed lid on the receptacle or
  connector.
- **6/5 SOOW fits no L21-30 device,** on cord diameter or wire size.

### 4d. Multi-circuit alternative (for comparison only)

| Option                                                                   | Rating                                                                                    | IP                                                       | Per joint (plug + inline female)                                                                                                                  | Conf.             |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Amphenol Socapex 19-pin, SL D FMD PG29/PG36 419 AR (one-piece backshell) | 19 contacts, up to 25 A, UL recognised; 6 × 20 A circuits is the usual layout (reasoning) | IP67 **only with the one-piece backshell**; no cap found | No US price found                                                                                                                                 | Estimate          |
| Generic "419/VSC compatible" 19-pin                                      | 20 A 250 V, CE only (not UL)                                                              | IP66                                                     | $96.33 + $95.92 = **$192.25** ([stagelightingstore](https://www.stagelightingstore.com/19-Pin-Socapex-Female-Cable-Mount-Connector-Solder-Black)) | Quoted / Quoted\* |
| Harting Han E 16 + Han B hoods + coupler hood                            | 16 A per contact, 18–14 AWG (so 15 A circuits at most)                                    | IP65 (the coupler hood limits it)                        | about $130–150                                                                                                                                    | Estimate          |

**A multi-circuit trunk doesn't meet the decision.** It needs a distro at the feed
to split the single 30–50 A feed into 15–20 A circuits, a 19-core cable (12/12
SOOW is $6.59/ft at [Nassau](https://nassaunationalcable.com/products/12-14-soow-black-portable-power-cable-600v-ul-csa-1);
a 19-core outdoor cord wasn't priced), and the IP67 part has no US price. The
generic part is not UL-listed. Its one advantage is per-circuit protection at the
feed.

---

## 5. Trunk cable (SOOW 600 V, 90 °C, Southwire UL/CSA)

**Ampacity basis.** NEC Table 400.5(A)(1) per Southwire's footnote. Column A covers
3 current-carrying conductors; Column B covers 2 (10 AWG 25/30 A, 8 AWG 35/40 A,
6 AWG 45/55 A, from [Lex Products](https://www.lexproducts.com), secondary).

- **Neutral counting.** 400.5 does not count a neutral that carries only
  unbalanced current, nor the ground (older-edition text, secondary; 2023 wording
  not confirmed).
- **Split-phase L1-L2-N-G: Column B (reasoning).** Triplen harmonics from loads on
  L1 and L2 cancel in a 3-wire single-phase neutral.
- **Three-phase wye with switch-mode loads: the neutral counts.** 4 current-carrying
  conductors, so Column A × 0.80.
- **Southwire's own spec tables** list every 4/5-conductor size at Column A × 0.8
  (20 / 28 / 36 A). That is the conservative figure for both.
- **Ambient correction, 90 °C cord:** 0.91 at 36–40 °C, 0.87 at 41–45 °C, 0.82 at
  46–50 °C
  ([Table 310.15(B)(1), via Elliott](https://www.elliottelectric.com)). The code has
  no adder for cord in sun, so design to the **50 °C row** (reasoning).

| Size    | Southwire MPN | Basis           | Ampacity | × 0.91 / 0.87 / 0.82   | OD (mm / in)              | Weight lb/1000 ft | $/ft      | 200 ft     | Price URL                                                                       | Datasheet                                                                           | Conf.  |
| ------- | ------------- | --------------- | -------- | ---------------------- | ------------------------- | ----------------- | --------- | ---------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------ |
| 10/4    | 55809604      | Col B, split    | 30       | 27.3 / 26.1 / 24.6     | 18.2 / 0.715              | 347 (WCYW 350)    | **$2.97** | **$594**   | [WCYW](https://www.wireandcableyourway.com/10-4-soow-portable-cord-600v-ul-csa) | [SPEC 70000](https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US) | Quoted |
| **8/4** | **630726**    | Col B, split    | **40**   | 36.4 / 34.8 / **32.8** | 24.2 / 0.954 (WCYW 0.945) | 596 (WCYW 580)    | **$6.09** | **$1,218** | [WCYW](https://www.wireandcableyourway.com/8-4-soow-portable-cord-600v-ul-csa)  | SPEC 70000                                                                          | Quoted |
| 6/4     | 560042        | Col B, split    | 55       | 50.1 / 47.9 / 45.1     | 27.3 / 1.075              | 830               | $8.79     | $1,758     | [WCYW](https://www.wireandcableyourway.com/6-4-soow-portable-cord-600v-ul-csa)  | SPEC 70000                                                                          | Quoted |
| 10/5    | 55810306      | Col A × 0.8, 3φ | 20       | 18.2 / 17.4 / 16.4     | 19.6 / 0.772              | 444               | $4.10     | $820       | [WCYW](https://www.wireandcableyourway.com/10-5-soow-portable-cord-600v-ul-csa) | SPEC 70000                                                                          | Quoted |
| 8/5     | 596961        | Col A × 0.8, 3φ | 28       | 25.5 / 24.4 / 23.0     | 26.4 / 1.039              | 719               | $7.59     | $1,518     | [WCYW](https://www.wireandcableyourway.com/8-5-soow-portable-cord-600v-ul-csa)  | SPEC 70000                                                                          | Quoted |
| 6/5     | 562068        | Col A × 0.8, 3φ | 36       | 32.8 / 31.3 / 29.5     | 30.3 / 1.192              | 1,036             | $11.69    | $2,338     | [WCYW](https://www.wireandcableyourway.com/6-5-soow-portable-cord-600v-ul-csa)  | SPEC 70000                                                                          | Quoted |

Southwire SPEC 70000 cord is −40 to 90 °C and "sunlight, water, oil, and weather
resistant". It is listed to UL 62 and CSA C22.2 No. 49.

**Non-UL cord (SPEC 70002, MSHA only) is cheaper and much thinner,** but fails NEC
525.20 "listed": 8/4 is 18.1 mm at $4.89/ft, 6/4 is 20.4 mm at $7.14/ft
([SPEC 70002](https://cabletechsupport.southwire.com/tile/10/spec/70002/?country=US)).
**Don't buy it.**

**What each feed rating needs:**

- **30 A split-phase: 8/4 UL.** 32.8 A at 50 °C. It fits Hubbell SW (9–29 mm) and
  Wetguard (15.9–28.6 mm) by diameter and terminals, but **not Eaton** (#10 maximum).
- **10/4 holds only 24.6 A at 50 °C** (26.1 A at 45 °C), so a 10/4 trunk takes a
  **25 A** 2-pole breaker. That limits the feed to 4.8 kVA continuous, still 2.4×
  the average.
- **Three-phase L21-30: 8/5.** It carries 25.5 A at 40 °C and 23.0 A at 50 °C, so it
  is effectively a **25 A** system. 6/5 would be needed for 30 A and fits no L21-30
  device.
- **Weight for 200 ft:** 10/4 is 70 lb, 8/4 about 119 lb, 6/4 about 166 lb. 8/4 is
  about 6 lb per 9.8 ft segment.
- **Power-box glands:** 8/4 UL at 24 mm needs an M32–M40 class gland, larger than the
  M20 glands in `docs/pricing-2026-10.md` (not priced; check the Lapp range).

---

## 6. Protection

### 6a. Main disconnect / breaker at the feed

| Role                                    | Maker / MPN                                        | Rating                                          | Enclosure                 | Price                   | Price URL                                                                                                                     | Conf.               |
| --------------------------------------- | -------------------------------------------------- | ----------------------------------------------- | ------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Feed box (leading)**                  | Hammond PCJ12106H + DIN 2-pole 30 A UL 489 breaker | 30 A 2P (overcurrent, and disconnect by handle) | IP66, NEMA 4X, UL 746C f1 | $77.33–126.45 + $60–100 | box: [Findchips/Newark](https://www.findchips.com/search/PCJ12106) (from `pricing-2026-10.md` P8); breaker: Estimate          | Quoted\* / Estimate |
| Split-phase disconnect (no overcurrent) | Eaton DG222URB                                     | 60 A 2P 240 V non-fused                         | NEMA 3R                   | $253.88                 | [Platt](https://www.platt.com/p/0010548/eaton/safety-switch-60a-2p-240v-type-dg-non-fusible-nema-3r/782113144238/cutdg222urb) | Quoted              |
| 3φ disconnect                           | Eaton DG322URB                                     | 60 A 3P 240 V non-fused                         | NEMA 3R                   | $305.88 – $403.21       | [Platt](https://www.platt.com/p/0010567/eaton/safety-switch-60a-3p-240v-type-dg-non-fusible-nema-3r/782113144313/cutdg322urb) | Quoted\*            |
| 3φ disconnect, 4X                       | Hubbell HBLDS6AC                                   | 60 A unfused                                    | NEMA 4X                   | $564.29 – $659.96       | [Elliott](https://elliottelectric.com/P/Item/HWD/HBLDS6AC) ("Inactive")                                                       | Quoted\*            |

A non-fused switch adds nothing to an L14-30 feed: the trunk still needs 30 A
overcurrent protection. The leading design is a small sealed **feed box** at
joint 0. It holds the HBL2715SW inlet, a 2-pole 30 A breaker and an HBL2710SW
receptacle for segment 1's plug.

### 6b. GFCI at the feed (not recommended for the whole ring; see 6d)

| Role                         | Maker / MPN                         | Rating                                                                                                      | Price                          | Price URL                                                                                                                                         | Conf.    |
| ---------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 50 A 2P spa panel            | Midwest UG412RMW250                 | 50 A 2P GFCI, 120/240 V, NEMA 3R                                                                            | $280.74 (133 in stock)         | [Platt](https://www.platt.com/p/0422742/midwest/spa-panel-50a-2p-gfci-1ph-breaker-4-circuit-nema-3r/784567206487/midug412rmw250)                  | Quoted   |
| 50 A 2P spa panel            | Siemens W0408L1125SPA50             | 125 A 4-space panel with a 50 A 2P GFCI, NEMA 3R                                                            | $132.61 (Home Depot) – $214.83 | [Home Depot](https://www.homedepot.com/p/Siemens-125-Amp-4-Space-8-Circuit-Main-Lug-Outdoor-Spa-Panel-with-50-Amp-GFCI-W0408L1125SPA50/206184029) | Quoted\* |
| 50 A 2P spa panel            | Square D HOME250SPA                 | 50 A 2P GFCI, NEMA 3R                                                                                       | $125.00 – $134.76              | [Home Depot](https://www.homedepot.com/p/-/205170085)                                                                                             | Quoted\* |
| 3φ GFCI breaker with neutral | Siemens B360GFHH                    | 60 A 3P 208Y/120, **Class A 5 mA**, loads A-B-C-N                                                           | $3,770                         | [superbreakers.com](https://superbreakers.com/products/siemens-b360gfhh-3-pole-ground-fault-circuit-breaker)                                      | Quoted   |
| 3φ industrial GFCI           | Littelfuse Shock Block SB5032-021-0 | 32 A 208 V 3φ, 6 mA; **3-wire, no neutral**: can't protect 120 V loads; selectable auto-reset; −35 to 40 °C | $2,562.50                      | [Standard Electric](https://www.standardelectricsupply.com/Littelfuse-SB5032-021-0-SB5000-Series-Industrial-Shock-Block-208-V-32-A)               | Quoted   |

- **The spa panels are 50 A.** A 30 A trunk would need the 50 A GFCI swapped for a
  30 A 2-pole GFCI breaker (not priced).
- **Three-phase Class A with a neutral costs $3,770** (Siemens). Shock Block and
  Square D QO320GFI have no load neutral.
- [Siemens 3φ GFCI data sheet](https://s3.amazonaws.com/dcc-data-extract/new-delta/asset/Compas/daily/Compas/Data%20Sheet/SIE_DS_3PGFCI.pdf)

### 6c. Per-segment 1-pole Class A GFCI (leading)

| Role                   | Maker / MPN                                                   | Rating                                                                                                                       | Price                   | Price URL                                                                                                                        | Conf.             |
| ---------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **DIN GFCI breaker**   | **Allen-Bradley 1492-MCGAT115** (15 A); -MCGAT120 (20 A)      | 1P 120 V, **UL 489 + UL 943 Class A 5 mA**, self-test, 10 kA; DIN through 2 × 1492-AMCDIN1 adapters; 0–60 °C, rated at 40 °C | $275.77 + adapters ~$15 | [HESCO](https://store.hesconet.com/Product/Allen-Bradley-1492-MCGAT115-AB1492MCGAT115); adapters Estimate                        | Quoted\*          |
| Inline GFCI (low cost) | Leviton GSIA2 (from `pricing-2026-10.md` P14)                 | 20 A 120 V Class A, **auto-reset**, −35 to 66 °C. A plug-type device, so it needs a receptacle inside the box                | $42.77                  | [Leviton store](https://store.leviton.com/products/self-test-in-line-user-attachable-gfci-20-amp-120-volt-automatic-reset-gsia2) | Quoted            |
| Plug-in GFCI breakers  | Square D QO120GFI / HOM120GFI; Eaton GFTCB120; Siemens QF120A | 20 A 1P Class A. **QF120A is for 120/240 V 1φ only** (datasheet). They need a load centre, not a DIN box                     | $47.63 – $81.47         | [Elliott GFTCB120](https://www.elliottelectric.com/P/Item/ETN/GFTCB120); others snippets                                         | Quoted / Quoted\* |

- **The A-B 1492-MCGAT115 replaces the Eaton FAZ 15 A** (P11, $40) in each power
  box, so the net cost is about $250 per box.
- **Shared neutral.** A 1-pole GFCI must see only its own hot and neutral. In the
  power box, downstream of the tap, that holds even though the trunk neutral is
  shared. 1-pole GFCI breakers in a panel at the feed would need a separate neutral
  to each segment
  ([Square D QO catalogue](https://ressupply.com/documents/square_d/QO_and_QOB_Circuit_Breakers.pdf)).
- **After a generator restart:** GFCI breakers are mechanically latched and should
  stay on (reasoning). Some forum reports say they tripped on a dropout. Only
  auto-reset portable GFCIs (like the GSIA2) are acceptable in the cord-type form.

### 6d. Earth leakage, and why not one GFCI for the ring

| Supply      | Datasheet "LEAKAGE CURRENT" | At 120 V (scaled by voltage, reasoning) | Datasheet                                                                       |
| ----------- | --------------------------- | --------------------------------------- | ------------------------------------------------------------------------------- |
| SDR-240-48  | < 1 mA at 240 VAC           | < 0.50 mA                               | [SDR-240 spec](https://www.meanwell.com/Upload/PDF/SDR-240/SDR-240-SPEC.PDF)    |
| HLG-320H-12 | < 0.75 mA at 277 VAC        | < 0.32 mA                               | [HLG-320H spec](https://www.meanwell.com/Upload/PDF/HLG-320H/HLG-320H-SPEC.PDF) |
| HLG-600H-12 | < 0.75 mA at 277 VAC        | < 0.32 mA                               | [HLG-600H spec](https://www.meanwell.com/Upload/PDF/HLG-600H/HLG-600H-SPEC.PDF) |

**Class A trip band.** A Class A GFCI must trip at 6 mA and hold below 4 mA (Square
D catalogue above; Siemens says 4–6 mA). So the usable continuous budget is under
4 mA.

**Leakage per segment:** 0.50 mA with the SDR only, 0.82 mA with one HLG, 1.15 mA
with two.

**One GFCI on all 16 segments, all on one leg:** 8.0 / 13.1 / 18.4 mA. That is
**over 6 mA, so it trips.**

**Balanced legs (reasoning).** L1 and L2 are 180° apart, so balanced leakage mostly
cancels. What's left is capacitor tolerance (about ±20 %, so 2–4 mA), plus
high-frequency current, cable leakage and dust tracking. A tripped segment breaker
or an uneven turn-on removes the cancellation. **Realistically 2–5 mA, inside the
4–6 mA band: a 5 mA GFCI for the whole ring would nuisance-trip.**

**Per-segment GFCI:** at most 1.15 mA against a 4 mA hold, about **3.5× margin**.
That is the recommendation.

The higher-threshold alternatives are equipment protection, not people protection,
and their acceptability here is a safety call not checked:

- 30 mA equipment ground-fault protection (UL 1053, e.g. Allen-Bradley 1492-MCEA).
- A 20 mA Class C special-purpose GFCI (UL 943C).

---

## 7. Comparison

"Set cost" = feed inlet + 16 joints (plug + inline connector) + caps + 200 ft of
cable, as the brief asked. All-in totals are in section 8.

| Option                                  | Phases | Feed A (trunk limit)       | IP mated / unmated                                     | Twist-lock          | Plugs into rental gens?                          | Per joint | Set cost                    | Notes                                                                                 |
| --------------------------------------- | ------ | -------------------------- | ------------------------------------------------------ | ------------------- | ------------------------------------------------ | --------- | --------------------------- | ------------------------------------------------------------------------------------- |
| **A. Hubbell SW L14-30 + 8/4 UL**       | Split  | 30                         | IP66 / closure cap (caps included on connector, inlet) | Yes                 | **Portables directly; towables via adapter**     | $355.72   | **$7,121**                  | 75 °C; certified interrupting. Plug cap PN not found                                  |
| B. Leviton Wetguard L14-30 + 8/4 UL     | Split  | 30                         | IP69K / IP66 caps                                      | Yes                 | Same as A                                        | $263.93   | $5,902                      | 60 °C. Inlet price probably CAD, and the inlet needs the 78W74-C connector (no price) |
| C. Eaton Arrow Hart L14-30 + 10/4       | Split  | 25 (10 AWG terminals)      | IP67 mated (retailer) / no cap found                   | Yes                 | Same as A                                        | $138.23   | $2,806 + inlet (none found) | No watertight inlet or cap found                                                      |
| D. Hubbell marine 50 A + boots + 6/4 UL | Split  | 50                         | IP55–56 with boots / IP20 bare                         | Yes                 | Towables directly; portables (except EB10000) no | $462.72   | $9,496                      | Boots are not watertight                                                              |
| E. Marinco 50 A + covers + 6/4 UL       | Split  | 50                         | Not published                                          | Yes                 | as D                                             | $285.95   | $6,537                      | No IP rating                                                                          |
| F. SmartPlug 50 A                       | Split  | 50                         | IP56 claimed                                           | **No** (push-in)    | Needs adapters everywhere                        | —         | not priced                  | Fails "twist-lock"                                                                    |
| G. Hubbell SW L21-30 + 8/5 UL           | 3φ     | 25 (8/5 thermal)           | IP66 / closure cap                                     | Yes                 | **None** (cam-lok distro needed)                 | $606.96   | $11,569                     | 75 °C                                                                                 |
| H. Leviton Wetguard L21-30 + 8/5 UL     | 3φ     | 25                         | IP69K / IP66 caps                                      | Yes                 | None                                             | $274.78   | $6,285                      | 60 °C                                                                                 |
| I. Leviton IEC 60309 60 A 4P5W + 6/5 UL | 3φ     | ~30 (60 A needs about 4/5) | IP67–69K / cap needed                                  | **No** (screw ring) | None                                             | $805.21   | $15,632 + caps              | Rated to break load                                                                   |
| J. Leviton IEC 60309 30 A 4P5W + 8/5 UL | 3φ     | 25                         | IP66–69K / cap needed                                  | No                  | None                                             | $644.46   | $11,829 + inlet             |                                                                                       |
| K. Socapex 19-pin, generic IP66         | multi  | 6 × 20 A                   | IP66 / no cap                                          | Screw coupling      | No (needs a distro)                              | $192.25   | $3,076 + cable + distro     | Not UL; not one feed                                                                  |

Set-cost arithmetic, as inlet + 16 × joint + caps + cable:

- **A:** $211.82 + $5,691.52 + $0 + $1,218
- **B:** $387.36 + $4,222.88 + $73.42 (2 spare 28W caps) + $1,218
- **D:** $334.29 + $7,403.52 + $1,758
- **E:** $203.99 + $4,575.20 + $1,758
- **G:** $339.66 + $9,711.36 + $1,518
- **H:** $307.11 + $4,396.48 + $63.44 + $1,518
- **I:** $410.18 + $12,883.36 + $2,338

---

## 8. Recommendation

### Split-phase (recommended): Hubbell SW L14-30, 8/4 UL SOOW, 30 A, per-segment GFCI

**Why:**

- L14-30 is on essentially every portable generator and battery station people
  rent or bring.
- The real load (1.5–2 kW) needs only a portable.
- The CS6369 towables are covered by one adapter.
- The Hubbell SW family is the only watertight L14-30 set that has all three: a
  75 °C rating, interrupting at full current certified, and an inlet that mates
  the standard connector, all priced today.
- 8/4 UL SOOW carries the full 30 A at 50 °C ambient and fits the grip.

| Item                                                                  | Qty   | Extended             | Conf.               |
| --------------------------------------------------------------------- | ----- | -------------------- | ------------------- |
| Joints: HBL2711SW plug + HBL2713SW connector                          | 16    | $5,691.52            | Quoted              |
| Feeder cord ends (plug at the generator, connector to the feed inlet) | 1 set | $355.72              | Quoted              |
| Spare plug + connector                                                | 1 set | $355.72              | Quoted              |
| Feed box: HBL2715SW inlet + HBL2710SW receptacle                      | 1     | $374.68              | Quoted / Quoted\*   |
| Feed box: PCJ12106H enclosure + 2-pole 30 A breaker                   | 1     | $137–226             | Quoted\* / Estimate |
| 8/4 UL SOOW, 200 ft                                                   | 1     | $1,218.00            | Quoted              |
| Per-segment GFCI: A-B 1492-MCGAT115 + adapters (high) or GSIA2 (low)  | 17    | $727–4,938           | Quoted / Quoted\*   |
| Towable adapter, CS6365 → L14-30 with 30 A breaker                    | 1     | $467–557             | Estimate            |
| **All-in (connectors + cable + protection)**                          |       | **$9,327 – $13,717** |                     |

- **What this replaces in `docs/pricing-2026-10.md`:** the powerCON TRUE1 and 12/3
  lines P1–P7 ($1,516–1,676), and P14. P11 too, if the A-B GFCI breaker is used.
- **The DC side is unchanged.**
- **Rated capacity:** 5.76 kVA continuous, with a brightness cap of 60–74 % at 64
  spokes (mid/high estimate) and 30–67 % at 128.
- **Cheaper variant:** a 10/4 trunk on a 25 A breaker saves $624 and 44 lb, and
  gives 4.8 kVA.
- **Budget variant:** Wetguard (option B) saves about $1,500, if its 60 °C rating
  is acceptable with shading.

### Three-phase (not recommended): Hubbell SW L21-30, 8/5 UL SOOW, 25 A

**Why this one if three-phase is wanted:** the same family logic (75 °C,
watertight inlet, closure caps), and 8/5 is the largest cord L21-30 takes.

**Why not three-phase at all:**

- No rental generator has an L21-30R, so every event needs a cam-lok (or lug) to
  L21-30 distro.
- The 25 A trunk limit gives only 7.2 kVA continuous, against 5.76 kVA for
  split-phase.
- Per-segment GFCI suitability on 208Y/120 is unverified (Siemens QF120A excluded).

| Item                                                | Extended              | Conf.             |
| --------------------------------------------------- | --------------------- | ----------------- |
| 16 joints (HBL2811SW + HBL2813SW)                   | $9,711.36             | Quoted\* / Quoted |
| Feeder ends + spare set                             | $1,213.92             | Quoted\* / Quoted |
| Feed box: HBL2815SW inlet + HBL2810SW receptacle    | $529.66–601.66        | Quoted / Quoted\* |
| Feed box enclosure + 3-pole 25 A breaker            | $157–246              | Estimate          |
| 8/5 UL SOOW, 200 ft                                 | $1,518.00             | Quoted            |
| Per-segment GFCI                                    | $727–4,938            | as above          |
| **All-in**                                          | **$13,857 – $18,230** |                   |
| Cam-lok → L21-30 distro (needed with every towable) | not priced            | Estimate          |

The Wetguard L21-30 version (option H) is about $8,000–12,300 all-in.

---

## Assumptions

1. **Load:** the V1 average of 1.5–2 kW (Reported 2026-10-21) is the operating load.
   The 128-spoke average is 3–4 kW (Assumed: pixel share doubles). The full-white
   figures and their 12 V WS2815 basis come from `docs/pricing-2026-10.md` §2.
   Switches and PixLites add 0.96 kW (16 × 60 W).
2. **Topology:** an open radial ring fed at joint 0, about 9.8 ft of trunk per
   segment, and a 40 ft feeder (200 ft total). Each segment has two cord pieces
   meeting in the power box, which holds the tap. 8 segments per leg.
3. **Ampacity:** Column B for split-phase (neutral not counted), Column A × 0.8 for
   three-phase wye with switch-mode loads, and the 46–50 °C correction (0.82) for
   cord on a sunny truss.
4. **Continuous load = 80 % of breaker rating.**
5. **Quantities:** 16 joints, 1 feeder set, 1 spare set, 17 GFCIs (one spare).
6. **The generator selector is in 1φ 120/240 or 3φ 208Y** whenever a towable's
   CS6369 is used.
7. **Feed-box and adapter enclosures and DIN breakers are estimated.** Part numbers
   weren't priced.

## Could not verify

- **Hubbell SW:** whether the IP66 holds unmated; the plug's closure-plug part
  number; UV rating; whether the SW plug mates a generator's ordinary flush L14-30R
  (the NEMA configuration is standard; the shroud fit wasn't checked).
- **Cross-brand mating:** whether IP ratings hold between brands (assume not:
  keep one family across all joints).
- **Leviton Wetguard:** a US price for the 68W74 inlet and its 78W74-C mate;
  whether the 29W74 seals on the 68W74.
- **Eaton watertight:** an inlet, a cap, and the datasheet (eaton.com timed out).
- **Woodhead Watertite CS63W64/65:** cord range, connector price, inlet.
- **Bobcat (Doosan) towables:** twist-lock type and count. Rental-house receptacle
  listings (Sunbelt, United, Herc) blocked fetching.
- **Portables:** whether any current portable's L14-30R is GFCI-protected (NEC
  590.6(A)(3) and 445.20 push that way). If one is, the ring's 2–18 mA leakage
  could trip it (see Spec conflicts). Also the exact type of the Honda EB10000's
  50 A outlet.
- **NEC text:** the 2023 wording of 400.5 on counting the neutral, and of 525.20 /
  525.23. Secondary sources and older editions were used.
- **Per-segment GFCI on 208Y/120:** whether the A-B 1492-MCGAT note "grounded
  neutral 240V wye systems only" applies to the 1-pole part.
- **GFCI temperature ratings** above the 40 °C calibration.
- **Prices:** HBL2810SW, HBL2710SW, HBL2811SW, Leviton 560C9WLEV/560B9WLEV, Siemens
  spa panel and Square D parts are snippet-only. Lumen.ca prices are probably CAD.
  Several EMI Supply and Standard Electric URLs were truncated in the notes, and
  web search ran out before they could be recaptured.
- **Typical (not maximum) Mean Well leakage.**
- **Burning Man / BLM electrical or GFCI rules for art:** none published on the
  pages read.

## Spec conflicts with the decision

| Decision or assumption                             | Finding                                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Three-phase preferred"                            | **No rental generator has a three-phase twist-lock receptacle.** Three-phase needs a cam-lok distro, and L21-30 tops out at 25 A on 8/5 cord in heat                           |
| "A 30–50 A twist-lock, three-phase"                | **No 50 A three-phase twist-lock with a neutral exists.** CS8364/8365 has no neutral. 60 A IEC 60309 locks with a screw ring, not a twist, and needs about 4/5 cord            |
| "A 50 A split-phase twist-lock, waterproof"        | **No confirmed watertight 50 A twist-lock.** Marine and industrial CS6364/65 parts are IP20 bare and IP55–56 with boots. Woodhead Watertite (IP67) is unverified               |
| "One connector that fits rental generators"        | **No single twist-lock fits both kinds.** L14-30R is on portables (0 of 15 towables); CS6369 is on towables (1 of 31 portables). An adapter with a 30 A breaker is needed      |
| "RV-style connector, if twist-lock and waterproof" | RV 50 A is the 14-50 straight blade; SmartPlug is push-in and IP56. **No RV connector qualifies**                                                                              |
| 30 A feed on 10/4 SOOW                             | 10/4 holds 24.6 A at 50 °C, so **25 A breaker**. For a true 30 A, use 8/4 UL                                                                                                   |
| 8/4 SOOW in the cheapest watertight L14-30 (Eaton) | Eaton terminals take **#10 maximum**                                                                                                                                           |
| Hubbell CS6364C/CS6365C with 10/4                  | Grip minimum 19.1 mm, larger than 10/4's 18.2 mm OD                                                                                                                            |
| Cheap non-UL SOOW                                  | Fails NEC 525.20 "listed". UL 8/4 is 24.2 mm, not 18.1 mm                                                                                                                      |
| Full white on one feed                             | 64 spokes needs up to 9.0 kW, 128 spokes up to 17.1 kW. **A 30 A split feed (5.76 kVA) needs a software cap**: 60 % (64, high estimate), 30 % (128, high estimate)             |
| One GFCI for the ring                              | Leakage 8–18 mA on one leg, 2–5 mA balanced, against a 4 mA hold. **It would nuisance-trip.** Use a GFCI per segment. A GFCI-protected generator L14-30R carries the same risk |
| Closed electrical ring                             | Not allowed under NEC 310.10(G) below 1/0 AWG. A two-way feed would expose a live male plug. **Use an open, one-way radial ring**                                              |
| Leviton Wetguard in desert sun                     | Rated **−40 to 60 °C**. Hubbell SW is 75 °C                                                                                                                                    |
| Atlas Copco towable in the 240/480 V positions     | Its CS6369 gives **240/139 V**, which is over the rating of 120 V GFCI breakers. Use the 1φ 120/240 or 208Y position                                                           |
| Honda EU7000iS as the source                       | L14-30R limited to **22.9 A per leg** (5.5 kW). Still about 2.75× the average                                                                                                  |
