# Feed options, part 2: 30 A three-phase, 100 A, and multi-feed, October 2026

On 2026-10-22 the user said: "**30A 3 phase should be enough. but let's price
out 50A and 100A just in case.**" 50 A split-phase is already priced in
`docs/pricing-feed-options-2026-10.md` (the first comparison). This file prices
the rest on the same basis, so everything can sit side by side:

- **Option 30 A 3φ:** 120/208 V three-phase on NEMA L21-30 (30 A, 4-pole
  5-wire). Loose listed ends at every joint on bulk 8/5 UL SOOW cut to length,
  and per-segment taps spread over the three phases (6 + 5 + 5).
- **Option 100 A split:** 100 A 120/240 V split-phase.
- **Option 100 A 3φ:** 100 A 120/208 V three-phase.
- **Multi-feed alternatives:** a single 30–50 A ring split into two halves at
  50 A, or three thirds at 30 A, each fed separately (from one generator, a
  100 A distro, or several portables).

**Basis (unchanged from the first comparison):**

- **Geometry:** a 60 ft ring, 188.5 ft around, with 16 segments of about
  11.8 ft. The ring is open and radial: fed at joint 0, run one way, last
  connector capped.
- **Joints:** rain-proof, not watertight. Joints are kept off the ground,
  under covers or boots.
- **Quantities:** a 50 ft feeder, 240 ft of trunk, and 18 joint sets
  (16 + 2 spares).
- **Each segment:** a 20 A Class A GFCI and four 20 A outlets, the same in
  every option.
- **Design ambient:** 50 °C for cord ampacity.
- **Loads:** the real load is 1.5–2 kW (Reported). V1's estimated maximum is
  9.6 kVA at 64 spokes and about 19.2 kVA at 128. The user says that maximum
  is "never really reached".

**Method.** Prices and specs were checked on **2026-10-22** by read-only
browsing. Nothing was ordered, carted or quoted, and no vendor was contacted.
AC Works prices were read from the store's own product data (Shopify `.json`).
Ratings come from maker pages, drawings and catalogues where those exist; the
source is marked on each line. Lines carried over from the earlier files keep
their 2026-10-21 prices. All prices are USD before tax and shipping. Ring
geometry is in feet; everything else is metric and °C.

**Confidence key** (as in the other pricing files)

| Mark          | Meaning                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| **Quoted**    | Price seen today on the seller or maker page at the URL given                                           |
| **Quoted\***  | Price seen only in a search snippet or aggregator, or from a reseller that isn't authorised. Recheck it |
| **Estimate**  | A range from comparable parts                                                                           |
| **Confirmed** | Spec from the maker's own page, drawing, catalogue or spec sheet                                        |
| **Reported**  | Spec from a retailer or distributor, or from the user, not a maker document                             |
| **Assumed**   | My inference, or a fact I could not source; the assumption is named                                     |
| **Unknown**   | Looked for and not found                                                                                |

---

## Summary

- **Possible misunderstanding to confirm first.** NEMA **L14-30**, the current
  design, is "3-pole 4-wire": two hots, a neutral and a ground. Generator
  manuals call 120/240 V "single-phase 3-wire". If "30A 3 phase" meant that
  plug, **the current 30 A design already is it** and nothing below changes
  it. True three-phase is a different plug (L21-30, 5 pins) and a different
  power source.
- **Power-category subtotals, before the 15 % contingency.** Shared lines are
  taken from today's `budget.ts` ($6,041–11,359). That is a little higher
  than the first comparison used, because the GFCI line changed and the reset
  pole was added since.

  | Option                       | Power subtotal       | Continuous capacity                                  |
  | ---------------------------- | -------------------- | ---------------------------------------------------- |
  | 30 A split, L14-30 (current) | **$10,298 – 16,101** | 5.76 kVA                                             |
  | 30 A 3φ, L21-30              | **$10,906 – 20,804** | 8.65 kVA nominal; **really 5.1–7.2 kVA** (see below) |
  | 50 A split, CS6364/65        | **$12,769 – 22,186** | 9.6 kVA (8.64 at 45 A)                               |
  | 100 A split, cam-lok + #2    | **$15,046 – 30,382** | 19.2 kVA                                             |
  | 100 A 3φ, cam-lok + #2       | **$17,104 – 34,090** | 28.8 kVA (25.6 with 6/5/5 taps)                      |
  | 2 × 50 A halves              | **$13,935 – 23,931** | 19.2 kVA (17.3 at 45 A)                              |
  | 3 × 30 A thirds (L14-30)     | **$13,774 – 20,334** | 17.3 kVA (15.4 with 6/5/5 segments)                  |

- **30 A three-phase is not really 30 A on 8/5 cord.**
  - The loads are LED drivers and switch-mode supplies, which are non-linear.
    On a three-phase wye feeding them, the neutral counts as a
    current-carrying conductor (NEC 400.5). So 8/5 is rated at **28 A at 30 °C**
    ([Southwire SPEC 70000](https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US),
    Confirmed).
  - At the 50 °C design ambient that falls to **23.0 A**, which allows only a
    **20 A** breaker. At 40 °C it is 25.5 A, which allows **25 A**.
  - Every L21-30 device stops at 8 AWG and a 29 mm cord, so the heavier 6/5
    cord fits none of them.
  - With 16 segments on three phases (6 + 5 + 5), the busiest phase sets the
    limit. **Usable continuous capacity is 5.1 kVA at 20 A or 6.4 kVA at
    25 A.** That is about the same as today's 30 A split-phase (5.76 kVA).
    Three-phase costs $600–4,700 more and gives no more capacity.
- **What three-phase plugs into: no rental generator.**
  - No rental generator was found with an L21-30R. The towables have CS6369
    outlets and optional 400 A cam-loks; the portables have L14-30R.
  - So three-phase needs a **cam-lok-to-L21-30R box** at the generator. That
    is about $580–800 field-built (not a listed assembly), **$3,900** for a
    listed Motion Labs box with 8 × L21-30, or a rented event distro.
  - The construction 100 A distros at Sunbelt-type yards have **L21-20R**,
    not L21-30R. Because the trunk is strictly a 20 A system anyway, an
    L21-20P adapter cord would plug into those with no loss of capacity
    (Assumed; not priced).
  - Three-phase loses the portable and battery-station fit the current design
    has.
- **100 A works electrically but is impractical in the ring:**
  - **SOOW can't do it.** Southwire rates 2/4 SOOW at only 64 A (52 A at
    50 °C).
  - **Single conductors can.** The workable trunk is four or five single #2
    Type W or SC conductors, with a 16-series cam-lok pair on each conductor at
    every joint. #2 carries 156 A in free air at 50 °C.
  - **Weight:** about **7.8–11 kg a segment** (split) or **9.7–14 kg** (3φ),
    against 3.6 kg today. That is 125–220 kg on the lifted ring, against
    about 58 kg.
  - **Connections:** **64–80 single-pole connections** to make, in order, at
    every set-up. Cross a hot and a neutral at any of them and 208–240 V goes
    into 120 V supplies.
  - **Boxes:** 8–10 cable entries and #2-rated blocks in every power box.
  - **Generator:** a 36–45 kVA towable with cam-loks or lugs.
  - **Pin-and-sleeve instead:** a 100 A multi-conductor trunk on IEC 60309
    connectors would cost **$14.5–37K in joints alone**.
- **Voltage drop** (50 ft feeder + 188.5 ft ring, uniform load) stays small
  everywhere:
  - About 1.5–2.4 % at each option's own full continuous load, balanced.
  - Under 1 % at the real 2 kW.
- **Recommendation.**
  - **First, confirm what "3 phase" meant.**
  - **Keep the 30 A split-phase L14-30 design** whether or not three-phase was
    meant. On the 50 °C basis, true three-phase on 8/5 gives no more capacity,
    costs more, and plugs into nothing directly.
  - **If headroom is wanted "just in case",** don't go to 100 A. Use
    **two half-rings fed at joint 0**: at 50 A, $13.9–23.9K and 19.2 kVA,
    straight into any towable's two CS6369 outlets. Or keep 30 A
    and build the ring so a second feed can be added later, at about $1.1K
    (see section 6c). Either one covers the 128-spoke estimate (or 60 % of
    it at 30 A) at a fraction of the cost and weight of 100 A.

---

## Side-by-side comparison

Capacity is 80 % of the feed breaker. "Usable" applies the 6/5/5 tap split on
three-phase with equal segment loads. Voltage drop is at the far end, at each
option's full continuous load, balanced. Weights are per 11.8 ft segment.

|                                         | **30 A split (current)**                        | **30 A 3φ**                                                                               | **50 A split**                                 | **100 A split**                                                          | **100 A 3φ**                                  | **2 × 50 A halves**                                              | **3 × 30 A thirds**                                    |
| --------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| Feed / joint connector                  | L14-30, AC Works loose ends                     | L21-30, AC Works or Hubbell loose ends                                                    | CS6365 / CS6364                                | 4 × cam-lok 16 series (L1, L2, N, G)                                     | 5 × cam-lok 16 series                         | CS6365 / CS6364, two feeds                                       | L14-30, three feeds                                    |
| Trunk                                   | 8/4 UL SOOW                                     | 8/5 UL SOOW                                                                               | 6/4 UL SOOW                                    | 4 × #2 single SC or Type W                                               | 5 × #2 single SC or Type W                    | 6/4 UL SOOW                                                      | 8/4 UL SOOW                                            |
| Trunk ampacity at 50 °C                 | 32.8 A                                          | **23.0 A** (neutral counts); 25.5 A at 40 °C                                              | 45.1 A                                         | 156 A free air (125 A if bundled)                                        | same                                          | 45.1 A                                                           | 32.8 A                                                 |
| Feed breaker                            | 30 A 2-pole                                     | **20 A** 3-pole strictly, **25 A** at ≤ 40 °C; 30 A not supported                         | 50 A (45 A strictly)                           | 100 A 2-pole                                                             | 100 A 3-pole                                  | 2 × 50 A (45 A)                                                  | 3 × 30 A                                               |
| Nominal kVA                             | 7.2                                             | 10.8 at 30 A; 9.0 at 25 A; 7.2 at 20 A                                                    | 12.0                                           | 24.0                                                                     | 36.0                                          | 24.0                                                             | 21.6                                                   |
| Continuous kVA                          | **5.76**                                        | 8.65 / **7.2 / 5.76**                                                                     | **9.6** (8.64)                                 | **19.2**                                                                 | **28.8**                                      | **19.2** (17.3)                                                  | **17.3**                                               |
| Usable with equal segment loads         | 5.76 (8 + 8)                                    | 7.68 / **6.4 / 5.12** (6 + 5 + 5)                                                         | 9.6                                            | 19.2                                                                     | 25.6                                          | 19.2                                                             | 15.4 (6/5/5 segments a third)                          |
| vs V1 est. max, 64 spokes (9.6 kVA)     | 60 %                                            | 53–67 % (80 % at a nominal 30 A)                                                          | 100 % (90 %)                                   | 200 %                                                                    | 267–300 %                                     | 200 % (180 %)                                                    | 160–180 %                                              |
| vs 128 spokes (~19.2 kVA)               | 30 %                                            | 27–33 %                                                                                   | 50 % (45 %)                                    | 100 %                                                                    | 133–150 %                                     | 100 % (90 %)                                                     | 80–90 %                                                |
| vs real 1.5–2 kW                        | 2.9–3.8×                                        | 2.6–4.3×                                                                                  | 4.8–6.4×                                       | 9.6–12.8×                                                                | 12.8–19×                                      | 9.6–12.8×                                                        | 7.7–11.5×                                              |
| Voltage drop, full continuous, balanced | 2.2 %                                           | 2.2 % at 30 A; 1.9 % at 25 A; 1.5 % at 20 A                                               | 2.4 %                                          | 1.9 %                                                                    | 1.9 %                                         | 1.6 % (half-ring)                                                | 1.3 % (2.0 % on a 100 ft feeder)                       |
| Voltage drop, real 2 kW                 | 0.8 %                                           | 0.5 %                                                                                     | 0.5 %                                          | 0.2 %                                                                    | 0.1 %                                         | ~0.2 %                                                           | ~0.2 %                                                 |
| Plugs directly into                     | Portables' L14-30R (30 of 31), battery stations | **No rental generator.** Event distros with L21-30R (Motion Labs, Indu); Winco WL12000HE? | Towables' CS6369 (15 of 15), 50 A spider boxes | Towables with the cam-lok option, or lug tails landed by the rental tech | same, in the 208Y position                    | Towables with 2–3 CS6369; 3φ distros with CS6369 (gives 120/208) | Generac Mobile MLG20IF4 (3 × L14-30R); three portables |
| Needs, for the rest                     | Towable adapter with a 30 A breaker ($467–557)  | Cam-lok → L21-30R box ($580–3,900), or a rented distro; nothing for portables             | Portable adapter ($40–124)                     | L14-30P → cam-lok adapter for portables ($250–400, at 5.76 kVA)          | Nothing for portables (they are single-phase) | Two portable adapters                                            | Three towable adapters (towables with 3 × CS6369 only) |
| Generator for full rating               | 7.2 kW portable                                 | 20 kW towable in 208Y                                                                     | 12 kVA 1φ (towable)                            | **24 kVA single-phase**: a 36–45 kVA towable                             | **36 kVA**: a 45 kVA (36 kW) towable          | 24 kVA single-phase                                              | 21.6 kVA single-phase                                  |
| Connections per joint                   | 1                                               | 1                                                                                         | 1                                              | **4 single-pole**                                                        | **5 single-pole**                             | 1                                                                | 1                                                      |
| Cord + ends per segment                 | 3.2 + ~0.45 kg                                  | 3.8 + ~0.45 kg                                                                            | 4.4 + ~1.0 kg                                  | **6.3–8.1 + 1.5–2.9 kg**                                                 | **7.9–10.2 + 1.8–3.6 kg**                     | 4.4 + ~1.0 kg                                                    | 3.2 + ~0.45 kg                                         |
| Whole ring (16 segments)                | ~58 kg                                          | ~69 kg                                                                                    | ~86 kg                                         | **~125–176 kg**                                                          | **~155–221 kg**                               | ~86 kg                                                           | ~58 kg                                                 |
| Per joint (ends + cover)                | $61.32                                          | $81.93 – $101.31                                                                          | $180.41 – $359.04                              | $135.96 – $434.84                                                        | $169.95 – $543.55                             | $180.41 – $359.04                                                | $61.32                                                 |
| Lines that differ                       | $4,257 – 4,742                                  | $4,865 – 9,445                                                                            | $6,727 – 10,827                                | $9,005 – 19,023                                                          | $11,063 – 22,731                              | $7,894 – 12,572                                                  | $7,732 – 8,975                                         |
| **Power subtotal**                      | **$10,298 – 16,101**                            | **$10,906 – 20,804**                                                                      | **$12,769 – 22,186**                           | **$15,046 – 30,382**                                                     | **$17,104 – 34,090**                          | **$13,935 – 23,931**                                             | **$13,774 – 20,334**                                   |
| With 15 % contingency                   | $11,843 – 18,516                                | $12,542 – 23,925                                                                          | $14,684 – 25,514                               | $17,303 – 34,939                                                         | $19,670 – 39,204                              | $16,025 – 27,521                                                 | $15,840 – 23,385                                       |

---

## 1. Basis shared by every option

### 1a. Shared lines (unchanged across options)

From `app/content/budget.ts` as of 2026-10-22, not rechecked today.

| Line                                                              | Qty | Unit             | Extended (low – high)      |
| ----------------------------------------------------------------- | --- | ---------------- | -------------------------- |
| `power-box` Hammond PCJ12106H                                     | 17  | $77.33 – $126.45 | $1,314.61 – $2,149.65      |
| `power-box-panel` Hammond PCJA1109                                | 17  | $17.54 – $21.65  | $298.18 – $368.05          |
| `power-din` DIN rail 10 × 1 m                                     | 1   | $42.50           | $42.50                     |
| `power-gfci` 20 A breaker + Ericson 1075-AR, or A-B 1492-MCGAT120 | 17  | $98.56 – $290.77 | $1,675.52 – $4,943.09      |
| `power-reset-pole` insulated reset pole                           | 2   | $40 – $150       | $80.00 – $300.00           |
| `power-54v` Mean Well SDR-240-48                                  | 17  | $95.03           | $1,615.51                  |
| `power-glands` Lapp SKINTOP M20                                   | 68  | $2.94 – $3.13    | $199.92 – $212.84          |
| `power-vents` Amphenol LTW vent                                   | 17  | $2.48 – $4.17    | $42.16 – $70.89            |
| `power-outlets` 4 × 20 A outlets per box                          | 17  | $45.47 – $97.44  | $772.99 – $1,656.48        |
| **Shared total**                                                  |     |                  | **$6,041.39 – $11,359.01** |

The first comparison used $5,692.96–11,059.01. Since then the budget's GFCI
low moved from $82.77 to $98.56 and the reset pole was added. The 30 A split
and 50 A split subtotals in this file are restated on today's shared lines;
their "lines that differ" are unchanged:

| Option               | Lines that differ (first comparison) | Shared (today)         | **Power subtotal**          | With 15 %         |
| -------------------- | ------------------------------------ | ---------------------- | --------------------------- | ----------------- |
| 30 A split (current) | $4,257.02 – $4,742.02                | $6,041.39 – $11,359.01 | **$10,298.41 – $16,101.03** | $11,843 – $18,516 |
| 50 A split           | $6,727.36 – $10,827.11               | same                   | **$12,768.75 – $22,186.12** | $14,684 – $25,514 |

**Every option keeps a 1-pole GFCI per segment on a 120 V line-to-neutral
tap.** On 208Y/120 that is still 120 V to neutral, so the Ericson 1075-AR
works the same (Assumed). The Allen-Bradley 1492-MCGAT note "grounded neutral
240 V wye systems only" was flagged in the feed file and is still unverified
for the 1-pole part.

### 1b. Loads

As in the first comparison: real 1.5–2 kW (Reported, user 2026-10-21); V1
"Circuit Loads" 9.6 kVA at 64 spokes, an estimate of maximum draw (Reported);
about 19.2 kVA at 128 spokes (Assumed: scales with pixels).

### 1c. Ampacity rules used here

- **NEC Table 400.5(A)(1)** covers multi-conductor cord up to 2 AWG.
  - Split-phase cord uses Column B, with the neutral not counted.
  - Three-phase wye with mostly non-linear loads counts the neutral: four
    current-carrying conductors, so Column A × 0.8. Southwire's own table for
    5-conductor SOOW already applies that 0.8.
  - This is as in `docs/pricing-power-feed-2026-10.md` §5. The code text is
    paraphrased, not re-read in the 2023 edition (Assumed).
- **NEC Table 400.5(A)(2)** covers Type W, G and SC cables, with a much
  higher column for single conductors in free air. The maker figures used are
  from the
  [Prysmian CAROL Industrial catalogue (2024)](https://na.prysmian.com/sites/na.prysmian.com/files/2024-09/CAR-0001-C-0924_CAROL_Industrial_web.pdf)
  (Confirmed).
- **Ambient correction for 90 °C cord:** 0.91 at 40 °C, 0.87 at 45 °C, 0.82 at
  50 °C.
- **Cord is protected at its ampacity** (NEC 240.5(A)). The next-size-up rule
  doesn't apply to cord, so ampacity is rounded **down** to a standard breaker
  (Assumed, as in the first comparison).

| Cord                                  | Basis                        | 30 °C | 40 °C  | 45 °C  | **50 °C**  | Largest breaker at 50 °C |
| ------------------------------------- | ---------------------------- | ----- | ------ | ------ | ---------- | ------------------------ |
| 8/4 SOOW (split)                      | Col B                        | 40 A  | 36.4 A | 34.8 A | 32.8 A     | 30 A                     |
| 6/4 SOOW (split)                      | Col B                        | 55 A  | 50.1 A | 47.9 A | 45.1 A     | 45 A                     |
| **8/5 SOOW (3φ, neutral counted)**    | Col A × 0.8 (Southwire 28 A) | 28 A  | 25.5 A | 24.4 A | **23.0 A** | **20 A**                 |
| 8/5 SOOW (3φ, neutral not counted)    | Col A (35 A)                 | 35 A  | 31.9 A | 30.4 A | 28.7 A     | 25 A                     |
| 6/5 SOOW (3φ)                         | Southwire 36 A               | 36 A  | 32.8 A | 31.3 A | 29.5 A     | 25 A (fits no L21-30)    |
| 2/4 SOOW                              | Southwire 64 A               | 64 A  | 58.2 A | 55.7 A | 52.5 A     | 50 A                     |
| **#2 single, Type W or SC, free air** | 400.5(A)(2), 90 °C single    | 190 A | 173 A  | 165 A  | **156 A**  | 150 A                    |
| #2 singles, bundled (× 0.8, Assumed)  | as above × 0.8               | 152 A | 138 A  | 132 A  | **125 A**  | 125 A                    |
| 2/4 Type W                            | Carol, 3-conductor basis     | 152 A | 138 A  | 132 A  | 125 A      | 125 A                    |
| 2/5 Type W                            | Carol, 80 % values           | 121 A | 110 A  | 105 A  | **99 A**   | 90 A                     |
| 1/0-5 Type W                          | Carol, 80 % values           | 164 A | 149 A  | 143 A  | 134 A      | 125 A                    |

Sources: Southwire SPEC 70000 for SOOW (Confirmed; 8/5 28 A, 6/5 36 A, 4/5
48 A, 2/5 64 A, 2/4 64 A); Carol catalogue for Type W (Confirmed). Lex
rates its 5-wire #2 SC banded feeder at 152 A, which matches the bundled row
(Reported, via distributor).

### 1d. Voltage-drop model

As in the first comparison:

- The 50 ft feeder carries the full current.
- The 188.5 ft ring is uniformly loaded, which equals half its length at
  full current. That gives an **effective 144.25 ft one way**.
- Balanced legs or phases put the drop on the hot only; everything on one leg
  doubles it.
- Resistances are 75 °C stranded copper (NEC Ch. 9 Table 8): 8 AWG
  0.778 Ω/kft, 6 AWG 0.491, 2 AWG 0.194, 1/0 0.122.
- Percentages are of 120 V line-to-neutral.

---

## 2. Option 30 A three-phase (L21-30, 8/5 SOOW)

### 2a. Capacity: the 8/5 limit and the 6/5/5 split

- **Nominal:** √3 × 208 V × 30 A = **10.8 kVA**, 8.65 kVA continuous, as the
  brief says.
- **Two things cut it down:**
  1. **Cord ampacity** (1c). With the neutral counted, 8/5 at 50 °C carries
     23.0 A, so the breaker is **20 A**. At a 40 °C design ambient it is
     **25 A**, the same kind of choice as the 50 A option's 45 A vs 50 A.
     A 30 A breaker on 8/5 needs both the neutral not counted and ≤ 45 °C.
     That is not defensible with LED drivers (Assumed reading of 400.5).
  2. **Tap balance.** Sixteen segments on three phases is 6 + 5 + 5. With
     equal segment loads, the 6-segment phase reaches its limit first, so the
     usable total is 16/6 × the per-phase continuous current × 120 V.

| Breaker                            | Nominal kVA | Continuous kVA | Usable, 6/5/5, equal loads | vs 9.6 kVA (64) | vs 19.2 (128) | vs real 1.5–2 kW |
| ---------------------------------- | ----------- | -------------- | -------------------------- | --------------- | ------------- | ---------------- |
| 30 A (not supported on 8/5)        | 10.81       | 8.65           | 7.68                       | 80 %            | 40 %          | 3.8–5.1×         |
| **25 A (≤ 40 °C)**                 | 9.01        | 7.21           | **6.40**                   | 67 %            | 33 %          | 3.2–4.3×         |
| **20 A (50 °C, strict)**           | 7.21        | 5.76           | **5.12**                   | 53 %            | 27 %          | 2.6–3.4×         |
| _30 A split-phase, for comparison_ | 7.2         | 5.76           | 5.76 (8 + 8)               | 60 %            | 30 %          | 2.9–3.8×         |

- The 6/5/5 penalty assumes equal loads per segment. Putting the network
  segment (P) and lighter segments on the 6-segment phase recovers some of it.
- **Real load per phase** is 4.2–5.6 A at 1.5–2 kW. Any of these rows carries
  it easily.

### 2b. Joint ends: loose listed L21-30

No L21-30 device found takes 6 AWG or a 30 mm cord. Every maker stops at
**8 AWG** and a **29–29.5 mm** grip. 8/5 at 26.4 mm fits all of them.

| Maker / MPN                 | Role             | Listing                                          | Cord grip                                      | Wire                                                   | Temp             | Size                                       | Price each (2026-10-22)                                                                                                                                                                 | Spec source                                                                        | Conf.                                         |
| --------------------------- | ---------------- | ------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------ | ---------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------- |
| **AC Works ASL2130P**       | plug             | cULus **E237606** (same file as the L14-30 ends) | Not published; page lists "12/5, 10/5, or 8/5" | "10 Gauge wire for 30 Amp"; max not stated             | not stated       | 92.5 mm long, 58.1 mm max OD, 49.7 mm body | **$31.99** ([AC Works](https://acworks.com/products/asl2130p-nema-l21-30p-30a-3-phase-120-208v-3py-5-wire-locking-male-plug))                                                           | [ASL2130P drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/ASL2130P.pdf) | Quoted / Confirmed (drawing) / Unknown (grip) |
| **AC Works ASL2130R**       | connector        | cULus E237606                                    | as above                                       | as above                                               | not stated       | 96.5 mm long, 58.1 mm max OD; 0.5 lb       | **$36.99** ([AC Works](https://acworks.com/products/asl2130r-nema-l21-30r-30a-3-phase-120-208v-3py-5-wire-locking-female-connector))                                                    | [ASL2130R drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/ASL2130R.pdf) | Quoted / Confirmed                            |
| **Hubbell HBL2811**         | plug             | UL 498                                           | **9–29 mm** (0.350–1.150 in)                   | **#16–#8**, stranded copper                            | **75 °C**        | 2.33 × 2.33 × 2.75 in                      | **$30.04** (1–11), $27.64 at 48+ ([Stage Lighting Store](https://www.stagelightingstore.com/Hubbell-HBL2811-L21-30-Male-Plug)); North Coast lists $116.81                               | [hubbell.com p/157046](https://www.hubbell.com/hubbell/en/p/157046)                | Quoted / Confirmed                            |
| **Hubbell HBL2813**         | connector        | UL 498                                           | 9–29 mm                                        | #16–#8                                                 | 75 °C            | 2.33 × 2.33 × 3.86 in                      | **$44.32** (1–11), $40.77 at 48+ ([Stage Lighting Store](https://www.stagelightingstore.com/Hubbell-HBL2813-L21-30-Female-Connector)); North Coast lists $218.72                        | [hubbell.com p/157051](https://www.hubbell.com/hubbell/en/p/157051)                | Quoted / Confirmed                            |
| Leviton 2811 / 2813         | plug / connector | UL E13393                                        | 15.1–29.2 mm (0.595–1.150 in)                  | "14–8 AWG", but "terminal accom. 18–10 AWG" (conflict) | −40 to **60 °C** | —                                          | $22.91 (backordered, [Lighting Supply](https://lightingsupply.com/products/leviton-2811)) / $44.49 ([Zoro](https://www.zoro.com/leviton-locking-connector-2813/i/G704393399/), snippet) | [leviton.com 2811](https://leviton.com/products/2811)                              | Quoted / Quoted\* / Confirmed                 |
| Eaton AHCL2130P / AHCL2130C | plug / connector | cULus                                            | 9.5–29.5 mm                                    | #14–#8                                                 | −40 to 60 °C     | 2.13 × 2.3 × 2.92 in (plug)                | $42.52 (snippet) / $56.00 ([Elliott](https://www.elliottelectric.com/P/Item/EWD/AHCL2130C/Alternate))                                                                                   | Eaton spec sheet                                                                   | Quoted\* / Quoted / Confirmed                 |

- **Per joint:** AC Works $68.98, Hubbell $74.36 (Leviton about $67, but it is
  rated only to 60 °C).
- **Lean: Hubbell.** It is the only one with a published grip that brackets
  26.4 mm 8/5, a confirmed 8 AWG terminal, and a 75 °C rating, for $5 more a
  joint. AC Works is the same listing file as the current L14-30 ends but
  publishes no grip range; trial-fit one if it is chosen.
- **Rain cover.** The AC Works L21-30 ends have the **same 58.1 mm maximum OD**
  as the L14-30 ends already in the budget. A mated pair is about 170 mm long
  (Hubbell about 150 mm; Assumed engagement of about 20 mm). So the
  **Cord Vault fit question is identical** to the current design's. One
  catch: the Cord Vault's published "closed depth 1.75 in" (44.5 mm) is
  smaller than a 58 mm body. If that figure is the interior, neither pair
  fits (Unknown; see Open questions). The high case uses the Twist and Seal
  **Cord Dome** ($26.95, 3R/IP44, fit Unknown).
- **No L21-30 boot found** at AC Works. The Hubbell HBL6036 long boot ($31–40)
  is described inconsistently as fitting 4-wire or 4- and 5-wire devices
  (Reported).

### 2c. What connects it to rental power

**Generators (survey from 2026-10-21, extended today):**

| Source                                                                              | Three-phase outlet                                                                                                                                                         | Source / conf.                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Towables, 20–70 kW (MultiQuip, Generac Mobile, Atlas Copco, Wacker; 15 of 15)       | None as a twist-lock. Lugs or terminal board standard; **cam-lok optional**: Atlas Copco "Cam-Lok quick connections (5 x 400A)", terminal board to 350 MCM                 | [Atlas Copco QAS 25-45 product reference](https://www.atlascopco.com/content/dam/atlas-copco/local-countries/united-states/documents/ptna-usa/generators/Product%20Reference%20Sheet%20QAS%2025-45%20Id%20T4F%20HOP%20.pdf) (Confirmed); feed file §1a                                                                    |
| Generac Mobile MLG20IF4 (1φ towable)                                                | 3 × L14-30R and 1 × CS6369 standard. Six optional receptacle packages, **none with L21-30R**                                                                               | [spec sheet](https://generac.com/globalassets/products/business/mobile-power--light-solutions/mobile-generators/spec-sheets/mlg20if4_mobile-diesel-generator-set_spec-sheet_english.pdf) (Confirmed)                                                                                                                      |
| Winco WL12000HE-04/A (3φ portable, 10.8 kW, 37.5 A)                                 | Product page says "(1) NEMA L21-30"; spec sheet SP-291/D says "(1) NEMA L20-30" (a 347/600 V configuration). **Contradictory.** A $5,750 purchase, not a rental-fleet unit | [Winco](https://www.wincogen.com/three-phase-portable-power/), [SP-291](https://www.wincogen.com/wp-content/uploads/PD/Spec_Sheets/Portables/SP-291_WL12000HE-3-PH.pdf) (Confirmed, conflicting); [AP Electric](https://apelectric.com/winco-wl12000he-04-a-10800w-3ph-120-208v-electric-start-portable-generator/) price |
| Portables, 5–18 kW (31 surveyed)                                                    | None; single-phase L14-30R                                                                                                                                                 | feed file §1b                                                                                                                                                                                                                                                                                                             |
| Bobcat, CAT XQ, Himoinsa, Kohler/SDMO, Aggreko small units, Sunbelt/United listings | No L21-30R seen                                                                                                                                                            | searched, nothing found (Unknown for Bobcat's twist-lock type)                                                                                                                                                                                                                                                            |

**So three-phase comes off a towable on cam-loks or lugs.** The Gate needs a
box that turns that into an L21-30R with 30 A (or 20/25 A) protection:

| Route                                                                                        | What                                                                                                                                                                                                                                                                                                                                                                                                            | Price                                                                                                                                                                                                                                                                                                                                                   | Conf.                                                 |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| **Field-built cam-lok tail box** (low)                                                       | 5 × Hubbell HBL300MBK male cam-loks on short #6 Type W tails, a Hammond PCJ12106H, an Eaton FAZ-C30/3-NA (or C25/C20) 3-pole UL 489 breaker, an ASL2130R pigtail out                                                                                                                                                                                                                                            | **$580–800**: cam-loks 5 × $46.71, tails ~$75, box $77–126, breaker $123, pigtail ~$52, glands ~$20                                                                                                                                                                                                                                                     | Estimate                                              |
| **Motion Labs Stackable 1325-04-21-06-002** (high)                                           | Cam 5-wire in, **8 × L21-30**, 8 × 30 A 3-pole breakers, ETL listed; no GFCI mentioned; special order                                                                                                                                                                                                                                                                                                           | **$3,899.88** (list $4,490) ([F&V Lighting](https://www.filmandvideolighting.com/motion-labs-stackable-distro-box-cam-input-to-8-l21-30-outlets-1325-04-21-06-002.html))                                                                                                                                                                                | Quoted / Reported                                     |
| Motion Labs 1300-100A-07-1-01 / -09-2-05                                                     | 100 A cam in, 3 × L21-30 (plus duplexes), ETL                                                                                                                                                                                                                                                                                                                                                                   | not shown ([Motion Labs](https://www.motionlabs.com/products/modular-power-distribution/))                                                                                                                                                                                                                                                              | Confirmed spec / Unknown                              |
| Larson portable spider box                                                                   | 208Y/120 input (connector not shown), 2 × L21-30R, NEMA 3R                                                                                                                                                                                                                                                                                                                                                      | $2,566.62 (snippet; [Larson](https://www.larsonelectronics.com/product/241699/portable-spider-box-208y-120v-ac-wye-input-2-l21-30r-receptacles-nema-3r))                                                                                                                                                                                                | Quoted\*                                              |
| **Rent** an event distro with L21-30 (e.g. Indu Electric 200 A cube, 6 × L21-30R, at Rentex) | Stage and event rental houses, not construction yards                                                                                                                                                                                                                                                                                                                                                           | quote only ([Rentex](https://www.rentex.com/rental-products/indu-electric-200a-cube-distro/)); comparable 100 A 3φ distros rent for $150–200 a day ([ProAV Rentals](https://proavrentals.net/products/distro-box-3-phase-100-amp), [EventStarts](https://eventstarts.com/products/rental-lex-100-amp-3-phase-power-distribution-box-distro-pd-15x-20a)) | Reported                                              |
| **L21-20 adapter into a construction distro** (not in the subtotal)                          | Construction 100 A distros carry **L21-20R**: Lex DB100NP-AFF-S3 (5 × L21-20R, $3,139.88, [F&V](https://www.filmandvideolighting.com/lex-100-amp-3-phase-pagoda-to-l21-20-locking-receptacles-db100np-aff-s3.html)), Ericson Big E Jr, Trystar Tuff Panel; Sunbelt rents a 100 A "Quad Box" with 4 × 20 A 3φ. An L21-20P → L21-30R adapter cord feeds the ring at 20 A, which is the strict 50 °C rating anyway | about $60–150 field-built                                                                                                                                                                                                                                                                                                                               | Estimate / Assumed (Sunbelt's outlet type not stated) |

- **The field-built box is not a listed assembly.** Temporary distribution
  equipment is normally UL 1640 listed, and an inspector may not accept a
  home-made box (Assumed). The Motion Labs box is ETL listed.
- **Selector position:** a towable feeding three-phase must be in the 3φ 208Y
  position. In its 240 or 480 V positions there is no 120 V to neutral (feed
  file §1a).
- **Portables can't feed it.** A portable is single-phase. An L14-30P to
  L21-30R adapter that puts two of the ring's phases on one leg is
  electrically possible but non-standard. Not priced or recommended.
- **Rental size:** 10.8 kVA is a 20 kW towable. DOZR's September 2026 base
  rate is about $395 a day or $890 a week, with delivery, fuel, cable and
  distros extra ([DOZR](https://rent.dozr.com/generator-rental), Reported).

### 2d. Option 30 A 3φ: all lines that differ from the current design

| Line (budget id, proposed)                               | Part                                                                                                                                                                                              | Qty    | Unit              | Extended (low – high)     | Source                                                                                                                                                                                                                                                                                            | Conf.                           |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `power-joint-plug`                                       | Hubbell HBL2811 (low) / AC Works ASL2130P (high)                                                                                                                                                  | 18     | $30.04 – $31.99   | $540.72 – $575.82         | 2b                                                                                                                                                                                                                                                                                                | Quoted                          |
| `power-joint-connector`                                  | AC Works ASL2130R (low) / Hubbell HBL2813 (high)                                                                                                                                                  | 18     | $36.99 – $44.32   | $665.82 – $797.76         | 2b                                                                                                                                                                                                                                                                                                | Quoted                          |
| `power-joint-covers`                                     | Cord Vault (as today, fit Unknown) / Cord Dome                                                                                                                                                    | 18     | $12.95 – $26.95   | $233.10 – $485.10         | [Cord Vault](https://twistandseal.com/products/twist-and-seal-cord-vault-keeps-large-cord-connections-dry-and-secure), [sizing chart](https://twistandseal.com/pages/sizing-chart)                                                                                                                | Quoted / Unknown (fit)          |
| `power-trunk`                                            | 8/5 UL SOOW, 26.4 mm, 719 lb/1000 ft                                                                                                                                                              | 240 ft | $7.59             | $1,821.60                 | [WCYW](https://www.wireandcableyourway.com/8-5-soow-portable-cord-600v-ul-csa) (rechecked 2026-10-22)                                                                                                                                                                                             | Quoted / Confirmed (SPEC 70000) |
| `power-feeder`                                           | Field-built: ASL2130P + ASL2130R on 50 ft 8/5 ($448.48, low); or Locking Power Cords IBX-5809-50, 50 ft 8/5 SOOW, "UL Listed… E364972", built to order ($495.00, high)                            | 1      | —                 | $448.48 – $495.00         | [Locking Power Cords](https://lockingpowercords.com/product/l21-30-extension-cords-30a-120-208v-8-5-soow)                                                                                                                                                                                         | Quoted / Reported               |
| `power-end-cap`                                          | AC Works CVFE (page says it fits "5-prong female connectors")                                                                                                                                     | 1      | $8.99             | $8.99                     | [AC Works](https://acworks.com/products/cvfe-cable-end-weather-cover)                                                                                                                                                                                                                             | Quoted / Unknown (fit)          |
| `power-feed-sockets`                                     | Low: Hubbell HBL2815 inlet ($38.61) + WP2 weatherproof cover, IP44 ($63.43) + an ASL2130R pigtail on 3 ft 8/5 ($59.76). High: HBL2815SW watertight inlet ($339.66) + HBL2810SW receptacle (~$262) | 1      | —                 | $161.80 – $601.66         | [HBL2815](https://www.stagelightingstore.com/Hubbell-HBL2815-L21-30-Flanged-Inlet), [WP2](https://www.standardelectricsupply.com/Hubbell-WP2-Weatherproof-Cover), [HBL2815SW](https://www.northcoast.com/product/detail/136973/hubbell-kellems-hbl2815sw); HBL2810SW from the feed file (snippet) | Quoted / Quoted\*               |
| `power-feed-box`                                         | Hammond PCJ12106H + Eaton **FAZ-C25/3-NA** (or C20) 3-pole UL 489. Not the FAZ-C30-3 without "-NA": that is a UL 1077 supplementary protector                                                     | 1      | $200.33 – $249.45 | $200.33 – $249.45         | [AutomationDirect FAZ-C25-3-NA](<https://www.automationdirect.com/adc/shopping/catalog/circuit_protection_-z-_fuses_-z-_disconnects/circuit_breakers_-a-_circuit_protectors/miniature_circuit_breakers_(mcb)/faz-c25-3-na>) $123.00 (Elliott lists $515.22)                                       | Quoted / Reported               |
| `power-trunk-glands`                                     | Lapp SKINTOP ST-M M40 (19–28 mm) takes 26.4 mm 8/5: unchanged                                                                                                                                     | 34     | $6 – $15          | $204 – $510               | budget estimate                                                                                                                                                                                                                                                                                   | Estimate                        |
| `power-3phase-distro` (replaces `power-towable-adapter`) | Cam-lok → L21-30R: field-built tail box (low) / Motion Labs 1325-04-21-06-002 (high)                                                                                                              | 1      | $580 – $3,899.88  | $580.00 – $3,899.88       | 2c                                                                                                                                                                                                                                                                                                | Estimate / Quoted               |
| **Subtotal, differing lines**                            |                                                                                                                                                                                                   |        |                   | **$4,864.84 – $9,445.26** |                                                                                                                                                                                                                                                                                                   |                                 |

| Option 30 A 3φ        | Low            | High           |
| --------------------- | -------------- | -------------- |
| Lines that differ     | $4,864.84      | $9,445.26      |
| Shared lines (1a)     | $6,041.39      | $11,359.01     |
| **Power category**    | **$10,906.23** | **$20,804.27** |
| With 15 % contingency | $12,542        | $23,925        |

**Against the current 30 A split design: +$608 to +$4,703.** Most of the
difference is the 8/5 cord (+$360), the dearer ends (+$330–440), and the
cam-lok box replacing the towable adapter (+$113 to +$3,343).

### 2e. Voltage drop and weight

- **Voltage drop at full continuous load, balanced:** 2.69 V (2.2 %) at a
  nominal 30 A (24 A a phase), 2.24 V (1.9 %) at 25 A, and 1.80 V (1.5 %) at
  20 A.
- **All on one phase:** 5.39 V (4.5 %).
- **At the real 2 kW** (5.6 A a phase): 0.62 V (0.5 %); 1.0 % at 4 kW.
- **Weight:** 8/5 is 719 lb/1000 ft, so **8.5 lb (3.85 kg) per segment**,
  plus about 0.45 kg of ends (ASL2130R is 0.5 lb). That is 0.65 kg more than
  8/4.
- **Bend radius** at 6 × OD (Assumed rule of thumb) is about 160 mm.

---

## 3. Option 100 A: what the trunk has to be

### 3a. Connector families at 100 A

- **NEMA twist-lock stops at 30 A** for three-phase with neutral, and at 50 A
  for split-phase (feed file §4c). So 100 A means one of two families.
- **Cam-lok 16 series:** single-pole, one connector per conductor, the
  event-industry standard.
- **IEC 60309 pin-and-sleeve:** multi-pole, screw-ring locking, IP67.
- **No IP67 16-series cam-lok was found.** The best rating is Hubbell's
  HBL300 at UL Types 3R/4X/12. Leviton's are Type 3R **when mated**
  (Confirmed). That meets the rain-proof decision without a cover.

**Cam-lok 16 series, inline pairs:**

| Maker / MPN                                                 | Rating                                                        | Wire         | Enclosure              | Price                                                                                                                                                                                                             | Spec source                                                                                                        | Conf.                         |
| ----------------------------------------------------------- | ------------------------------------------------------------- | ------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| **Leviton 16D22 (male) + 16D31 (female)**, double set screw | 300 A, 600 V AC/DC, UL 1691/508, 35 kA SCCR, CSA              | **#2–2/0**   | **Type 3R when mated** | **$17.60 + $16.39 = $33.99** a pair, 8 colours ([ATI Electrical](https://atielectrical.com/products/leviton-16-series-inline-camlocks-2-2-0-300a), rechecked 2026-10-22); $25.88 / $26.88 at F&V; $42–47 at Platt | [leviton.com 16D22](https://www.leviton.com/products/16d22-ue), [16D31](https://www.leviton.com/products/16d31-ue) | Quoted / Confirmed            |
| Marinco (Lex) CLS20MB                                       | 300 A (one listing 400 A), UL E471676                         | #2–2/0       | 3R and 4 (retailer)    | $17.44 male ([ATI](https://atielectrical.com/collections/all/single-pole-devices-cam-lock-connectors))                                                                                                            | retailer                                                                                                           | Quoted / Reported             |
| **Hubbell HBL300MBK / HBL300FBK**                           | 300 A ("400 A max"), 600 V AC / 250 V DC, UL/cUL; 0.8 lb each | **#6–2/0**   | **UL Types 3R/4X/12**  | MBK $46.71 ([Standard Electric](https://www.standardelectricsupply.com/Hubbell-HBL300MBK-Single-Pole-Plug)); FBK about $47–62. **About $95–120 a pair**                                                           | [hubbell.com p/162172](https://www.hubbell.com/hubbell/en/products/p/162172)                                       | Quoted / Quoted\* / Confirmed |
| Crouse-Hinds Cam-Lok E1016                                  | 400 A, 600 V, −40 to 105 °C                                   | 2/0–4/0 only | —                      | about $70–75                                                                                                                                                                                                      | retailer                                                                                                           | Reported (too big for #2)     |
| Leviton 16R22 panel receptacle (feed box)                   | 400 A, UL E151429                                             | #6–4/0       | 3R                     | $39.88 ([F&V](https://www.filmandvideolighting.com/leviton-cam-connector-female-panel-mount-double-set-screw-400-amp-16r22-16-series.html))                                                                       | retailer                                                                                                           | Quoted / Reported             |
| Caps (Leviton 16P22 female, others)                         | —                                                             | —            | 3R                     | $11.59 (ATI) – $31.64 (Crescent, snippet)                                                                                                                                                                         | retailer                                                                                                           | Quoted / Quoted\*             |

**IEC 60309 100 A, watertight (for the comparison in 3d):**

| MPN                                            | Configuration                                             | Wire / cord                                              | Rating                                                                | Price                                                                                                                                                                                           | Conf.                                                                                                                                                                                                                                                   |
| ---------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hubbell HBL5100P9W plug / HBL5100C9W connector | 4P5W 120/208 V, blue (HBL4100P9W is 3P4W 250 V, not this) | #3–1/0                                                   | IP67, **75 °C max continuous**, 4.31 lb plug; interrupts full current | $751–976 / $878–1,104                                                                                                                                                                           | Confirmed spec ([hubbell.com](https://www.hubbell.com/wiringdevice-kellems/en/products/heavy-duty-products-iec-pin-and-sleeve-devices-industrial-grade-male-plug-100a-3-phase-wye-120208v-ac-4-pole-5-wire-grounding-watertight/p/19413354)) / Quoted\* |
| Hubbell HBL4100P12W                            | 3P4W **125/250 V split-phase**, orange, 12 h              | #3–1/0                                                   | UL/CSA                                                                | $800.87 ([Locking Power Cords](https://lockingpowercords.com/product/hubbell-hbl4100p12w-pin-and-sleeve-plug-100a-125-250v-251)); connector not priced                                          | Quoted                                                                                                                                                                                                                                                  |
| Leviton 5100P9WLEV / 4100P12WLEV               | 4P5W 120/208 / 3P4W 125/250                               | **#6–#1 only** (no 1/0); cord 24–47.6 mm (older 5100P9W) | IP66–69K, −35 to 66 °C, interrupt-rated                               | $491–1,100 (5100P9WLEV); 4100P12WLEV not found                                                                                                                                                  | Confirmed ([leviton.com](https://www.leviton.com/products/5100p9wlev)) / Quoted\*                                                                                                                                                                       |
| Mennekes ME5100P9W / ME5100C9W                 | 4P5W 120/208                                              | connector "2–4 AWG"                                      | IP67                                                                  | **$366.79 / $438.80** ([plug](https://www.lockingpowercords.com/product/mennekes-me5100p9w-100a-120-208v-4-pole-plug-2/), [connector](https://lockingpowercords.com/product/5100c9w-connector)) | Quoted / Reported                                                                                                                                                                                                                                       |

### 3b. Trunk cable at 100 A

| Cable                                     | OD               | lb/1000 ft | 50 °C ampacity      | Enough for 100 A?                 | Per 11.8 ft segment (cable only)    | $/ft (240 ft per conductor or cable)                                                                                  | Conf.                      |
| ----------------------------------------- | ---------------- | ---------- | ------------------- | --------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| SOOW 2/4 (Southwire)                      | 37.6 mm          | 1,706      | 52.5 A              | **No**                            | 9.1 kg                              | $17.18 (Nassau)                                                                                                       | Confirmed / Quoted         |
| **#2 single, SC entertainment, 600 V**    | ~15 mm (Assumed) | 296        | 156 A (125 bundled) | **Yes**                           | 4 × = **6.3 kg**; 5 × = **7.9 kg**  | **$3.38** ([Nassau](https://nassaunationalcable.com/products/2-awg-stage-lighting-entertainment-cable))               | Confirmed (Carol) / Quoted |
| **#2 single, Type W 2 kV** (also RHH/RHW) | 17.0 mm          | 380        | 156 A (125 bundled) | **Yes**                           | 4 × = **8.1 kg**; 5 × = **10.2 kg** | **$4.56** ([Nassau](https://nassaunationalcable.com/products/2-awg-type-w-single-conductor-portable-power-cable-2kv)) | Confirmed / Quoted         |
| #4 single, Type W                         | 15.1 mm          | 270        | 115 A               | Electrically yes, but see note    | 4 × = 5.8 kg                        | $3.07                                                                                                                 | Confirmed / Quoted         |
| 2/4 Type W (Carol 81664)                  | 36.4 mm          | 1,580      | 125 A               | **Yes (split-phase)**             | **8.5 kg**                          | $18.31 ([Nassau](https://nassaunationalcable.com/products/2-4-type-w-multi-conductor-2kv-portable-power-cable))       | Confirmed / Quoted         |
| 2/5 Type W (Carol 81665)                  | 39.2 mm          | 1,925      | **99 A**            | **Just short** (105 A at ≤ 45 °C) | 10.3 kg                             | $24.10 ([Nassau](https://nassaunationalcable.com/products/2-5-type-w-multi-conductor-2kv-portable-power-cable))       | Confirmed / Quoted         |
| 1/0-5 Type W (Carol 81385)                | 49.1 mm          | 2,885      | 134 A               | **Yes (3φ)**                      | **15.4 kg**                         | $36.59 ([Nassau](https://nassaunationalcable.com/products/1-0-5-type-w-multi-conductor-2kv-portable-power-cable))     | Confirmed / Quoted         |

- **#4 singles are out** if NEC 525.20(C) still says single-conductor cable
  "shall be permitted only in sizes 2 AWG or larger". That is from memory,
  not re-read (Assumed). #2 is the event-industry norm anyway.
- **The ground could be #6** (NEC 250.122 needs only #8 at 100 A; Power
  Assemblies' banded sets are 4 × #2 + 1 × #6). It is priced as #2 here, for
  one cable type and colour-coded spares.

### 3c. Weight: is it practical in a lifted truss?

| Trunk                                    | Cable per segment | Ends per segment                                                      | **Total per segment** | Ring (16 segments) | vs today   |
| ---------------------------------------- | ----------------- | --------------------------------------------------------------------- | --------------------- | ------------------ | ---------- |
| 8/4 SOOW + L14-30 (today)                | 3.2 kg            | ~0.45 kg                                                              | **3.6 kg**            | ~58 kg             | —          |
| 100 A split: 4 × #2 SC / Type W + 8 cams | 6.3 / 8.1 kg      | 1.5 kg (Leviton, Assumed ~0.4 lb each) – 2.9 kg (Hubbell 0.8 lb each) | **7.8 – 11.0 kg**     | ~125 – 176 kg      | 2.2 – 3.0× |
| 100 A 3φ: 5 × #2 SC / Type W + 10 cams   | 7.9 / 10.2 kg     | 1.8 – 3.6 kg                                                          | **9.7 – 13.8 kg**     | ~155 – 221 kg      | 2.7 – 3.8× |
| 100 A split: 2/4 Type W + IEC 60309      | 8.5 kg            | ~4 kg (plug 4.31 lb + connector)                                      | **~12.5 kg**          | ~200 kg            | 3.5×       |
| 100 A 3φ: 1/0-5 Type W + IEC 60309       | 15.4 kg           | ~4 kg                                                                 | **~19.4 kg**          | ~310 kg            | 5.4×       |

- **Per segment, the truss can take it.** A Tomcat 12" light-duty arc over a
  roughly 23.5 ft span between legs (two segments) is rated in the hundreds
  of kg (Assumed; no load table was read). 8–14 kg of cable a segment is
  small beside that.
- **The ring as a whole is where it bites.** The ring's total weight is still
  Unknown (`plans/rigging.md`). The hoists are 8 × 500 kg. 100 A adds about
  70–160 kg (singles) or 140–250 kg (multi-conductor) to every lift, and to
  whatever the legs, sleeve blocks and guys were checked for.
- **Handling.** A segment with 8–10 loose #2 tails, each with a 0.4–0.8 lb
  cam-lok on the end, has to be tied off so no connector hangs by its cable.
  Burning Man's guidance says "Never suspend cables from connectors". Singles
  are flexible (17 mm OD), so the bend radius is not the issue; the tie-off
  is.
- **Verdict:** practical only if the rigging budget has 100–250 kg to spare.
  It is not justified by a 1.5–2 kW load.

### 3d. Why not IEC 60309 at 100 A

| Version                             | Per joint                                                       | 18 joints          | Trunk, 240 ft                                 | Notes                                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------- | ------------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Split, Hubbell HBL4100P12W + C12W   | $800.87 + ~$880–1,104 (connector not priced; Estimate from C9W) | **$30.3K – 34.3K** | 2/4 Type W, $4,394                            | Leviton's 4100P12WLEV takes #6–#1 and 47.6 mm max, so 2/4 Type W (36.4 mm, #2) fits; no price found                                 |
| 3φ, Mennekes ME5100P9W + C9W (low)  | $805.59                                                         | **$14.5K**         | 1/0-5 Type W, $8,782 (2/5 at ≤ 45 °C: $5,784) | 1/0 exceeds Leviton's #1 maximum and the Mennekes connector's stated "2–4 AWG"; Hubbell takes 1/0 but is rated 75 °C max continuous |
| 3φ, Hubbell HBL5100P9W + C9W (high) | $1,629 – 2,080                                                  | **$29.3K – 37.4K** | as above                                      |                                                                                                                                     |

The joints alone cost 2–5× the whole current power category, and the trunk
weighs 12.5–19.4 kg a segment. **Not priced further.** The cam-lok route below
is the realistic 100 A design.

### 3e. Which rentals have 100 A, and how

- **No portable.** Portables top out at a 50 A outlet (Honda EB10000).
- **Towables, 36 kW and up**, through **lugs** (terminal board, standard,
  landed by the rental technician) or the **optional cam-lok panel** (Atlas
  Copco: 5 × 400 A, Confirmed). The CS6369 outlets are 50 A each.
- **Split-phase 100 A** means the towable in its 1φ 120/240 position. 24 kVA
  single-phase needs a 36–45 kVA class unit; their single-phase ratings were
  not checked (Unknown).
- **Three-phase 100 A** at 36 kVA is the 45 kVA (36 kW) class, in the 208Y
  position. DOZR's base rate for that class is about $495 a day or $1,115 a
  week (Reported).
- **Feeder protection.** The #2 feeder carries 156 A at 50 °C. It is
  protected by the generator's main breaker only if that is ≤ 150 A (Atlas
  Copco QAS 45: 125 A, Confirmed). On a bigger towable, a 100 A breaker is
  needed at the generator end:
  - a listed "company switch" costs $7.8–10.4K (search results: Power
    Assemblies, Eaton; Quoted\*);
  - a Trystar Breakout Panel (4 × 100 A) is quote only;
  - a field-built box is about $600–1,200 (Estimate, not listed).
  - **Not in the subtotals;** require a ≤ 150 A generator main instead.
- **Cam-lok feeder cable rents** for about $55 a day per 50 ft 5-wire #2 set
  (Scheimpflug, snippet, Reported), so the feeder could be rented rather than
  bought.
- **Sequence rule (Assumed, not checked against Article 525).** The NEC's
  single-pole separable connector rules (406.13; 520.53 and 530.22 for
  stage and film) require listed connectors and, unless interlocked, a marked
  order: **ground first, then neutral, then hots; reverse to disconnect.**
  That applies at the generator and at all 16 joints.

---

## 4. Option 100 A split-phase: line items

Cam-lok 16 series on four #2 singles (L1, L2, N, G) per segment. Each
segment has four male cam-loks at its upstream end and four female at its
downstream end, the same pattern as the twist-lock designs.

| Line (budget id, proposed)                                  | Part                                                                                                                                                                          | Qty               | Unit             | Extended (low – high)      | Source                                                                                                                                                                                                                                               | Conf.             |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `power-joint-camlok` (replaces plug + connector)            | Leviton 16D22 + 16D31 (low) / Hubbell HBL300MBK + FBK (high), colour-coded                                                                                                    | 72 pairs (18 × 4) | $33.99 – $108.71 | $2,447.28 – $7,827.12      | 3a                                                                                                                                                                                                                                                   | Quoted / Quoted\* |
| `power-joint-covers`                                        | None: Leviton is Type 3R mated, Hubbell 3R/4X/12                                                                                                                              | —                 | —                | $0                         | 3a                                                                                                                                                                                                                                                   | Confirmed         |
| `power-trunk`                                               | #2 single, SC (low) / Type W (high)                                                                                                                                           | 960 ft (4 × 240)  | $3.38 – $4.56    | $3,244.80 – $4,377.60      | 3b                                                                                                                                                                                                                                                   | Quoted            |
| `power-feeder`                                              | 4 × Power Assemblies 02TW16025MF, 50 ft #2 Type W with 16-series ends ($337.94 each, low); Lex FBL305W-50, 5 × #2 SC banded, cULus ($2,301.61, high)                          | 1 set             | —                | $1,351.76 – $2,301.61      | [ATI](https://atielectrical.com/products/2-awg-190-amp-type-w-generator-cable-cam-extension), [Markertek](https://www.markertek.com/product/lex-fbl305w-50/lex-fbl305w-50-2-awg-sc-banded-100a-5-wire-cam-feeder-cable-50-foot)                      | Quoted / Reported |
| `power-end-cap`                                             | 4 female cam-lok caps                                                                                                                                                         | 4                 | $11.59 – $31.64  | $46.36 – $126.56           | 3a                                                                                                                                                                                                                                                   | Quoted / Quoted\* |
| `power-feed-sockets`                                        | 8 panel cam-loks (4 male in, 4 female out), Leviton 16R22 class                                                                                                               | 8                 | $39.88 – ~$60    | $319.04 – $480.00          | 3a                                                                                                                                                                                                                                                   | Quoted / Estimate |
| `power-feed-box`                                            | Hammond PCJ12106H + Eaton BR1020B100RF NEMA 3R 100 A main-breaker load centre ($179.99, low) or Square D QO2100NRBCP enclosed 100 A breaker, NEMA 3R ($255.70, high)          | 1                 | —                | $257.32 – $382.15          | [Ace](https://www.acehardware.com/p/3003340), [Crescent](https://crescentelectric.com/power-distribution-and-protection/circuit-breakers-and-accessories/circuit-breakers/enclosed-circuit-breaker-qo-1-phase-2-spaces-100a-nema3r-ul-consumer-pack) | Quoted / Reported |
| `power-trunk-glands`                                        | One gland per conductor, in and out: M25 class for 15–17 mm singles                                                                                                           | 136 (17 × 8)      | $3 – $8          | $408.00 – $1,088.00        | —                                                                                                                                                                                                                                                    | Estimate          |
| `power-box-blocks-100a` (new)                               | #2-rated feed-through / distribution blocks (L1, L2, N, G) in each power box; the 12 AWG tap to the 20 A breaker stays inside the box (10 ft tap rule, 240.21(B)(1), Assumed) | 17 boxes          | $40 – $120       | $680.00 – $2,040.00        | —                                                                                                                                                                                                                                                    | Estimate          |
| `power-portable-adapter` (replaces `power-towable-adapter`) | Field-built: AC Works ASL1430P + 4 × Hubbell HBL300FBK on short #6 tails + a small box; feeds the ring at 30 A (5.76 kVA) from a portable                                     | 1                 | $250 – $400      | $250.00 – $400.00          | —                                                                                                                                                                                                                                                    | Estimate          |
| **Subtotal, differing lines**                               |                                                                                                                                                                               |                   |                  | **$9,004.56 – $19,023.04** |                                                                                                                                                                                                                                                      |                   |

| Option 100 A split    | Low            | High           |
| --------------------- | -------------- | -------------- |
| Lines that differ     | $9,004.56      | $19,023.04     |
| Shared lines (1a)     | $6,041.39      | $11,359.01     |
| **Power category**    | **$15,045.95** | **$30,382.05** |
| With 15 % contingency | $17,303        | $34,939        |

- **The power box may need to grow.** Eight glands plus four #2 blocks may
  not fit the PCJ12106H with its supplies and GFCI (Assumed; not laid out).
  That is not priced.
- **Capacity:** 24 kVA, 19.2 kVA continuous (80 A a leg). That is 200 % of the
  64-spoke estimate, 100 % of the 128-spoke estimate, and 9.6–12.8× the
  real load.
- **Voltage drop:**
  - 2.24 V (1.9 %) at 80 A a leg balanced; 4.48 V (3.7 %) with everything on
    one leg.
  - 0.23 V (0.2 %) at the real 2 kW.

---

## 5. Option 100 A three-phase: line items

Same as section 4 with five conductors (L1, L2, L3, N, G) and a 3-pole breaker.

| Line (budget id, proposed)    | Part                                                                                                                                                                                                                                                                                           | Qty                | Unit             | Extended (low – high)       | Conf.             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- | --------------------------- | ----------------- |
| `power-joint-camlok`          | Leviton 16D22 + 16D31 / Hubbell HBL300MBK + FBK                                                                                                                                                                                                                                                | 90 pairs (18 × 5)  | $33.99 – $108.71 | $3,059.10 – $9,783.90       | Quoted / Quoted\* |
| `power-joint-covers`          | None (3R mated)                                                                                                                                                                                                                                                                                | —                  | —                | $0                          | Confirmed         |
| `power-trunk`                 | #2 single, SC / Type W                                                                                                                                                                                                                                                                         | 1,200 ft (5 × 240) | $3.38 – $4.56    | $4,056.00 – $5,472.00       | Quoted            |
| `power-feeder`                | 5 × Power Assemblies 02TW16025MF ($337.94) / Lex FBL305W-50 banded ($2,301.61); Power Assemblies FB02SC16050MF4 (4 × #2 + #6, banded) seen at $1,488.15 (Home Depot snippet)                                                                                                                   | 1 set              | —                | $1,689.70 – $2,301.61       | Quoted / Quoted\* |
| `power-end-cap`               | 5 female caps                                                                                                                                                                                                                                                                                  | 5                  | $11.59 – $31.64  | $57.95 – $158.20            | Quoted / Quoted\* |
| `power-feed-sockets`          | 10 panel cam-loks                                                                                                                                                                                                                                                                              | 10                 | $39.88 – ~$60    | $398.80 – $600.00           | Quoted / Estimate |
| `power-feed-box`              | Hammond PCJ12106H + Eaton 3BR3L100R 3φ NEMA 3R main-lug load centre ($264.70, [Platt](https://www.platt.com/p/0007041/eaton/load-center-main-lug-100a-120-208-240vac-3p-3-3-nema-3r/782114868294/cut3br3l100r)) + BR3100 ($98.99), low; Square D QO3100BNRB ($216.02) + QO3100 ($162.99), high | 1                  | —                | $441.02 – $505.46           | Quoted / Reported |
| `power-trunk-glands`          | M25 class, 10 a box                                                                                                                                                                                                                                                                            | 170                | $3 – $8          | $510.00 – $1,360.00         | Estimate          |
| `power-box-blocks-100a`       | #2 blocks, 5 a box                                                                                                                                                                                                                                                                             | 17                 | $50 – $150       | $850.00 – $2,550.00         | Estimate          |
| `power-towable-adapter`       | Dropped: no portable is three-phase                                                                                                                                                                                                                                                            | —                  | —                | $0                          | —                 |
| **Subtotal, differing lines** |                                                                                                                                                                                                                                                                                                |                    |                  | **$11,062.57 – $22,731.17** |                   |

| Option 100 A 3φ       | Low            | High           |
| --------------------- | -------------- | -------------- |
| Lines that differ     | $11,062.57     | $22,731.17     |
| Shared lines (1a)     | $6,041.39      | $11,359.01     |
| **Power category**    | **$17,103.96** | **$34,090.18** |
| With 15 % contingency | $19,670        | $39,204        |

- **Breaker note.** A main-lug load centre with a 3-pole branch breaker used
  as the main needs a back-feed hold-down kit (Assumed). A main-breaker NEMA 3R
  3φ centre (Eaton 3BR1224B100R) is $868.04 at
  [Platt](https://www.platt.com/p/0269646/eaton/load-center-main-breaker-100a-120-208-240vac-3p-12-24-nema-3r/786676440158/cut3br1224b100r).
- **Capacity:**
  - 36.0 kVA, 28.8 kVA continuous; 25.6 kVA usable with 6/5/5 taps.
  - That is 267–300 % of the 64-spoke estimate, 133–150 % of the 128-spoke
    estimate, and 13–19× the real load.
- **Voltage drop:** 2.24 V (1.9 %) at 80 A a phase balanced; 0.16 V (0.1 %)
  at 2 kW.
- **Plugs into:** 45 kVA-class towables in the 208Y position, through
  cam-loks or lug tails. Nothing else.

### 5a. The practical problems with 100 A (both versions)

1. **Weight:** 2.2–3.8× today's cord weight per segment, and 70–160 kg more
   on the lifted ring (3c).
2. **64 or 80 single-pole connections** at the 16 joints, plus 4–5 at the
   feed. Each has to be made in the marked order, at height or before the
   lift. A swapped hot and neutral puts 208–240 V on 120 V supplies and
   GFCIs. Colour coding helps but doesn't prevent it.
3. **No boots or covers exist for 16-series cam-loks**, only caps. Type 3R
   when mated meets "rain-proof", but every loose tail has to be supported
   off the ground and off its connector.
4. **Power boxes get 8–10 cable entries** and #2 blocks instead of 2 entries.
5. **Generator:** a 36–45 kVA towable with cam-loks or lugs, plus a
   generator-end 100 A breaker on big units. Portables can feed it only
   through an adapter at 30 A.
6. **Cost:** $4.7–18K more than the current design for 10–19× the real load.
   The same 128-spoke headroom costs $3.6–7.8K more as two 50 A half-rings
   (section 6).

---

## 6. Multi-feed alternatives (a 100 A distro or towable splitting into 30–50 A feeds)

### 6a. Two 50 A half-rings

- **Layout.** Both feed boxes sit at **joint 0, by the stage leg**, where V1's
  bundle already goes up. Half A runs clockwise to joint 8. Half B runs
  counter-clockwise to joint 8.
- **Half B is wired in reverse.** Its eight segments have the plug at the
  clockwise end and the connector at the counter-clockwise end. At joint 8
  two connectors (females) meet; both are capped. No live male pin is
  exposed anywhere.
- **Feeders.** Both are 50 ft and reach from one generator position.
- **A segment fits only its own half** (Assumed design idea; see Open
  questions). Spares are needed for each half, or one spare can be re-ended.
- **Ampacity per half** is the same as Option 50 A: 6/4 at 50 A (≤ 40 °C) or
  45 A.

| Line                                                     | Extended (low – high)       | Source                       |
| -------------------------------------------------------- | --------------------------- | ---------------------------- |
| All Option 50 A lines that differ                        | $6,727.36 – $10,827.11      | first comparison §3c         |
| Second feeder (CS6365 ends on 50 ft 6/4, or TESS2TH-050) | $600.73 – $739.42           | first comparison §3c         |
| Second inlet + outlet pigtail                            | $319.34 – $545.66           | first comparison §3c         |
| Second feed box + 50 A 2-pole breaker                    | $197.33 – $326.45           | first comparison §3c         |
| Second end cap (both ends at joint 8)                    | $8.99                       | AC Works CVFE                |
| Second portable adapter                                  | $39.99 – $124.27            | first comparison §3c         |
| **Lines that differ**                                    | **$7,893.74 – $12,571.90**  |                              |
| Shared lines                                             | $6,041.39 – $11,359.01      |                              |
| **Power category**                                       | **$13,935.13 – $23,930.91** | with 15 %: $16,025 – $27,521 |

- **One box for both feeds** (two inlets, two breakers) saves about $80–130.
- **What it plugs into:**
  - **any towable surveyed**: each has 2–3 CS6369 (15 of 15);
  - **two portables** through two adapters (2 × 5.76 kVA);
  - **a 100 A three-phase distro with CS6369 outputs**, such as the
    Ericson Big E Jr BE1-CAMCL3063: 3 × CS6369, 6 × 5-20R GFCI, cETLus, NEMA
    3R, $5,317–5,825 to buy
    ([HomElectrical](https://homelectrical.com/power-center/ericson-power-distribution-center-erc-be1camcl3063.1.html),
    Quoted). Rental distros run $150–200 a day.
- **Two details on that distro:**
  - Its CS6369 outlets sit on **plain 50 A breakers**; only the duplexes are
    GFCI (Reported).
  - On a 208Y distro a CS6369 gives **120/208 V**, which is fine for 120 V
    loads.
- **The distro is not in the subtotal.** It is needed only where the
  generator offers cam-loks and no CS6369, which the survey didn't find.
- **Capacity:**
  - 24 kVA, 19.2 kVA continuous (17.3 at 45 A);
  - **100 % of the 128-spoke estimate** (90 % at 45 A);
  - 9.6–12.8× the real load.
- **Voltage drop:** 1.91 V (1.6 %) at 40 A a leg; about 0.2 % at 2 kW. Each
  half is only 94 ft long.
- **Generator:** both halves at full load need 24 kVA single-phase, the
  36–45 kVA towable class. At the real load, any towable will do.

### 6b. Three 30 A thirds (L14-30)

Three sections of 6, 5 and 5 segments, each with its own L14-30 feed box,
breaker and feeder. This is the current design's hardware three times over at
the feed.

| Line                                                   | Extended (low – high)       | Source / conf.               |
| ------------------------------------------------------ | --------------------------- | ---------------------------- |
| All current 30 A lines that differ                     | $4,257.02 – $4,742.02       | first comparison §2a         |
| 2 more feeders (SDL1430PR-050)                         | $999.98                     | Quoted (2026-10-21)          |
| 2 more feed sockets (HBL2715SW + HBL2710SW)            | $749.36                     | Quoted / Quoted\*            |
| 2 more feed boxes + 30 A breakers                      | $274.00 – $452.00           | Estimate                     |
| 2 more end caps                                        | $17.98                      | Quoted                       |
| 2 more towable adapters (one per CS6369)               | $934.00 – $1,114.00         | Estimate                     |
| Extra length for the feeder to the far third (~100 ft) | $500 – $900                 | Estimate                     |
| **Lines that differ**                                  | **$7,732.34 – $8,975.34**   |                              |
| Shared lines                                           | $6,041.39 – $11,359.01      |                              |
| **Power category**                                     | **$13,773.73 – $20,334.35** | with 15 %: $15,840 – $23,385 |

- **The far third.** Two thirds can be fed at joint 0, one each way (as in
  6a). The middle third starts about 63 ft of arc away, so its feeder is about
  100 ft or runs along the truss. Voltage drop on that third rises to about
  2.0 % at full load.
- **What it plugs into:**
  - **Generac Mobile MLG20IF4**, which has 3 × L14-30R as standard
    (Confirmed);
  - **three portables**;
  - a towable with 3 × CS6369 (DCA45/70, MDG25/75, Wacker G35+) through
    three adapters;
  - Motion Labs 100 A distros with 3 or 12 × L14-30 (no price).
- **Capacity:**
  - 21.6 kVA, 17.3 kVA continuous; 15.4 kVA usable when the 6-segment third
    sets the limit;
  - 160–180 % of the 64-spoke estimate and 80–90 % of the 128-spoke
    estimate.
- **Weight and joints are unchanged** from today.

### 6c. The cheap "just in case" path (not a separate column)

- **Build the 30 A ring as two reversed halves now**, with one feed box at
  joint 0 that has **one L14-30 inlet and two outputs** (one per half) behind
  its 30 A breaker.
  - Day one is identical to today: 5.76 kVA from one portable.
  - Each half carries half the current, which halves the voltage drop.
- **Adding a second inlet and breaker later** makes it two 30 A feeds:
  11.5 kVA, 120 % of the 64-spoke estimate.
- **Cost now:** about $60–170 for the second output and cap. **Later:** about
  $1,020–1,110 for the second feeder, inlet and breaker (Estimate, from the
  30 A lines).
- **To go to 2 × 50 A**, the trunk must be 6/4 from the start. The 8/4 trunk
  stays at 30 A.

---

## 7. What each option plugs into (rental summary)

| Source                                                  | 30 A split        | 30 A 3φ                           | 50 A split         | 100 A split               | 100 A 3φ                 | 2 × 50 A            | 3 × 30 A                  |
| ------------------------------------------------------- | ----------------- | --------------------------------- | ------------------ | ------------------------- | ------------------------ | ------------------- | ------------------------- |
| Portable, 1 × L14-30R                                   | **Direct**        | No                                | Adapter, 5.76 kVA  | Adapter, 5.76 kVA         | No                       | Adapter, one half   | One third direct          |
| Three portables / Generac MLG20IF4 (3 × L14-30R)        | Direct            | No                                | Adapter            | Adapter                   | No                       | Two adapters        | **Direct**                |
| Towable CS6369 (2–3 each, 15 of 15)                     | Adapter + breaker | No (two hots only)                | **Direct**         | No (50 A outlet)          | No                       | **Direct (two)**    | Three adapters + breakers |
| Towable cam-lok option / lugs, 3φ 208Y                  | Via a distro      | **Cam-lok → L21-30R box**         | Via a distro       | No (wrong phase position) | **Direct (cam-lok)**     | Via a distro        | Via a distro              |
| Towable cam-lok / lugs, 1φ 120/240                      | Via a distro      | No                                | Via a distro       | **Direct (cam-lok)**      | No                       | Via a distro        | Via a distro              |
| Construction 100 A distro (L21-20R, CS6369, 5-20R GFCI) | No                | L21-20P adapter at 20 A (Assumed) | Direct from CS6369 | No                        | No                       | Direct (2 × CS6369) | No                        |
| Event distro with L21-30R (Motion Labs, Indu)           | No                | **Direct**                        | No                 | No                        | Direct from its cam-thru | No                  | No                        |

---

## Assumptions

1. **Ampacity:** 400.5(A)(1) Column B for split-phase cord (neutral not
   counted). Column A × 0.8 for three-phase wye with non-linear loads (neutral
   counted). 400.5(A)(2) single-conductor free-air column for #2 singles, with
   a 0.8 bundling factor as a check. The 50 °C correction is 0.82, and cord is
   protected at its ampacity, rounding down.
2. **Continuous load = 80 % of the breaker.** Three-phase usable capacity
   assumes equal segment loads on a 6/5/5 tap split.
3. **Voltage drop:** uniform load, a 50 ft feeder, 75 °C resistance, 120 V
   base.
4. **Quantities:** 18 joint sets, 240 ft of trunk per conductor or cable,
   17 power boxes, one feeder per feed.
5. **Weights:** cam-lok bodies 0.4 lb (Leviton, Assumed) to 0.8 lb (Hubbell,
   Confirmed). L21-30 ends 0.5 lb each (AC Works, Confirmed).
6. **Mated L21-30 pair length** is about 150–170 mm, from the drawings with
   about 20 mm of engagement.
7. **The 100 A box internals** (blocks, glands) are estimated; no layout was
   done.
8. **Field-built adapters and tail boxes** are estimates and are not listed
   assemblies.

## Could not verify

- **AC Works L21-30 ends:** grip range and maximum wire size; the drawing says
  only "10 gauge for 30 A".
- **Leviton 2811/2813:** wire range (the two figures on the page conflict).
- **Cord Vault interior:** does the "closed depth 1.75 in" mean the interior?
  This affects the current L14-30 design too.
- **Winco WL12000HE:** L21-30 or L20-30 (its own documents disagree).
- **Sunbelt "Quad Box":** its outlet type (assumed L21-20R). United Rentals
  and Sunstate blocked reading.
- **Prices:** HBL300FBK; the HBL2810SW receptacle; the Leviton 4100P12WLEV
  and HBL4100C12W.
- **Motion Labs 100 A distros, Trystar and Ericson:** prices (quote only).
- **Single-phase kVA ratings** of 36–45 kVA towables in the 1φ position.
- **NEC text,** paraphrased and not re-read in the 2023 edition: 400.5
  neutral counting, 525.20(C) (#2 minimum for single conductors),
  single-pole connector sequencing (406.13, 520.53, 530.22) and whether
  Article 525 adopts it, and 240.21(B)(1) tap rules.
- **Whether QO and BR breakers are UL 489,** and their calibration at 50 °C.
- **Tomcat 12" light-duty truss load table,** and the ring's total weight.

---

## Open questions for the user

1. **Did "30A 3 phase" mean L14-30 (120/240 V split-phase, "3-wire" plus
   ground), which is the current design?** Or true 120/208 V three-phase
   (L21-30, 5 pins)? _Recommendation: if it meant L14-30, nothing changes._
2. **If true three-phase:** accept a 25 A feed breaker (a 40 °C design
   ambient, 6.4 kVA usable), or hold the 50 °C rule at 20 A (5.1 kVA)? A real
   30 A on 8/5 isn't supported. _Recommendation: don't go three-phase; it buys
   no capacity over the current design and plugs into no rental directly._
3. **"Just in case" headroom:**
   - (a) none;
   - (b) build the 30 A ring as reversed halves with a two-output feed box
     (about +$60–170 now, +$1.1K later for 11.5 kVA);
   - (c) two 50 A half-rings (+$3.6–7.8K, 19.2 kVA);
   - (d) 100 A (+$4.7–18K, heavy).
     _Recommendation: (b), or (c) if 128 spokes at the V1 estimate must be
     covered with no measurement first._
4. **Reversed halves:** half B's segments carry their plug and connector the
   other way round, so segments aren't interchangeable between halves. Is that
   acceptable for build and spares?
5. **Rigging budget:** if 100 A stays on the table, how much can the ring
   weigh in total? It is still Unknown in `plans/rigging.md`.
6. **Still open from before:** measure one spoke at full white. That settles
   every capacity question here. Also, for James: which generator(s) the
   Gate actually runs on.
7. **Cord Vault fit:** trial-fit one on a mated L14-30 pair. If the 1.75 in
   "closed depth" is the interior, a 58 mm body won't fit. This applies to
   the current design, not just this file.
