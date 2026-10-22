# Feed options side by side: 30 A (L14-30) vs 50 A (CS6364/65/69), October 2026

The user asked on 2026-10-21 for two feed designs priced side by side, so the
budget can carry both:

- **Option 30 A:** the current design in `plans/power.md` and
  `app/content/budget.ts`. One L14-30 feed (30 A, 125/250 V split-phase). Loose AC
  Works L14-30 ends at every joint on bulk 8/4 SOOW, Cord Vault rain covers, a
  feed box with a 30 A 2-pole breaker, and an uncut 50 ft feeder. Towable
  generators connect through a CS6365-to-L14-30 adapter that has its own 30 A
  breaker.
- **Option 50 A:** a 50 A 125/250 V split-phase twist-lock feed and trunk in the
  California-style family that every towable rental carries: CS6365 plug, CS6364
  connector, CS6369 receptacle, CS6375 inlet. It runs on 6/4 SOOW with rain-proof
  joints, a feed box with a 50 A 2-pole breaker, and a factory feeder. Portable
  generators connect through an L14-30P-to-CS6364 adapter at reduced capacity.

Both options keep the same things in each segment's power box: a 20 A Class A
GFCI, four 20 A outlets, the 54 V supply, the box and its fittings. Both use the
**corrected geometry**: the ring is 60 ft across, so about **188.5 ft** around,
with 16 segments of about **11.8 ft**. Both use a **50 ft feeder** and buy
**240 ft** of trunk cord.

**Method.** Prices and specs were checked on **2026-10-21** by read-only browsing.
Nothing was ordered, carted or quoted, and no vendor was contacted. AC Works and
Twist and Seal prices were read from the stores' own product data (Shopify
`.json`), so they match the product pages exactly. Ratings come from maker pages
and drawings where those exist; the source is marked on each line. All prices
are USD before tax and shipping. Ring geometry is in feet; everything else is
metric and °C.

**Confidence key** (as in the other pricing files)

| Mark          | Meaning                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **Quoted**    | Price seen today on the seller or maker page at the URL given                                           |
| **Quoted\***  | Price seen only in a search snippet or aggregator, or from a reseller that isn't authorised. Recheck it |
| **Estimate**  | A range from comparable parts                                                                           |
| **Confirmed** | Spec from the maker's own page, drawing or spec sheet                                                   |
| **Reported**  | Spec from a retailer or distributor, or from the user, not a maker document                             |
| **Assumed**   | My inference, or a fact I could not source; the assumption is named                                     |
| **Unknown**   | Looked for and not found                                                                                |

---

## Summary

- **Power-category subtotal, before the 15 % contingency:**
  - **Option 30 A: $9,950–15,801.**
  - **Option 50 A: $12,420–21,886.**
  - That is **$2,470–6,085 more** for 50 A. All of the difference is in the
    lines that differ; the shared lines are $5,693–11,059 in both options.
- **Continuous capacity (80 % of the breaker):**
  - **30 A: 5.76 kVA.** That is 60 % of the V1 drawing's estimated maximum
    (9.6 kVA, 64 spokes) and 30 % of the 128-spoke estimate (~19.2 kVA).
  - **50 A: 9.6 kVA.** That exactly equals the 64-spoke estimate, with no
    margin, and is 50 % of the 128-spoke estimate.
  - **Ampacity caveat (50 A):** at the 50 °C ambient every file here designs
    to, 6/4 SOOW carries only **45.1 A**. Held strictly to that basis, the feed
    breaker would be **45 A (8.64 kVA continuous, 90 % of the 64-spoke
    estimate)**. 6/4 carries 50 A only at 40 °C ambient or below.
- **Real load** (1.5–2 kW, Reported): the 30 A feed has **2.9–3.8× margin**
  and the 50 A feed **4.8–6.4×**. Neither option covers 128 spokes at the
  estimated maximum; see section 8 for the next step up.
- **Voltage drop** over the 50 ft feeder plus the 188.5 ft ring is about the same
  for both at full rated load: **2.2 % (30 A on 8 AWG) vs 2.4 % (50 A on 6 AWG)**
  with the legs balanced, about double with everything on one leg. At the real
  2 kW it is **0.8 % vs 0.5 %**.
- **What each plugs into directly:**
  - **30 A:** almost every portable generator (L14-30R) and battery station.
    Towables need the adapter with its own breaker.
  - **50 A:** every towable surveyed (2–3 CS6369 each), and the CS6369
    feed-through on standard 50 A event spider boxes (CEP, Power
    Assemblies). Portables need a $40–124 adapter, and on one the Gate gets
    5.76 kVA (less on generators that limit each leg).
- **The trade-offs:**
  - **50 A** buys 1.7× the continuous capacity and native towable and
    spider-box connection.
  - **It costs** about 2.5–6K more, 1.4 kg more cord per segment (4.4 kg vs
    3.2 kg), and bigger connectors (61–65 mm across, about 205 mm mated) that
    almost certainly don't fit the Cord Vault. Its joints use device boots
    instead: unrated (AC Works) or IP55 when mated (Leviton). It also needs
    the 45 A vs 50 A decision.
- **Biggest unknowns:**
  - Whether the **V1 "15 A" circuit loads** are anywhere near real full white;
    measuring one spoke settles both options.
  - **Cord grip** on the AC Works 50 A ends with 27.3 mm 6/4. AC Works
    advertises "6/4, or bigger" but publishes no range.
  - Whether the **50ARCV boots seal the mating face** of an inline pair.
  - **Which design ambient to hold 6/4 to** (the 45 A vs 50 A breaker).
  - Whether a towable's or spider box's CS6369 is **GFCI-protected**, which
    would risk the same nuisance trips flagged for portables.

---

## Side-by-side comparison

|                                                     | **Option 30 A (current)**                                                  | **Option 50 A**                                                                                                          |
| --------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Feed connector                                      | NEMA L14-30 (30 A 125/250 V, 3-pole 4-wire)                                | CS6365 plug / CS6364 connector / CS6369 receptacle / CS6375 inlet (50 A 125/250 V, 3-pole 4-wire; same as marine SS2-50) |
| Trunk cord                                          | 8/4 UL SOOW, 24.2 mm, $6.09/ft                                             | 6/4 UL SOOW, 27.3 mm, $8.79/ft                                                                                           |
| Trunk ampacity at 50 °C (NEC 400.5 Column B × 0.82) | 32.8 A, so the 30 A breaker is fine                                        | **45.1 A, so a 50 A breaker needs ≤ 40 °C ambient (50.1 A); otherwise 45 A**                                             |
| Feed breaker                                        | 30 A 2-pole                                                                | 50 A 2-pole (or 45 A, see above)                                                                                         |
| Continuous capacity (80 %)                          | **5.76 kVA** (24 A a leg)                                                  | **9.6 kVA** (40 A a leg); 8.64 kVA at 45 A                                                                               |
| vs V1 estimated max, 64 spokes (9.6 kVA)            | 60 %                                                                       | 100 % (90 % at 45 A)                                                                                                     |
| vs 128 spokes if it scales (~19.2 kVA)              | 30 %                                                                       | 50 % (45 % at 45 A)                                                                                                      |
| vs real load 1.5–2 kW                               | 2.9–3.8×                                                                   | 4.8–6.4× (4.3–5.8× at 45 A)                                                                                              |
| Voltage drop, full continuous load, legs balanced   | 2.7 V (2.2 %)                                                              | 2.8 V (2.4 %)                                                                                                            |
| Voltage drop, full load all on one leg              | 5.4 V (4.5 %)                                                              | 5.7 V (4.7 %)                                                                                                            |
| Voltage drop, real 2 kW, balanced                   | 0.9 V (0.8 %)                                                              | 0.6 V (0.5 %)                                                                                                            |
| Joint ends                                          | AC Works ASL1430P + ASL1430R, cULus E237606, $48.37 a pair                 | AC Works CS6365 + CS6364, cULus E57672, $161.23 a pair (low); Leviton CS6365C + CS6364C, UL 498, $293.03 (high)          |
| Joint weather protection                            | Twist and Seal Cord Vault, NEMA 3R / IP44 (fit unverified, probably tight) | Device boots on both halves: AC Works 50ARCV (no rating published) or Leviton 7715CR + 7717CR (IP55 mated)               |
| Per joint (ends + cover)                            | $61.32                                                                     | $180.41 – $359.04                                                                                                        |
| Cord per 11.8 ft segment                            | 3.2 kg (7.0 lb)                                                            | 4.4 kg (9.8 lb)                                                                                                          |
| Minimum bend radius (6 × OD, Assumed)               | ~145 mm                                                                    | ~164 mm                                                                                                                  |
| Plugs directly into                                 | Portables with L14-30R (30 of 31 surveyed), battery stations               | Towables (15 of 15 surveyed, 2–3 CS6369 each), 50 A spider-box feed-throughs, probably the Honda EB10000                 |
| Needs an adapter for                                | Towables: CS6365 → L14-30 **with a 30 A breaker**, $467–557                | Portables: L14-30P → CS6364, **no breaker needed**, $40–124                                                              |
| Power-category subtotal                             | **$9,950 – $15,801**                                                       | **$12,420 – $21,886**                                                                                                    |
| Lines that differ                                   | $4,257 – $4,742                                                            | $6,727 – $10,827                                                                                                         |
| With the 15 % contingency                           | $11,442 – $18,171                                                          | $14,283 – $25,169                                                                                                        |

---

## 1. Basis shared by both options

### 1a. Geometry and quantities

- 16 segments of about 11.8 ft, ring about 188.5 ft (Reported, James Logistic,
  2026-10-21; `docs/v1-hardware.md`).
- **Open radial ring**, fed at joint 0 and run one way. The last connector is
  capped. Closed loops aren't allowed below 1/0 AWG (NEC 310.10(G);
  `docs/pricing-power-feed-2026-10.md` §3). That holds for 6 AWG too.
- **Joint sets: 18** (16 + 2 spares). Each segment has a plug at its upstream
  end and a connector at its downstream end; the two halves land on terminal
  blocks in the segment's power box.
- **Trunk cord: 240 ft**, as in the budget: 188.5 ft, plus box tails and slack,
  plus two spare segments.
- **Feeder: 50 ft**, uncut factory cord in both options.

### 1b. Loads

| Case                                  | Load                                         | Per leg, balanced | Source                                                                                                                               |
| ------------------------------------- | -------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Real average, whole Gate              | 1.5–2.0 kW                                   | 6.3–8.3 A         | Reported (user, 2026-10-21)                                                                                                          |
| Real average, 128 spokes              | 3–4 kW                                       | 12.5–16.7 A       | Assumed: pixel share doubles                                                                                                         |
| V1 drawing "Circuit Loads", 64 spokes | 15 A × 5 + 5 A = 80 A at 120 V = **9.6 kVA** | 40 A              | `EG AC Power.pdf` via `docs/v1-hardware.md`. The user says these are **estimated maximum draw, not measured** (Reported, 2026-10-21) |
| Same, 128 spokes                      | **~19.2 kVA**                                | ~80 A             | Assumed: scales with pixel count. The network load (circuit 6) doesn't double, so this is slightly high                              |

### 1c. Cord ampacity at 50 °C

NEC Table 400.5(A)(1) Column B (two current-carrying conductors). The neutral of
a 120/240 V 3-wire system carries only the unbalance, so it isn't counted
(Assumed, as in `docs/pricing-power-feed-2026-10.md` §5). The 90 °C cord
correction factors are 0.91 at 36–40 °C, 0.87 at 41–45 °C and 0.82 at 46–50 °C.

| Cord        | Column B | 40 °C      | 45 °C  | **50 °C**  | Largest breaker the cord supports at 50 °C | Southwire's own table (Col A × 0.8) |
| ----------- | -------- | ---------- | ------ | ---------- | ------------------------------------------ | ----------------------------------- |
| 8/4 UL SOOW | 40 A     | 36.4 A     | 34.8 A | **32.8 A** | 30 A                                       | 28 A                                |
| 6/4 UL SOOW | 55 A     | **50.1 A** | 47.9 A | **45.1 A** | **45 A**                                   | 36 A                                |

- **The 50 A catch:** 6/4 meets a 50 A breaker only at 40 °C ambient or below.
  These docs design to the 50 °C row because the cord sits in desert sun and
  the code has no sun adder (reasoning, carried over from the earlier files).
- **NEC 240.5(A)** protects cord "in accordance with their ampacity". The
  next-size-up rule in 240.4(B) is written for conductors "other than flexible
  cords" (240.4 lead-in; Assumed from the code text, not re-read this
  session). So it can't be used to round 45.1 A up to 50 A.
- **The choice for Option 50 A is the user's:**
  - a **50 A** feed-box breaker, accepting a 40 °C design ambient (shade the
    trunk; air temperature in the playa shade rarely reaches 40 °C, but the
    cord is in sun: Assumed); or
  - a **45 A** breaker, keeping the 50 °C rule. That gives 8.64 kVA
    continuous. A 2-pole 45 A DIN breaker costs about the same as a 50 A.
- **The factory feeder is different.** A listed cord set is protected "when
  applied within the extension cord listing requirements" (240.5(B)(3)). An
  uncut AC Works TESS2TH on a towable's 50 A CS6369 breaker is therefore
  covered by its listing (Assumed reading of the code). AC Works itself
  derates the cord to 45 A only above 50 ft
  ([AC Works TESS2TH](https://acworks.com/products/tess2th-soow-6-4-cs6365-to-cs6364-temp-power-50a-generator-cord),
  Reported).
- **Both options rely on Column B.** Southwire's own data sheet lists 4-conductor
  SOOW at Column A × 0.8: 28 A for 8/4 and 36 A for 6/4
  ([Southwire SPEC 70000](https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US),
  Confirmed). On that conservative basis neither option reaches its rated
  breaker. It is the same assumption the current design already makes.

### 1d. Cord physical data

Source: [Southwire SPEC 70000](https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US)
(Confirmed). The cord is 600 V, −40 to 90 °C, "sunlight, water, oil, and
weather resistant", extra-hard usage, UL 62 / CSA C22.2 No. 49.

| Cord | OD                 | Weight         | Per 11.8 ft segment | Bend radius at 6 × OD (Assumed rule of thumb; Southwire states none) |
| ---- | ------------------ | -------------- | ------------------- | -------------------------------------------------------------------- |
| 8/4  | 24.2 mm (0.954 in) | 596 lb/1000 ft | **7.0 lb (3.2 kg)** | ~145 mm                                                              |
| 6/4  | 27.3 mm (1.075 in) | 830 lb/1000 ft | **9.8 lb (4.4 kg)** | ~164 mm                                                              |

Add the ends: about 0.5 kg for a 50 A connector (Hubbell CS6364C is 1.05 lb,
[hubbell.com](https://www.hubbell.com/wiringdevice-kellems/en/p/176555),
Confirmed), about the same for its plug, and less for an L14-30 end.

---

## 2. Option 30 A: line items (current budget, on the 60 ft geometry)

These are the `power-` lines in `app/content/budget.ts`, which already use the
60 ft geometry (240 ft of 8/4, 18 joint sets). Rechecked today: the AC Works
prices (from the store's product data: ASL1430P $21.38, ASL1430R $26.99,
SDL1430PR-050 $499.99) and the WCYW 8/4 price ($6.09/ft). Everything else is
as carried in the budget, sourced in `docs/pricing-power-feed-2026-10.md` and
`docs/pricing-joint-cords-2026-10.md`.

### 2a. Lines that differ from Option 50 A

| Line (budget id)              | Part                                                                               | Qty    | Unit     | Extended                  | Source                                                                                                                    | Datasheet / spec                                                                                                                                                                                                                                | Conf.                                              |
| ----------------------------- | ---------------------------------------------------------------------------------- | ------ | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `power-joint-plug`            | AC Works ASL1430P, cULus E237606                                                   | 18     | $21.38   | $384.84                   | [AC Works](https://acworks.com/products/locking-adapter-asl1430p-nema-l14-30p)                                            | [ASL1430P drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/ASL1430P.pdf?v=1737999437): 93.5 mm long, 58.1 mm OD. The page says it takes "12/4, 10/4, or 8/4" cable; no grip range published                                           | Quoted / Confirmed (drawing) / Reported (cord fit) |
| `power-joint-connector`       | AC Works ASL1430R, cULus E237606                                                   | 18     | $26.99   | $485.82                   | [AC Works](https://acworks.com/products/locking-adapter-asl1430r-nema-l14-30r)                                            | [ASL1430R drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/ASL1430R.pdf?v=1738709966): 96.5 mm long, 58.1 mm OD                                                                                                                       | Quoted / Confirmed                                 |
| `power-trunk`                 | 8/4 UL SOOW                                                                        | 240 ft | $6.09    | $1,461.60                 | [WCYW](https://www.wireandcableyourway.com/8-4-soow-portable-cord-600v-ul-csa)                                            | [Southwire SPEC 70000](https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US)                                                                                                                                                   | Quoted / Confirmed                                 |
| `power-joint-covers`          | Twist and Seal Cord Vault, NEMA 3R / IP44                                          | 18     | $12.95   | $233.10                   | [Twist and Seal](https://twistandseal.com/products/twist-and-seal-cord-vault-keeps-large-cord-connections-dry-and-secure) | Outside 230 × 170 × 70 mm; "closed depth 1.75 in" ([measurement image](https://cdn.shopify.com/s/files/1/2007/0455/files/Cord-Vault-Black-Measurments.jpg?v=1748017665)). A mated L14-30 pair is about 170 mm × 58 mm: **probably fits, tight** | Quoted / Reported / Assumed fit                    |
| `power-feeder`                | AC Works SDL1430PR-050, 50 ft 8/4 SOOW, uncut                                      | 1      | $499.99  | $499.99                   | [AC Works](https://acworks.com/products/sdl1430pr-8-4-soow-super-duty-nema-l14-30-30a-125-250v-generator-rubber-cord)     | Cable cULus E313867, ends cULus E237606 (page)                                                                                                                                                                                                  | Quoted / Reported                                  |
| `power-end-cap`               | AC Works CVFE                                                                      | 1      | $8.99    | $8.99                     | [AC Works](https://acworks.com/products/cvfe-cable-end-weather-cover)                                                     | fit unverified                                                                                                                                                                                                                                  | Quoted                                             |
| `power-feed-sockets`          | Hubbell HBL2715SW inlet + HBL2710SW receptacle                                     | 1      | $374.68  | $374.68                   | [Elliott (inlet)](https://www.elliottelectric.com/P/Item/HWD/HBL2715SW/Alternate)                                         | [hubbell.com p/170153](https://www.hubbell.com/hubbell/en/p/170153)                                                                                                                                                                             | Quoted / Quoted\*                                  |
| `power-feed-box`              | Hammond PCJ12106H + DIN 2-pole 30 A UL 489 breaker                                 | 1      | $137–226 | $137–226                  | [Findchips](https://www.findchips.com/search/PCJ12106)                                                                    | —                                                                                                                                                                                                                                               | Estimate                                           |
| `power-trunk-glands`          | Lapp SKINTOP ST-M M40 (19–28 mm) for 24.2 mm cord                                  | 34     | $6–15    | $204–510                  | not priced (budget estimate)                                                                                              | Lapp table: ST-M 40×1.5 is 19–28 mm, article 53111050 ([RS doc](https://nonprod.docs.rs-online.com/7437/0900766b81372d9d.pdf))                                                                                                                  | Estimate / Reported                                |
| `power-towable-adapter`       | Hubbell CS6365C + boot, 6 ft 6/4, sealed box with a 30 A 2-pole breaker, HBL2710SW | 1      | $467–557 | $467–557                  | `docs/pricing-power-feed-2026-10.md` §4b                                                                                  | —                                                                                                                                                                                                                                               | Estimate                                           |
| **Subtotal, differing lines** |                                                                                    |        |          | **$4,257.02 – $4,742.02** |                                                                                                                           |                                                                                                                                                                                                                                                 |                                                    |

The towable adapter **needs its breaker**: the towable's CS6369 sits behind a
50 A breaker, and the 8/4 and L14-30 parts downstream are rated for 30 A
(NEC 240.4/240.5, reasoning as in the feed file). AC Works sells a cheaper
1.5 ft CS6365-to-L14-30R adapter without a breaker
([SS2L1430-018](https://acworks.com/products/ss2l1430-018-ss2-50p-cs6365-plug-to-l14-30-adapter)).
It is not a substitute here: it leaves the 30 A ring behind a 50 A breaker.

### 2b. Option 30 A subtotal

|                          | Low           | High           |
| ------------------------ | ------------- | -------------- |
| Lines that differ (2a)   | $4,257.02     | $4,742.02      |
| Shared lines (section 7) | $5,692.96     | $11,059.01     |
| **Power category**       | **$9,949.98** | **$15,801.03** |
| With 15 % contingency    | $11,442       | $18,171        |

---

## 3. Option 50 A: line items

### 3a. Joint ends: loose listed CS6365 plugs and CS6364 connectors

The NEMA configuration is the same for every maker: "SS2-50" in marine use,
"CS6364/CS6365" industrially. All are 50 A 125/250 V, 3-pole 4-wire. The
industrial and marine bodies are rated for dry locations unless protected
(Hubbell: "Indoor Dry Unless Protected By Additional Means"). That suits the
rain-proof decision: the protection is the boots or covers in 3b.

| Maker / MPN                    | Role                      | Listing                                                                                  | Cord range vs 27.3 mm 6/4                              | Wire                      | Temp         | Body size                                 | Price each                       | Price source (2026-10-21)                                                                                                                                                                                                                     | Spec source                                                                                 | Conf.                                            |
| ------------------------------ | ------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------- | ------------ | ----------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **AC Works CS6365**            | plug                      | cULus **E57672**, CSA 81290 (drawing)                                                    | Not published. Page: "10/4, 8/4, 6/4, or bigger cable" | "6 Gauge wire for 50 Amp" | not stated   | 4.73 in (120 mm) long, 2.39 in (61 mm) OD | **$78.74**                       | [AC Works](https://acworks.com/products/cs6365-california-standard-50a-125-250v-4-wires-locking-plug)                                                                                                                                         | [CS6365 drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/CS6365.pdf?v=1751398793) | Quoted / Confirmed (drawing) / Unknown (grip)    |
| **AC Works CS6364**            | connector                 | cULus E57672, CSA 81290 (drawing)                                                        | as above                                               | as above                  | not stated   | 4.98 in (126 mm) body, 5.60 in overall    | **$82.49**                       | [AC Works](https://acworks.com/products/cs6364-california-standard-6364-50a-125-250v-locking-connector)                                                                                                                                       | [CS6364 drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/CS6364.pdf?v=1751397576) | Quoted / Confirmed / Unknown                     |
| AC Works CS6365-RK / CS6364-RK | plug / connector          | same product line; listing not shown on the page                                         | as above                                               | as above                  | —            | —                                         | $72.44 / $75.89                  | [plug](https://acworks.com/products/ac-works-cs6365-rk-california-standard-cs6365-50a-125-250v-4-wires-locking-male-plug), [connector](https://acworks.com/products/cs6364-rk-california-standard-cs6364-50a-125-250v-4-prong-locking-female) | pages                                                                                       | Quoted / Unknown (difference from the plain SKU) |
| **Hubbell CS6365C**            | plug                      | UL 498, CSA C22.2 No. 42                                                                 | 3/4–1-1/8 in (19.1–28.6 mm) per distributor            | #10–#6                    | −40 to 75 °C | —                                         | $138.93–141.71                   | Standard Electric ([page](https://www.standardelectricsupply.com/Hubbell-CS6365C-Locking-Plug); $138.93 from snippet)                                                                                                                         | distributor                                                                                 | Quoted\* / Reported                              |
| **Hubbell CS6364C**            | connector                 | **UL 498**, CSA C22.2 No. 42; "certified for current interrupting at full rated current" | **21.1–31.8 mm** (0.830–1.250 in)                      | **#10–#6**                | −40 to 75 °C | 6.50 × 2.56 in (165 × 65 mm), 1.05 lb     | $121.07 (1–11) – $187.14 (min 3) | [Stage Lighting Store](https://www.stagelightingstore.com/HUBBELL-CS6364C-50-A-125-250V-CONNECTOR), [MRO Supply](https://www.mrosupply.com/products/1016474/as-markdown/)                                                                     | [hubbell.com p/176555](https://www.hubbell.com/wiringdevice-kellems/en/p/176555)            | Quoted / **Confirmed**                           |
| **Leviton CS6365C**            | plug                      | UL 498, file E13399 (distributor)                                                        | 0.68–1.125 in (17.3–28.6 mm) (distributor)             | #10–#4                    | −40 to 75 °C | —                                         | **$128.03** ($123.01 at 10+)     | [EMI Supply](https://www.emisupply.com/lev-cs6365c-leviton-cs6365c-industrial-grade-plug-50-amp-125-250-volt)                                                                                                                                 | distributor listings                                                                        | Quoted / Reported                                |
| **Leviton CS6364C**            | connector                 | UL 498, E13399 (distributor)                                                             | 17.3–28.6 mm (distributor)                             | #10–#4                    | −40 to 75 °C | —                                         | **$165.00** ($158.52 at 10+)     | [EMI Supply](https://www.emisupply.com/lev-cs6364c-leviton-cs6364c-industrial-grade-connector-50-amp-125-250-volt)                                                                                                                            | distributor listings                                                                        | Quoted / Reported                                |
| Marinco 6365CRN / 6364CRN      | plug / connector (marine) | not checked this session                                                                 | up to 30.5 mm                                          | to 6 AWG                  | −40 to 75 °C | —                                         | $124.95 / $113.95                | `docs/pricing-power-feed-2026-10.md` S8                                                                                                                                                                                                       | —                                                                                           | Quoted (earlier file) / Unknown (listing)        |
| Hubbell HBL63CM65 / HBL63CM64  | plug / connector (marine) | —                                                                                        | 11.1–29 mm                                             | to 6 AWG                  | −40 to 75 °C | —                                         | $161.43 / $210.00 (5-packs)      | same file, S5                                                                                                                                                                                                                                 | —                                                                                           | Quoted (earlier file)                            |

- **Cord fit.** 6/4 at 27.3 mm sits mid-range in the Hubbell CS6364C grip
  (21.1–31.8 mm, Confirmed) and near the top of Leviton's (to 28.6 mm,
  Reported). AC Works publishes no range: **trial-fit one before buying 18**,
  as for the 30 A ends.
- **Wire.** Every 50 A end takes 6 AWG. The L14-30 ends stop at 8 AWG, which
  is why the 30 A trunk can't simply be upsized.
- **Listing.** The AC Works 50 A ends are cULus E57672, a different file from
  their L14-30 ends (E237606). That is still a listed device on listed cord, the
  same code position as the 30 A design (`docs/pricing-joint-cords-2026-10.md`
  §4).

### 3b. Rain protection at a mated 50 A joint

The user's decision is that rain-proof is enough, with joints kept off the
ground (NEC 525.20(D), as in the joint-cords file).

| Option                                                 | What it is                                                                                 | Rating                                                                                                                                                            | Fit on a mated 50 A pair                                                                                                                                                                                                                                  | Per joint                    | Source                                                                                                                                                                                                                                                                                                     | Conf.                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Twist and Seal **Cord Vault**                          | latched clamshell                                                                          | NEMA 250-3R / IP44 (maker claim)                                                                                                                                  | **Probably not.** Outside 230 × 170 × 70 mm, interior smaller. A mated AC Works pair is about 205 mm long before the cords bend (126 mm connector body + 120 mm plug − about 42 mm engagement) and 61 mm across; Hubbell's connector alone is 165 × 65 mm | $12.95                       | [Twist and Seal](https://twistandseal.com/products/twist-and-seal-cord-vault-keeps-large-cord-connections-dry-and-secure), [measurements](https://cdn.shopify.com/s/files/1/2007/0455/files/Cord-Vault-Black-Measurments.jpg?v=1748017665)                                                                 | Quoted / Assumed (fit, from dimensions)                |
| Twist and Seal **Cord Dome**                           | round dome, 11.25 in interior with a 2.5 in centre pillar, sold for "Large RV connections" | 3R / IP44 (sizing chart)                                                                                                                                          | Unknown: a ~205 mm straight pair has to sit off-centre beside the pillar; height not published                                                                                                                                                            | $26.95                       | [sizing chart](https://twistandseal.com/pages/sizing-chart)                                                                                                                                                                                                                                                | Quoted / Unknown (fit)                                 |
| **AC Works 50ARCV** boot with ring, one on each half   | elastomer back boot, 99 mm long, 61 mm bore, stepped cord hole up to 27.7 mm               | **none published**; "helps weatherproof"                                                                                                                          | Made for AC Works CS6364 and CS6365 (page). Whether the ringed front overlaps the mated face is **Unknown**                                                                                                                                               | 2 × $9.59 = **$19.18**       | [AC Works](https://acworks.com/products/50arcv-50amp-weather-boot-with-ring), [drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/50ARCV-OR-Measurements.jpg?v=1713450678)                                                                                                                         | Quoted / Confirmed (dimensions) / Unknown (seal)       |
| **Leviton 7715CR (plug) + 7717CR (connector)** boots   | TPE boots                                                                                  | **IP55 when a booted Leviton 50 A plug is fully mated to a booted Leviton 50 A connector** (retailer wording; Leviton's page titles say "Weather Resistant IP55") | Leviton CS ends only                                                                                                                                                                                                                                      | $38.86 + $27.15 = **$66.01** | [EMI 7715CR](https://www.emisupply.com/lev-7715cr-leviton-7715cr-weather-resistant-plug-boot-50-amp), [EMI 7717CR](https://www.emisupply.com/lev-7717cr-leviton-7717cr-weather-resistant-connector-boot-50-amp); spec [leviton.com 7717CR](https://leviton.com/content/leviton/us/en/products.7717cr.html) | Quoted / Confirmed (IP55) / Reported (mated condition) |
| Hubbell HBL77CM16 (plug) + HBL77CM15 (connector) boots | elastomer boots                                                                            | IP55 "suitability" (plug boot, maker page)                                                                                                                        | Hubbell page says the plug boot is "used with HBL63CM65L" (marine); fit on CS6365C not confirmed                                                                                                                                                          | ~$29.93 + ~$62               | [hubbell.com HBL77CM16LW](https://www.hubbell.com/wiringdevice-kellems/en/products/locking-devices-twist-lock-accessories-plug-boot-50a-white-l/p/2623148); prices from Standard Electric (10-pack snippet) and the feed file S6                                                                           | Quoted\* / Confirmed (IP55)                            |

**Per-joint totals used in the subtotal:**

- **Low: AC Works CS6365 + CS6364 + 2 × 50ARCV = $180.41.** Cheapest, and
  consistent with the 30 A choice of AC Works ends. Its weakness is that no
  rating is published for the boots.
- **High: Leviton CS6365C + CS6364C + 7715CR + 7717CR = $359.04.** The only
  50 A set found with a **published mated rating (IP55)**, which is better than
  the Cord Vault's IP44.
- **Middle, not used:** Hubbell CS6365C + CS6364C (about $260) has the best
  documented grip range. Its boots are confirmed only for the marine bodies.

**Factory 50 A cords cut in half lose on price.** AC Works TESS2TH (UL SOOW
6/4) comes in 10 ft ($271.08, too short for an 11.8 ft segment), 25 ft
($448.58), 50 ft ($739.42) and longer. Eighteen 25 ft cords would be about
$8,074, against about $5,000 for loose ends plus 240 ft of bulk 6/4. AC Works'
cheaper **TESS2** (with a 20 ft length at $253.54) uses an **MSHA jacket, not UL
SOOW**, so it fails NEC 525.20 "listed"
([TESS2 page](https://acworks.com/products/ac-works-tess2-soow-6-4-cs6365-cs6364-temp-power-50a-pdu-generator-cord):
"SOOW 6/4, 50 Amp Copper with MSHA 600 Volt jacket", Reported).

### 3c. All Option 50 A lines that differ

| Line (budget id, proposed)                                  | Part                                                                                                                                                                                                                                                 | Qty    | Unit              | Extended (low – high)      | Source                                                                                                                                                                                                       | Datasheet / spec                                                                                                                        | Conf.               |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `power-joint-plug`                                          | AC Works CS6365 (low) / Leviton CS6365C (high)                                                                                                                                                                                                       | 18     | $78.74 – $128.03  | $1,417.32 – $2,304.54      | 3a                                                                                                                                                                                                           | 3a                                                                                                                                      | Quoted              |
| `power-joint-connector`                                     | AC Works CS6364 (low) / Leviton CS6364C (high)                                                                                                                                                                                                       | 18     | $82.49 – $165.00  | $1,484.82 – $2,970.00      | 3a                                                                                                                                                                                                           | 3a                                                                                                                                      | Quoted              |
| `power-joint-covers`                                        | 2 × AC Works 50ARCV (low) / Leviton 7715CR + 7717CR (high)                                                                                                                                                                                           | 18     | $19.18 – $66.01   | $345.24 – $1,188.18        | 3b                                                                                                                                                                                                           | 3b                                                                                                                                      | Quoted              |
| `power-trunk`                                               | 6/4 UL SOOW, 27.3 mm                                                                                                                                                                                                                                 | 240 ft | $8.79             | $2,109.60                  | [WCYW](https://www.wireandcableyourway.com/6-4-soow-portable-cord-600v-ul-csa) (SKU SOO6s4UL, "UL Listed and CSA Certified")                                                                                 | [Southwire SPEC 70000](https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US)                                           | Quoted / Confirmed  |
| `power-feeder`                                              | Field-built: AC Works CS6365 + CS6364 on 50 ft 6/4 UL ($600.73, low); or **AC Works TESS2TH-050**, 50 ft UL SOOW 6/4 factory cord ($739.42, high, recommended)                                                                                       | 1      | $600.73 – $739.42 | $600.73 – $739.42          | [AC Works TESS2TH](https://acworks.com/products/tess2th-soow-6-4-cs6365-to-cs6364-temp-power-50a-generator-cord)                                                                                             | page: "SOOW (UL) 6/4"; listing file not shown                                                                                           | Quoted / Reported   |
| `power-end-cap`                                             | AC Works CVFE on the last CS6364                                                                                                                                                                                                                     | 1      | $8.99             | $8.99                      | [AC Works](https://acworks.com/products/cvfe-cable-end-weather-cover)                                                                                                                                        | fit on a 50 A connector unverified                                                                                                      | Quoted / Unknown    |
| `power-feed-sockets`                                        | **Inlet:** Hubbell HBL504SS 50 A 125/250 V marine inlet, IP56, NEMA 4X, gasketed self-closing cover ($207.49–327.14). **Out to segment 1:** a short pigtail through a gland, 3 ft 6/4 + CS6364 connector + boot ($111.85 AC Works – $218.52 Leviton) | 1      | —                 | $319.34 – $545.66          | [Aztekc HBL504SS](https://www.aztekc.com/ss-inlet-50a-125-250v-hubbell/p) $207.49; [Standard Electric](https://www.standardelectricsupply.com/Hubbell-HBL504SS-Shore-Power-Inlet) $327.14                    | IP56 (distributors); "watertight when fastened" (Marine Engine)                                                                         | Quoted\* / Reported |
| `power-feed-box`                                            | Hammond PCJ12106H + DIN 2-pole **50 A (or 45 A)** UL 489 breaker, e.g. Allen-Bradley 1489-M2C500                                                                                                                                                     | 1      | $197 – $326       | $197.33 – $326.45          | box: [Findchips](https://www.findchips.com/search/PCJ12106); breaker: [IMS Supply](https://www.imssupply.com/catalog/allen-bradley/1489-m2c500.html) "from $156" (not an authorised distributor)             | [Rockwell 1489-M](https://www.rockwellautomation.com/zh-tw/products/hardware/circuit-and-load-protection/1489-m.html): UL 489, 0.5–63 A | Estimate / Quoted\* |
| `power-trunk-glands`                                        | Lapp SKINTOP M50 (27–34 mm) or STR-M 50 (24–29 mm, a better centre for 27.3 mm)                                                                                                                                                                      | 34     | $6 – $15          | $204 – $510                | [Electrihub 53111260](https://electrihub.com/products/wires-and-cables/cable-glands/lapp-cable-glands-53111260) $10.15 (black M50)                                                                           | Lapp table, ST-M 50×1.5: 27–35 mm ([RS doc](https://nonprod.docs.rs-online.com/7437/0900766b81372d9d.pdf))                              | Estimate / Quoted\* |
| `power-portable-adapter` (replaces `power-towable-adapter`) | **AC Works ADTEL1430**, L14-30P → CS6364, compact ($39.99 sale, $58.99 list); or **TEL1430-010**, 10 ft 10/4 SOOW, cETLus 5031789 ($124.27)                                                                                                          | 1      | $39.99 – $124.27  | $39.99 – $124.27           | [ADTEL1430](https://acworks.com/products/adtel1430-l14-30p-to-cs6364-tempower), [TEL1430](https://acworks.com/collections/industrial-and-job-site-adapters/products/tel1430-l14-30p-to-cs6364-50a-connector) | pages                                                                                                                                   | Quoted / Reported   |
| **Subtotal, differing lines**                               |                                                                                                                                                                                                                                                      |        |                   | **$6,727.36 – $10,827.11** |                                                                                                                                                                                                              |                                                                                                                                         |                     |

**Notes on the 50 A lines:**

- **Feed box output: a pigtail, not a panel receptacle (reasoning).** Segment 1's
  plug then mates a booted CS6364 exactly like every other joint, under the same
  boots. A panel CS6369 with a lift cover (Hubbell's covered CS-series parts say
  "Indoor Dry Unless Protected") leaves the mated face exposed.
- **Inlet choice.** Hubbell's industrial covered inlet **CS6375M2** ($188.57
  min 3 at [MRO](https://www.mrosupply.com/products/5971726/as-markdown/) to
  $318.85 at [North Coast](https://www.northcoast.com/product/detail/40756/hubbell-kellems-cs6375m2))
  is also "Indoor Dry Unless Protected By Additional Means". The marine
  **HBL504SS** is IP56 with its cover shut, so it is the leading part.
  - With the feeder plugged in, the cover is open. Whether the feeder's
    CS6364 with a 50ARCV ring seals to the inlet is **Unknown**.
  - Mount the inlet facing down, under the box's lip.
- **Feeder: prefer TESS2TH.** A listed cord set is covered by 240.5(B)(3) on the
  generator's 50 A breaker. A field-built 6/4 feeder is held to 400.5 ampacity,
  which is 45.1 A at 50 °C (section 1c). That is not enough for a 50 A
  CS6369. A Power Assemblies 50 ft 6/4 CS6364-to-CS6365 cord is listed at
  [Home Depot](https://www.homedepot.com/p/POWER-ASSEMBLIES-50-ft-6-4-AWG-SOOW-50-Amp-125-Volt-250-Volt-CS6364-to-CS6365-California-Standard-Twist-Lock-Generator-Extension-Cord-PWACS4O50050MF/329926770)
  at $523.10 (search snippet, 0 in stock; listing not checked).
- **The power box internals carry 6 AWG.** Feed-through terminal blocks and the
  tap block must take 6 AWG (16 mm²) instead of 8 AWG. The tap to the segment's
  20 A breaker stays inside the box: the 10 ft tap rule needs the tap conductor
  to be at least 1/10 of 50 A, which 12 AWG easily is (NEC 240.21(B)(1);
  Assumed from the code text). The cost difference is small and sits in the
  15 % contingency (Assumed).

### 3d. The portable-generator adapter: what protection it needs

**None of its own (reasoning, NEC 240.4/240.5).**

- **The generator is the only source.** On a portable, the L14-30R sits behind
  the generator's own 30 A breaker, or an electronic limit (Honda EU7000iS:
  22.9 A a leg, from the feed file).
- **Everything downstream is rated above 30 A:** the 6/4 trunk (45.1 A at
  50 °C), the 50 A connectors and the feed box breaker. So the generator's
  breaker protects all of it. Conductors bigger than needed are always allowed.
- **The adapter itself** is a listed short adapter or cord set. The 10 ft
  TEL1430 is 10/4 SOOW: 24.6 A at 50 °C if it were bare cord, but covered by
  its listing (240.5(B)(3)). The compact ADTEL1430 avoids the question.
- **The feed box breaker never trips first:** 50 A sits above the
  generator's 30 A. That is harmless.
- **Capacity on a portable: 5.76 kVA continuous** (24 A a leg), or less where
  the generator limits each leg. That matches Option 30 A on the same
  generator.
- **Ground faults:** if the portable's L14-30R is GFCI-protected, the
  nuisance-trip risk is the same as in Option 30 A (feed file §6d).

**Contrast with Option 30 A.** The towable adapter there must carry a 30 A
breaker, because it steps a 50 A source down to 30 A parts. Here the adapter
steps a 30 A source up to 50 A parts, which needs nothing.

### 3e. Option 50 A subtotal

|                          | Low            | High           |
| ------------------------ | -------------- | -------------- |
| Lines that differ (3c)   | $6,727.36      | $10,827.11     |
| Shared lines (section 7) | $5,692.96      | $11,059.01     |
| **Power category**       | **$12,420.32** | **$21,886.12** |
| With 15 % contingency    | $14,283        | $25,169        |

---

## 4. Capacity

kVA = 240 V × A (split-phase). Continuous = 80 % of the breaker. Per leg
balanced = 8 segments a leg.

| Feed                               | kVA  | Continuous kVA | Per leg (continuous) | V1 est. max 64 spokes, 9.6 kVA                         | 128 spokes, ~19.2 kVA | Real 1.5–2 kW | Real 128 spokes, 3–4 kW |
| ---------------------------------- | ---- | -------------- | -------------------- | ------------------------------------------------------ | --------------------- | ------------- | ----------------------- |
| **30 A, 8/4**                      | 7.2  | **5.76**       | 24 A                 | **60 %**: a sustained estimated maximum trips the feed | 30 %                  | 2.9–3.8×      | 1.4–1.9×                |
| 30 A on a Honda EU7000iS           | 5.5  | 5.5 (rated)    | 22.9 A               | 57 %                                                   | 29 %                  | 2.75–3.7×     | 1.4–1.8×                |
| **50 A, 6/4 at ≤ 40 °C**           | 12.0 | **9.6**        | 40 A                 | **100 %**, no margin                                   | 50 %                  | 4.8–6.4×      | 2.4–3.2×                |
| 45 A, 6/4 at 50 °C                 | 10.8 | 8.64           | 36 A                 | 90 %                                                   | 45 %                  | 4.3–5.8×      | 2.2–2.9×                |
| 50 A trunk on a portable (adapter) | 7.2  | 5.76           | 24 A                 | 60 %                                                   | 30 %                  | 2.9–3.8×      | 1.4–1.9×                |

- **9.6 kVA is not a measurement.** The V1 drawing's 15 A per circuit is the
  user's estimate of maximum draw, and the user says the strips "never really
  draw what everyone expects" (Reported, 2026-10-21). The strip-spec estimate in
  `docs/pricing-2026-10.md` puts 64-spoke full white at 4.5–9.0 kW, which
  brackets it.
- **Option 50 A** covers the V1 estimate exactly at 50 A, or 90 % at 45 A.
- **Option 30 A** covers it only if real full white is at most about 60 %
  of the estimate.
- **Measuring one spoke at full white** (already on the power plan's progress
  list) decides whether the difference matters.

---

## 5. Voltage drop: 50 ft feeder + 188.5 ft ring

**Model** (as in `docs/pricing-power-feed-2026-10.md` §3, updated for the new
geometry; reasoning):

- **Feeder:** the 50 ft feeder carries full current.
- **Ring:** the 188.5 ft ring carries a load spread evenly along it, which is
  the same as full current over half its length.
- **Effective length:** **144.25 ft one way**. The result is the drop at the
  far end of the ring.
- **Balanced legs:** the neutral carries almost nothing, so the drop is on
  the hot only. With everything on one leg, the neutral carries the same
  current back and the drop doubles.
- **Resistance:** 75 °C stranded copper (NEC Ch. 9 Table 8): 8 AWG
  0.778 Ω/1000 ft, 6 AWG 0.491 Ω/1000 ft. A cord running at 90 °C adds
  about 5 %.

| Case                                                                      | Option 30 A (8 AWG) | Option 50 A (6 AWG) |
| ------------------------------------------------------------------------- | ------------------- | ------------------- |
| **Full continuous load, balanced** (30 A: 24 A a leg; 50 A: 40 A a leg)   | **2.69 V (2.2 %)**  | **2.83 V (2.4 %)**  |
| Full continuous load, all on one leg                                      | 5.39 V (4.5 %)      | 5.67 V (4.7 %)      |
| 45 A breaker, 36 A a leg, balanced                                        | —                   | 2.55 V (2.1 %)      |
| **Real 2 kW, balanced** (8.3 A a leg)                                     | **0.94 V (0.8 %)**  | **0.59 V (0.5 %)**  |
| Real 1.5 kW, balanced                                                     | 0.70 V (0.6 %)      | 0.44 V (0.4 %)      |
| Real 128 spokes, 4 kW, balanced                                           | 1.87 V (1.6 %)      | 1.18 V (1.0 %)      |
| Same load as the 30 A full load (24 A a leg)                              | 2.69 V (2.2 %)      | 1.70 V (1.4 %)      |
| Bound: full continuous current lumped at the far end (238.5 ft), balanced | 4.45 V (3.7 %)      | 4.68 V (3.9 %)      |

- **Both options land near 2–2.5 % at their own full rating.** 6 AWG has 63 %
  of 8 AWG's resistance but carries 1.67× the current.
- **At the same load, 50 A drops 37 % less.**
- **Every load is a switch-mode supply** rated from 88–90 VAC up (Mean Well
  SDR/HLG), so drop costs a little efficiency, not function.
- **The 20 A outlets** see the same voltage as their segment's tap, minus
  their own short 12 AWG run.

---

## 6. Which rental power each option plugs into

From the generator survey in `docs/pricing-power-feed-2026-10.md` §1 (maker spec
sheets, 2026-10-21), plus today's spider-box check.

| Source                                                                                 | Its locking outlet                                                                                                                                                                                                                 | Option 30 A                                                            | Option 50 A                                                                                                                                                                                                                                 |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Portables, 5–18 kW (30 of 31 surveyed)                                                 | 1 × L14-30R                                                                                                                                                                                                                        | **Direct**                                                             | Via ADTEL1430 / TEL1430 ($40–124), 5.76 kVA                                                                                                                                                                                                 |
| Battery stations (Anker SOLIX F3800)                                                   | 1 × L14-30R                                                                                                                                                                                                                        | **Direct**                                                             | Via adapter                                                                                                                                                                                                                                 |
| Honda EB10000                                                                          | L14-30R, plus a 50 A 120/240 V locking outlet, "up to 41.6 amps at 240V" ([Honda handout](https://cdn.powerequipment.honda.com/pe/pdf/misc/receptacle/Consumer_Handout_EB10_AC_Receptacle_Selection.pdf), Confirmed); type unnamed | Direct (L14-30R)                                                       | **Probably direct** if it is a CS6369 (Unknown)                                                                                                                                                                                             |
| Towables, 20–70 kW (15 of 15 surveyed: MultiQuip, Generac Mobile, Atlas Copco, Wacker) | 2–3 × CS6369                                                                                                                                                                                                                       | Via the towable adapter with a 30 A breaker ($467–557)                 | **Direct**                                                                                                                                                                                                                                  |
| 50 A event spider boxes (CEP 6506GU / 8706GU, Power Assemblies Beetle Box)             | CS6375 inlet, **CS6369 feed-through**                                                                                                                                                                                              | Not direct (their 30 A outlet is L6-30R, which has no neutral: no use) | **Direct, from the feed-through** ([Red-D-Arc CEP](https://www.red-d-arc.com/en-us/spider-box-portable-power-distribution/5638265839.p), [J.P. Lilley CEP 8706GU](https://jplilley.com/rental/rentalcatalog/power/8706gu-detail), Reported) |
| Three-phase cam-lok distros                                                            | cam-lok, often with CS6369 outputs (Assumed, not surveyed)                                                                                                                                                                         | Via a CS6369 output and the towable adapter                            | Direct from a CS6369 output                                                                                                                                                                                                                 |

- **Towable voltage selector:** the voltage-selector rule from the feed file
  holds for both options. A towable must be in the 1φ 120/240 or 3φ 208Y/120
  position; in its 240/480 V positions an Atlas Copco's CS6369 gives
  240/139 V.
- **GFCI on the spider boxes:** spider-box GFCI modules protect the 5-20R
  outlets, and trip at 4–6 mA (Reported). **Whether the feed-through is
  GFCI-protected is Unknown.** If it is, the ring's summed leakage could trip
  it, as noted for portables in the feed file §6d.

---

## 7. Lines shared by both options (unchanged)

From `app/content/budget.ts` (2026-10-21), not rechecked today.

| Line                                                                   | Qty | Unit             | Extended (low – high)      |
| ---------------------------------------------------------------------- | --- | ---------------- | -------------------------- |
| `power-box` Hammond PCJ12106H                                          | 17  | $77.33 – $126.45 | $1,314.61 – $2,149.65      |
| `power-box-panel` Hammond PCJA1109                                     | 17  | $17.54 – $21.65  | $298.18 – $368.05          |
| `power-din` DIN rail 10 × 1 m                                          | 1   | $42.50           | $42.50                     |
| `power-gfci` 20 A Class A GFCI (A-B 1492-MCGAT120, or breaker + GSIA2) | 17  | $82.77 – $290.77 | $1,407.09 – $4,943.09      |
| `power-54v` Mean Well SDR-240-48                                       | 17  | $95.03           | $1,615.51                  |
| `power-glands` Lapp SKINTOP M20                                        | 68  | $2.94 – $3.13    | $199.92 – $212.84          |
| `power-vents` Amphenol LTW vent                                        | 17  | $2.48 – $4.17    | $42.16 – $70.89            |
| `power-outlets` 4 × 20 A outlets per box                               | 17  | $45.47 – $97.44  | $772.99 – $1,656.48        |
| **Shared total**                                                       |     |                  | **$5,692.96 – $11,059.01** |

The per-segment 20 A GFCI works the same on either trunk. Each power box taps
one leg (8 + 8). The GFCI sees only its own hot and neutral, downstream of the
tap.

---

## 8. If neither covers 128 spokes at the estimated maximum

Not priced in depth. 128 spokes at the V1 estimate is about 19.2 kVA, 80 A a
leg.

- **Two 50 A feeds (the natural next step for Option 50 A).**
  - **Layout:** split the ring into two open halves, each with its own feed
    box at opposite joints. One half is 8 segments; the far joints of the
    halves stay unmated and capped.
  - **Capacity:** 2 × 9.6 = **19.2 kVA continuous**, matching the 128-spoke
    estimate with no margin.
  - **Generator:** every towable surveyed has 2–3 CS6369. Two 50 A outlets
    need a towable that delivers at least 24 kVA single-phase. Those are the
    25–45 kVA classes, and their single-phase ratings were not checked
    (Unknown).
  - **Extra cost:** a second feed box and feeder, about $1.1–1.6K, plus the
    selector rules above.
  - **Bonus:** the same split also runs from **two portables** through two
    adapters (2 × 5.76 kVA).
- **Two 30 A feeds** (Option 30 A, same split): 11.5 kVA. That covers 64
  spokes at the estimate, not 128.
- **Three-phase 208Y/120 from a cam-lok distro:**
  - **Capacity:** a 60 A 4P5W feed gives 17.3 kVA continuous.
  - **Hardware:** it needs IEC 60309 pin-and-sleeve (screw ring, not twist)
    and about 4/5 cord. 6/5 holds only about 30 A at 50 °C (feed file §5).
  - **Joints:** $644–805 a joint (feed file §4c), and no rental unit has the
    receptacle.
  - **Verdict:** it doesn't beat two 50 A split-phase feeds on cost or
    rental fit.
- **The cheaper lever is still data:** measure a spoke at full white. If real
  full white is well under the V1 estimate, either option may already be
  enough for 128 spokes.

---

## Assumptions

1. **Ampacity:** Column B for split-phase cord (neutral not counted) and the
   50 °C row (0.82), as in the earlier files. 240.4(B) next-size-up doesn't
   apply to cord.
2. **Continuous load = 80 % of the breaker.**
3. **Voltage drop:** uniform load along the ring, 50 ft feeder, 75 °C
   resistance. The worst case puts the full per-leg current on one leg.
4. **Quantities:** 18 joint sets, 240 ft trunk, 34 trunk glands, 17 power
   boxes, one feeder and one adapter per option.
5. **The 128-spoke maximum** scales linearly from the V1 estimate.
6. **Bend radius of 6 × OD** for portable cord. It is a common rule of thumb;
   Southwire's SPEC 70000 states none.
7. **Mated 50 A pair length** (~205 mm) is estimated from the AC Works
   drawings, with an engagement of about 42 mm (the plug's front step).

## Could not verify

- **AC Works 50 A ends:**
  - cord grip range and temperature rating;
  - whether the "-RK" SKUs carry the same E57672 listing;
  - who holds file E57672. UL Product iQ needs an account.
- **50ARCV boots:** whether a booted pair seals the mating face, or only the
  cord entries. No rating is published.
- **Leviton IP55:** the "fully mated with both boots" condition comes from a
  retailer. Leviton's pages show only "IP55" in the title. The instruction
  sheet wasn't read.
- **Hubbell boots** on CS6365C/CS6364C (as opposed to the marine HBL63CM
  bodies).
- **Cord Vault interior dimensions.** Only the outside size and the "closed
  depth" are published. Its fit on either mated pair is unverified, including
  the 30 A pair already in the budget.
- **HBL504SS** sealing against a non-marine CS6364 with a ring boot.
- **Breaker prices.** The A-B 1489-M2C500 price is from a reseller that isn't
  authorised. No 45 A price was looked up.
- **GFCI on the CS6369 outputs:** whether towable CS6369 outlets or spider-box
  feed-throughs are GFCI-protected.
- **Honda EB10000:** the exact type of its 50 A outlet.
- **Single-phase ratings** of the 25–45 kVA towables, for the two-feed option.
- **NEC text:** 240.4 lead-in, 240.5(B)(3), 240.21(B)(1) and 400.5. These are
  paraphrased from memory and the earlier files' secondary sources, not
  re-read in the 2023 edition.
