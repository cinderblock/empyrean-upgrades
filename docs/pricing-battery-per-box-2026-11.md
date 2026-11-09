# Battery-in-each-power-box: pricing research

Researched 2026-11-08 (Sunday, US Pacific). Read-only; nothing bought or quoted.
For `plans/power.md`, section "Battery in each power box". 17 sets (16 + 1 spare) unless noted.

Confidence: **Quoted** = a live US price seen in a retailer/distributor listing (search snapshot, undated unless noted);
**Estimate** = built from quoted parts or a range of listings; **Assumed** = category knowledge, not checked.

## 1. Charger: Mean Well NPB-750-12

Price: **$175–250** each (DigiKey $197.60 at 1, ~$174.70 at 25; Bravo $197.60; Jameco $205.20; TRC $249.47). **Quoted.**

- https://www.digikey.com/en/products/detail/mean-well-usa-inc/NPB-750-12/22119374
- https://bravoelectro.com/npb-750-12.html
- https://www.jameco.com/z/NPB-750-12-MEAN-WELL-722-4W-13-8V-43A-Ultra-Wide-Output-Range-Intelligent-Battery-Charger_2334695.html
- https://www.trcelectronics.com/collections/mean-well-battery-charger-npb-750

17 sets: **~$2,970–4,240.**

Datasheet (Mean Well, file dated 2026-07-06): https://www.meanwell.com/Upload/PDF/NPB-750/NPB-750-SPEC.PDF

- **CANBus sets, not just reads. Confirmed.** CANBus 2.0B "control, setting and monitoring". Command list has
  `VOUT_SET` (0x0020, R/W), `IOUT_SET` (0x0030, R/W), `OPERATION` on/off (0x0000, R/W), and charge-curve registers
  `CURVE_CC` / `CURVE_CV` / `CURVE_FV` / `CURVE_TC` (0x00B0–B3, R/W), plus timeouts and status. `READ_VIN` is
  **not supported** on NPB-450/750. Also: remote on/off pin, Charger-OK and Battery-Full TTL outputs, NTC temp comp.
  Auto-derating stays active under CANBus control.
- Charge voltage programmable 10.5–21 V (so 14.0–14.2 V is settable). Default boost 14.4 V, float 13.8 V; 43 A CC, 722 W.
- **Input 90–264 VAC** (127–370 VDC): 208 V and 240 V line-to-line both inside range. PF > 0.95 at 230 VAC.
  Low-line derating applies below ~100 VAC only.
- **Working temp −30 to +70 °C, with derating.** Curve (read off the plot, so treat the knee as approximate): 100 %
  from about −25 to ~50 °C, falling toward ~50 % at 70 °C. In a 50 °C box it is at the knee.
- **No IP rating** (enclosed, not sealed). **Fan-cooled**, fan speed by internal temperature. 230 × 158 × 67 mm, 1.84 kg.
  In alkaline dust it needs a filtered or ducted air path, or a separate ventilated compartment.
- Recommended battery 150–500 Ah at 43 A; with 100 Ah you must set `IOUT_SET`/`CURVE_CC` to ~20 A (Mean Well's own note).

### Sealed / controllable alternatives

| Part                             | Control                                                                          | IP / cooling             | Temp                                | US price                                  | Conf.         |
| -------------------------------- | -------------------------------------------------------------------------------- | ------------------------ | ----------------------------------- | ----------------------------------------- | ------------- |
| Mean Well NPB-450-12 (25 A)      | Same CANBus R/W set as 750                                                       | No IP, fan               | −30 to +70 °C                       | not looked up (expect ~$130–170, Assumed) | Assumed       |
| Victron Skylla-i 24 V models     | VE.Can, remote on/off                                                            | **IP21**, forced cooling | −20 to 60 °C, full current to 40 °C | 24 V 80/100 A from $1,153; 12 V not found | Quoted (24 V) |
| Victron Phoenix Smart IP43 12/30 | Bluetooth + **VE.Direct** (to a GX); setting current over the wire not confirmed | IP43                     | not read                            | $370–470                                  | Quoted        |
| Victron Skylla IP65 12/70        | (not checked for comms)                                                          | IP65                     | —                                   | $836 (sale)                               | Quoted        |

- NPB-450 datasheet (CANBus control, fan, −30 to +70 °C confirmed): https://www.meanwell.com/Upload/PDF/NPB-450/NPB-450-SPEC.PDF
- Skylla-i datasheet (IP21, forced cooling, 185–265 VAC, VE.Can): https://www.victronenergy.com/upload/documents/Datasheet-Skylla-i-EN.pdf
- Phoenix Smart IP43 page (VE.Direct confirmed): https://www.victronenergy.com/chargers/phoenix-smart-ip43-charger
- Phoenix IP43 12/30 prices: https://egretmarine.com/products/victron-phoenix-smart-ip43-charger-12-30-3-120-240vac-requires-5-15p-mains-cord ;
  https://offgridstores.com/products/victron-phoenix-smart-ip43-charger-12-30-1-1-120-240vac-requires-5-15p-mains-cord
- Skylla prices: https://bluemarine.com/collections/victron-energy?page=3 ; https://expion360.com/collections/victron-energy?page=5

**Finding:** no sealed (IP65+), fanless, 12 V charger with wired current control turned up from Mean Well or Victron.
The NPB-750's control is the best available; the cost is a fan and no IP rating. Phoenix Smart IP43 is the closest
sealed-ish option with a wired port, at ~2x the price, and whether VE.Direct can _write_ its charge current is unverified.

## 2. Battery: 12 V 100 Ah LiFePO4 (×34)

| Model                                  | Comms                                    | Price                                    | Conf.                       |
| -------------------------------------- | ---------------------------------------- | ---------------------------------------- | --------------------------- |
| LiTime 12V 100Ah (standard / Group 24) | Bluetooth on some variants only          | $230–290 typical, frequent sales         | Estimate (several listings) |
| **LiTime 12V 100Ah Smart ComFlex**     | **RS485 + CAN** (Victron GX closed loop) | **$306.99** (list $429.99) on litime.com | Quoted                      |
| Redodo 12V 100Ah                       | Bluetooth variants; no RS485/CAN found   | $208–220 (Walmart)                       | Quoted                      |
| Eco-Worthy 12V 100Ah                   | Bluetooth; no RS485/CAN found            | sale prices only seen (stale)            | not found                   |
| Pylontech 12.8 V 100 Ah heated         | CAN                                      | ~$1,100                                  | Quoted                      |

- ComFlex: https://litime.com/products/12v-100ah-smart-comflex-battery ; manual (CAN + RS485): https://manuals.plus/asin/B0FFMB4R7K
- LiTime Victron guide: https://www.litime.com/blogs/news/unlock-your-victron-system-with-a-litime-smart-battery
- LiTime standard listings: https://renewableoutdoors.com/products/litime-12v-100ah-lifepo4-lithium-deep-cycle-battery
- Redodo: https://www.redodopower.com/products/12v-100ah-lithium-battery
- Pylontech: https://invertersrus.com/?p=55585

34 batteries: **$7,820 (generic) – $10,440 (ComFlex).** Spec to watch: charge range 0–50 °C (from the plan, LiTime pages;
manufacturer datasheet not re-read this pass). A 50 °C box puts charging at the BMS's limit. ComFlex's CAN protocol is
aimed at Victron GX; reading it from an ESP32 means matching that protocol (not checked).

## 3. Victron SmartSolar MPPT

- **150/60** (-Tr or -MC4): **$351–370** (sportfishoutfitters $351, stock4less $368.90, eBay $369.95; MC4 $306.88 out of stock). **Quoted.**
  https://sportfishoutfitters.com/products/victron-smartsolar-mppt-150-60-tr-scc115060211 ;
  https://stock4less.com/products/victron-smartsolar-mppt-150-60-tr-scc115060211
- **100/50**: **$166–202** (Walmart $166, Santan $184.45, Lotz $193.80). **Quoted.**
  https://www.santansolar.com/product/victron-energy-smartsolar-mppt-100-50-solar-charge-controller/ ;
  https://shop.lotzoutdoors.com/products/victron-smartsolar-mppt-charge-controller-100v-50amp-ul-approved-scc110050210
- Datasheet: https://www.victronenergy.com/upload/documents/Datasheet-SmartSolar-charge-controller-MPPT-150-45-up-to-150-100-EN.pdf
  150/60: 60 A, **860 W nominal PV at 12 V**, **−30 to +60 °C, full output only to 40 °C**, **IP43 electronics / IP22 connection area**.
  The 100/50 at 12 V is ~700 W nominal (Victron family figure, Assumed from memory; not re-read), so two 410 W panels would clip.
- 17 sets: 150/60 **~$5,970–6,290**; 100/50 ~$2,820–3,430.

## 4. Solar panels (~410 W, 108-cell, ~1.72 × 1.13 m) ×34

- Pallet listings: CW Energy 410 W bifacial, 35/pallet, **$4,161.50 (~$0.29/W, ~$119/panel)** at Signature Solar
  (page now 404, so availability uncertain); Hyperion 410 W 36/pallet $4,450 (~$0.30/W); Aptos 410 W 31/pallet $5,084
  (~$0.40/W); Thornova 31/pallet $5,400 (sold out). **Quoted** (search snapshots).
  - https://a1solarstore.com/cw-energy-410w-solar-panel-108-cells-bifacial-cwt410-108pmb10-usa-wholesale-35-panels-per-pallet.html
  - https://signaturesolar.com/12-71kw-aptos-410w-bifacial-solar-panels-black-up-to-513w-with-bifacial-gain-dna-108-bf10-410-full-pallet-31-panels-12-71kw-total
  - https://reach.dog/shop/self2solar/products/14-58kw-pallet-hyperion-405w-full-black-half-cut-bifacial-dual-glass-1200mm-cable-length-14-58kw-total
- Range: **$0.29–0.47/W → ~$120–195 per panel; 34 panels ≈ one pallet, ~$4,100–6,600 + LTL freight** (freight not priced).
- Weight: **~21–24 kg** each for this size; bifacial dual-glass toward the top. **Assumed** (no manufacturer datasheet read).
  34 panels ≈ 0.75 t on the truss.

## 5. Racking on 12" box truss (per 2-panel segment)

- Tamarack 93" 2-rail kit (2 panels, includes module clamps): $228.15 — https://shopsolarkits.com/products/tamarack-solar-2-3-rail-93-inch-black-2-rail-flush-mount-kit
- Tamarack 2" pipe mount 88955: $74.38 — https://www.solar-electric.com/tamarack-solar-88955k-2-inch-rail-pipe-mount.html
- SunModo 2.5" pipe U-clamp kit: $15.19 — https://ussolarsupplier.com/products/sunmodo-2-5-pipe-u-clamp-kit-smr300-sunturf-clmp-smr300-25-snap
- Truss half-couplers for 48–51 mm chords: ~$10–25 each (**Assumed**, not looked up).
- **Estimate per segment: $200–400** (2 rails + clamps + 4–6 truss couplers). 17 segments: ~$3,400–6,800.
  Wind load / clamp slip at Burning Man not assessed.

## 6. Controller and interfaces

- **Olimex ESP32-POE-ISO**: €24.95 (€19.96 at 50+), **0 to 70 °C**. **-IND**: **−40 to +85 °C**, ~€27 ex-VAT
  (DigiKey DE €26.58; TinyTronics €27.07 ex). ≈ **$30–40** US. **Quoted (EUR).** 802.3af PD; needs ≥37 V.
  https://www.olimex.com/Products/IoT/ESP32/ESP32-POE-ISO/ ; https://www.digikey.de/en/products/detail/olimex-ltd/ESP32-POE-ISO-IND/21662678
  In a 50 °C box only the -IND is in spec.
- **SN65HVD230 CAN board** (Waveshare): $3.76–5.36 at LCSC — https://www.lcsc.com/product-image/C5374672.html . **Quoted.**
  Isolated ISO1050-type board: **price not found.**
- **VE.Direct**: Victron VE.Direct-to-USB $28–31 (https://offgridstores.com/collections/victron-energy/products/victron-ve-direct-to-usb-interface). **Quoted.**
  Isolated VE.Direct cable for a UART: **price not found**; a DIY cable (JST-PH 4-pin + optocoupler/digital isolator)
  is ~$5–10 (Assumed).

## 7. Victron SmartShunt 500 A

- **$100–131** (Renewable Outdoors $100.30, IP65 variant $112, Dakota $131). **Quoted.**
  https://renewableoutdoors.com/products/victron-smartshunt-500a-50mv ; https://ussolarsupplier.com/products/victron-smartshunt-500a-50mv-ip65
- Datasheet: **−40 to +50 °C** operating, VE.Direct + Bluetooth: https://www.victronenergy.com/upload/documents/Datasheet-SmartShunt-EN.pdf
  **A 50 °C box is at its limit.** 17: ~$1,700–2,230.

## 8. 12 V → 54 V boost for a PoE switch

- **Murata SPC-54/4.4-L12PG-C**: 54.2 V, 4.4 A (240 W), isolated, PoE-oriented. **$72–105** (DigiKey ~$83; Mouser ~$72).
  **Quoted.** **Catch: input 11–13.2 V** (DigiKey listing): a LiFePO4 bus at 14.0–14.4 V while charging is over range.
  https://www.digikey.fr/en/products/detail/murata-power-solutions-inc/SPC-54-4-4-L12PG-C/5874943 (datasheet not read).
- Mean Well SD-350B/SD-500L: **do not take 12 V** (19–36 / 19–72 VDC). SD-500 datasheet: https://www.meanwell.com/Upload/PDF/SD-500/SD-500-SPEC.PDF
- Generic potted 12→48 V 240 W boosters (IP67/68 claims, $22–40): output 48 V, not 54; −25 to +65 °C claimed; marketing only.
  https://global.linovision.com/products/12v-24v-to-dc48v-240w-voltage-booster-dc-dc-boost-converter
- **Better route: a PoE switch with a wide 12–57 V input and its own boost** (no separate converter): PLANET ISW-504PT
  (12–48 V in, boosts to 54 V for 802.3at), StarTech IES1G52UP12V (12–48 V, −40 to 75 °C), PROCET PT-PIS4PB1T-E (12–57 V,
  −40 to 75 °C). Prices not collected; datasheets not read.
  https://planetechusa.com/product/isw-504pt-industrial-5-port-10-100tx-ethernet-switch-with-4-port-802-3at-poe/

## 9. Per-box DC protection and cable

| Item                                    | Price                                                  | Source                                                                                                                         | Conf.                 |
| --------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| Class T 300 A fuse                      | $39–110 (Blue Sea 5119 $38.99 sale; Mersen A3T300 $74) | https://reeldraggintackle.com/products/blue-sea-5119-300a-class-t-fuse                                                         | Quoted                |
| Class T block (Blue Sea 5502)           | $44–49                                                 | https://www.walmart.com/browse/sports-outdoors/boating/blue-sea-systems/4125_546956_1208159/YnJhbmQ6Qmx1ZSBTZWEgU3lzdGVtcwieie | Quoted                |
| or MRBF block (Blue Sea 5191) + fuse    | $24–32 + ~$15–25 fuse                                  | https://www.bluesea.com/products/5191/MRBF_Terminal_Fuse_Block_-_30_to_300A                                                    | Quoted / fuse Assumed |
| Battery switch (Blue Sea m-Series 6006) | $26–45                                                 | (Walmart / Defender listings)                                                                                                  | Quoted                |
| 2/0 welding cable                       | $6–8/ft; 2 AWG ~$6/ft                                  | https://elliottelectric.com/P/Item/COR/104160508 ; https://www.wholesalemarine.com/ancor-2-gauge-marine-battery-cable-per-foot | Quoted                |
| Lugs, heat-shrink, busbar               | ~$20–60                                                | —                                                                                                                              | Assumed               |

**Per box ≈ $170–330** (10–15 ft of 2/0). 17 boxes ≈ $2,900–5,600. **Estimate.**

## Rough total (17 sets, 34 batteries, 34 panels)

| Line                            | Low          | High         |
| ------------------------------- | ------------ | ------------ |
| NPB-750-12 ×17                  | 2,970        | 4,240        |
| Batteries ×34                   | 7,820        | 10,440       |
| MPPT 150/60 ×17                 | 5,970        | 6,290        |
| Panels ×34 (no freight)         | 4,100        | 6,600        |
| Racking ×17                     | 3,400        | 6,800        |
| ESP32-IND + CAN + VE.Direct ×17 | 600          | 900          |
| SmartShunt ×17                  | 1,700        | 2,230        |
| Boost ×17 (Murata)              | 1,220        | 1,790        |
| DC protection + cable ×17       | 2,900        | 5,600        |
| **Total**                       | **~$30,700** | **~$44,900** |

Excludes freight, tax, enclosures, AC distribution, PoE switches. **Estimate.**

## Shipping 34 lithium batteries (brief)

- Each 12.8 V 100 Ah pack is ~1,280 Wh: a **fully regulated UN3480 Class 9** item (well over the 100 Wh small-battery
  allowance). Ground is the practical mode; air is effectively out at this size.
- Needs UN 38.3 test summary from the maker, Class 9 lithium-battery label (the battery-pictogram version), UN3480 on the
  bill of lading, packaging per 49 CFR 173.185, and a hazmat-trained shipper. Domestic Class 9 placards not required (PHMSA).
  Some carriers also cap state of charge at 30 % and package weight.
  https://jjkellercompliancenetwork.com/institute/shipping-lithium-batteries-by-ground ; https://www.phmsa.dot.gov/node/79076
- Cheapest path is usually to have the retailer ship to a home/warehouse by LTL/ground, then carry them to the playa in the
  team's own vehicle/container (private-carrier rules are lighter, but secure them; 34 × ~11 kg ≈ 375 kg).
  Burning Man-specific rules for lithium on playa (fire/safety, containment) were **not found**; check the current
  Burning Man art/placement and fire-safety guidance.
