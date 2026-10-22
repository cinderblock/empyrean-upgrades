# Transport: a container and carts, pricing, October 2026

This file is the research behind the proposed **Transport** category
(`plans/transport.md`): a shipping container that belongs to the Gate, and
carts that roll everything in and out of it, on a container floor and on the
playa.

**Method.** Prices and specs were checked on **2026-10-21** by read-only
browsing. Nothing was ordered, carted or quoted, and no vendor was contacted.
Container specs come from a carrier's published spec page; prices come from
retailer and dealer pages. Many pages blocked automated reading (Conexwest,
Hapag-Lloyd, IDJ, Full Compass, Harbor Freight, ePlaya), so a fair share of
prices are search-snippet only (Quoted\*). All prices are before tax and
shipping unless the line says "delivered".

**Confidence key** (same as the other pricing files)

| Mark          | Meaning                                                           |
| ------------- | ----------------------------------------------------------------- |
| **Quoted**    | Price seen today on the retailer or dealer page at the URL given  |
| **Quoted\***  | Price seen only in a search snippet or aggregator. Recheck it     |
| **Estimate**  | A range from comparable items, or no price found                  |
| **Confirmed** | Spec or rule read on a maker, carrier or official page            |
| **Reported**  | Spec or rule from a retailer, secondary article, forum or snippet |
| **Assumed**   | Depends on an unchecked fact; the assumption is named             |
| **Unknown**   | Looked for and not found                                          |

Anything marked **(reasoning)** is my inference, not a cited fact.

---

## Summary

- **A 20 ft container is too small. Buy one 40 ft high cube.** At the assumed
  stack heights the Gate alone (16 arcs with their boxes, 8 legs, hub, spokes,
  cases and the playa wagons) needs about **21–24 m² of floor**. A 20 ft box
  has 13.9 m², a 40 ft box 28.3 m² (section 1). The ring's arcs plus hub plus
  cases already overflow a 20 ft before the legs go in (reasoning).
- **The 40 ft box is close to full with the Gate alone**: about 75–95 % of the
  floor in a two-lane layout. If the 8 hoists and their ground-support steel
  (`plans/rigging.md`) and the solar kit (`plans/solar.md`) are both bought,
  they do not fit as well. Plan on stacking cases on shelves over the carts,
  or a second 20 ft box (reasoning, section 1c).
- **High cube costs no more.** One-trip 40 ft HC: **$3,690** at Western
  Container Sales' Oakland depot, less than its 40 ft standard ($4,790). The
  extra 0.3 m of door height lets a cart on 12" pneumatic casters carry arcs
  4–5 high (Quoted, section 2).
- **Buy in the Bay Area, even for Reno.** Reno dealers sell Oakland stock.
  Western Container Sales adds about **$1,774** to deliver one box to Reno,
  about the price of a used box (Quoted).
- **Keep the stock cargo doors and get doors on both ends** ("tunnel", +$1,100
  for a one-trip 40 ft HC). Then both lanes unload from either end. An end
  roll-up door shrinks the opening (reasoning), so it is not recommended. A
  side roll-up door is an optional extra for reaching the middle of a full
  box.
- **No truss dolly on the market has playa wheels.** Every one found rolls on
  4" casters, which suit the container floor only. Burning Man's own advice is
  "the wider your tires, the better". The recommendation: one **custom cart
  design** on 12–16" pneumatic or flat-free wheels, built 4 times (2 for arcs,
  2 for legs), plus 16" pneumatic wagons (Uline, 3,000 lb) to carry cases
  across the playa. Road cases keep their small casters for the container and
  hard ground.
- **The container goes in a camp, not by the art.** Burning Man's art
  guidelines say "Domes, shipping containers, and tents are more suited for the
  camping areas", and nothing may stay at the art site. Deliveries go through
  the Outside Services (OSS) program, by an approved hauler holding a BLM
  permit, or the project hauls it itself (Confirmed, section 4).
- **Yearly cost depends on where it lives**: about **$1,900–3,900 a year**
  stored near the playa (Temen Logistics, $2.75/sq ft/yr), **$3,200–8,000**
  in a Reno-area yard, **$7,400–15,400** in the Bay Area (mostly Estimates;
  no hauler publishes playa prices).

### Recommended setup (one-time, Gate only, 12" truss)

Ranges are before the site's 15 % contingency. Line IDs point to the detail
tables below.

| ID  | Item                                                                       | Qty | Unit, low–high | Total, low–high    | Confidence          |
| --- | -------------------------------------------------------------------------- | --- | -------------- | ------------------ | ------------------- |
| C1  | 40 ft high cube, one-trip, doors both ends, delivered to its storage yard  | 1   | $4,000–6,600   | **$4,000–6,600**   | Quoted / Estimate   |
| M1  | Container ramp for carts                                                   | 1   | $300–1,900     | $300–1,900         | Quoted\* / Estimate |
| M2  | E-track, 2 rows per side wall (16 × 10 ft rails), installed                | 1   | $600–2,650     | $600–2,650         | Quoted\* / Estimate |
| M3  | E-track straps and fittings                                                | 1   | $110–400       | $110–400           | Quoted              |
| M4  | Load bars (E-track or shoring beams)                                       | 6   | $78–139        | $470–840           | Quoted\*            |
| M5  | Shelving, blind end and over the carts                                     | 1   | $400–1,500     | $400–1,500         | Quoted\* / Estimate |
| M6  | Vents with dust filters                                                    | 2–4 | —              | $250–1,000         | Estimate            |
| M7  | Solar interior lights                                                      | 1   | $90–300        | $90–300            | Quoted\*            |
| M8  | Lockbox and shrouded (puck) padlocks                                       | 1   | $60–210        | $60–210            | Quoted\* / Estimate |
| M9  | White reflective roof coating                                              | 1   | $150–500       | $150–500           | Estimate            |
|     | **Container and mods**                                                     |     |                | **$6,430–15,900**  |                     |
| K1  | Arc cart: custom frame, 2 cradles, 12–16" pneumatic/flat-free, 8 arcs each | 2   | $1,200–3,000   | $2,400–6,000       | Estimate            |
| K2  | Leg cart: same design (high), or ProX truss dolly kit (low)                | 2   | $370–3,000     | $740–6,000         | Quoted\* / Estimate |
| K3  | Hub cart (hub construction Unknown)                                        | 1   | $600–2,500     | $600–2,500         | Estimate            |
| K4  | Playa wagon, 16" pneumatic, 3,000 lb (Uline H-2547), or 12" Little Giant   | 3   | $599–780       | $1,800–2,340       | Quoted / Quoted\*   |
| K5  | Light utility cart, 13" pneumatic (Gorilla GOR1201B)                       | 2   | $200–230       | $400–460           | Quoted\*            |
| K6  | Show-computer rack case on casters (12U)                                   | 1   | $370–2,085     | $370–2,085         | Quoted\*            |
| K7  | Trunks on casters: spares, cables (feeder, jumpers), tools and hardware    | 3   | $400–875       | $1,550–2,625       | Quoted\*            |
| K8  | Spoke trunks with dividers, 64 coiled spokes                               | 2–4 | $750–975       | $1,500–3,900       | Quoted\* / Estimate |
| K9  | Spare wheels, tubes or flat-free tyres, pump                               | 1   | $150–400       | $150–400           | Estimate            |
|     | **Carts and cases**                                                        |     |                | **$9,510–26,310**  |                     |
|     | **One-time total**                                                         |     |                | **$15,940–42,210** |                     |

### Optional add-ons (one-time)

| ID  | Add-on                                                                                 | Total, low–high | Confidence          |
| --- | -------------------------------------------------------------------------------------- | --------------- | ------------------- |
| O1  | Side roll-up door (8 ft), cut in mid-box to reach the middle of a full load            | $1,000–3,000+   | Quoted\* / Estimate |
| O2  | Rigging kit transport: 4 two-hoist cases, controller case, motor-cable trunk, a wagon  | $3,130–8,355    | Quoted\* / Estimate |
| O3  | Solar kit transport: padded A-frame panel cart, battery wagon, balance-of-system trunk | $1,760–3,655    | Quoted / Estimate   |
| O4  | 20.5" truss instead of 12": a third arc cart, wider leg carts                          | +$1,200–3,500   | Estimate            |
| O5  | Second container (20 ft one-trip, delivered) if rigging and solar both ride along      | $2,590–5,264    | Quoted              |
| O6  | Budget swap: used cargo-worthy 40 ft HC instead of one-trip (C1)                       | saves ~$1,500   | Quoted              |

### Operating cost (yearly, not one-time)

| Scenario                                                | Storage / yr                               | Delivery to the playa and back / yr | Total / yr        |
| ------------------------------------------------------- | ------------------------------------------ | ----------------------------------- | ----------------- |
| **A. Near-playa yard** (e.g. Temen, north of the playa) | $880 (40 ft at $2.75/sq ft/yr, Quoted)     | $1,000–3,000 (Estimate)             | **$1,900–3,900**  |
| **B. Reno-area yard**, hauled by an OSS hauler          | $1,200–3,000 (Estimate; no rate published) | $2,000–5,000 (Estimate)             | **$3,200–8,000**  |
| C. Bay Area yard                                        | $2,400–5,400 (Estimate)                    | $5,000–10,000 (Estimate)            | **$7,400–15,400** |
| D. The owner's own land near Reno                       | $0                                         | $2,000–5,000 (Estimate)             | **$2,000–5,000**  |
| _Second 20 ft box (O5), if bought_                      | about +50 % of the above (reasoning)       |                                     |                   |

**Lean: A** if Burning Man is the Gate's only event; **B or D** if the Gate
goes to other events or needs off-season work near a workshop. A 40 ft box
stored near Gerlach is two hours from Reno for every maintenance visit.

---

## 1. Does the Gate fit a 20 ft, or does it need a 40 ft?

### 1a. Container sizes

| Size            | Inside L × W × H                                   | Door W × H                      | Floor             | Tare / max payload | Confidence, source                                                                                                                       |
| --------------- | -------------------------------------------------- | ------------------------------- | ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 20 ft standard  | 19'4" × 7'8½" × 7'10" (5,898 × 2,350 × 2,390 mm)   | 7'8" × 7'5¾" (2,340 × 2,280 mm) | 13.9 m² (149 ft²) | 2,150 / 28,330 kg  | Confirmed, [ONE dry containers](https://www.one-line.com/en/standard-page/dry-containers)                                                |
| 20 ft high cube | 19'4" × 7'8½" × 8'10" (5,900 × 2,350 × 2,690 mm)   | 7'8" × 8'6" (2,340 × 2,590 mm)  | 13.9 m²           | 2,300 / 28,180 kg  | Reported, [SEA Containers NZ](https://www.seacontainers.co.nz/shipping-container-dimensions/20ft-high-cube/); no major carrier lists one |
| 40 ft standard  | 39'5½" × 7'8½" × 7'10" (12,032 × 2,350 × 2,390 mm) | 7'8" × 7'5¾"                    | 28.3 m² (304 ft²) | 3,640 / 26,840 kg  | Confirmed, ONE                                                                                                                           |
| 40 ft high cube | 39'5½" × 7'8½" × 8'10" (12,032 × 2,350 × 2,695 mm) | 7'8" × 8'5¾" (2,340 × 2,585 mm) | 28.3 m²           | 3,700 / 28,800 kg  | Confirmed, ONE                                                                                                                           |

Data plates vary by tens of mm and kg between makers; check the plate on the
actual box. Weight is never the limit here: the loaded Gate is roughly 3–4 t
(below), a tenth of the payload.

### 1b. Assumptions

| Assumption               | Value used                                                                                                                                                                             | Confidence                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Truss profile            | 12" (290 mm) box truss; 20.5" in section 1d                                                                                                                                            | Assumed (profile Unknown, `plans/rigging.md` Q1)                                             |
| One arc                  | 22.5° of a 30 ft radius: **3.59 m (11.8 ft) along the arc, 3.57 m (11.7 ft) chord, bows 0.18 m (6.9 in)**                                                                              | Derived from the 60 ft ring and 16 segments                                                  |
| Arcs on straight cradles | Two cradles at the quarter points sit in line (the arc is 5.2 in off the chord at both), so arcs stack flat, nested, on a straight cart                                                | (reasoning)                                                                                  |
| Boxes on the arc         | Node and power box stick out no more than 0.10 m past the truss; arcs stack with spacers, 0.40 m per layer                                                                             | **Assumed**; box design not started. A 12" truss's lacing leaves little room inside          |
| Arc cart                 | 2 arcs wide (nested) × 4 high = 8 arcs; footprint 3.6 × 1.0 m; deck 0.42 m up on 12" pneumatic casters; 2.0 m tall loaded                                                              | (reasoning)                                                                                  |
| Legs                     | 8 legs of 20–26 ft as **24 straight 10 ft sections** plus 8 base plates (24" square, 86 lb each, Global Truss GT-44BS-1)                                                               | Assumed; base plate from `docs/pricing-self-climbing-2026-10.md`                             |
| Leg cart                 | 3 wide × 4 high = 12 sections; 3.1 × 1.0 m                                                                                                                                             | (reasoning)                                                                                  |
| Hub                      | Breaks into 4 quarter-arcs of a 12 ft circle (2.6 m chord); one cart 2.7 × 1.0 m                                                                                                       | **Assumed**; hub construction Unknown                                                        |
| Spokes                   | Flexible strip, coiled: 64 coils in 2–4 trunks                                                                                                                                         | **Assumed**; if the spokes are rigid 21 ft pieces, they need a 40 ft box on their own length |
| Cases                    | 5–7 trunks of 48 × 30 in, stacked 2 high, some riding on the wagons; one 12U rack case                                                                                                 | (reasoning)                                                                                  |
| Weight loaded            | Ring 790–1,510 kg (`docs/pricing-self-climbing-2026-10.md`), legs about 600 kg, base plates 312 kg, carts and cases about 1 t: **about 3–3.5 t**, so a 40 ft HC rolls at about 7–7.5 t | Assumed                                                                                      |

### 1c. Floor needed

| Group                            | Footprint                                                                          | Floor, 12" truss | Floor, 20.5" truss (1d) |
| -------------------------------- | ---------------------------------------------------------------------------------- | ---------------- | ----------------------- |
| Arcs, 16, on 2 carts             | 2 × 3.6 × 1.0 m                                                                    | 7.2 m²           | 3 carts: 14 m²          |
| Legs, 24 sections, on 2 carts    | 2 × 3.1 × 1.0 m                                                                    | 6.2 m²           | 3 carts: 11 m²          |
| Hub, on 1 cart                   | 2.7 × 1.0 m                                                                        | 2.7 m²           | 2.7–4 m²                |
| 3 wagons (base plates, 4 trunks) | 3 × 1.4 × 0.65 m                                                                   | 2.7 m²           | 2.7 m²                  |
| Other cases, rack case           | 1 trunk stack + rack case                                                          | 1.4 m²           | 1.4 m²                  |
| Light carts, ramp, loose items   | —                                                                                  | 1–2 m²           | 1–2 m²                  |
| **Gate alone**                   |                                                                                    | **21–24 m²**     | **33–35 m²**            |
| Rigging kit (O2), if bought      | hoist cases 2 high, sleeve blocks and outriggers on a wagon, controller            | +4–5 m²          | +5–6 m²                 |
| Solar kit (O3), if bought        | 26 panels on edge in an A-frame cart, 4 batteries on a wagon, inverter and racking | +4–6 m²          | +4–6 m²                 |

**Two-lane check, 40 ft HC (12").** Two lanes of about 1.15 m run the full
12.0 m.

- Lane 1: arc cart 3.6 m + arc cart 3.6 m + hub cart 2.7 m + a trunk stack
  1.2 m = **11.1 m**.
- Lane 2: leg cart 3.1 m + leg cart 3.1 m + 3 wagons with base plates and
  4 trunks 4.2 m + rack case 0.6 m = **11.0 m**.

That leaves about 0.9 m per lane, roughly 2 m² (7 %). Above the carts there is
about 0.6–0.7 m of headroom in a high cube: enough for a shelf of light items
along one wall, not for the rigging or solar kits. A 20 ft box takes the two
arc carts side by side (3.6 m of its 5.9 m) and has 2.3 m left, which the
10 ft leg sections and the hub (2.6–2.7 m) cannot use. **So: 20 ft no;
40 ft HC yes for the Gate; Gate + rigging + solar needs stacking or a
second box** (reasoning).

What would change the answer:

- **Boxes stick out further** than 0.10 m: arcs go 3 high, a third arc cart,
  +3.6 m of lane. The 40 ft box is then full with the Gate alone.
- **Legs in 8 ft sections**: each leg cart drops to 2.6 m, freeing about 1 m.
- **Legs not owned** (rented each event): frees 6.2 m², room for the rigging
  kit.
- **Rigid spokes**: 21 ft lengths would need a lane of their own (Unknown).

### 1d. 20.5" truss instead of 12"

- An arc is 0.70 m across with its bow, and a layer is about 0.57 m tall, so
  a cart holds 2 wide × 3 high = 6 arcs in a standard box and 2 × 4 = 8 in a
  high cube at about 2.7 m (over the 2.585 m door). In practice that means 3
  carts of 5–6, each about 1.3 m wide, which no longer pairs two-across in a
  2.35 m box (reasoning).
- **Gate alone: about 33–35 m², more than a 40 ft HC's 28.3 m².** A 20.5" Gate
  needs a 40 ft HC plus a 20 ft box, or a 53 ft trailer (section 4d).
- Per-cart loads rise too: 6 arcs at about 80 kg each (truss 12–16 kg/m plus
  boxes) is about 0.5 t, so 6 casters per cart, not 4 (reasoning).

---

## 2. The container

### 2a. Prices

All seen 2026-10-21. "Oakland" means a price at the depot, before delivery.

| ID  | Item                                        | Price                                                                                | Source                                                                                                                                                                                                                                              | Confidence |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| C-a | 20 ft std: WWT / cargo-worthy / one-trip    | Oakland **$1,345 / $1,745 / $2,590**; delivered Reno 89501 $3,119 / $3,519 / $4,364  | [Western Container Sales, Oakland](https://www.westerncontainersales.com/shipping-containers-for-sale/california/oakland) ("current as of October 8, 2026"); [Reno](https://www.westerncontainersales.com/shipping-containers-for-sale/nevada/reno) | Quoted     |
| C-b | 20 ft HC one-trip                           | Oakland $3,490; delivered Reno $5,264 (no used 20 ft HC listed)                      | same                                                                                                                                                                                                                                                | Quoted     |
| C-c | 20 ft one-trip, doors both ends             | Oakland $3,490; delivered Reno $5,264                                                | same                                                                                                                                                                                                                                                | Quoted     |
| C-d | 40 ft std: WWT / cargo-worthy / one-trip    | Oakland $1,745 / $2,145 / $4,790                                                     | same                                                                                                                                                                                                                                                | Quoted     |
| C-e | **40 ft HC: WWT / cargo-worthy / one-trip** | Oakland **$1,790 / $2,190 / $3,690**; delivered Reno $3,564 / $3,964 / $5,464        | same                                                                                                                                                                                                                                                | Quoted     |
| C-f | **40 ft HC one-trip, doors both ends**      | Oakland **$4,790**; delivered Reno **$6,564**                                        | same                                                                                                                                                                                                                                                | Quoted     |
| C-g | Conex Depot Oakland, one-trip               | 20 ft $3,099; 20 ft double door $4,499; 40 ft HC $4,399; 40 ft HC double door $4,999 | [Conex Depot Oakland](https://www.conexdepot.com/shipping-containers-for-sale-oakland/). Its 40 ft HC sits below its 40 ft std ($5,499), and a snippet showed different figures: unstable                                                           | Quoted     |
| C-h | Conex Depot Oakland, used                   | 20 ft WWT $1,899, CW $2,199; 40 ft HC WWT $2,399, CW $2,699                          | same                                                                                                                                                                                                                                                | Quoted     |
| C-i | Eveon, Oakland, used                        | 20 ft $1,713; 40 ft $2,041; 40 ft HC $2,163                                          | [Eveon Oakland](https://www.eveoncontainers.com/en-US/locations/shipping-container-oakland)                                                                                                                                                         | Quoted     |
| C-j | Boxhub, Oakland                             | New 20 ft from $2,700, 40 ft from $4,500; used 20 ft from $1,800, 40 ft from $2,200  | [Boxhub Oakland](https://www.boxhub.com/shipping-containers-for-sale/oakland-ca)                                                                                                                                                                    | Quoted     |
| C-k | DefPro, Reno (ranges)                       | One-trip 20 ft $3,000–4,000, 40 ft HC $4,500–5,500; used 40 ft HC $3,800–4,700       | [DefPro Reno](https://www.defpro.com/shipping-containers-for-sale/nv/reno.php); look like delivered figures                                                                                                                                         | Quoted     |
| C-l | SuperBox, Nevada                            | Used 20 ft from $2,950, used 40 ft HC from $3,950                                    | [SuperBox](https://super-box.us/shipping-containers-for-sale-in-nevada/)                                                                                                                                                                            | Quoted\*   |
| C-m | Conexwest 20 ft, doors both ends            | From $4,049                                                                          | Conexwest (pages return 403)                                                                                                                                                                                                                        | Quoted\*   |

**C1 range (recommended line).** Low: a one-trip 40 ft HC at $3,690 plus
about $300 of local Bay Area delivery (Estimate). High: the one-trip
doors-both-ends 40 ft HC delivered to Reno, $6,564. So **$4,000–6,600**.

### 2b. Regional variation

- **Port markets are cheaper.** Eveon's market monitor puts Oakland's used
  40 ft HC ($2,163) just under the US average ($2,253), and inland western
  markets higher: Salt Lake City $2,975, Phoenix $3,065
  ([Eveon market monitor](https://www.eveoncontainers.com/en-US/market-monitor?period=All),
  Quoted). Eveon's Nevada page gives only US averages ("as of August 2026")
  ([Eveon Nevada](https://www.eveoncontainers.com/en-US/locations/shipping-container-nevada)).
- **Reno has no depot price.** Western Container Sales' Reno page sells the
  same Oakland stock and adds about **$1,774** per box, 20 ft or 40 ft
  (Quoted). DefPro's Reno ranges run $800–1,800 over Oakland prices. So
  "buy in Reno" is "buy in Oakland and pay the haul" (reasoning).
- **Delivery needs room.** A tilt-bed drop needs about 120 × 12 ft of straight
  clearance (Eveon, Reported); a side-loader sets a box down beside the truck
  ([Pier2Pier](https://www.pier2pier.com/blog/side-loader-truck-advantages/),
  Reported).

### 2c. Which grade

- **One-trip (recommended).** Straight walls for welding E-track, intact door
  seals (dust), the longest life, and resale value. On a 40 ft HC the step up
  from cargo-worthy is $1,500 (Quoted).
- **Cargo-worthy (the budget swap, O6).** Certified for sea shipment, so
  structurally sound, but dented and with older seals. Fine for a box that
  only drives on trucks; check the door gaskets for dust (reasoning).
- **Wind-and-water-tight (not recommended).** Cheapest, but the condition
  varies most, and dust seals matter more here than rain (reasoning).
- **High cube vs standard.** HC is cheaper one-trip at Western Container Sales
  and gives 0.3 m more door and ceiling (Quoted). Take HC.
- **Forklift pockets.** About 75 % of 20 ft boxes have them and 40 ft boxes
  usually don't (Conex Depot guide, Quoted\*). Pockets are often rated for an
  empty box only. A 40 ft box is moved by tilt-bed or side-loader, so don't
  pay for pockets (reasoning).

---

## 3. Modifications

| ID  | Mod                        | Product, spec                                                                                                                                                                             | Price                                                                                            | Source                                                                                                                                                                                                                                                              | Confidence          |
| --- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| —   | Doors both ends ("tunnel") | Factory option; both ends full-width cargo doors                                                                                                                                          | Included in C1 (+$1,100 on a one-trip 40 ft HC)                                                  | Western Container Sales (above)                                                                                                                                                                                                                                     | Quoted              |
| O1  | Roll-up door               | Kit: USA Containers lightweight steel, 4–8 ft wide × 7 ft tall, frame and install not included                                                                                            | Kit **$1,179.99** (sold out); installed **$1,000–3,000+** per door                               | [USA Containers](https://usacontainers.co/product/shipping-container-roll-up-door-lightweight-steel-various-sizes) (Quoted); [Conexwest guide](https://www.conexwest.com/blog/20ft-shipping-container-rollup-doors-features-dimensions-addons-and-costs) (Quoted\*) | Quoted / Quoted\*   |
| M1  | Ramp                       | HD Ramps Grit-Coat aluminium container ramp, 48 × 63 in, 12,000 lb per axle, fits a 4.5–8 in container sill. Low end: two aluminium loading ramps or a timber ramp                        | **$1,684.99–1,890.99** (Walmart); low end $300–600                                               | Walmart listing (Quoted\*); low end Estimate                                                                                                                                                                                                                        | Quoted\* / Estimate |
| M2  | E-track rails              | 16 × 10 ft galvanised rails (2 rows on each side wall of a 40 ft box), welded to the corrugation peaks or bolted to battens                                                               | Rails **$25–39.89** each ($400–640); install 6–16 h at $60–125/h, or DIY on battens ($200–2,000) | Trucking Depot, Fasteners Plus (Quoted\*); weld rates from [HomeAdvisor](https://www.homeadvisor.com/cost/walls-and-ceilings/weld-metal) (Quoted\*)                                                                                                                 | Quoted\* / Estimate |
| M3  | Straps and fittings        | US Cargo Control E-track kits; 8 ft professional starter kit                                                                                                                              | **$107.99–397.99**                                                                               | [USCC E-track kits](https://www.uscargocontrol.com/collections/e-track-kits)                                                                                                                                                                                        | Quoted              |
| M4  | Load bars                  | USCC aluminium shoring beam 92–103 in, 2,200 lb WLL ($77.99); E-track load bar 86–97 in ($89.99); range $60–139. The box is 92.5 in inside                                                | **$78–139** each × 6                                                                             | USCC (Quoted\*)                                                                                                                                                                                                                                                     | Quoted\*            |
| M5  | Shelving                   | Container shelf brackets, 3-tier, 4-packs (Mytee, HOHYN) $135–160; USA Containers Pro Kit $380.95; plus lumber $150–300                                                                   | **$400–1,500**                                                                                   | Walmart, USA Containers (Quoted\*)                                                                                                                                                                                                                                  | Quoted\* / Estimate |
| M6  | Vents                      | Louvered 12 × 12 in weld-in $52.50; louvered 2-pack $206.99; whirlybird $112–131; 10 W solar roof vent $217.99. **Dust-filtered:** AGM TA495VENT, 25-micron filter, HEPA option, no price | **$250–1,000** for 2–4 vents with filter media behind them                                       | Conexwest (Quoted\*); [USA Containers](https://usacontainers.co/) (Quoted, most sold out); [AGM](https://www.agmcontainer.com/?p=993) (Unknown price)                                                                                                               | Estimate            |
| M7  | Solar light                | USA Containers solar interior workshop lights 2-pack $90.99; exterior solar 4-pack $71.99                                                                                                 | **$90–300**                                                                                      | USA Containers (Quoted\*)                                                                                                                                                                                                                                           | Quoted\*            |
| M8  | Lockbox                    | SeaBox SB2231 bolt-on $30.91; weld-on 2-pack $98.29; Conexwest high-security from $150; plus 1–2 shrouded padlocks ($30–60, Estimate)                                                     | **$60–210**                                                                                      | Snippets (SeaBox page rate-limited)                                                                                                                                                                                                                                 | Quoted\* / Estimate |
| M9  | Roof coating               | White elastomeric roof coating on a 40 ft roof, DIY, to cut solar heating inside                                                                                                          | **$150–500**                                                                                     | Not searched                                                                                                                                                                                                                                                        | Estimate            |

Notes:

- **Vents and dust.** A plain louvre lets playa dust in. Use few vents, put
  filter media behind each, and close them for the drive (reasoning). During
  the event the box mostly holds empty carts; dust matters most for the
  spares and the show computer kept inside.
- **Heat.** A dark steel box in the desert sun gets very hot inside
  (reasoning; not measured). Keep electronics (spares, the show computer) in
  the shade or in the brain box, not in the container by day. The white roof
  (M9) helps. If solar is bought, its batteries need the storage conditions in
  `docs/pricing-solar-2026-10.md`.
- **Floor.** Standard container floors are treated hardwood plywood. Carts
  roll fine on it. Rubber mats would slow the casters, so they're not in the
  budget (reasoning).
- **Roll-up doors.** An end-wall roll-up keeps its drum inside the opening and
  loses height (reasoning). A side roll-up (O1) only earns its cost if the
  middle of a full 40 ft box needs reaching without unloading an end.
  Cutting a side wall weakens the box and may void cargo-worthiness
  (reasoning).
- **Who fits the mods.** Most dealers offer mods by quote only (Boxhub lists
  vents as quote-only). Not asked.

---

## 4. Transport and storage

### 4a. Burning Man's rules

| Fact                                                                                                                                                                                                                                                                                                                                | Confidence | Source                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| "Domes, shipping containers, and tents are more suited for the camping areas of Black Rock City"; "the open playa is for hand-built and personally-designed artwork rather than prefabricated structures"; crews should use an art support camp; "Nothing, absolutely nothing, may be left at your art site or camp when you leave" | Confirmed  | [Art Installation Guidelines](https://burningman.org/black-rock-city/bring-your-art/art-installation-guidelines/)                                                                                            |
| Every outside delivery, art projects included, goes through **Outside Services (OSS)**. The hauler needs Burning Man's approval and a BLM Special Recreation Permit. The 2026 application window was March 1–31 (closing 4:30 PM PST), no late applications. Deliveries 6 AM–6 PM; nothing dropped or collected at the gate         | Confirmed  | [Art deliveries](https://burningman.org/black-rock-city/bring-your-art/art-installation-guidelines/deliveries/); [Deliveries](https://burningman.org/black-rock-city/preparation/infrastructure/deliveries/) |
| The project must be placed first (in person, by Placement or the Artery), with a member on site to receive the delivery. OSS can't deliver to open camping                                                                                                                                                                          | Confirmed  | same; [Help: Deliveries and Outside Services](https://help.burningman.org/hc/en-us/articles/4415060143380-Deliveries-and-Outside-Services)                                                                   |
| A project can **haul its own** cargo and trailers, with no vendor                                                                                                                                                                                                                                                                   | Confirmed  | Deliveries page, "Option 1"                                                                                                                                                                                  |
| Approved haulers (list headed 2026, text says 2025) include Artifact Logistics, Breen Trucking, Devine Intermodal, Mo B Transport (drayage), Nomad Solutions (Reno), Playa Partners Logistics, **Temen Logistics**, **Three Kens** (drayage, container sidelift)                                                                    | Confirmed  | [OSS providers](https://burningman.org/black-rock-city/preparation/infrastructure/deliveries/outside-services-providers/)                                                                                    |
| **BRC Storage Program** (Burning Man's own, in Gerlach): stored containers are delivered to camp by default; visits by appointment; moving to another camp is $350; **waitlist "may be 2 to 3 years"**; no annual fee published; art projects not mentioned                                                                         | Confirmed  | [BRC Storage Program](https://burningman.org/black-rock-city/camps/brc-storage-program/)                                                                                                                     |
| Art Support Services may help registered artists with unloading and hoisting when equipment is free                                                                                                                                                                                                                                 | Confirmed  | [Help article](https://help.burningman.org/hc/en-us/articles/4418730953236)                                                                                                                                  |

**So, can a container be dropped on the playa?** Yes, in a placed camp, by an
approved OSS hauler or by the project itself, 6 AM–6 PM, with a member there
to receive it. Not at the Gate's open-playa site, if it has one. Everything
leaves at the end (Confirmed above). Whether the Gate is open-playa art or
part of a camp is Unknown (question 8).

### 4b. Haulers and near-playa storage

| ID  | Who, what                                                                                                                                                      | Price                                                                                                                | Source                                                                                                                                                                                  | Confidence        |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| T1  | **Temen Logistics** (Reno): moves containers, trailers and art cars to and from the event; stores them year-round "just north of the Playa"; sells 20 ft boxes | Storage **$2.75 per sq ft per year** (20 ft example: $440/yr; 40 ft: $880/yr by the same rate). Transport quote-only | [temenlogistics.com/burning-man](https://www.temenlogistics.com/burning-man/)                                                                                                           | Quoted            |
| T2  | Breen (Silver Springs, south of Fernley): rents semi-trailers, delivered to and from the playa, year-round access; **no containers without wheels**            | About **$1,700/yr** all-in (2022)                                                                                    | [Queer Burners storage guide, 2022](https://blog.queerburners.org/wp-content/uploads/2022/03/Gerlach-Storage-Options.pdf)                                                               | Quoted\*          |
| T3  | Playa Partners / Moopless Storage (near BRC): semi-trailer storage, delivered by approved haulers                                                              | No price                                                                                                             | [moopless-storage.com](http://www.moopless-storage.com)                                                                                                                                 | Unknown           |
| T4  | Iveson Ranch (north of Gerlach): containers and art cars, 365-day access, arranges transport                                                                   | No price; old site now redirects elsewhere, so check it still runs                                                   | [Iveson Ranch (archived site)](https://ivesonranch.vhost5.sierraweb.com/artcarsupport/index.html)                                                                                       | Reported          |
| T5  | Mo B Transport, Nomad, Three Kens, Artifact Logistics                                                                                                          | Quote-only                                                                                                           | [Mo B](https://minutementransport.com/burningman), [Nomad](https://www.nomadnevada.com/), [Three Kens](https://www.threekens.com/), [Artifact](https://www.artifactlogistics.com/)      | Unknown           |
| T6  | Container delivery, general (not playa): about $300–800 within 50 miles, $800–1,800 for 50–200 miles; Reno local rental delivery plus pickup about $488–552    | as stated                                                                                                            | [Legal Clarity](https://legalclarity.org/how-much-does-it-cost-to-move-a-shipping-container/) (Quoted\*); [ZTERS Reno](https://www.zters.com/storage-container-rental/reno-nv) (Quoted) | Quoted / Quoted\* |
| T7  | Renting storage instead: Reno 20 ft $235–250/month, 40 ft $280–299/month; Oakland 40 ft $139 per 4 weeks                                                       | as stated                                                                                                            | ZTERS (Quoted); [Conexwest Oakland](https://conexwest.com/blog/shipping-container-rental-oakland-ca-storage-size-price) (Quoted\*)                                                      | Quoted / Quoted\* |

How camps do it (anecdotes, for scale):

- Burning Man's program at launch: buy the box (about $2,500), then about
  $500/yr for storage and delivery (ePlaya, 2011, Quoted\*). A 2014 commenter:
  about $4,000 for container and placement, $5,000 with year-round storage.
- Camp Pink Heart keeps two containers in Gerlach, dropped on its plot 1–2
  weeks before arrival ([2024 post](https://schepps.substack.com/p/burning-man-2024),
  Reported).
- Shared-container programs charge **$12–13.50 per cubic foot**
  ([Camp Contact](https://container.campcontact.org/),
  [NYC Container](https://nyccontainer.org/burning-man-2026/), 2026). The
  Gate's load is about 1,200–1,700 ft³ (21–24 m² at 1.6–2 m), which would be
  about **$14–23K a year**. Those programs ship cross-country, so it's not a
  like-for-like comparison, but owning a box is clearly cheaper (reasoning).

### 4c. Yearly cost, how the scenarios were built

- **Distances (reasoning, from maps, not measured):** Reno to Black Rock City
  about 110–120 miles; Oakland to Reno about 220 miles, so Oakland to BRC
  about 330–340 miles. Each delivery and each pickup is a truck round trip.
- **Transport from Reno (B, D):** two legs in the 50–200 mile band, $800–1,800
  each (T6), plus a premium for the hauler's permit and playa driving:
  **$2,000–5,000/yr** (Estimate).
- **Transport from near the playa (A):** two short legs: **$1,000–3,000/yr**
  (Estimate; Temen's rate is quote-only).
- **Transport from the Bay Area (C):** two legs of 330+ miles: **$5,000–10,000/yr**
  (Estimate).
- **Storage in a Reno or Bay Area yard (B, C):** no yard published a rate for
  storing a customer-owned container. $100–250/month (Reno) and
  $200–450/month (Bay Area) for an outdoor 40 ft space are **Estimates**.
- **Loaded moves.** Some tilt-bed operators limit how heavy a loaded box can be
  (Assumed). The Gate's box would roll at about 7–7.5 t (section 1b). Tell
  the hauler it moves loaded.

### 4d. Alternative: a semi-trailer instead of a container

Breen-style trailer rental (T2) costs about $1,700/yr with playa delivery and
storage, which is less than buying a box plus scenario A. The catch is height:
a dry-van deck is about 4 ft up, against about 6 in for a container on the
ground. Rolling 0.5 t carts up a 4 ft ramp needs a loading dock, a liftgate, or
a long ramp (reasoning). For a cart-based load-in, the container on the ground
is the better fit. A 53 ft trailer does solve the 20.5" overflow (section 1d).

---

## 5. Carts, cases and casters

### 5a. Truss dollies (off the shelf)

| ID  | Product                                                       | Spec                                                                                                                             | Price                      | Source                                                                                                                                                                          | Confidence           |
| --- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| K-a | ProX XT-TDKIT dolly kit                                       | 2 dollies, 10 spacers, two 20 ft straps; 12 straight 12" (290 mm) box sections of any length; no caster size or rating published | **$369.99** (MSRP $899.99) | [IDJ](https://www.idjnow.com/prox-xt-tdkit-truss-dolly-kit-transports-prox-truss-also-fits-other-290mm-box-truss.html), [SoundPro](https://soundpro.com/products/prox-xt-tdkit) | Quoted\*             |
| K-b | Chauvet Trusst CT290-DOLLYKIT                                 | Dolly 650 × 60 × 250 mm; 12 straight sections; rubber/poly ball-bearing casters                                                  | AU$339 (no US price)       | [Chauvet](https://www.chauvetdj.com/products/dolly-kit/) (Confirmed spec)                                                                                                       | Confirmed / Quoted\* |
| K-c | The Light Source Mega-Truss Dolly MTD12/2-20.5/1              | Two 12" or one 20.5" truss; **960 lb SWL per dolly**; Encore 4 × 2 in casters, 480 lb each; pair, 28 lb                          | **$423.36 per pair**       | [Stage Lighting Store](https://www.stagelightingstore.com/Light-Source-Mega-Truss-Dolly-for-2-12-or-1-20-5-Truss-Aluminum-Finish)                                               | Quoted               |
| K-d | The Light Source MTD12/4-16/3 set                             | Pair; 4 × 2 in casters, 480 lb; up to 1,900 lb                                                                                   | **$728**                   | [Go Knight](https://goknight.com/the-light-source-mtd12-4-16-3-dolly-set-silver/)                                                                                               | Quoted               |
| K-e | Prolyte ACC-530 (30-series)                                   | Stacks up to 6 rows; 4 braked swivel wheels; strap included                                                                      | about €317.58              | [Prolyte](https://prolyte.com/products/aluminium-truss/accessories/miscellaneous/acc-530-truss-dolly-30d-30v-h40r) (Confirmed spec)                                             | Confirmed / Quoted\* |
| K-f | Global Truss trolleys (UK)                                    | Birch-ply, for 4 × F34 or 2 × F34; wheels sold separately                                                                        | £67.49                     | [Simply Sound and Lighting](https://www.simplysoundandlighting.co.uk/products/global-truss-trolley-for-4-x-f34-or-3-x-f44-f45)                                                  | Quoted\*             |
| —   | Tomcat, Eurotruss, Milos-branded, Applied Electronics dollies | Not found as listings                                                                                                            | —                          | —                                                                                                                                                                               | Unknown              |
| —   | Curved-truss carts                                            | None found. 4Wall rents a 60 ft OD circle in 16 segments, with no matching cart                                                  | —                          | [4Wall](https://www.4wall.com/rentals/9759034/xsf-circular-truss-60-od-20-x-20-)                                                                                                | Unknown              |

Every dolly found rolls on 4" casters. Good on a container floor; on playa
dust they dig in (reasoning, from Burning Man's wheel advice below).

### 5b. The custom cart (K1, K2, K3)

One design, built 4–5 times, so wheels and parts are interchangeable
(reasoning):

- A steel or aluminium ladder frame about 3 m long, with two padded cradles
  at the arc's quarter points (about 1.8 m apart), straps to E-track-style
  anchor points on the frame, and spacer blocks between layers so no box
  carries the layer above.
- 4 casters for 12" truss (6 for 20.5"): 2 swivel with brakes, 2 rigid;
  12–16" pneumatic or flat-free. Each caster in the 350–750 lb class.
- A pull handle at one end; maybe a rigid tow bar so a wagon or a person
  team can pull.
- The same frame with three-wide cradles carries the leg sections (K2).

Cost basis: 4–6 casters $120–700 (5c), steel or aluminium $150–400, cradles
and straps $100–300, 6–16 shop hours at $60–125/h. **About $1,200–3,000 each**
(Estimate). Benchmarks: ProX StageQ 4 × 8 welded aluminium stage-deck cart on
9.5" casters $1,399.99
([SoundPro](https://soundpro.com/products/prox-xsq-stg4x8), Quoted\*); Staging
101 transport trolley $979 (Quoted\*). Not quoted from any fabricator.

**Loads (reasoning):** 8 arcs at about 50–65 kg (12" truss at 9.3 kg/m plus
2 boxes at 8–15 kg) is 400–520 kg, plus about 80 kg of cart. Four 12"
pneumatic casters at 350–500 lb each (160–225 kg) carry it with margin; on
uneven ground one caster can carry a third of the load, so the high end of
that range, or 6 casters.

### 5c. Casters and wheels

| ID  | Item                                                     | Spec                                                                                                                                                          | Price                              | Source                                                                                                                                                        | Confidence |
| --- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| W-a | Burning Man's wheel advice                               | "The wider your tires, the better", casters too; mild tread, not knobby; alkaline, corrosive surface; rain leaves 4–6 in of clay that stops almost all wheels | —                                  | [burningman.org wheelchairs page](https://burningman.org/event/preparation/getting-around/wheelchairs/)                                                       | Confirmed  |
| W-b | Shepherd 10" pneumatic swivel                            | 350 lb each                                                                                                                                                   | **$121.08 per 4** (about $30 each) | [Home Depot](https://www.homedepot.com/p/Shepherd-10-in-Black-Rubber-and-Steel-Pneumatic-Swivel-Plate-Caster-with-350-lb-Load-Rating-4-Pack-9796-4/324942638) | Quoted\*   |
| W-c | Access Casters 12DPNTSB, 12" pneumatic swivel with brake | 500 lb                                                                                                                                                        | **$116.94** + $55.57 shipping      | [eBay](https://www.ebay.com/itm/123713275547)                                                                                                                 | Quoted\*   |
| W-d | Uline H-2547PW 16 × 3.75 in pneumatic wheel              | 750 lb, 35 psi                                                                                                                                                | **$143**                           | Uline                                                                                                                                                         | Quoted     |
| W-e | 16" dual-wheel pneumatic swivel                          | 2,000–2,460 lb                                                                                                                                                | $730–1,072                         | [Caster Concepts](https://casterconcepts.com/product/16x4-80-8-dual-wheel-pneumatic-rubber-swivel-caster-4)                                                   | Quoted\*   |
| W-f | CasterHQ 8 × 2.75 in flat-free swivel with brake         | 1,000 lb                                                                                                                                                      | $243.74 per 4                      | CasterHQ                                                                                                                                                      | Quoted\*   |
| W-g | Wheeleez 49 cm balloon wheel (WZ1-49U)                   | 49 × 23 cm, 120 kg (264 lb) each                                                                                                                              | $147 each (2015, stale)            | [wheeleez.com](https://wheeleez.com/)                                                                                                                         | Quoted\*   |
| W-h | Service Caster 6" phenolic total-lock (container floor)  | 1,200 lb                                                                                                                                                      | $83.99 each, $278.99 per 4         | [Zoro](https://www.zoro.com/service-caster-6-inch-phenolic-swivel-caster-with-ball-bearing-and-total-lock-brake-scc-scc-ttl30s620-phb/i/G505441589/)          | Quoted\*   |

- **Pneumatic vs flat-free.** Pneumatic tyres float best but puncture; the
  playa has screws, rebar and tent stakes (reasoning). Carry spares and a pump
  (K9), or pay more for foam-filled (flat-free) tyres of the same size.
- **Balloon wheels** float best of all but are rated about 80–120 kg each:
  fine for a light case cart, not for a 0.5 t arc cart.
- **Hard casters** (phenolic, polyurethane, 4–6") are right for the container
  floor and pavement, and wrong for dust.

### 5d. Wagons and utility carts (K4, K5)

| ID  | Product                                | Spec                                                                      | Price                       | Source                                                                                                                         | Confidence |
| --- | -------------------------------------- | ------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| K-g | **Uline H-2547 wagon cart**            | 24 × 48 in deck, **3,000 lb**, 16" 4-ply pneumatic, 163 lb, deck 19.75 in | **$780** ($760 each for 2+) | [Uline](https://www.uline.com/Product/Detail/H-2547/Platform-Trucks/Wagon-Cart-24-x-48)                                        | Quoted     |
| K-h | Little Giant CH-2448-12P               | 24 × 48 in, 2,000 lb, 12" pneumatic                                       | $599 (flush deck $699)      | [WebstaurantStore](https://www.webstaurantstore.com/little-giant-heavy-duty-wagon-truck-ch-2448-12p-2000-lbs/719CH44812P.html) | Quoted\*   |
| K-i | Gorilla Cart GOR1201B                  | 1,200 lb, about 49 × 24.5 in mesh bed, 13" pneumatic                      | $199.99–229.99              | [Ace](https://www.acehardware.com/p/7026049)                                                                                   | Quoted\*   |
| K-j | Uline H-10923BL plastic platform truck | 24 × 48 in, 1,200 lb, pneumatic                                           | $410                        | Uline                                                                                                                          | Quoted\*   |
| K-k | RockNRoller R16RT Ground Glider Max    | 600 lb; 8 × 3 in foam rear wheels, 6 × 3 in casters                       | $329.99                     | [IDJ](https://www.idjnow.com/rocknroller-multi-cart-r16rt-ground-glider-max.html)                                              | Quoted\*   |

The Uline wagon is the playa workhorse: one carries the 8 base plates (312 kg),
the others carry two trunks each (a 48 × 30 in trunk overhangs its 24 × 48 in
deck by 3 in a side). The RockNRoller's wheels are too small for deep dust
(reasoning).

### 5e. Road cases (K6, K7, K8, O2, O3)

| ID  | Product                                         | Spec                                                                    | Price          | Source                                                                                                                                                                    | Confidence |
| --- | ----------------------------------------------- | ----------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| K-l | Seismic Audio SA-PTR-12UC                       | 12U rack case, casters (not clearly shock-mounted)                      | $369.99        | Snippet                                                                                                                                                                   | Quoted\*   |
| K-m | Gator G-TOUR 12U CAST                           | Wood ATA rack case, casters                                             | $699.99        | [Sweetwater](https://www.sweetwater.com/c459--Rack_Case)                                                                                                                  | Quoted\*   |
| K-n | SKB 3SKB-R912U24                                | 12U roto-moulded shock rack, 24" deep (sealed, best for dust)           | $2,084.99      | eBay                                                                                                                                                                      | Quoted\*   |
| K-o | ProX XS-UTL4 half trunk                         | 22.5 × 22.5 × 25 in, 58 lb, 4" casters (2 braked)                       | $399.99–449.99 | [SoundPro](https://soundpro.com/products/prox-live-performance-gear-xs-utl4)                                                                                              | Quoted\*   |
| K-p | Odyssey FZTP1WBL truck pack                     | 46 × 27.5 × 21.5 in inside                                              | $749.95        | Markertek                                                                                                                                                                 | Quoted\*   |
| K-q | Odyssey OPT483036WPT2 tour trunk                | 48 × 30 × 30.5 in, 5" casters                                           | $875           | [IDJ](https://www.idjnow.com/odyssey-opt483036wpt2-case.html)                                                                                                             | Quoted\*   |
| K-r | Hannay AVD-2 cable reel on casters              | About 425 ft of 0.5 in cable; slotted divider disc keeps both ends free | $646.20–700    | [Markertek](https://www.markertek.com/product/hy-avd-2-cast/hannay-avd-2-cable-reel-with-sotted-divider-disc-for-up-to-425-feet-of-0-5-inch-od-cable-with-3-inch-casters) | Quoted\*   |
| K-s | ProX XS-UTL20W                                  | Divided trunk, two 18 × 9 × 9 in compartments sized for a chain hoist   | about $379.99  | [The DJ Hookup](https://thedjhookup.com/collections/prox-gear/products/prox-xs-utl20w)                                                                                    | Quoted\*   |
| K-t | Space Case 2 × 1-ton Lodestar case (via Musson) | 49 × 28.75 × 24.75 in; customisable; 1–3 week lead                      | No price       | [Musson](https://www.musson.com/road-case-for-1-ton-chain-hoist-motors.html)                                                                                              | Unknown    |

- **Spokes (K8).** 64 coiled spokes at 21 ft. Two 48 × 30 in trunks with a
  32-slot divider each (low), or four with 16 slots (high), a dividers
  allowance of up to $100 per trunk (Estimate). Coils labelled by spoke
  (A1…P7). Reels (K-r) also work, but threading 16–20 strips with connectors
  at both ends onto one reel is fiddly, so trunks are the lean (reasoning).
  This assumes the spokes coil (question 4).
- **Hoist cases (O2).** No off-the-shelf 4-pack case for half-ton motors was
  found; plan on 4 custom two-motor cases at $400–1,500 each (Estimate), or
  ProX XS-UTL20W-style divided trunks if the hoist bodies fit 18 × 9 × 9 in
  (Unknown for the Chainmaster D8+). Controller in a rack case
  ($370–700), motor cables in a trunk ($400–875), sleeve blocks and
  outriggers on a wagon ($760–780).
- **Solar (O3).** 26 panels (1.91 × 1.13 m, 22 kg) stand on edge in a padded
  A-frame cart on pneumatic wheels ($600–2,000, Estimate); 4 batteries
  (about 140 kg each, `docs/pricing-solar-2026-10.md`) strapped on a Uline
  wagon ($760–780); inverter and parts in a trunk ($400–875).

---

## 6. Loading order and handling (reasoning)

- Load in reverse order of the build: what goes up first comes off the door
  end first. With doors at both ends, the legs and base-plate wagon sit at
  one end and the arcs at the other, so two crews can unload at once.
- Each arc cart is about 0.5–0.6 t: four people to push it on dust, two on the
  container floor. Brake two casters and strap the cart to the E-track and a
  load bar for the drive.
- The ramp (M1) bridges a 4.5–8 in sill (HD Ramps listing); the container
  sits on its corner castings on the playa.
- Each segment stays labelled with its letter (A–P); the cart cradles can
  carry the same letters so a segment always rides in the same slot.

---

## 7. Questions the owner must answer

1. **Truss**: make and profile (12" or 20.5"), connector type, and one arc's
   real chord, bow and end-plate size. This decides 2 or 3 arc carts and
   whether the Gate fits one 40 ft box.
2. **How the V2 boxes mount on an arc**: inside the truss, on a face, or
   underneath, and how far they stick out. This sets how high the arcs stack.
3. **Legs**: are they owned? How many sections each, and how long? Base
   plates and top blocks?
4. **Hub and spokes**: how does the hub break down (largest piece)? Are the
   spokes flexible strip that can be coiled, and to what bend radius, or rigid?
5. **How is V1 stored and moved today**, and what else should ride along
   (dance floor, stage, shade, speakers, generator)?
6. **Where would the container live between events**: the owner's land, a
   Reno yard, the Bay Area, or a near-playa yard like Temen's? Is there a
   workshop near it for off-season work?
7. **Which events each year**: Burning Man only, or others too? This picks
   scenario A (near the playa) or B/D (Reno).
8. **At Burning Man, is the Gate placed as open-playa art or with a camp?** Is
   there an art support camp where a 40 ft box can sit, with the 120 ft of
   clear straight line a tilt-bed needs? Does the project already apply to
   OSS, or would it haul itself?
9. **Rigging and solar**: if either is bought, it shares the box; if both,
   plan a second 20 ft box (O5) or stack overhead.
10. **Grade**: one-trip (lean) or cargo-worthy to save about $1,500?
11. **Budget**: does the site show only one-time costs, or the yearly
    operating cost too (`plans/transport.md`, question 3)?
12. **Crew**: how many people move carts at load-in and strike? Four per arc
    cart on dust is the working assumption.
13. **Permission to ask for quotes** later (container dealer delivery, a
    fabricator for the custom carts, Temen or another OSS hauler for transport
    and storage, a case builder for hoist cases). None was asked.
