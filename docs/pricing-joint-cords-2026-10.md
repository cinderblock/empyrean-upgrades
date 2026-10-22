# Truss joints from cut generator cords, and local outlets: pricing, October 2026

The owner asked on 2026-10-21 whether the 16 truss joints could be made from
**off-the-shelf L14-30 extension cords cut in half**, instead of field-wiring a
Hubbell Watertight Safety-Shroud plug and connector at each joint ($355.72 a joint,
$5,692 for 16; `docs/pricing-power-feed-2026-10.md` §4a and §8). One cord gives one
joint: its plug half goes on segment N+1 and its connector half on segment N, and the
two halves meet again, mated, at the joint. The cut ends land on the terminal blocks
in each segment's power box, so the cord also becomes the segment's trunk.

The same day the owner added a requirement: **each power box needs a handful of local
120 V outlets** for things mounted on that segment, downstream of the segment's GFCI.
Section 6 prices that.

**Method.** Prices and specs were checked on **2026-10-21** by read-only browsing.
Nothing was ordered, carted or quoted, and no vendor was contacted. Where the maker
publishes a drawing or spec sheet it is linked; where only a retailer page exists,
the spec is marked Reported. All prices USD before tax and shipping. Ring geometry in
feet, everything else metric and °C.

**Confidence key** (same as the other pricing files)

| Mark          | Meaning                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| **Quoted**    | Price seen today on the seller or maker page at the URL given                    |
| **Quoted\***  | Price seen only in a search snippet or a stale tracker. Recheck it               |
| **Estimate**  | A range from comparable parts                                                    |
| **Confirmed** | Spec from the maker's own drawing, spec sheet or catalogue                       |
| **Reported**  | Spec from a retailer or the maker's marketing page, not a controlled document    |
| **Assumed**   | My inference, or a fact I could not source this session; the assumption is named |
| **Unknown**   | Looked for and not found                                                         |

---

## Summary

- **Cheap molded generator cords are the wrong base.** The common 10/4 L14-30 cords
  (AC Works L1430PR-010 STW, Reliance PC3010M, Parkworld, the Amazon brands) use
  **60 °C PVC cord**. At 50 °C ambient a 60 °C 10 AWG cord is good for only
  **17.4 A**, so it can't sit behind a 30 A or even a 25 A feed breaker. Their
  molded ends are listed only as part of the cord set; once cut, the plug is no
  longer a listed device on its own. SJ-type jackets (SJTW, SJOOW) are hard usage,
  not the extra-hard usage NEC 525.20(A) asks for.
- **One off-the-shelf cord does fit the brief: AC Works SDL1430PR-010**, a 10 ft
  **8/4 SOOW** L14-30 cord at **$129.99**. Its ends are **AC Works' own
  field-attachable plug and connector** (cULus file E237606, the same file as their
  loose ASL1430P/ASL1430R), on a cord with its own cULus file (E313867). Cutting it
  leaves a **listed device on listed cord**: the same code position as the Hubbell
  route, at about a third of the price. 8/4 keeps the **30 A feed**, if the jacket
  print confirms a 90 °C rating.
- **But it is not watertight.** No molded or standard twist-lock end found today
  carries an IP rating mated. The best add-on cover found is the **Twist and Seal
  Cord Vault, NEMA 250 Type 3R / IP44, $12.95**: rain-resistant, not watertight, and
  its fit on a mated L14-30 pair is unverified. Hubbell's Seal-Tite boots (IP55) fit
  only Hubbell Insulgrip devices.
- **Factory watertight L14-30 cords exist but don't save money.** Iron Box
  IBX-2250-10 (10/4 SJOOW, 105 °C cord, ends that look like Leviton Wetguard) is
  **$264.88**, the same as Wetguard parts alone, but on hard-usage 10/4 cord. Molex
  Woodhead Watertite (IP65/66/67, −40 to 75 °C) is about **$1,232 for 50 ft**.
- **Joint recommendation (cheapest I'd stand behind), conditional:** AC Works
  SDL1430PR-010 cut in half, plus a Cord Vault over each mated joint. **About $143 a
  joint, $2,573 for 16 + 2 spares, against about $7,359 for Hubbell SW plus trunk
  cord** for the same 18. It replaces all the 8/4 trunk cord inside the ring. It
  depends on four checks (section 7): the jacket print, the cover's fit, the owner
  accepting IP44/Type 3R instead of IP66 at the joints, and whether a 10 ft cord
  actually spans a 9.8 ft segment (it is marginal). If watertight stays a hard
  requirement, field-built **Leviton Wetguard on 8/4 SOOW** (about $324 a segment)
  remains the cheaper watertight route.
- **Ampacity position:** keep 8/4 and the 30 A feed. Any 10/4 cord means a **25 A**
  feed breaker (90 °C SOOW: 24.6 A at 50 °C; 105 °C: about 25.7 A), which still
  gives 4.8 kVA continuous, 2.4× the 1.5–2 kW average. A 60 °C cord would need a
  15 A breaker (2.9 kVA), too thin.
- **Local outlets recommendation:** a die-cast 2-gang weatherproof box beside each
  power box, two weather-resistant 20 A duplexes, and an extra-duty in-use cover.
  **About $45–97 a box, $773–1,656 for 17.** Watertight Hubbell/Leviton receptacles
  work too, but cost $323–480 a box before the matching watertight plugs.

---

## 1. Off-the-shelf L14-30 cord sets

"Per joint" is one cord: its plug half and connector half make one joint. 16 joints
need 16 cords, plus spares.

### 1a. Cords that fit the code and ampacity brief

| #   | Product                                  | Length     | Cord                                 | Cord temp                              | Listing                                                         | Ends                                                                               | Sealing     | Price              | Price URL                                                                                                                | Spec source                                                                                                                                                                                                                                      | Conf.                |
| --- | ---------------------------------------- | ---------- | ------------------------------------ | -------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| C1  | **AC Works SDL1430PR-010**               | 10 ft      | **8/4 SOOW**, 600 V rubber, "40 Amp" | **Not stated** (SOOW is usually 90 °C) | Cable cULus **E313867**; plug and connector cULus **E237606**   | **Assembled**: E237606 is AC Works' (Cordtec) file for its loose ASL1430P/ASL1430R | None stated | **$129.99**        | [acworks.com](https://acworks.com/products/sdl1430pr-8-4-soow-super-duty-nema-l14-30-30a-125-250v-generator-rubber-cord) | Product page (Reported); E237606 on the [ASL1430P](https://cdn.shopify.com/s/files/1/1491/0210/files/ASL1430P.pdf?v=1737999437) and [ASL1430R](https://cdn.shopify.com/s/files/1/1491/0210/files/ASL1430R.pdf?v=1738709966) drawings (Confirmed) | Quoted; temp Unknown |
| C2  | AC Works SDL1430PR-025 / -050            | 25 / 50 ft | as C1                                | as C1                                  | as C1                                                           | as C1                                                                              | as C1       | $267.99 / $499.99  | as C1                                                                                                                    | as C1                                                                                                                                                                                                                                            | Quoted               |
| C3  | AC Works L1430PR (rubber), 50–100 ft     | 50 ft      | 10/4 SOOW, 600 V                     | Not stated                             | 50–100 ft: cable E313867, ends E237606                          | Assembled (50–100 ft)                                                              | None stated | $255.50 (50 ft)    | [acworks.com](https://acworks.com/products/l1430-generator-cord-l1430pr)                                                 | Product page                                                                                                                                                                                                                                     | Quoted / Reported    |
| C4  | AC Works L1430PR-010 (rubber), clearance | 10 ft      | 10/4 SOOW                            | Not stated                             | "25ft Lengths: cULus E257089" (a cord-set file); 10 ft unstated | Probably molded (Assumed: same file family as the STW cord set, C8)                | None stated | $54.99 (clearance) | as C3                                                                                                                    | Product page                                                                                                                                                                                                                                     | Quoted / Assumed     |
| C5  | Iron Box **IBX-5805-10** / -20           | 10 / 20 ft | 10/4 SOOW                            | Not stated                             | UL, **E364972**                                                 | Not stated                                                                         | None stated | $61.40 / $100.00   | [lockingpowercords.com](https://www.lockingpowercords.com/product/l14-30-extension-cords-30a-125-250v-10-4-soow/)        | Product page                                                                                                                                                                                                                                     | Quoted / Reported    |
| C6  | Generac **6327**                         | 10 ft      | 10/4 "rubber"                        | Not stated                             | cULus (retailer)                                                | Not stated                                                                         | None stated | $107.33 (min 3)    | [MRO Supply](https://www.mrosupply.com/products/5793033/as-markdown/)                                                    | Retailer only                                                                                                                                                                                                                                    | Quoted / Reported    |

### 1b. Watertight factory cords

| #   | Product                                 | Length                          | Cord                        | Cord / device temp                                                                   | Listing                       | Ends                                                                                   | Sealing                                                                            | Price                                        | Price URL                                                                                                                                    | Conf.                |
| --- | --------------------------------------- | ------------------------------- | --------------------------- | ------------------------------------------------------------------------------------ | ----------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| W1  | Iron Box **IBX-2250-10** / -15 / -06    | 10 / 15 / 6 ft                  | **10/4 SJOOW** (hard usage) | Cord **105 °C**. Ends look like Leviton Wetguard 28W74/29W74, which are −40 to 60 °C | "UL Listed" (no file on page) | Photos show yellow bodies, grey glands and a tethered cap, matching Wetguard (Assumed) | "Watertight / Marine Grade"; no IP stated. Wetguard is IP66/67/69K mated or capped | **$264.88** / $284.83 / $243.45              | [lockingpowercords.com](https://lockingpowercords.com/product/l14-30-watertight-cords)                                                       | Quoted; ends Assumed |
| W2  | Molex Woodhead Watertite **1301430271** | 50 ft (no shorter length found) | 10/4 SOOW                   | −40 to 75 °C                                                                         | UL, CSA                       | Watertite                                                                              | **IP65/66/67**                                                                     | ~$1,232 "reference", quote only; 9-week lead | [Cytech](https://www.cytechsystems.com/de/product/1301430271), [DigiKey](https://www.digikey.de/en/products/detail/molex/1301430271/3601998) | Quoted\* / Reported  |

A 25 ft black Watertite L14-30 (130143-0310) appears in a Molex document but had no
price. W2 is out of the running on price.

### 1c. Cheap molded cords (don't meet the brief; listed for completeness)

| #   | Product                               | Length | Cord                                                                | Cord temp                                       | Listing                                   | Ends                              | Price                                                        | Price URL                                                                                                                                                                                       | Conf.                                                                                                                         |
| --- | ------------------------------------- | ------ | ------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------- | --------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| C8  | AC Works **L1430PR-010** (STW)        | 10 ft  | **STW 10/4, PVC**                                                   | **60 °C** ("STW 10/4C 60C 75P", maker drawing)  | **E65753 "UL&CUL General Use Cord Sets"** | **Molded PVC** plug and connector | $54.99                                                       | [acworks.com](https://acworks.com/products/ac-works-l1430pr-010g-10ft-10-4-stw-nema-l14-30-30a-125-250v-generator-extension-cord)                                                               | Quoted / **Confirmed** ([drawing](https://cdn.shopify.com/s/files/1/1491/0210/files/L1430PR-010_Spec_Sheet.pdf?v=1787775095)) |
| C9  | Reliance Controls **PC3010M**         | 10 ft  | SJTW 10/4, 300 V                                                    | **60 °C** ("SJTW water resistant 60C FT2 300V") | UL/cUL, CSA (retailer)                    | Molded                            | $58                                                          | [NoOutage](https://nooutage.com/rjb10410.htm) (price dated 2026-07-15)                                                                                                                          | Quoted / Reported                                                                                                             |
| C10 | Parkworld **79087**                   | 10 ft  | 10/4; siblings are STW                                              | Not stated                                      | "UL Listed"                               | Molded (photos)                   | $69.16                                                       | [Home Depot](https://homedepot.com/p/parkworld-10-ft-10-4-30-Amp-125-240-Volt-Twist-Lock-4-Prong-Indoor-Outdoor-NEMA-L14-30-Generator-Extension-Cord-Black-UL-Listed-79087/330537368) (snippet) | Quoted\* / Reported                                                                                                           |
| C11 | Southwire **65172740** (Coleman line) | 10 ft  | SJTW 10/4 (page also says STW, and lists a 1-15P plug: data errors) | Not stated                                      | Not stated                                | "Molded connectors"               | ~$45.62, Amazon via a Canadian tracker, out of stock in June | [Southwire 25 ft sibling](https://www.southwire.com/power-management/extension-cords/10-4-25-ft-stw-30a-extension-cord/p/65038801)                                                              | Quoted\* (stale)                                                                                                              |
| C12 | Iron Box **IBX-5805** SJT variant     | 10 ft  | 10/4 SJT                                                            | Not stated                                      | UL E364972                                | Not stated                        | $36.29–87.99 range                                           | [lockingpowercords.com](https://lockingpowercords.com/product/l14-30-extension-cords-30a-125-250v-10-4-sjt)                                                                                     | Quoted\*                                                                                                                      |
| C13 | VEVOR / Kohree / GearIT (Amazon-type) | 10 ft  | SJTW 10/4                                                           | Not stated                                      | ETL claimed; file numbers not found       | Molded                            | $28.80–54.90                                                 | [Walmart L14-30](https://www.walmart.com/c/kp/l14-30), [VEVOR](https://www.vevor.com/s/l14-30p-to-l14-30r-generator-cord)                                                                       | Quoted\* / Reported                                                                                                           |

**Not found today:** an L14-30 to L14-30 cord from **Champion** (only splitter cords
and a 19 in adapter), **Conntek** (a press release mentions 10 ft and 20 ft SJTW
models; no 8/4, no price), **Marinco** (marine cord sets are SS-2/L5-30, not
L14-30), and factory **Hubbell or Leviton** L14-30 cord sets (Hubbell's molded sets
found are L5-30 marine).

**What the table says (reasoning):**

- **Most 10 ft generator cords are 60 °C PVC with molded ends.** C8 is confirmed by
  the maker's drawing; C9 by the retailer. UL treats a cord as 60 °C unless it is
  marked otherwise
  ([EC&M Q&A on cord ampacity](https://www.ecmweb.com/qa/code-qa-ampacities-flexible-cords-and-flexible-cables),
  Reported). So assume every unmarked PVC generator cord is 60 °C.
- **Only AC Works' 8/4 "Super-Duty" cord is built from separately listed ends on
  SOOW.** That is why it is the only cut-cord candidate below.
- **Length is marginal.** See section 7, check 4.

---

## 2. Watertightness: add-on covers and caps

No standard or molded L14-30 end found today states an IP or NEMA rating mated. The
marketing words are "weather-tight seal" (AC Works ASL1430P/R), "water resistant"
(Reliance) and "weather resistant" (Southwire): none is a rating.

| #   | Cover                                                                                             | Fits                                                                                            | Rating                                                    | Temp / UV                   | Price                    | Price URL                                                                                                                                                                                             | Conf.                                                                                                                          |
| --- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| V1  | **Twist and Seal Cord Vault** (latched clamshell)                                                 | "Multi cord and oversized cord connections", "some EV connections". **L14-30 not stated**       | **"Independently tested and rated at 250-3R and IP44"**   | "UV tested"; no temperature | **$12.95**               | [twistandseal.com](https://twistandseal.com/products/twist-and-seal-cord-vault-keeps-large-cord-connections-dry-and-secure)                                                                           | Quoted / Reported                                                                                                              |
| V2  | Twist and Seal Maxx (tube)                                                                        | "10 gauge to 16 gauge", "grounded (three prong)"; a retailer says "oversized 30 amp plug heads" | None stated. "Do not submerge"                            | "UV resistant"              | $12.99 (10-pack $116.91) | [twistandseal.com](https://twistandseal.com/products/twist-and-seal-maxx-heavy-duty-cord-connection-protection)                                                                                       | Quoted / Reported                                                                                                              |
| V3  | Hubbell Seal-Tite boots HBL6035 (plug) / HBL6036 (connector), black; yellow HBL60CM35 / HBL60CM36 | **Hubbell Insulgrip 4/5-wire 20/30 A devices only**                                             | **IP55 "suitability"**, when used with plug and connector | —                           | $28.07 / $31.21          | [Standard Electric HBL6035](https://www.standardelectricsupply.com/Hubbell-HBL6035-Weatherproof-Boot), [HBL6036](https://www.standardelectricsupply.com/Hubbell-HBL6036-Weatherproof-Boot) (snippets) | Quoted\* / Confirmed (Hubbell catalogue p. B-53, [mirror](https://media.onlinecomponents.com/productfiles/mf-hu/page-b53.pdf)) |
| V4  | AC Works **CVFE** (cap for an open female connector)                                              | "3-prong, 4-prong, and 5-prong female connectors on our power cords"                            | None stated                                               | —                           | $8.99                    | [acworks.com](https://acworks.com/products/cvfe-cable-end-weather-cover)                                                                                                                              | Quoted / Reported                                                                                                              |
| V5  | Mighty Cord A10-30CV (threaded collar)                                                            | 30 A **marine (L5-30)** female, not L14-30                                                      | "Weatherproof"                                            | —                           | $13.96                   | [eTrailer](https://www.etrailer.com/Accessories-and-Parts/Mighty%20Cord/A10-30CV.html)                                                                                                                | Quoted\*                                                                                                                       |
| V6  | AC Works 50ARCV boot                                                                              | 50 A CS6364/65, SS2 only                                                                        | None stated                                               | —                           | $9.59                    | [acworks.com](https://acworks.com/products/50arcv-50amp-weather-boot-with-ring)                                                                                                                       | Quoted (not usable)                                                                                                            |

**Not found:** "Cord Lox", "Sealproof", "Duraguard" or a "Twist-Lock Safety Cover"
for L14-30. Searches for those names returned only unrelated covers.

**Per joint, cord + cover, against the field-built families** (per segment, with
9.8 ft of 8/4 SOOW at $6.09/ft = $59.68 added to the field-built rows so the totals
compare like for like):

| Option                                             | Per joint, incl. its trunk cord | Seal at the joint                  | Feed breaker               | Conf.            |
| -------------------------------------------------- | ------------------------------- | ---------------------------------- | -------------------------- | ---------------- |
| Hubbell SW (HBL2711SW + HBL2713SW) + 8/4 SOOW      | $415.40                         | IP66, −40 to 75 °C                 | 30 A                       | Quoted           |
| Leviton Wetguard (28W74 + 29W74) + 8/4 SOOW        | $323.61                         | IP66/67/69K, −40 to 60 °C          | 30 A                       | Quoted           |
| Iron Box IBX-2250-10 (cord included)               | $264.88                         | Wetguard-type (Assumed)            | **25 A** (10/4)            | Quoted / Assumed |
| Iron Box IBX-2250-15 (cord included)               | $284.83                         | as above                           | 25 A                       | Quoted / Assumed |
| **AC Works SDL1430PR-010 + Cord Vault**            | **$142.94**                     | **Type 3R / IP44**, fit unverified | **30 A** (if 90 °C jacket) | Quoted / Assumed |
| AC Works SDL1430PR-010 alone                       | $129.99                         | None rated                         | 30 A (if 90 °C)            | Quoted           |
| Iron Box IBX-5805-10 (10/4 SOOW) + Cord Vault      | $74.35                          | Type 3R / IP44                     | 25 A                       | Quoted / Assumed |
| AC Works L1430PR-010 STW + Cord Vault (60 °C cord) | $67.94                          | Type 3R / IP44                     | **15 A** (section 3)       | Quoted           |

---

## 3. Ampacity: 10/4 vs 8/4 at 50 °C

**Rules.**

- **NEC 400.5(A):** the cord ampacities in Table 400.5(A)(1) are corrected for
  ambient "that correspond to the temperature rating of the cord"
  ([EC&M quiz](https://www.ecmweb.com/code-quiz-of-day/article/20900046/ampacities-for-flexible-cords-and-flexible-cables),
  Reported; the correction table is 310.15(B)(1) in 2020/2023, 310.15(B)(2)(a) in
  2017).
- **NEC 240.5(A):** flexible cord is protected by an overcurrent device "in
  accordance with their ampacity" from 400.5.
- **240.5(B)(3):** cord in a **listed extension cord set** is "considered to be
  protected when applied within the extension cord listing requirements". A cut cord
  set is no longer that listed product, so this exception goes with the cut
  (reasoning).
- **240.5(B)(4):** "field assembled extension cord sets" made from separately listed
  components get a fixed allowance only for **20 A circuits** (16 AWG and larger)
  ([EC&M, cord protection](https://www.ecmweb.com/qa/code-qa-protection-flexible-cords-and-fixture-wires),
  Reported). A 30 A or 25 A feed falls back to 240.5(A).

**Corrected ampacity, Column B (split-phase, neutral not counted, as in
`docs/pricing-power-feed-2026-10.md` §5).** Factors from Table 310.15(B)(1): 60 °C
column 0.71 at 41–45 °C and 0.58 at 46–50 °C; 90 °C column 0.87 and 0.82. 105 °C is
computed from the 310.15(B) formula, √((105−50)/(105−30)) = 0.856 (reasoning).

| Cord                                  | Col B | 45 °C   | 50 °C       | Largest standard feed breaker at 50 °C | Continuous kVA (80 %) | × the 1.5–2 kW average |
| ------------------------------------- | ----- | ------- | ----------- | -------------------------------------- | --------------------- | ---------------------- |
| 10/4 **60 °C** (STW/SJTW PVC: C8, C9) | 30 A  | 21.3 A  | **17.4 A**  | **15 A**                               | 2.88                  | 1.4–1.9×               |
| 10/4 90 °C SOOW (C4, C5)              | 30 A  | 26.1 A  | **24.6 A**  | **25 A** (just under; see note)        | 4.80                  | 2.4–3.2×               |
| 10/4 105 °C SJOOW (W1)                | 30 A  | ~26.8 A | **~25.7 A** | 25 A                                   | 4.80                  | 2.4–3.2×               |
| **8/4 90 °C SOOW (C1)**               | 40 A  | 34.8 A  | **32.8 A**  | **30 A**                               | **5.76**              | 2.9–3.8×               |
| 8/4 if the jacket were 60 °C          | 40 A  | 28.4 A  | 23.2 A      | 20 A                                   | 3.84                  | 1.9–2.6×               |

Note: 24.6 A against a 25 A breaker relies on the next-size-up allowance; the
earlier file already takes 25 A for 10/4 (reasoning, as there).

**The honest position:**

- **The real load is not the constraint.** At 6–8 A a leg, every cord in this file
  runs cool. Code sizing follows the **breaker**, not the load.
- **Keep 8/4 and the 30 A feed.** It costs nothing extra on the AC Works route (C1
  is the only cut-cord candidate anyway), keeps the full 5.76 kVA, and matches the
  generator's own 30 A L14-30R breaker. **Read the jacket print first:** if C1's
  SOOW is marked 90 °C (Southwire's UL SOOW is −40 to 90 °C), this holds. If it is
  unmarked, treat it as 60 °C and it drops to a 20 A feed.
- **10/4 is acceptable only with a 25 A 2-pole breaker in the feed box.** The feed
  box already carries a 2-pole breaker, so this is a part swap. 4.8 kVA continuous
  still covers the assumed 128-spoke average (3–4 kW).
- **60 °C cords: no.** 15 A (2.88 kVA) is only 1.4–1.9× the average, and a bright
  pattern would trip the ring.
- **8/4 off the shelf exists in exactly one product found:** AC Works SDL1430PR,
  $129.99 (10 ft), $267.99 (25 ft), $499.99 (50 ft). Iron Box lists a 50 ft 8/4 SOOW
  cord on Newegg, out of stock, with no UL claim found.

---

## 4. Code and listing: is a cut cord any worse than the Hubbell route?

The Hubbell route is a **listed attachment plug and connector (UL 498) installed on
listed cord (UL 62)**: an assembly of separately listed components. An inspector
checks that each component is listed and correctly applied.

| Case                                                                         | What the cut leaves                                                                                                                           | Compared with Hubbell                                                                                | Conf.                                             |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Molded cord set** (C8–C13)                                                 | A molded plug with no listing of its own. C8's listing is "E65753 UL&CUL **General Use Cord Sets**": the whole cord set is the listed product | **Worse.** Modifying a listed product leaves it outside its listing (NEC 110.3(B))                   | Confirmed (C8 drawing) / Assumed (inspector view) |
| **Cord with separately listed, field-attachable ends** (C1, C3; probably W1) | AC Works ASL1430P/ASL1430R (cULus E237606) on cULus cord (E313867): the same structure as the Hubbell route                                   | **Equivalent** on listing. Weaker on sealing (unrated) and temperature (device rating not published) | Reported / Assumed                                |

**Other rules that bear on the choice:**

- **NEC 525.20(A):** cords "shall be listed for extra-hard usage", and outdoors
  "shall also be listed for wet locations and shall be sunlight resistant"
  ([Cal. Title 8 §2584.5](https://www.dir.ca.gov/Title8/2584_5.html), which repeats
  the NEC text;
  [EC&M quiz](https://www.ecmweb.com/code-quiz-of-day/article/20900362/approved-wire-type-for-circus-and-fair-applications)).
  An EC&M summary says hard usage is allowed where not subject to physical damage
  (Reported). **STW and SOOW are extra-hard usage; SJTW, SJOOW and SJT are hard
  usage** (Table 400.4 type letters; Assumed from the type designations, not re-read
  this session). So **W1 (SJOOW) and C9–C13 are weak under 525.20**, however good
  their ends.
- **525.20(D), as repeated in Title 8:** "no splice or tap between boxes or
  fittings", and cord connectors may not lie on the ground **unless listed for wet
  locations**. Terminating the cut ends on terminal blocks inside the power box keeps
  the first rule. The second rule means a non-wet-rated joint (C1 + Cord Vault) must
  hang **off the ground** (reasoning). An add-on cover doesn't change the connector's
  listing.
- **590.4 (temporary wiring):** permits cords of hard or extra-hard usage (Assumed;
  not re-read this session). 525.20 is the stricter rule.
- **400.14 strain relief** applies the same way to every option: a cord grip or
  gland at the box.
- **The add-on cover is outside every listing** (reasoning). It helps in rain; an
  inspector can't credit it as "listed for wet locations".

**Bottom line (Assumed, no inspector consulted):** cutting a cord built from
separately listed ends on extra-hard-usage cord is no worse than the Hubbell route
on listing. Cutting a molded cord set is worse. Either way, the joint is only as
weatherproof as its connector's own rating.

---

## 5. Cost for the ring

18 cords = 16 joints + 2 spares. A cord per joint also supplies that segment's
trunk, so **no separate 8/4 trunk cord is needed inside the ring**. The 40 ft feeder
can be an **uncut** AC Works SDL1430PR-050 ($499.99), which stays a listed cord set
and replaces the earlier "feeder cord ends + 40 ft of 8/4" (about $600). The far
end needs one cap.

| Option                                              | 18 joints     | Ring trunk cord (156.8 ft 8/4 at $6.09) | Caps                         | **Ring total** | vs Hubbell SW |
| --------------------------------------------------- | ------------- | --------------------------------------- | ---------------------------- | -------------- | ------------- |
| Hubbell SW + 8/4 SOOW (the leading design)          | $6,402.96     | $954.91                                 | included                     | **$7,357.87**  | —             |
| Leviton Wetguard + 8/4 SOOW                         | $4,750.74     | $954.91                                 | $36.71 (one 28W, snippet)    | **$5,742.36**  | −$1,615       |
| Iron Box IBX-2250-10 (10/4 SJOOW, 25 A feed)        | $4,767.84     | none                                    | included                     | **$4,767.84**  | −$2,590       |
| **AC Works SDL1430PR-010 + Cord Vault (8/4, 30 A)** | **$2,572.92** | **none**                                | $8.99 (CVFE, fit unverified) | **$2,581.91**  | **−$4,776**   |
| AC Works SDL1430PR-010, no cover                    | $2,339.82     | none                                    | $8.99                        | $2,348.81      | −$5,009       |

For the brief's own comparison (16 joints only, no spares, no cord): Hubbell SW is
$5,691.52; AC Works + Cord Vault is $2,287.04.

---

## 6. Local outlets in each power box (new requirement)

Brief: 3–6 GFCI-protected 120 V receptacles per box, priced at **4 outlets**. They sit
on the load side of the segment's GFCI, so they need no GFCI of their own.

**Code points (reasoning unless linked):**

- A 15/20 A receptacle in a wet location needs an enclosure that is weatherproof
  with a plug inserted (an "in-use" cover), listed **extra-duty**, and the receptacle
  must be **weather-resistant (WR)** (NEC 406.9(B)(1); Assumed from the code text as
  remembered, not re-read this session).
- 525.23 GFCI for public-accessible 15/20 A receptacles is met by the segment GFCI
  upstream.
- Power and data stay in separate boxes (`docs/requirements.md`): these outlets go
  in, or bolted to, the power box.

| Option                                                             | Parts for 4 outlets                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Per box (low – high)                                                                                   | Rating                                                                                 | Temperature                                                                                                         | Conf.                        |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| **(a) Watertight receptacles with lift covers**                    | 2 × Hubbell **HBL60W33D** watertight duplex 5-20R at $161.43 ([MRO](https://www.mrosupply.com/products/5018517/as-markdown/), min 3; [spec](https://hubbellcdn.com/specsheet/WDK_MX-HBL60W33D-SPEC-EN.pdf)), **or** 4 × Leviton Wetguard **60W33** single 5-20R at $120.10 ([Platt](https://www.platt.com/p/0528122/leviton/20-amp-corrosion-resistant-receptacle-cover-gasket-125v-wetguard/078477066249/lev60w33))                                                                                                                                                                                                                                                                                                                        | **$323 – $480**, plus a watertight plug on every load cord (not priced; roughly $40–60 each, Estimate) | Hubbell: "UL Type 4X" seal (Reported). Wetguard: IP67-class mated or closed (Reported) | HBL60W33: −40 to 60 °C ([Van Meter](https://www.vanmeterinc.com/product/hubbell-wiring-hbl60w33-7461832), Reported) | Quoted / Reported            |
| **(b) WR duplexes under an extra-duty in-use cover** (recommended) | Bell **5337-0** die-cast 2-gang weatherproof box, five ½ in hubs, NEMA 3R: $9.69 ([Home Depot](https://www.homedepot.com/p/2-Gang-Weatherproof-Box-with-Five-1-2-in-Outlets-5337-0/100031971)) – $16.52 ([Elliott](https://static.elliottelectric.com/P/Item/HBL/53370)). 2 × 20 A WR/TR duplex: Leviton W5820-T0W $2.64 (Home Depot, snippet) – Eaton TWRBR20WBXSP $16.13 ([Elliott](https://www.elliottelectric.com/P/Item/EWD/TWRBR20WBXSP/)). Eaton **WIU-2WX** 2-gang extra-duty in-use cover, UV-resistant polycarbonate: $20.50–23.66 ([homelectrical](https://www.homelectrical.com/2-gang-weather-protective-cover-extra-dutywhite.etw-wiu2wx.1.html)). Nipple or gland plus a short 12/3 lead to the power box: $10–25 (Estimate) | **$45 – $97**                                                                                          | NEMA 3R with the cover closed over the plugs                                           | Box: die-cast aluminium. Cover and devices: **not stated** (Unknown)                                                | Quoted / Quoted\* / Estimate |
| (c) Short cord to an outdoor multi-outlet                          | 3-outlet power stake, 16/3 SJTW, covered outlets: $13.99 (Ace) – $29.99 (Woods 17321, [Ace](https://www.acehardware.com/p/3019782)); two needed for 4+ outlets; plus a Cord Vault ($12.95) and a receptacle or cord grip at the box to feed it ($0–12, Estimate)                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **$41 – $85**                                                                                          | Per-outlet flip covers; no wet-location rating found; 16/3 cord limits it to 13 A      | Not stated                                                                                                          | Quoted\* / Reported          |

**Recommendation: (b).** It is the code-standard way to put 15/20 A outlets outdoors,
it costs **$45–97 a box, $773–1,656 for 17**, and any ordinary plug works in it. The
outlets live in their own small die-cast box bolted to the power box, joined by a ½ in
nipple or a short gland-to-gland lead, so the sealed power box keeps its rating.
Mount it with the in-use cover's hinge on top so the cord exits point down.

- **Not (a)** unless the outlets must survive hose-down or standing water. It is
  4–7× the cost before the watertight plugs, and only sealed with matching plugs or
  the lid shut.
- **Not (c).** The stakes are 16/3 SJTW, hard usage only (the 525.20 problem from
  section 4), have no wet-location rating, and still need something in the box to
  plug into.
- **Temperature is the open point for (b):** the polycarbonate cover and the
  devices publish no upper limit. Shade them as for the other connectors.

---

## 7. Recommendation

### Joints

**Cheapest option I'd stand behind: AC Works SDL1430PR-010 (10 ft, 8/4 SOOW), cut
in half, with a Twist and Seal Cord Vault over each mated joint.**

- **Cost:** $142.94 a joint. **$2,573 for 16 + 2 spares**, against $7,358 for Hubbell
  SW with its trunk cord. It **removes all 157 ft of 8/4 trunk cord inside the
  ring** ($955). Adding the uncut 50 ft SDL1430PR-050 as the feeder ($500) and one
  far-end cap, the ring and feeder come to about **$3,082**.
- **Why this one:** separately listed ends on listed extra-hard-usage 8/4 SOOW, so
  the cut halves are the same kind of assembly as the Hubbell route. 8/4 keeps the
  30 A feed.

**It is conditional on four checks before buying 18:**

1. **Jacket print** on one cord: it must show SOOW, 600 V, and **90 °C** (or 105 °C).
   Unmarked means 60 °C, which drops the feed to 20 A.
2. **Cover fit:** the mated SDL1430PR plug and connector must close inside the Cord
   Vault with both cords through its seals.
3. **Owner decision:** the joints become **Type 3R / IP44 (rain-resistant)**, not
   IP66/IP67 watertight, which relaxes the requirement in `plans/power.md`
   ("Watertight connectors at every segment joint"). The joints must also hang off
   the ground (525.20(D)).
4. **Length:** a 10 ft cord gives about 112.5 in of cord between its two end bodies
   (each ASL1430 body is 93.5–96.5 mm long). A 9.8 ft (118 in) segment needs about
   the same, once the box tails (about 6 in each) and the box itself are counted
   (Assumed). **That leaves no routing slack.** Trial-fit one segment. If it's short,
   AC Works' next length is 25 ft ($267.99), which kills the saving. Iron Box offers
   custom lengths (not quoted).

**If any check fails, or watertight stays a hard requirement:** field-build
**Leviton Wetguard on 8/4 SOOW** ($324 a segment, about $5,742 for the ring; rated
60 °C, so shade it). It beats the factory watertight Iron Box IBX-2250 on code
(extra-hard 8/4 against hard-usage 10/4 SJOOW) at almost the same price.

### Local outlets

Option (b): a Bell 5337-0 die-cast box, two 20 A WR duplexes, and an Eaton WIU-2WX
extra-duty in-use cover, joined to each power box by a nipple or short lead. **$45–97
a box; $773–1,656 for 17 boxes.**

---

## Assumptions

1. **One cord per joint.** The plug half serves segment N+1 and the connector half
   segment N. Their mated pair is the joint.
2. **Ring geometry:** 16 segments of 9.8 ft (156.8 ft of trunk), open radial ring
   as in `docs/pricing-power-feed-2026-10.md` §3.
3. **Column B** for split-phase cord, and the 46–50 °C correction row, as in the
   feed file.
4. **The Iron Box IBX-2250 ends are Leviton Wetguard**, judged only from the photos.
5. **Prices** are single-unit web prices. Quantity pricing was not requested.
6. **The power box can take a ½ in nipple** to a 2-gang outlet box without losing
   its seal (depends on the box chosen in `plans/weatherproofing.md`).

## Could not verify

- **AC Works SDL1430PR:** jacket temperature rating; the E313867 cable maker; the
  ASL1430P/R temperature rating, cord-grip range and load-break rating (the drawings
  show only outline dimensions and the file number). UL Product iQ needs an account,
  so neither E-file was looked up.
- **Cord Vault interior dimensions** and whether a mated L14-30 pair fits. Twist and
  Seal publishes a "fit chart" that wasn't read.
- **Iron Box IBX-2250:** the end maker and the UL file for that product.
- **Generac 6327, Parkworld 79087, Southwire 65172740:** jacket temperature, and
  molded vs assembled ends. No maker spec sheet was reachable.
- **Champion, Conntek, Marinco, Hubbell/Leviton factory L14-30 cord sets:** none
  found.
- **NEC text:** 400.4 type classes, 406.9(B)(1), 590.4 and the 525.20(A)
  hard-usage exception were not read in the 2023 original; secondary sources or
  memory were used, as marked.
- **The Molex Watertite datasheet** (Arrow PDF) timed out; its specs come from
  Cytech's listing.
- **In-use cover and WR receptacle upper temperature limits.**
