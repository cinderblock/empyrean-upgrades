# Self-climbing ring: options and pricing, October 2026

This file is the research behind a proposed new upgrade category: a
**self-climbing (self-erecting) ring**. The ring is built at ground level and
raises itself up its 8 legs, instead of being lifted by whatever V1 uses today.
It compares two ways of doing that:

1. **Pass-through arcs.** At each of the 8 legs, the ring has a sleeve (corner
   block) that the leg runs through, and the sleeve rides up the leg carrying
   the ring.
2. **Shelf on the verticals.** Each leg gets a sleeve block (carriage) with a
   shelf hanging off it. The existing ring sits on the 8 shelves and rises with
   them; the arcs are untouched.

**Method.** Specs and prices were checked on **2026-10-21** by read-only
browsing. Nothing was ordered, carted or quoted, and no vendor was contacted.
Specs come from manufacturer datasheets and catalogues where one could be read.
Prices come from retailers. Many rigging dealers sell by quote only, and many
pages blocked automated reading, so a fair share of the prices are search-snippet
only (Quoted\*). The day's web-search budget ran out before straight tower
sections, Tomcat and 20.5" tower parts, and US prices for D8+ hoists from
entertainment dealers could be priced. Those are marked Estimate. EUR, GBP and
AUD are converted at an **assumed** 1 EUR ≈ 1.15 USD, 1 GBP ≈ 1.33 USD and
1 AUD ≈ 0.65 USD; current rates were not checked. All prices are before tax and
shipping.

**Confidence key** (same as the other pricing files)

| Mark          | Meaning                                                           |
| ------------- | ----------------------------------------------------------------- |
| **Quoted**    | Price seen today on the retailer or maker page at the URL given   |
| **Quoted\***  | Price seen only in a search snippet or aggregator. Recheck it     |
| **Estimate**  | A range from comparable parts, or no price found                  |
| **Confirmed** | Spec read in a manufacturer datasheet, catalogue or official page |
| **Reported**  | Spec or rule from a retailer, secondary article, forum or snippet |
| **Assumed**   | Depends on an unchecked fact; the assumption is named             |
| **Unknown**   | Looked for and not found                                          |

Anything marked **(reasoning)** is my inference, not a cited fact.

---

## Summary

- **Option 1 doesn't need a special arc.** A standard ground-support **4-way
  sleeve block already is a pass-through corner block**: the tower runs through
  it, and truss bolts to its faces. The ring arcs bolt to two opposite faces of
  the sleeve block at each leg. The legs sit at segment joints (A/P, B/C, D/E …,
  `docs/v1-hardware.md`), which is exactly where a sleeve block goes. So the
  cheapest form of Option 1 (**1b** below) keeps all 16 V1 arcs and inserts 8
  stock sleeve blocks. The catch: a sleeve block is straight, so the ring grows
  by about 1.0–1.3 m (3.4–4.3 ft) in diameter, or less if V1 already has a
  junction block at each leg (Unknown). Keeping exactly 60 ft needs custom arcs
  (**1a**, quote-only).
- **Option 2's limit is the cantilever.** The ring sits beside the tower, so the
  shelf is loaded off-centre. Prolyte's published sleeve cantilever rating is
  **400 kg at 0.5 m, 200 kg at 1 m** (H30V/H40V tower). That covers a 12" ring.
  A 20.5" ring, which needs about 0.6–0.7 m of offset, is marginal at the upper
  weight estimate. Every maker's other ratings assume a centred load.
- **What lifts it.** Use 8 × **500 kg (1/2 t) D8+ electric chain hoists** on an
  8-channel controller, with load monitoring. The cheapest new D8+ hoist found is
  the **Chainmaster D8+ Ultra DC 500 kg at $3,199** (Thomann, double brake,
  climbing use allowed). 250 kg hoists are too small once uneven lifting is
  allowed for. The manual alternative, 8 × hand chain hoists at $400–1,200 each,
  is viable for a once-a-year lift and saves roughly $29–56k.
- **Power conflict.** Every D8+ hoist found is **3-phase** (208–460 V). The V2
  feed plan is split-phase L14-30 (`docs/pricing-power-feed-2026-10.md`). The
  hoists only run at set-up and strike, so the cheapest fix is probably a
  3-phase supply for those two days (Estimate, not priced firmly).
- **Heat.** No hoist datasheet found covers 50 °C at full duty. CM gives
  −17 to +40 °C. Harrington gives −20 to +40 °C. Verlinde Stagemaker states
  −20 to +50 °C, but only in its paint-finish paragraph. So lift in the cool
  hours, lock the ring off at height, and shade or remove the hoists for the
  week.
- **Inspector must-haves:**
  - D8+ (double-brake) hoists, or D8 hoists with a rated secondary at every
    point.
  - A **mechanical lock-off or secondary steel** at every sleeve block once at
    height, so the ring doesn't hang on the chain for a week.
  - An E1.6-4-style controller with a kill switch, plus load monitoring with
    overload and underload cut-out.
  - A cleared floor while the ring moves (D8+ may hold over people but not move
    over them).
  - Bases, outriggers and guys or ballast to an engineered anchor plan.
  - A logging anemometer at height and a written wind plan (ANSI E1.21).
  - An engineer's calculation package. Burning Man asks for one for structures
    over 20 ft, and the towers will be about 20–26 ft.

### Side-by-side (whole rig, 8 legs, USD, 2026-10-21)

All ranges assume a 12" (F34-class) ring with Global Truss-class tower parts; a
20.5" ring moves every line to the high end or beyond (see "Assumptions"). Per
leg figures include an eighth of the rig-wide items.

|                                         | **1b: stock sleeve blocks, keep V1 arcs**                   | **1a: custom pass-through arcs, keep 60 ft**  | **2: shelf on sleeve blocks**                        |
| --------------------------------------- | ----------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------- |
| How the ring rides                      | Ring bolted into 8 sleeve blocks, load centred on the tower | Same, but the sleeve is built into 8 new arcs | Ring clamped on 8 cantilevered shelves               |
| V1 arcs                                 | All 16 kept                                                 | 8 replaced (custom, quote-only)               | All 16 kept                                          |
| Ring diameter                           | Grows ~1.0–1.3 m (less if V1 has a junction block per leg)  | 60 ft kept                                    | 60 ft kept; towers stand ~0.5 m outside or inside it |
| Spokes                                  | ~0.5–0.65 m longer ties at the outer end                    | Unchanged                                     | Unchanged                                            |
| Load on sleeve                          | Centred, split over 2 faces (block rated 499 kg per side)   | Centred (custom rating needed)                | Eccentric: 400 kg at 0.5 m (Prolyte)                 |
| Ring braces the towers                  | Yes, rigidly                                                | Yes                                           | Only through the clamps                              |
| Custom parts                            | None                                                        | 8 arcs + their certification                  | Shelf arm and saddle (small)                         |
| Engineering difficulty (reasoning)      | Lowest: stock rated parts, centred loads                    | Highest: new welded load path                 | Medium: eccentric tower moment                       |
| **Per leg, electric D8+**               | **$10,300 – $21,400**                                       | **$12,500 – $28,800**                         | **$10,700 – $23,100**                                |
| **Whole rig, electric D8+**             | **$82,000 – $171,000**                                      | **$100,000 – $231,000**                       | **$85,000 – $184,000**                               |
| **Whole rig, manual hand chain hoists** | **$54,000 – $115,000**                                      | **$71,000 – $174,000**                        | **$57,000 – $128,000**                               |

The spread is wide because three unknowns drive it: whether the V1 legs can be
reused as tower sections (low end assumes yes), load monitoring
($2k for set-up-check dynamometers vs about $25k for an 8-point cut-out system),
and the engineering fee ($3k–15k, no credible published figure).

**Lean: Option 1b**, lifted by 8 Chainmaster D8+ 500 kg hoists (or hand chain
hoists, if the budget is tight). It uses only stock, load-rated parts, keeps the
load centred, and ties the 8 towers into one frame through the ring. All three
make the engineer's job, and the inspector's, the shortest (reasoning). Option 2
is the fallback if the V1 truss's connectors don't match any maker's sleeve
block. Option 1a only makes sense if the owner rejects a slightly larger ring.

---

## Assumptions (the facts we don't have)

The truss make and profile, the leg height, the ring height, the ring weight and
how V1 is raised today are all **Unknown** (`docs/v1-hardware.md`). These
assumptions carry every figure below.

| Quantity                           | Assumed value                                                                       | Basis                                                                                                                                                                                                                                                    | Confidence         |
| ---------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Ring length                        | ~57 m around (60 ft outer diameter)                                                 | `docs/v1-hardware.md`: 60 ft (Reported)                                                                                                                                                                                                                  | Reported           |
| Truss mass, 12" box                | 5–9.3 kg/m → 285–530 kg of ring                                                     | 9.3 kg/m from the Global Truss DT-GP 40 ft circle, 784 lb ([Stage Lighting Store](https://www.stagelightingstore.com/Global-Truss-DT-GP-Square-Truss-12-Bolt-Together-Box-Truss-40-Truss-Circle-16-X-22.5-Degree-Circular)); 5 kg/m is a light F34 guess | Assumed            |
| Truss mass, 20.5" box              | 12–16 kg/m → 685–910 kg                                                             | Typical medium-duty 20.5" box; not checked today                                                                                                                                                                                                         | Assumed            |
| 16 node + 16 power boxes           | 8–15 kg each → 255–480 kg                                                           | No V2 box designed yet                                                                                                                                                                                                                                   | Assumed            |
| Trunk, joint cords, misc           | ~100 kg                                                                             | 8/4 SOOW at ~1 kg/m around the ring                                                                                                                                                                                                                      | Assumed            |
| Spokes and hub                     | 150–400 kg, all carried by the ring                                                 | Assumes the hub hangs from the spokes, with no centre support                                                                                                                                                                                            | Assumed            |
| **Ring, all-in**                   | **12": 790–1,510 kg; 20.5": 1,190–1,890 kg**                                        | Sum of the above                                                                                                                                                                                                                                         | Assumed            |
| Static load per leg                | 12": 100–190 kg; 20.5": 150–235 kg                                                  | ÷ 8                                                                                                                                                                                                                                                      | Assumed            |
| Design load per lift point         | 12": 180–340 kg; 20.5": 270–425 kg; plus ~35 kg sleeve block                        | × 1.5 for uneven lifting on a continuous ring and × 1.2 dynamic (reasoning; the engineer sets the real factors)                                                                                                                                          | Assumed            |
| Ring height over the floor         | 4.5–6 m (15–20 ft)                                                                  | Clearance for dancing                                                                                                                                                                                                                                    | Assumed            |
| Tower height                       | 6–8 m (20–26 ft): ring + sleeve block + top section + hoist headroom                | (reasoning)                                                                                                                                                                                                                                              | Assumed            |
| Sleeve block length along the ring | 0.40–0.50 m                                                                         | A sleeve for a 290 mm tower; not measured                                                                                                                                                                                                                | Assumed            |
| V1 legs                            | Stand at segment joints; whether a junction block sits in the ring there is Unknown | `docs/v1-hardware.md`                                                                                                                                                                                                                                    | Reported / Unknown |

**Hoist size.** At 180–425 kg per point, **500 kg (1/2 t) hoists** are the
right class for either profile. A 250 kg D8+ hoist covers only a light 12" ring
with no margin, and a Stagemaker SR set up as D8+ is limited to half its
nameplate rating (SR brochure, below).

**Option 1b geometry (reasoning).** Each pair of arcs between two legs turns
45°. Inserting a straight block of length L at every leg pushes each arc pair
outward by L / (2 sin 22.5°) = 1.31 L. The straight block lies exactly on the
tangent of both arc ends, so the ring still closes; it just becomes 2 × 1.31 L
larger in diameter.

| L (net insert per leg)                                          | Ring grows (diameter)  | Spoke tie extension |
| --------------------------------------------------------------- | ---------------------- | ------------------- |
| 0.40 m (sleeve block, nothing there today)                      | 1.05 m (3.4 ft)        | 0.48–0.52 m         |
| 0.50 m                                                          | 1.31 m (4.3 ft)        | 0.60–0.65 m         |
| 0.11–0.21 m (sleeve replaces an existing 0.29 m junction block) | 0.29–0.55 m (1–1.8 ft) | 0.13–0.27 m         |

The pixels stay where they are on the strips; only the outer tie gets longer.
The software's ring radius changes with it.

---

## How it lifts (both options)

| Method                                           | How it works                                                                                        | Fits            | Notes                                                                                                                                                                                                                                                    |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hoist hung from a top section**                | Hoist body up, hung from the tower's top section (Global Truss GT-TOP/CM); hook on the sleeve block | Both            | The standard ground-support set-up. The hoist sits at the top in the sun all week unless it is removed after lock-off                                                                                                                                    |
| **Climbing hoist**                               | Hoist body fixed to the sleeve block, chain anchored at the top; the motor rides up with the ring   | Both            | Chainmaster D8+ allows climbing use (Thomann listing, Reported); Stagemaker SR does by reversing the chain bag (brochure, Confirmed). The power cable travels with the hoist                                                                             |
| **Ground hoist over a top sheave**               | Hoist at the base, chain over a pulley in the top section, down to the sleeve                       | Both            | Hoist stays shaded and reachable. Top section carries about twice the lifted load (reasoning). Chain must be about twice the lift. Global Truss F34 PL "pulley top" exists (UK, £375 ex VAT, Quoted\*)                                                   |
| **Hand chain hoist**                             | As "hung from a top section", pulled by hand from the ground                                        | Both            | Needs 8 crew pulling in step with a caller, and a hand chain long enough to reach the ground                                                                                                                                                             |
| **Tower winch**                                  | Prolyte MPT tower: hand winch (750 kg) or chain hoist (1,000 kg), 8 m max                           | Both            | A complete rated tower system ([Prolyte MPT](https://www.prolyte.com/products/aluminium-truss/tower-systems/mpt-tower), Confirmed). Basis set €7,586 ≈ $8,724 ([Huss](https://www.huss-licht-ton.de/print_product_info.php/products_id/23637), Quoted\*) |
| Boat/brake winch (Dutton-Lainson DLB1200A, $180) | Winch on the leg, wire rope over a top sheave                                                       | Not recommended | Not rated for loads over people; only the DLB brake series may lift vertically                                                                                                                                                                           |

**Keeping 8 points level (reasoning).** Fixed-speed hoists don't run at exactly
the same speed. If two hoists differ by a few percent, they drift apart by
roughly 10–25 cm over a 5 m lift (assumed tolerance, not from a datasheet). On a
continuous ring with about 7 m between legs, that forces load from the low
point onto its neighbours. Standard practice: lift in steps of about 0.5 m,
check level (marks on the towers, or a laser), bump individual channels, and
let load cells trip the motors on overload or underload. Motion Labs
Cell\*Mate + WardeN is the only system found that cuts the motors
automatically. True synchronised variable-speed control (Kinesys Elevation)
exists, but is quote-only and far above this budget.

---

## Line items

### Shared by every option: per leg

| #   | Item                                          | Make / model                                                                                                      | Rated / spec                                                                                                                              | Unit price (low – high)                    | Price source (2026-10-21)                                                                                                                                                                                                                                       | Datasheet / spec source                                                                                                                                                                                             | Confidence          |
| --- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| S1  | Tower base with screw jacks                   | Global Truss GT-44BS-1 (F34)                                                                                      | 86 lb, 24.4" square                                                                                                                       | $1,166                                     | [Stage Lighting Store](https://www.stagelightingstore.com/Global-Truss-Ground-Support-Base-For-F34-DT34P-Truss)                                                                                                                                                 | [globaltruss.com/ground-support](https://www.globaltruss.com/ground-support)                                                                                                                                        | Quoted / Reported   |
| S2  | Outriggers, set of 4                          | Global Truss GT-49214S-1                                                                                          | 24 lb each                                                                                                                                | $1,480 (4 × $370)                          | [SoundPro](https://soundpro.com/products/global-truss-gs0027-gt-49214s-1) (sold out)                                                                                                                                                                            | same                                                                                                                                                                                                                | Quoted              |
| S3  | Top section for a chain hoist                 | Global Truss GT-TOP/CM (F34)                                                                                      | Not published                                                                                                                             | $639 – $799                                | [IDJ](https://idjnow.com/global-truss-gt-top-cm-f34-ground-support-top-section.html)                                                                                                                                                                            | same                                                                                                                                                                                                                | Quoted\*            |
| S4  | Hinges, set of 4 (only for tilting towers up) | Global Truss M12 hinge L/R                                                                                        | —                                                                                                                                         | $0 – $252                                  | gearclubdirect.com (snippet)                                                                                                                                                                                                                                    | —                                                                                                                                                                                                                   | Quoted\*            |
| S5  | Tower sections, 6–8 m                         | F34 straights                                                                                                     | —                                                                                                                                         | $0 (reuse V1 legs, if compatible) – $1,500 | Not priced: search budget ran out                                                                                                                                                                                                                               | —                                                                                                                                                                                                                   | Estimate            |
| S6  | Electric hoist, 500 kg D8+                    | **Chainmaster D8+ Ultra DC 500 kg** (low) / **CM Lodestar D8+ 500 kg** (high)                                     | Chainmaster: 4 m/min, 2 DC brakes, IP55, climbing allowed, 3 × 230/400 V. CM: 4.9 m/min, double brake, 8:1, SQP2, IP66, 230/460 V 3-phase | $3,199 – $4,556                            | [Thomann](https://www.thomannmusic.com/chainmaster_d8_ultra_dc_500kg_1875m_h_h.htm) (Quoted); CM ~$4,160 direct / ~$4,556 low-voltage control ([shopmtn](https://shopmtn.co.uk/products/copy-of-cm-lodestar-d8-1-2-ton), Quoted\*, old page)                    | Chainmaster: Thomann listing (Reported). [CM D8+ flyer](https://cmco.com/globalassets/hoisting--lifting-products/electric--air-hoists/cm-et/d8sqp2_flyer.pdf) (PDF text unreadable; figures via snippets, Reported) | Quoted / Reported   |
| S6m | _or_ hand chain hoist, 1/2 t, ~25–30 ft lift  | CM Series 622 (low) / CM Cyclone (high)                                                                           | 1/2 t                                                                                                                                     | $400 – $1,200                              | 622 20 ft: $365 ([Motion](https://punchout.prod.motion.com/products/sku/07773136), Quoted\*); Cyclone 20 ft $916–969 ([Hoosier Crane](https://www.hoosiercrane.com/new-equipment/hoists/manual-hoist/hand-chain-hoist/1_2_ton-20_ft), Quoted\*); + longer chain | —                                                                                                                                                                                                                   | Quoted\* / Estimate |
| S7  | Motor cable, controller to hoist              | —                                                                                                                 | —                                                                                                                                         | $100 – $300                                | Not priced                                                                                                                                                                                                                                                      | —                                                                                                                                                                                                                   | Estimate            |
| S8  | Secondary steel: 2 slings + 4 shackles        | Global Truss 9 ft steel-core sling (5,300 lb vertical); Crosby G-209 5/8" (3.25 t WLL)                            | —                                                                                                                                         | $338 – $600                                | Sling $95 ([SCMS](https://www.scmsinc.com/global-truss-wirerope-9-gac-flex-wire-rope-9.html), Quoted\*); shackle $37.05 ([Hanes](https://www.hanessupply.com/brands/crosby), Quoted\*)                                                                          | Crosby catalogue (not opened today)                                                                                                                                                                                 | Quoted\*            |
| S9  | Sleeve-block lock-off at height               | e.g. JTE B4120 adjustable lock-off, or pins to the maker's method                                                 | —                                                                                                                                         | $100 – $500                                | No price found                                                                                                                                                                                                                                                  | [JTE Towers PDF](https://www.jthomaseng.com/getmedia/19c125c5-1c57-47c3-8fc1-925895c90ff6/Towers.pdf.aspx?ext=.pdf)                                                                                                 | Estimate            |
| S10 | Guys or ballast                               | 3 × Crosby HG-228 5/8" turnbuckle (3,500 lb WLL), wire rope, clips; anchors per the anchor plan; or water ballast | —                                                                                                                                         | $600 – $1,500                              | Turnbuckle $140.78 ([Hanes](https://www.hanessupply.com/crosby-1032616), Quoted\*); Duckbill 88-DB $35.75 ([Wes-Spur](https://wesspur.com/duckbill/), Quoted\*); IBC tote $30–85 (Quoted\*)                                                                     | [Duckbill spec](https://www.foundationtechnologies.com/products/duckbill-earth-anchors/)                                                                                                                            | Quoted\* / Estimate |

**Shared per leg subtotal (S1–S10, excluding the sleeve block or arc):**
electric $7,600 – $12,700; manual $4,700 – $9,000.

### Shared by every option: whole rig

| #   | Item                                                             | Make / model                                                                                                                                                      | Spec                                                                                                                                                       | Price (low – high) | Price source (2026-10-21)                                                                                                                                                                                                                                                                       | Spec source                                                                                                                                                                                                       | Confidence          |
| --- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| R1  | 8-channel hoist controller, 208 V 3-phase (electric only)        | Gamma GL-ELECHOISTCNTR2 (low) / **Motion Labs 1200-8-C-K-1313** (high)                                                                                            | Motion Labs: L21-30 in, 8 × C7-30 out, phase-reversing contactors, phase monitoring, remote with 8 up/down switches, GO and maintained KILL, ETL / UL 1640 | $3,860 – $5,656    | Gamma ([IDJ](https://www.idjnow.com/gamma-gl-elechoistcntr2-controller.html), Quoted\*); Motion Labs $5,655.88 ([filmandvideolighting](https://www.filmandvideolighting.com/motion-labs-chain-hoist-motor-control-8-channel-l21-30-in-c7-30-out-208v-3-phase-8ru-up-to-1-hp-stee.html), Quoted) | [Motion Labs spec sheet](https://fullcompass.com/common/files/88895-UnnamedDocument.pdf) (Confirmed)                                                                                                              | Quoted              |
| R2  | Load monitoring                                                  | Low: 2–3 generic wireless dynamometers for set-up checks only. High: 8-point Broadweigh (IP67) or Motion Labs Cell\*Mate + WardeN (cuts motors on over/underload) | —                                                                                                                                                          | $2,000 – $25,000   | All entertainment systems are quote-only; generic 3 t unit $264–660 (Quoted\*); Tractel dynafor Expert 3.2 t $2,853.50 ([TEquipment](https://www.tequipment.net/Tractel/dynafor-Expert-3.2t/Scales/Weight/), Quoted\*)                                                                          | [Broadweigh](https://www.ac-et.com/products/broadweigh-wireless-load-shackles); [Cell\*Mate](https://nvision360.com/shop/cell-mate-8channel-load-cell-system/). Kinesys LibraCELL is indoor-only, so not suitable | Estimate            |
| R3  | Logging anemometer at height                                     | Davis 6410 + console/logger (low) / WINDCRANE Mini with display (high)                                                                                            | Davis: 1–200 mph                                                                                                                                           | $535 – $3,320      | Davis $235 ([Davis](https://davisinstruments.com/product/anemometer-for-vantage-pro2-vantage-pro), Quoted\*) + ~$300 console (Estimate); WINDCRANE AUD 5,105 ([Instrument Choice](https://www.instrumentchoice.com.au/products/windcrane-mini-with-display), Quoted\*)                          | —                                                                                                                                                                                                                 | Quoted\* / Estimate |
| R4  | Engineering: calculation package, wind and anchor plan, sign-off | Structural engineer (PE)                                                                                                                                          | —                                                                                                                                                          | $3,000 – $15,000   | No credible published figure                                                                                                                                                                                                                                                                    | —                                                                                                                                                                                                                 | Estimate            |
| R5  | 3-phase power for set-up and strike (electric only)              | 3-phase genset or distro to L21-30                                                                                                                                | ~8 × 1 HP                                                                                                                                                  | $300 – $1,500      | Not priced                                                                                                                                                                                                                                                                                      | `docs/pricing-power-feed-2026-10.md`: rental gensets have no L21-30R                                                                                                                                              | Estimate            |

**Rig-wide subtotal:** electric $9,700 – $50,500; manual (no R1, R5; R2
$700–5,000) $4,200 – $23,300.

### Option 1b: stock sleeve blocks in the ring, V1 arcs kept

| #    | Item                                     | Make / model                                                                     | Rated                                                                                      | Per leg (low – high) | Price source                                                                                                                                                                                                                      | Spec source               | Confidence        |
| ---- | ---------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------- |
| 1b-1 | 4-way sleeve block (the "pass-through")  | Global Truss F34 PL CA-3 box sleeve (low, UK) / **Global Truss GT-BLOCK** (high) | CA-3: 1,450 kg on 1 side, 3,360 kg on 4 sides. GT-BLOCK: 1,100 lb (499 kg) per side, 77 lb | $1,267 – $1,959      | CA-3 £952.50 ex VAT ([Stagesupply](https://stagesupply.co.uk/?p=47783), Quoted\*, plus import); GT-BLOCK $1,959 ([Stage Lighting Store](https://www.stagelightingstore.com/Global-Truss-Ground-Support-F34-Sleeve-Block), Quoted) | Retailer pages (Reported) | Quoted / Quoted\* |
| 1b-2 | Connectors for 2 faces                   | Maker's conical couplers, pins, R-clips                                          | —                                                                                          | $120 – $200          | Not priced                                                                                                                                                                                                                        | —                         | Estimate          |
| 1b-3 | 8 spoke tie extensions (one leg's share) | Rated rope or wire tie + turnbuckle, plus pigtail power/data extension           | —                                                                                          | $80 – $240           | Not priced                                                                                                                                                                                                                        | —                         | Estimate          |

**Per leg, electric:** $7,600–12,700 + $1,470–2,400 + 1/8 of rig-wide
$1,200–6,300 = **$10,300 – $21,400**. **Whole rig:** electric
**$82,000 – $171,000**; manual **$54,000 – $115,000**.

Not recommended for the sleeve: **ProX XT-BLOCK-MK2** ($1,049.99,
[SoundPro](https://soundpro.com/products/prox-xt-block-mk2), Quoted\*). Only its
side hooks are rated (1,000 lb each); the block itself has no structural rating.

### Option 1a: custom pass-through arcs, 60 ft kept

Replaces 1b-1 to 1b-3 with:

| #    | Item                                                                    | Make / model                                                           | Rated                        | Price (low – high)   | Price source                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Confidence |
| ---- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1a-1 | Arc with an integrated sleeve at the leg end, 30 ft radius, one per leg | Custom (Tomcat, Xtreme Structures, Global Truss, Prolyte custom shops) | To be designed and certified | $3,000 – $8,000 each | Quote-only. Public ballpark: stock 12" arcs cost $597 (Global Truss F34 10 m circle, 12 × 30°, kit $7,167, [Full Compass](https://fullcompass.com/prod/630198-global-truss-sq-c10-30-kit-12x-sq-c10-arc30-30-arc-segments), Quoted\*) to $1,091 (DT-GP 40 ft circle, 16 × 22.5°, kit $17,463, [Stage Lighting Store](https://www.stagelightingstore.com/Global-Truss-DT-GP-Square-Truss-12-Bolt-Together-Box-Truss-40-Truss-Circle-16-X-22.5-Degree-Circular), Quoted) each. No maker sells a 60 ft circle off the shelf; the sleeve, rollers and certification are the premium | Estimate   |
| 1a-2 | Rig-wide: design, drawings, load test of the custom arc (added to R4)   | —                                                                      | —                            | $5,000 – $15,000     | No figure found                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Estimate   |

**Per leg, electric:** $12,500 – $28,800. **Whole rig:** electric
**$100,000 – $231,000**; manual **$71,000 – $174,000**.

A variant that keeps 60 ft with stock sleeve blocks needs **all 16** arcs remade
at a tighter radius (each arc pair has to absorb the straight block), so it
costs more than 1a (reasoning). Not priced.

### Option 2: shelf on sleeve blocks, ring unchanged

| #   | Item                                                                     | Make / model                                           | Rated                                                                                                                 | Per leg (low – high)  | Price source | Spec source                                                                                                                                                                                                        | Confidence         |
| --- | ------------------------------------------------------------------------ | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| 2-1 | Sleeve block                                                             | as 1b-1 (or Prolyte MPT-010 sleeve module for H30/H40) | Prolyte MPT sleeve cantilever, H30V/H40V: **400 kg at 0.5 m, 200 kg at 1 m, 130 kg at 1.5 m**; H40D: 160 / 80 / 50 kg | $1,267 – $1,959       | as 1b-1      | [Prolyte MPT](https://www.prolyte.com/products/aluminium-truss/tower-systems/mpt-tower), [MPT flyer](https://www.prolyte.com/getmedia/a6b296ed-1d7e-4b1d-8886-377d742aa139/MPT-Tower-Flyer_1.pdf.aspx) (Confirmed) | Quoted / Confirmed |
| 2-2 | Shelf arm: 0.5 m truss stub on one sleeve face                           | Same maker as the sleeve                               | Cantilever per 2-1                                                                                                    | $150 – $250           | Not priced   | —                                                                                                                                                                                                                  | Estimate           |
| 2-3 | Saddle and clamps holding the ring down (wind uplift)                    | Fabricated saddle + rated half-couplers                | To be designed                                                                                                        | $300 – $1,500         | Not priced   | —                                                                                                                                                                                                                  | Estimate           |
| 2-4 | Rig-wide: extra engineering for the eccentric tower moment (added to R4) | —                                                      | —                                                                                                                     | $1,000 – $3,000 total | —            | —                                                                                                                                                                                                                  | Estimate           |

**Per leg, electric:** $10,700 – $23,100. **Whole rig:** electric
**$85,000 – $184,000**; manual **$57,000 – $128,000**.

Offset (reasoning): tower half-width 0.145 m + ring half-width + clearance gives
about 0.35–0.5 m for a 12" ring (within the 400 kg at 0.5 m rating, against
180–340 kg design), and about 0.6–0.7 m for 20.5" (roughly 300 kg by
interpolation, against 270–425 kg design: marginal).

### Cheaper hoists (flagged: not entertainment-rated)

| Product                                             | Spec                                                                                                                                               | Price                                                                                                                                                                                               | Why it's not the answer                                                                                                               |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Used CM single-brake 1/2 t Lodestar, pair with case | 60 ft lift                                                                                                                                         | $2,855 per pair (~$1,430 each), [Christie Lites, 2026-06-16](https://www.christielitesusedgear.com/fr/blogs/latest-news-and-updates/price-drop-used-cm-single-brake-motor-sets-with-cases) (Quoted) | Single brake: D8 class at best. Acceptable only with secondary steels and nobody under it while it moves. Saves ~$14–25k over new D8+ |
| CM Lodestar model F 2752NH, industrial              | 1/2 t, 4.9 m/min, **115 V single-phase** or 230/460 V 3-phase, single DC brake, −17 to +40 °C                                                      | $3,183–3,412 ([hoists.com](https://hoists.com/product/cm-lodestar-model-f-1-2-ton-16fpm-electric-chain-hoist/), Quoted)                                                                             | ASME B30.16 forbids loads over people with industrial hoists; fixed body-up only                                                      |
| Harrington SNER005L-20                              | 1/2 t, 115 V, −20 to +40 °C ([manual](https://cdn.harringtonhoists.com/download/2021/03/12/5cmapg30e3_ER2_Large_Cap_Owners_Manual.pdf), Confirmed) | $2,433 (Quoted\*)                                                                                                                                                                                   | Same                                                                                                                                  |
| VEVOR / eBay 1 t 120 V chain hoist                  | Unknown chain grade and brake                                                                                                                      | $307–585 (Quoted\*)                                                                                                                                                                                 | No documented overload clutch, no pedigree an inspector would accept                                                                  |
| Harbor Freight Pittsburgh 1,300 lb (62853)          | Wire rope, ~2 min on / 8 min off (reviewer)                                                                                                        | $149.99 ([Harbor Freight](https://www.harborfreight.com/1300-lb-electric-hoist-with-remote-control-62853.html), Quoted)                                                                             | Not a chain hoist; not rated for this                                                                                                 |

### Manual option: is it viable?

Yes, for a ring that goes up once and comes down once per event (reasoning).

- **Cost.** Eight 1/2 t hand chain hoists cost $3,200–9,600. That is against
  $25,600–36,400 for eight D8+ hoists, plus the $3,900–5,700 controller and the
  3-phase power. The manual route saves **roughly $29–56k** over the whole rig.
- **Crew and levelling.** It needs 8 people pulling in step, a caller, and
  level checks every ~0.5 m. Pull effort and chain length per metre of lift
  weren't checked against a CM datasheet, so the lift time is Unknown. Expect it
  to be slow.
- **Safety.** Hand chain hoists are commonly used in entertainment rigging for
  dead-hung loads (the CM Cyclone is the usual one). They hang fixed from the
  top section; they don't climb. The lock-off, secondary steels, cleared floor
  and engineering apply exactly as for electric.
- **Winches.** A rated tower winch (Prolyte MPT, 750 kg) is the other manual
  path. A generic brake winch is not suitable over people.
- **Lowering in a storm.** The ring can still be lowered by hand, just slowly.

---

## Safety: what an inspector will expect

| Requirement                                                                  | Why                                                                                                                                                                                                                                                                                  | Source                                                                                                                                                                                                                        | Confidence           |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| D8+ (double brake, ~8:1) hoists, or D8 plus a rated secondary at every point | D8 needs a secondary to hold over people; D8+ may hold over people but not move over them; C1 is needed to move over people                                                                                                                                                          | German DGUV practice, via [Hoist Magazine](https://www.hoistmagazine.com/?p=4551)                                                                                                                                             | Reported             |
| Clear the floor while the ring moves                                         | Follows from the line above                                                                                                                                                                                                                                                          | same                                                                                                                                                                                                                          | Reported             |
| Entertainment hoists, not industrial                                         | ASME B30.16 bars loads over people for industrial hoists; ANSI E1.6-2 removed that bar for entertainment chain hoists                                                                                                                                                                | same                                                                                                                                                                                                                          | Reported             |
| Lock-off or secondary steel at each sleeve once at height                    | Keeps the ring off the chain and brakes for days; lets the hoists be removed from the heat                                                                                                                                                                                           | JTE sells lock-offs B4110/B4120 ([Towers PDF](https://www.jthomaseng.com/getmedia/19c125c5-1c57-47c3-8fc1-925895c90ff6/Towers.pdf.aspx?ext=.pdf))                                                                             | Confirmed (JTE)      |
| Controller to ANSI E1.6-4 (portable fixed-speed hoist control), with a kill  | The standard for exactly this controller                                                                                                                                                                                                                                             | [ESTA TSP published documents](https://tsp.esta.org/tsp/documents/published_docs.php) (free; clause text not read)                                                                                                            | Reported             |
| Load monitoring with over/underload cut-out                                  | 8 fixed-speed hoists drift; cells catch the point that's carrying too much or too little                                                                                                                                                                                             | (reasoning); Cell\*Mate + WardeN does it                                                                                                                                                                                      | Reported             |
| Bases, outriggers, guys or ballast to an engineered plan                     | No maker publishes an outdoor wind rating for a bare tower. JTE: guy outdoor towers from the sleeve block to anchors, bases on 3 ft plywood pads. Applied: guys required outdoors                                                                                                    | JTE Towers PDF (Confirmed); Applied via [Stage Lighting Store](https://www.stagelightingstore.com/Applied-NN-GS-35-Tower-12-in) (Reported)                                                                                    | Confirmed / Reported |
| Written operations / wind plan and a logging anemometer at height            | ANSI E1.21 (temporary outdoor structures): continuous on-site wind monitoring, anemometer near the highest element, logged readings, a named person watching the forecast. Seen only in a 2013 draft; check E1.21-2024                                                               | [controlgeek, 2013 draft](https://controlgeek.net/blog/2013/4/15/progress-in-outdoor-stage-structure-standard-draft)                                                                                                          | Reported             |
| Engineering calculation package                                              | Burning Man: 10–15 ft needs drawings and uplift/bearing calcs; 16–20 ft adds construction drawings, rigging forces, wind and gravity calcs; over 20 ft "the engineering calculation package (if available)". No stamp is mandated, but larger works have had third-party peer review | [Building Safe Structures](https://burningman.org/black-rock-city/bring-your-art/art-installation-guidelines/building-safe-structures/); [STRUCTURE mag](https://www.structuremag.org/article/black-rock-lighthouse-service/) | Confirmed (BM page)  |
| Anchor rules at Burning Man                                                  | Anchors described there are 4 ft steel, 3,000 lb in vertical tension, **not rated for shear**, ≥ 3 ft apart, not ganged, not through base plates; guys flagged and lit at night. Shallow guy angles hit the no-shear limit                                                           | same BM page                                                                                                                                                                                                                  | Reported             |
| Inspection records                                                           | ANSI E1.47 (entertainment rigging inspections); certificates for every shackle, sling and turnbuckle                                                                                                                                                                                 | ESTA TSP list                                                                                                                                                                                                                 | Reported             |
| Height limits of the tower system                                            | Global Truss GT: 6 m max (may be too short); Prolyte MPT 8 m; Eurotruss HD34 10 m; Tomcat / Applied 12" 35 ft; JTE 12" 33 ft, 20.5" 40 ft                                                                                                                                            | Maker pages and PDFs                                                                                                                                                                                                          | Confirmed / Reported |
| Heat                                                                         | Hoists rated to 40 °C (CM, Harrington); Stagemaker states 50 °C (paint paragraph only). Lift early, shade, remove after lock-off                                                                                                                                                     | CM page (Reported); Harrington manual (Confirmed); [Stagemaker SR brochure](https://www.erento.com/static/image-products/5c/3cd/5c3cd0b4-cdcd-5449-a1f3-daf66a3c0e18_6218833.pdf) (Confirmed, with caveat)                    | Confirmed / Reported |

**Profile matters for the tower family (reasoning, from the maker data).**
Sleeve-block faces take that maker's connectors. A 12" (290 mm) ring opens up
Global Truss, Prolyte, ProX and Eurotruss. A 20.5" ring points to JTE (sleeve
plate B20-12SP), Applied or Tomcat, which are quote or rental-only, so the
20.5" case is the costlier and less certain one. If the V1 truss is a no-name
profile whose connectors match no maker's sleeve block, Option 2 (clamped
shelf) becomes the practical route.

---

## Questions the owner must answer

1. **What is the V1 truss?** Make, profile (12" / 20.5" / other), connector
   type (conical, fork, plate) and wall. Everything above depends on it.
   A photo of a joint and of a leg top would settle most of it.
2. **How do the V1 legs meet the ring?** Is there a junction or corner block in
   the ring at each leg, or does the ring sit on top of the legs? That decides
   how much the ring grows under Option 1b (1–1.8 ft or 3.4–4.3 ft).
3. **How is V1 raised today, and how high is it?** Leg height, ring height over
   the floor, and the crew and machinery used (forklift, telehandler, by hand).
4. **What does it weigh?** Weigh one dressed segment (truss + boxes + cables),
   and say whether the hub hangs from the spokes or has its own support. A hub
   with its own support would need its own lift point.
5. **Is a slightly larger ring acceptable** (Option 1b), with longer outer
   spoke ties? Recommended: yes, if the answer to 2 keeps the growth small.
6. **Electric or manual?** Recommended: electric D8+ if the budget allows,
   because it makes the ring truly self-raising and lowers it quickly in a
   storm. Manual saves about $29–56k.
7. **Is 3-phase power available at set-up and strike?** The V2 feed is planned
   as split-phase; every D8+ hoist found is 3-phase.
8. **Hoists rigged all week, or removed after lock-off?** Removing them avoids
   the 40 °C ratings and the dust, but means the ring can't be lowered in a
   storm without re-rigging.
9. **Own or rent?** The hoists and controller sit idle 51 weeks a year. Renting
   them for each event may beat buying them (not priced: rental needs quotes).
10. **Which events, and who inspects?** Burning Man's Art Support Services
    only, or also festivals with a county inspector? That sets how much
    engineering is needed and whether D8+ is required or D8 plus secondaries
    will do.
11. **May I request quotes?** Custom arcs (1a), load-monitoring systems, US
    D8+ dealer prices, 20.5" tower parts and an engineer's fee are all quote-only.
    No quote has been requested.
