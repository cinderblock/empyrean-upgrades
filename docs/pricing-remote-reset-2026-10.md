# Remote reset of a tripped segment GFCI: pricing, October 2026

This file answers `plans/power.md` open question 2a. The owner wants a **remote,
human-triggered** reset of a segment's tripped ground-fault protection, signalled
over the ring network, with **no home runs** (user, 2026-10-21). The power design
it builds on is in `docs/pricing-power-feed-2026-10.md`: an L14-30 feed, an 8/4
SOOW trunk, and a 120 V tap in each of 16 sealed power boxes, each tap with its
own Class A GFCI. Each power box sits beside a node box that holds the switch
(USW-Ultra, 54 V), the PixLite and, in this proposal, a network relay.

**Method.** Specs and prices were checked on **2026-10-21** by read-only browsing.
Nothing was ordered, carted or quoted, and no vendor was contacted. Specs come
from manufacturer datasheets and catalogues wherever one could be read. Prices
come from distributors. Many retailer pages blocked automated reading, so a fair
share of the prices are search-snippet only (Quoted\*). EUR and GBP prices are
converted at an **assumed** 1 EUR ≈ 1.15 USD and 1 GBP ≈ 1.33 USD; current rates
were not checked. All prices are before tax and shipping.

**Confidence key** (same as `docs/pricing-power-feed-2026-10.md`)

| Mark          | Meaning                                                            |
| ------------- | ------------------------------------------------------------------ |
| **Quoted**    | Price seen today on the distributor or maker page at the URL given |
| **Quoted\***  | Price seen only in a search snippet or aggregator. Recheck it      |
| **Estimate**  | A range from comparable parts, or no price found                   |
| **Confirmed** | Spec read in a manufacturer datasheet, catalogue or code text      |
| **Reported**  | Spec or rule from a retailer, secondary article, forum or snippet  |
| **Assumed**   | Depends on an unchecked fact; the assumption is named              |
| **Unknown**   | Looked for and not found                                           |

Anything marked **(reasoning)** is my inference, not a cited fact.

---

## Summary

- **No DIN-rail or inline UL 943 Class A GFCI with a remote reset input, motor
  operator or remote-reset accessory was found.** The Allen-Bradley
  1492-MCGAT115 has no accessories beyond DIN adapters and clips. Littelfuse
  Shock Block resets only at its front panel, and has no neutral. Eaton, Square D
  and Leviton "smart" breakers can switch off remotely but cannot close after a
  trip. The one personnel-type product with a reset terminal is **Bender
  LifeGuard**, but its current (10.2025) datasheet calls it a "UL 508A Listed
  Industrial Control Panel" with a trip curve "consistent with" UL 943, not a
  listed UL 943 GFCI, and it has no public price. (Section 1.)
- **UL 943C special-purpose GFCIs don't apply at 120 V** (they are for circuits
  over 150 V to ground). **UL 1053 ground-fault relays** (Littelfuse SE-704,
  down to 10 mA, with a remote-reset terminal) and **IEC 30 mA or 10 mA RCDs with
  motor reclose** (ABB F200 + F2C-CM, Siemens 5ST3070) are **equipment
  protection**. Neither satisfies NEC 525.23, which requires a listed Class A
  GFCI. Putting one in series behind a Class A GFCI doesn't help either: the
  5 mA device trips first. (Sections 1–2.)
- **Recommended design: reset by a remote power cycle, using only listed parts.**
  A normally closed 2-pole relay in the power box sits upstream of a hard-wired
  **auto power-up Class A GFCI (Ericson 1075-AR, UL 943, −35 to 66 °C, $58.56)**.
  The network relay in the node box (**ICP DAS tPET-PD2R1**, PoE, −25 to 75 °C, or
  **ControlByWeb X-401-E**) pulses it open for about 2 s on an operator's command.
  Auto power-up GFCIs are allowed to reclose after a loss of power (UL 943, 3rd
  ed., §19.3), so the GFCI re-arms. If the fault is still there, it trips again
  within 25 ms.
- **This hinges on one bench test.** Does the 1075-AR re-arm after a
  _ground-fault_ trip when its supply is cycled, or does it remember the trip
  (UL 943 §19.2 forbids automatic reclosure after a ground-fault trip)?
  **Unknown.** If it remembers, the fallback is a **spare-GFCI changeover**: two
  Class A GFCIs per segment, and the same relay moves the load from the tripped
  one to the fresh one. That gives one remote recovery per segment between
  visits. (Section 5.)
- **The network supply gets its own Class A GFCI, not a bare line-side breaker.**
  NEC 525.23(A)(2) covers hard-wired 120 V equipment "readily accessible to the
  general public", which a climbable truss probably is. A line-side, unprotected
  SDR-240-48 is marginal on code and weak on safety. A second Class A GFCI
  ($58.56–126.07) on the SDR's own small breaker keeps the network alive through
  a pixel-circuit trip, because each GFCI sees only its own circuit. (Section 4.)
- **Cost:** about **$344–731 per segment**; **$5.8–12.4K for 16 + 1 spare**. The
  spare-GFCI fallback is about $402–801 per segment, or $6.8–13.6K. This
  replaces the "Per-segment GFCI" line of the power-feed budget ($727–4,938),
  so the net addition is about **$5.1–7.5K**. (Section 6.)

---

## 1. UL 943 Class A devices with a remote reset

Personnel protection in the US means a **listed Class A GFCI**: trips at 6 mA,
holds below 4 mA (NEC Art. 100, informational note citing UL 943). Equipment
protection (GFPE, UL 1053) trips at 30 mA and up and "is not used for personnel
protection" ([UL, Ground-Fault Protective Devices](https://code-authorities.ul.com/wp-content/uploads/2014/04/ul_GroundFaultProtectiveDevices.pdf),
Confirmed).

### 1a. Survey

| Product                                                                        | Remote reset after a ground-fault trip?                                                                                                                              | Ratings that matter here                                                                                                                                                                                                     | Price                                                         | Source                                                                                                                                                                                                                                                                                                                                                                                                              | Conf.                                 |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Allen-Bradley 1492-MCGAT115** (DIN GFCI breaker, UL 489 + UL 943 Class A)    | **No.** Accessories are a DIN adapter and panel clips only; no aux contact, shunt trip or motor operator                                                             | 15 A 1P 120 V; 0–60 °C, rated at 40 °C                                                                                                                                                                                       | $275.77 (HESCO)                                               | [1492-SG122I catalogue pp. 99–104](https://support.rockwellautomation.com/cc/okcsFattachCustom/get/1092678_6); price from `pricing-power-feed-2026-10.md`                                                                                                                                                                                                                                                           | Confirmed / Quoted\*                  |
| **Leviton GSIA2** (inline, auto-reset)                                         | **No input.** "Automatically restore power … when plugged in or after power interruption". Whether a power cycle re-arms it after a ground-fault trip is not stated  | 20 A 120 V Class A, −35 to 66 °C                                                                                                                                                                                             | $42.77                                                        | [leviton.com/products/gsia2](https://leviton.com/products/gsia2)                                                                                                                                                                                                                                                                                                                                                    | Confirmed (spec), Unknown (behaviour) |
| **Ericson 1075-AR** "Ground Guardian" panel-mount GFCI, **automatic power-up** | **No input.** Same open question as the GSIA2                                                                                                                        | 20 A 120 V, 60 Hz only, trip 4–6 mA, < 25 ms; "UL & cUL listed to UL943-2003"; electromechanical latching; open-neutral protection; UV-rated polycarbonate; NEMA 4/4X front face; **−35 to +66 °C**; 1 ft leads (hard-wired) | **$58.56** (sale; $70.27 regular; Ericson $250 minimum order) | [Ericson 1075 spec sheet](https://www.homelectrical.com/sites/default/files/ERC-1075ARKIT-SPEC.pdf); [RSP Supply](https://rspsupply.com/p-583935-ericson-1075-ar-panel-mount-gfci-20-amp-2400-watts-1-ft-cable-nema-3r.aspx) (page says NEMA 3R)                                                                                                                                                                    | Confirmed / Quoted                    |
| Ericson 1075-MR (manual power-up sibling)                                      | No                                                                                                                                                                   | as 1075-AR                                                                                                                                                                                                                   | $54.38 (McNaughton-McKay)                                     | [mc-mc.com](https://mc-mc.com/Product/ericson-1075-mr)                                                                                                                                                                                                                                                                                                                                                              | Quoted\*                              |
| **Bender LifeGuard LG2-20-F-P** (B541301005)                                   | **Probably yes, unconfirmed.** Front test/reset pushbuttons; built on a Bender RCMA421H relay plus contactor. The RCMA42x family takes an external test/reset button | 20 A; 120–600 V; fixed 6 mA inverse-time "per UL 943", 25 ms at 250 mA; 12 × 10 × 6 in Type 4X polycarbonate. **"UL 508A Listed Industrial Control Panels"**, not stated as a listed UL 943 GFCI. Temperature not given      | **No public price** (Unknown)                                 | [LG2 datasheet, 10.2025](https://www.benderinc.com/fileadmin/content/Products/d/binc/LifeGuard_Datasheet.pdf) (Confirmed); RCMA420 external reset: Conrad catalogue (Reported)                                                                                                                                                                                                                                      | Confirmed / Unknown                   |
| Bender LifeGuard Compact (older, 20 A 120 V 2-wire, 6 mA)                      | **Yes.** Terminals "Reset 1 / Reset 2: N/O contact / push-button", plus Tripped/On outputs. Enclosed models "listed to UL943 as Class A"                             | Documents dated 02.2014; current availability Unknown                                                                                                                                                                        | Unknown                                                       | [Compact guide NAE1088320](https://fournais-bender.dk/wp-content/uploads/LifeGuard-Series-Compact-Model-NAE1088320.pdf), [bulletin NAE1082321](https://www.benderinc.com/fileadmin/content/Products/d/ca/LifeGuard_datasheet_NAE1082321.pdf)                                                                                                                                                                        | Confirmed (2014)                      |
| Littelfuse Shock Block **SB6100**                                              | No: reset at the operator interface; aux contact is for remote _indication_                                                                                          | 3-phase 3-wire, **no neutral**, 208–600 V: can't protect 120 V line-to-neutral. SB6100-001-0 obsolete                                                                                                                        | —                                                             | [SB6000 datasheet](https://media.vanmeterinc.com/image/upload/v1615403354/12956_117181166.pdf)                                                                                                                                                                                                                                                                                                                      | Confirmed                             |
| Littelfuse Shock Block **SB5000**                                              | No: "autoreset" covers brownout, power-up and ground-monitor interruptions only, not ground-fault trips                                                              | No neutral; Class A only at 208 V; −35 to 40 °C (derated above)                                                                                                                                                              | SB5032-021-0 $2,562.50                                        | [SB5000 datasheet](https://standardelectricsupply.com/userfiles/documents/2410405.pdf), [Standard Electric](https://www.standardelectricsupply.com/Littelfuse-SB5032-021-0-SB5000-Series-Industrial-Shock-Block-208-V-32-A)                                                                                                                                                                                         | Confirmed / Quoted                    |
| Hubbell GFHW13105 (120 V 30 A hard-wired, NEMA 4X, auto-set)                   | No: "After a ground fault condition, unit must be reset by pushing the reset button." A GFHW13135 variant has an undocumented "24V DC output"                        | −35 to 66 °C (GFHW23035 sibling)                                                                                                                                                                                             | $471.06 (Walmart); GFHW13135 $613.63 (Lumen)                  | [Steiner listing](https://steinerelectric.com/Product/Hubbell-Wiring-Device-Kellems-Circuit-Guard-GFHW13105-3-Wire-Automatic-Multi-Strand-Industrial-Grade-Hard-Wired-GFCI120-VAC30-A3600-WNEMA-4X-EnclosureThermoplastic-304749), [spec](https://hubbellcdn.com/specsheet/WDK_CA-GFHW23035-SPEC-EN.pdf)                                                                                                            | Reported / Quoted\*                   |
| Eaton AbleEdge smart breaker (Class A)                                         | No: remote on/off "independent from trip mechanism"; a trip "cannot be remotely closed". 2-pole plug-in, not DIN                                                     | —                                                                                                                                                                                                                            | —                                                             | [FAQ mirror](https://origin.golfpride.com/us/en-us/products/residential/ableedge-smart-breaker-faq.html) (eaton.com timed out)                                                                                                                                                                                                                                                                                      | Reported                              |
| Eaton EMCB                                                                     | No: tripped handle must be reset by hand                                                                                                                             | —                                                                                                                                                                                                                            | —                                                             | [IL003021EN](https://www.eaton.com/content/dam/eaton/products/electrical-circuit-protection/energy-management-circuit-breaker/emcb-installation-instructions-IL003021EN.pdf)                                                                                                                                                                                                                                        | Reported                              |
| Square D QO Powerlink (remote-operated)                                        | No GFCI version in any listing                                                                                                                                       | —                                                                                                                                                                                                                            | —                                                             | [Border States](https://www.borderstates.com/All-Products/Power-Distribution-Protection/Circuit-Protection-Devices/Circuit-Breakers-Accessories/Miniature-Circuit-Breakers/Square-D-QO%E2%84%A2-Powerlink%E2%84%A2-Plug-in-Remote-operated-Load-Shedding-Circuit-Breakers/Square-D-QO%E2%84%A2-Powerlink%E2%84%A2-Plug-in-Remote-operated-Load-Shedding-Circuit-Breakers-30-A-120-240-VAC-10-kAIC-2-Pole/p/3575865) | Reported (negative)                   |
| Leviton smart breakers                                                         | Remote off only; they "cannot turn on breakers"                                                                                                                      | —                                                                                                                                                                                                                            | —                                                             | [CleanTechnica, 2019](https://cleantechnica.com/2019/02/27/leviton-offers-smart-load-center-with-app-controlled-breakers/)                                                                                                                                                                                                                                                                                          | Reported                              |
| Woodhead (Molex), Pass & Seymour, Siemens                                      | No remote reset found; Woodhead sells manual and auto (after power return) versions                                                                                  | —                                                                                                                                                                                                                            | —                                                             | [Molex Woodhead GFCI](https://experience.molex.com/woodhead-gfci-products)                                                                                                                                                                                                                                                                                                                                          | Reported (negative)                   |
| Leviton remote test/reset patents US7440246, US8199446                         | Expired patents; no product found                                                                                                                                    | —                                                                                                                                                                                                                            | —                                                             | [Google Patents](https://patents.google.com/patent/US7440246)                                                                                                                                                                                                                                                                                                                                                       | Reported                              |

**Searched and not found:** a motor operator or remote-reset accessory for any
UL 943 DIN breaker; a DIN or inline UL 943 Class A device with a reset input.
Searches covered Allen-Bradley, Littelfuse, Bender, Eaton, Siemens, Square D,
Hubbell, Leviton, Woodhead, Pass & Seymour and Ericson. No UL 943 DIN parts
from ABB, Schneider, Siemens or Eaton turned up at all.

### 1b. What UL 943 says about reclosing

From the 3rd edition (1993, revisions to 2002), the only edition readable
([copy](http://u.dianyuan.com/bbs/u/30/1118986905.pdf); the current edition's
text is Unknown):

- **§19.2:** a GFCI that has tripped on a ground fault "shall not be capable of
  automatic reclosure."
- **§19.3:** a permanently connected GFCI that "trips because of a loss of power
  on the line side … shall be capable of automatic reclosure when power is
  restored."
- **§2.2** defines automatic reclosure as the device "resetting itself after
  having been tripped."

So the device may not reset _itself_ after a ground fault. A person pressing a
remote button is not automatic reclosure as defined (reasoning). Bender putting
reset terminals on its 2014 Class A-listed LifeGuard supports that reading
(Assumed). The power-cycle design in section 5 depends on how a device
reconciles §19.2 and §19.3 when a ground-fault trip is followed by a loss of
power. That is the bench test.

### 1c. UL 943C special-purpose GFCIs (Class C, D, E)

| Item                               | Finding                                                                                   | Conf.                                                                                                                                               |
| ---------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEC 2023 Art. 100 definition (new) | SPGFCI is for "circuits with voltage to ground greater than 150 volts"                    | Reported ([CE quote of the NEC](https://www.electricallicenserenewal.com/Electrical-Continuing-Education-Courses/NEC-Content.php?sectionID=1396.1)) |
| Use at 120 V                       | **Not applicable.** Our taps are 120 V to ground                                          | Confirmed by the definition                                                                                                                         |
| Where used                         | 2023: 680.5 (pools above 150 V to ground); 2026 adds 210.8(F) Ex. 3, 410.184(B) and 626   | Reported ([UL Code Authority](https://www.ul.com/thecodeauthority/knowledge/special-purpose-ground-fault-circuit-interrupters))                     |
| Product with remote reset          | Littelfuse SB5000/SB6100 Class C/D: no. Bender 20 mA LifeGuard: same terminals as Class A | Confirmed                                                                                                                                           |
| Price                              | Littelfuse SB5032-001-0 (208 V 32 A, Class C 20 mA): **$2,717.80**                        | Quoted ([Standard Electric](https://www.standardelectricsupply.com/Littelfuse-SB5032-001-0-SB5000-Series-Industrial-Shock-Block-208-V-32-A))        |

### 1d. UL 1053 ground-fault relays driving a contactor (equipment protection)

| Device                                 | Remote reset                                                                                                           | Lowest trip | Temperature        | Price                                                                              | Source                                                                                                                                                                                                                                                              | Conf.              |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **Littelfuse SE-704**                  | **Yes:** latched trip clears when "the remote-reset terminals (6 and 7) are momentarily connected"; autoreset mode too | **10 mA**   | −40 to 60 °C       | SE-704-0U **$1,256.54** (sale; $1,507.85 list), plus an SE-CS30 CT and a contactor | [manual](https://www.farnell.com/datasheets/2605211.pdf), [datasheet](https://www.tti.com/content/dam/ttiinc/manufacturers/littelfuse/PDF/SE-704%20Datasheet.url.pdf), [RSP Supply](https://rspsupply.com/p-565500-littelfuse-se-704-0u-earth-leakage-monitor.aspx) | Confirmed / Quoted |
| Littelfuse EL731                       | Yes: "remote N.O. input"                                                                                               | 30 mA       | −40 to 60 °C       | Unknown                                                                            | [littelfuse.com](https://littelfuse.com/products/protection-relays-and-controls/protection-relays/ground-fault-relays/el731.aspx)                                                                                                                                   | Reported           |
| Schneider Vigirex RH10P / RH21M        | RH10P: remote reset; RH21M: local only                                                                                 | 30 mA       | RH21M −35 to 70 °C | Unknown                                                                            | [Lakeland](https://shop.lakelandengineering.com/products/56230), [one-elec](https://www.one-elec.com/en/residual-current-protection-relay-vigirex-rh21m-30-ma-or-300-ma-220-240-vac-50-60-hz-din-rail-mounting-56163.html)                                          | Reported           |
| Allen-Bradley 1492-MCEA (GFEP breaker) | No accessories                                                                                                         | 30 mA       | 0–60 °C            | not checked                                                                        | [catalogue](https://support.rockwellautomation.com/cc/okcsFattachCustom/get/1092678_6)                                                                                                                                                                              | Confirmed          |

**None of these is personnel protection.** Littelfuse states "GFCI devices are
not allowed to have an adjustable trip level"; its 6 mA-capable relays are sold
as equipment ground-fault protective devices, not GFCIs (Confirmed,
[SB5000 datasheet](https://standardelectricsupply.com/userfiles/documents/2410405.pdf)).
An SE-704 at 10 mA plus a contactor would trip lower than GFPE, but it is not a
listed GFCI, so it does not meet 525.23 (reasoning from the definitions).

---

## 2. IEC RCDs and RCBOs with motorised reclose

**Bottom line:** they exist and work with a dry contact, but **none carries UL
943**. ABB's F200 range is the only one with any UL mark (UL 1053 _recognised
component_, i.e. for building into listed equipment, not field use). They are
30 mA (or 10 mA) residual-current devices: equipment protection under US rules.

| Maker / part                                                   | Control supply          | Remote input                             | Auto or remote                                  | Op. temp          | Fits 120 V 60 Hz?                   | UL                                                  | Source                                                                                                                                    | Conf.     |
| -------------------------------------------------------------- | ----------------------- | ---------------------------------------- | ----------------------------------------------- | ----------------- | ----------------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **ABB F2C-CM** motor operator (2CSF200997R0013) for F200 2P/4P | 12–30 V AC / 12–48 V DC | **Dry contacts** (close / open / common) | Remote only; waits 8 s after a trip             | −25 to +55 °C     | Yes (24 V DC)                       | None stated                                         | [ABB catalogue via IPD p. 379](https://resources.ipd.com.au/Flipbook/DIN-MCB-loadcentres/Din_prodcuts_2020/files/basic-html/page379.html) | Reported  |
| ABB F2C-ARI auto-recloser (2CSF200996R0013)                    | as F2C-CM               | Dry contacts                             | 3 automatic tries, plus remote                  | −25 to +55 °C     | Yes                                 | None                                                | [F2C-ARI sheet](https://library.e.abb.com/public/d7f3a5735e675f69c1257d4a00533521/F2C-ARI_ok.pdf)                                         | Confirmed |
| **ABB F202 A-25/0.03 110V** RCCB (2CSF202199R1250)             | —                       | —                                        | —                                               | −25 to +55 °C     | **Test button 110–254 V**, 50/60 Hz | UL 1053 recognised; trips at 0.65 × IΔn (≈ 19.5 mA) | [ABB F200 UL datasheet](https://www.farnell.com/datasheets/1898775.pdf)                                                                   | Confirmed |
| ABB F202A-16/0.01 (10 mA)                                      | —                       | —                                        | —                                               | −25 to +55 °C     | 120 V test function Unknown         | as above (≈ 6.5 mA pickup)                          | same                                                                                                                                      | Confirmed |
| **Siemens 5ST3070** remote mechanism                           | 12–30 V AC / 12–48 V DC | Not stated                               | Remote only, 2 resets/min                       | **−40 to +70 °C** | Yes                                 | None seen                                           | [datasheet (RS copy)](https://docs.rs-online.com/a285/0900766b816f9ea3.pdf)                                                               | Confirmed |
| Siemens 5ST3057 ARD                                            | as 5ST3070              | Unknown                                  | 3 automatic tries                               | −25 to +45 °C     | Yes                                 | —                                                   | [datasheet](https://docs.rs-online.com/754d/0900766b816f9e91.pdf)                                                                         | Confirmed |
| Siemens 5SV3312-6 RCCB (25 A, 30 mA, type A)                   | —                       | —                                        | —                                               | −25 to +45 °C     | **Test button min. 195 V, 50 Hz**   | —                                                   | search snippet                                                                                                                            | Reported  |
| **Legrand 406290** DX3 motor operator                          | 24–48 V AC/DC           | Pulse > 100 ms or maintained             | Remote; can reclose after an earth-leakage trip | −5 to +60 °C      | Yes                                 | —                                                   | [F01285EN](https://assets.legrand.com/pim/NP-FT-GT/F01285EN-02.pdf)                                                                       | Confirmed |
| Doepke DFA 3 024DC-3 (for DFS RCCBs)                           | 24 V DC                 | 24 V input, ≥ 60 ms pulse                | Remote, or 3 tries                              | −5 to +60 °C      | Yes (supply)                        | EN 63024                                            | [Doepke datasheet](https://www.doepke.de/uploads/tx_doepkeproducts/datenblatt/doepke_09100143_dbl_en.pdf)                                 | Confirmed |
| Gewiss ReStart Autotest PRO GW90913                            | 230 V **50 Hz**         | Potential-free contact                   | Auto plus remote                                | −25 to +60 °C     | **No**                              | IEC only                                            | [Gewiss datasheet](https://www.gewiss.com/services/gewiss/productImage/GW90913/pdf/018/en/0)                                              | Confirmed |
| Schneider Acti9 RCA A9C70122 / ARA A9C70342                    | 230 V AC                | Ti24 (RCA)                               | Remote (RCA) / auto (ARA)                       | ARA −25 to +60 °C | **No** (230 V supply)               | —                                                   | [plc-direct](https://plc-direct.com/products/a9c70122)                                                                                    | Reported  |
| Eaton Z-FW-LP                                                  | 220–240 V AC            | Remote test + restart                    | Auto                                            | max +40 °C        | **No**                              | —                                                   | [Eaton](https://www.eaton.com/ch/de-de/skuPage.248296.html)                                                                               | Reported  |
| Hager CDA… auto-reclose RCCB, Legrand Stop&Go 406288           | 230 V                   | none found                               | Auto                                            | —                 | **No**                              | —                                                   | [hager.com](https://hager.com/sg/catalogue/products/cda440sp-rccb-auto-reclos-3p-n-40a-30ma-a-7m-pro)                                     | Reported  |

**Prices** (all Quoted\*: retailer pages blocked reading)

| Item                        | Retailer                      | Price                      | URL                                                                                                                                                 |
| --------------------------- | ----------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ABB F202 A-25/0.03 110V     | RS Belgium                    | €166.64 (≈ $192)           | [link](https://befr.rs-online.com/web/p/rccbs/1775063)                                                                                              |
| ABB F202A-16/0.01 (10 mA)   | Gerrie (US)                   | $762.28                    | [link](https://www.gerrie.com/Product/ABB-F202A-16-0-01)                                                                                            |
| ABB F2C-CM                  | RS UK / Motors & Control (US) | £272.11 (≈ $362) / $999.85 | [RS](https://uk.rs-online.com/web/p/motor-protection/2256086), [M&C](https://motorsandcontrol.com/abb-f2c-cm-rcd-motor-op-device-2p-4p)             |
| Siemens 5ST3070             | RS UK                         | £709.74 (≈ $944)           | [link](https://uk.rs-online.com/web/p/circuit-breaker-accessories/1875160)                                                                          |
| Legrand 406290              | prof-elec / Legrand NL list   | €142.67 / €372.81          | [prof-elec](https://prof-elec.com/406290-en), [Legrand NL](https://legrand.nl/nl/catalogus/modulaire-motorbediening-dx3-2448vacvdc-1-module-406290) |
| ABB SU201M-K15 MCB (UL 489) | Standard Electric (US)        | $36.11 (**Quoted**)        | [link](https://www.standardelectricsupply.com/ABB-SU201M-K15-Miniature-Circuit-Breaker)                                                             |

**Best IEC set, if it were used:** ABB F202 A-25/0.03 110V + F2C-CM + SU201M-K15,
**about $590 a segment on EU pricing, about $1,240 on US retail**. Its parts top
out at +55 °C, below a sun-loaded box interior.

**Is it defensible in the US? Not as the segment's ground-fault protection.**

- 525.23 calls for GFCI, and a GFCI is a listed Class A device. A 30 mA RCD is
  not one; even the 10 mA ABB isn't UL 943 (Confirmed by the definitions and
  ABB's own UL datasheet).
- As _additional_ protection behind a Class A GFCI it is legal but pointless:
  the 5 mA GFCI trips first on nearly every fault, and that is the device that
  then needs resetting (reasoning).
- Any IEC-only part also needs approval under NEC 110.2: a field evaluation
  (NFPA 791) or a UL 508A panel built from recognised components, with the
  AHJ's written acceptance (Assumed). Mike Holt forum posters disagree on
  whether an AHJ could accept IEC devices as Class A
  ([thread](https://forums.mikeholt.com/threads/range-tripping-gfci-210-8-555-53.2582546/page-6),
  Reported, opinion only).
- Doepke notes that unattended automatic restart is only acceptable where only
  trained electricians have access
  ([Doepke](https://www.doepke.de/uploads/tx_doepkeproducts/datenblatt/doepke_09100143_dbl_en.pdf),
  Confirmed). That favours human-triggered reset over auto-reclose in any design.

---

## 3. The network-side actuator

**Two facts shape the choice** (both Confirmed):

- The **USW-Ultra is itself rated only to 60 °C**
  ([techspecs](https://techspecs.ui.com/unifi/switching/usw-ultra)), so the relay
  is not the weakest part in the node box if it reaches 60 °C or more.
- **54 V is above every relay module's DC input range.** The simplest feed is PoE
  from a spare Ultra PoE+ port (802.3af/at), which every pick below accepts.

| Product                                    | Op. temp                                                   | Power                                  | Relay                                                        | Inputs                                       | Local API                                             | DIN           | Price                                                                       | Source                                                                                                                                                                                                                                                                                     | Conf.                                                       |
| ------------------------------------------ | ---------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- | ----------------------------------------------------- | ------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **ICP DAS tPET-PD2R1**                     | **−25 to 75 °C** (relay endurance specified at 75 °C)      | **PoE 802.3af Class 1**, or 12–48 V DC | 1 × Form A, 5 A at 30 V DC                                   | **2 dry-contact** (no wetting supply needed) | Modbus TCP/UDP, web UI; MQTT per ICP DAS Europe       | Yes           | **€101** (≈ $116), about 10 days; CHF 106 at Spectra. **No US price found** | [ICP DAS Europe](https://icpdas-europe.com/en/Remote-I-O-Module/ModbusTCP/tPET-PD2R1-CR); [datasheet (Spectra mirror)](https://icpdas.spectra.de/media/e8/53/0b/1654157290/datasheet-tET-P2R2_tET-PD2R1.pdf)                                                                               | Confirmed / Quoted                                          |
| ICP DAS PET-7060                           | −25 to 75 °C                                               | PoE 802.3af, or 12–48 V DC             | 6 × Form A, 5 A                                              | 6 wet (10–50 V)                              | Modbus TCP/UDP                                        | Yes           | €139                                                                        | [Spectra](https://icpdas.spectra.de/en/PET-7060-CR-ModbusTCP-I-O-Module), [datasheet](https://icpdas.spectra.de/media/0e/ab/bd/1633597250/Datasheet-ET-7x60_PET-7x60.pdf)                                                                                                                  | Confirmed / Quoted\*                                        |
| **ControlByWeb X-401-E**                   | **−40 to 65.5 °C**                                         | PoE Class 1, or 9–28 V DC              | 2 × SPDT, 3 A at 24 V DC; **built-in pulse mode** from 0.1 s | 2 isolated, 4–26 V DC **wet**                | HTTP/REST/XML, Modbus TCP, MQTT, SNMP; cloud optional | Reported      | $329.99 (Mouser) – **$366.49** (DigiKey); maker lists $299.99–389.99        | [CBW](https://controlbyweb.com/x401/), [DigiKey](https://www.digikey.com/en/products/detail/controlbyweb/X-401-E/13414899)                                                                                                                                                                 | Confirmed / Quoted\*                                        |
| CBW WebRelay X-WR-441-E                    | −40 to 65.5 °C                                             | PoE, or 9–28 V DC                      | 1 × SPDT 12 A                                                | 1 wet                                        | as X-401                                              | Not stated    | $261.49                                                                     | [DigiKey](https://www.digikey.com/en/products/detail/controlbyweb/X-WR-441-E/25576603)                                                                                                                                                                                                     | Confirmed / Quoted\*                                        |
| Moxa ioLogik E1214-T                       | −40 to 75 °C                                               | 12–36 V DC, **no PoE**                 | 6 × Form A, 5 A                                              | 6                                            | Modbus TCP, REST                                      | Yes           | $593                                                                        | [Moxa](https://www.moxa.com/en/products/industrial-edge-connectivity/controllers-and-ios/universal-controllers-and-i-os/iologik-e1200-series), [DigiKey](https://www.digikey.com.mx/en/products/detail/moxa/ioLogik-E1214-T/17881669)                                                      | Confirmed / Quoted\*                                        |
| Advantech ADAM-6060-D1                     | −40 to 70 °C                                               | 10–30 V DC, no PoE                     | 6 × Form A, 1 A                                              | 6 dry/wet                                    | Modbus TCP, REST, MQTT                                | Yes           | $230.15 (0 in stock)                                                        | [datasheet copy](https://www.digimax.it/media_import/INDUSTRIAL%20PC/ADVANTECH/SCHEDE%20E%20MODULI%20REMOTI%20PER%20ACQUISIZIONE%20DATI/ADAM-6060/ADAM-6060_DS_001.pdf), [TME](https://www.tme.com/us/en-us/katalog/i-o-systems-and-modules_118409/params/b10_mounting/p1436551_on-panel/) | Confirmed / Quoted\*                                        |
| Waveshare Modbus POE ETH Relay (B) (cheap) | −15 to 70 °C (wiki, not a datasheet)                       | PoE 802.3af, or 7–36 V DC              | 8 × SPDT 10 A                                                | 8 dry/wet                                    | Modbus TCP, MQTT, HTTP                                | Rail ABS case | **$46.99**                                                                  | [Waveshare](https://www.waveshare.com/modbus-poe-eth-relay-b.htm), [wiki](<https://www.waveshare.com/wiki/Modbus_POE_ETH_Relay_(B)>)                                                                                                                                                       | Reported / Quoted                                           |
| Opto 22 groov RIO MM1001                   | −20 to 70 °C                                               | PoE, or 10–32 V DC                     | 2 × Form C                                                   | 8                                            | REST, MQTT, Modbus                                    | Panel         | $1,245                                                                      | [Opto 22](https://www.opto22.com/products/grv-r7-mm1001-10)                                                                                                                                                                                                                                | Confirmed / Quoted. Overkill                                |
| Shelly Pro / Plus Uni                      | **−20 to 40 °C**                                           | Pro: 110–240 V AC                      | —                                                            | —                                            | local RPC                                             | —             | —                                                                           | [Shelly Pro 1](https://shelly.com/products/shelly-pro-1)                                                                                                                                                                                                                                   | Confirmed. **Ruled out**                                    |
| Ubiquiti USL-Relay                         | **0 to 40 °C**; wireless SuperLink via Protect, no LAN API | —                                      | —                                                            | —                                            | —                                                     | —             | $39                                                                         | [techspecs](https://techspecs.ui.com/unifi/physical-security/usl-relay)                                                                                                                                                                                                                    | Confirmed. **Ruled out**; no wired UniFi relay or I/O found |

**Picks:**

1. **ICP DAS tPET-PD2R1:** highest temperature rating for the money, PoE from
   one Ultra port, dry-contact inputs read the trip-sense contact directly, 5 A
   relay on DIN. Caveats: a search snippet said the ICP DAS page marks it "phased
   out" (icpdas.com returned HTTP 500; EU resellers show no notice: Reported),
   and no US price. Fallbacks: tPET-P2R2 or PET-7060 (same temperature range).
2. **ControlByWeb X-401-E:** US stock, REST, a built-in pulse mode (so a dropped
   network mid-command can't leave the reset relay held), 2 relays + 2 inputs.
   Caveats: 65.5 °C leaves little margin; the inputs need wetting (the 24 V
   supply in the power box can provide it over the control cable).

**Using the UniFi API to switch a PoE port as the trigger** (a PoE-powered relay
such as the Tycon TPDIN-POE-RELAY, $82.95 Quoted\*, closes whenever PoE is on)
is possible through unofficial controller endpoints, but slow, version-dependent,
and prone to false triggers on switch reboot or re-adoption, with no status
input (Reported / reasoning). **Not recommended.**

---

## 4. Keeping the network alive through a trip: is a line-side supply allowed?

The proposal in `plans/power.md` 2a puts the SDR-240-48 (switch + relay) on its
own breaker on the line side of the segment GFCI, not GFCI-protected.

### 4a. The code

| Section              | Finding                                                                                                                                                                                                                                                                                                                                          | Conf.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **525.23(A)**        | GFCI required for (1) 125 V 15/20 A non-locking receptacles used for assembly or readily accessible to the public, and (2) "**Equipment** that is readily accessible to the general public and supplied from a 125-volt [120 V in 2020], single-phase, 15- or 20-ampere branch circuit." 2020 adds "in addition to the requirements of 210.8(B)" | Reported: 2017 text via [Mike Holt forum (NFPA SR 4208)](https://forums.mikeholt.com/threads/nec-2017-525-23-d.139761/), 2008 text via [Las Vegas guideline](https://files.lasvegasnevada.gov/building-safety/NEC-Requirement-Applicable-to-Special-Events.pdf), 2020 via [EC&M Q&A](https://www.ecmweb.com/national-electrical-code/qa/article/21246467/code-qa-gfci-protection-requirements-at-carnivals-circuses-and-fairs). **2023 wording not read verbatim** (UpCodes/NFPA need login); renumbered 525.24 in 2026 |
| Hard-wired equipment | Covered: (A)(2) "applies even if the equipment is not cord and plug connected" (Mike Holt)                                                                                                                                                                                                                                                       | Reported ([EC&M](https://www.ecmweb.com/national-electrical-code/code-basics/article/20888369/applying-article-525-in-amusement-venues))                                                                                                                                                                                                                                                                                                                                                                                |
| 525.23(B), (C), (D)  | (B) locking receptacles not accessible from grade, used only for quick disconnect: exempt. (C) egress lighting must not be GFCI-protected. (D) GFCIs on flexible-cord circuits must be listed for portable use                                                                                                                                   | Reported                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| "Readily accessible" | Reachable without tools, climbing, or ladders ([EC&M](https://www.ecmweb.com/national-electrical-code/article/20902830/code-qa-readily-accessible)). A sealed box up in the truss arguably isn't; but the art is built to be touched and climbed, and the box and truss are what people touch                                                    | Reported / Assumed: most inspectors would treat it as accessible                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **590.6**            | Scoped to temporary power "during construction, remodeling, maintenance, repair, or demolition", and written around receptacles. The public input behind 525.23(D) says 590.6 "cannot be applied to carnivals and fairs"                                                                                                                         | Reported ([EC&M](https://www.ecmweb.com/national-electrical-code/code-basics/article/21249811/temporary-installations); [PI 2558 via forum](https://forums.mikeholt.com/threads/nec-2017-525-23-d.139761/))                                                                                                                                                                                                                                                                                                             |
| 210.8                | 2023 uses "listed Class A GFCI" throughout. 210.8(B) outdoors covers receptacles only; 210.8(F) is dwellings only                                                                                                                                                                                                                                | Reported ([Mike Holt 2023 changes](https://www.mikeholt.com/files/PDF/23_CC_210.8.pdf))                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Burning Man / BLM    | No GFCI or electrical rule for art found. The Electrical Safety page is guidance only; 2026 BLM stipulations don't mention electrical work. "It is the artist's responsibility to assure the safety of the art structure." Other festivals with a county inspector would likely apply Art. 525                                                   | Confirmed ([Electrical Safety](https://burningman.org/black-rock-city/preparation/camping-tips/electrical-safety/), [BLM stipulations 2026](https://burningman.org/wp-content/uploads/2026/08/Stipulations_2026_20260727.pdf), [Building Safe Structures](https://burningman.org/event/participate/art-performance/playa-art/art-installation-guidelines/building-safe-structures/))                                                                                                                                    |

### 4b. Verdict: marginal, so don't

- **On paper** it only works through two arguments an inspector may reject: the
  SDR breaker is rated below 15 A, so it is outside "15- or 20-ampere branch
  circuit"; and the boxes aren't "readily accessible" (reasoning).
- **On safety it is weak.** The SDR-240 is a Class I metal-case supply. A
  primary-to-case fault energises the box and the truss people touch, which is
  exactly what a GFCI is for (reasoning).
- **Better: give the network supply its own Class A GFCI.** Each GFCI senses only
  its own circuit's hot and neutral, so a pixel-side fault never trips the
  network GFCI (reasoning). Everything at 120 V stays protected, and an
  inspector has nothing to argue about. The network is lost only if its own
  circuit faults, which is the sealed SDR, not the wet pixel side.

### 4c. Alternatives considered

| Option                                               | Parts                                                                                                                         | Price                     | Verdict                                                                                                                                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **a. Second Class A GFCI for the SDR** (recommended) | Ericson 1075-AR (hard-wired leads, −35 to 66 °C)                                                                              | $58.56                    | **Use this.** Auto power-up, so the network returns by itself after a generator restart                                                                                                              |
|                                                      | Leviton GFNT2-DIN (DIN GFCI receptacle, 20 A, Class A 5 ± 1 mA, UL 943, −35 to 66 °C; feed-through load terminals not stated) | $97.11 (6-pack) – $126.07 | Alternative; [Standard Electric](https://www.standardelectricsupply.com/LEVITON-GFNT2-DIN-GFCI-Receptacle), [Leviton](https://leviton.com/products.gfnt2-din). Confirmed / Quoted                    |
|                                                      | ASI NDB1L-32C (DIN, 30 mA, UL 1053)                                                                                           | $27.26                    | **No:** equipment protection, not Class A                                                                                                                                                            |
| b. DC buffer or UPS                                  | PULS UC10.241 supercap, −40 to 60 °C, 200 s at 1 A                                                                            | $1,012.50                 | **No.** A tripped GFCI stays tripped; minutes of hold-up don't wait for a human. [datasheet](<https://rspsupply.com/images/downloads/Puls/U/Puls%20UC10-242/Datasheet(1MB).pdf>), Confirmed / Quoted |
|                                                      | Mean Well DRC-100B (27.6 V, charges lead-acid), −30 to 70 °C                                                                  | $67.91 + battery          | **No.** Hours need a battery, and lead-acid (Yuasa NP: −15 to 50 °C) is at its limit in a sun-loaded box. Reported / Quoted                                                                          |
| c. Relay powered by a neighbour's PoE                | A short cable from segment N−1's spare PoE port to segment N's relay                                                          | about $0 in parts         | **Optional.** Works (PoE is isolated) and survives a fault on N's own network circuit, but needs an extra cable across each joint, and a shared cause (rain) can trip both neighbours (Assumed)      |

---

## 5. Recommended design

### 5a. Wiring, per segment

```text
POWER BOX (sealed, 120 V)                                NODE BOX (DC and data only)

trunk tap ──┬── 15 A breaker ── [K1 NC, hot] ─┐
 (L, N)     │                  [K1 NC, neut] ─┴─ GFCI-P (1075-AR) ── pixel supplies
            │                                         │
            │                                   K2 (120 V coil) ── trip-sense contact ──► relay DI
            │
            └── 6 A breaker ── GFCI-N (1075-AR) ── SDR-240-48 ── 54 V ──► USW-Ultra
                                       │                                    │ PoE port
                                  HDR-15-24 (24 V) ── K1 coil ◄── dry contact ── tPET-PD2R1
```

- **K1** is a 2-pole relay with **normally closed** contacts in both the hot and
  the neutral, upstream of the pixel GFCI. De-energised means power on, so a
  dead network relay or cable never darkens the lights.
- **Reset:** the operator presses "reset segment 7" in the Empyrean app. The app
  closes the network relay for about 2 s; K1 opens and recloses; the pixel GFCI
  sees a loss of power and re-arms (auto power-up). If the fault is still there,
  it trips again within 25 ms.
- **Status:** K2, a small 120 V-coil interface relay on the pixel GFCI's load
  side, closes a dry contact into the network relay's input while the circuit is
  live. The app shows which segment tripped.
- **Network circuit:** its own small breaker and its own Class A GFCI (section
  4). The HDR-15-24 for K1's coil hangs off it, so the reset path survives a
  pixel-side trip.
- **K1 doesn't see the pixel inrush (reasoning).** It recloses into a GFCI that
  is still open; the GFCI's own contacts then make into the supplies' inrush.
- Only 24 V (Class 2) and dry-contact signals cross to the node box, on one
  4-core control cable: coil loop, and trip sense. AC stays in the power box,
  per `docs/requirements.md`.
- **Operating rule (reasoning):** reset only with eyes on the segment (a person
  or a camera), and no more than two tries before someone walks over. Reset into
  a fault that's still there re-trips in under 25 ms, but the person the fault
  may be passing through is the reason for the GFCI.

### 5b. The bench test that decides it

**Does the Ericson 1075-AR (or the Leviton GSIA2) re-arm when its supply is
cycled after a ground-fault trip?** Unknown. UL 943 §19.2 forbids reclosing by
itself after a ground fault; §19.3 requires reclosing after a power loss; no
datasheet says which wins when one follows the other.

Test: trip a 1075-AR with a 7–10 mA resistor from load hot to ground (or its
TEST button), open K1 for 2 s, close it, and see whether power returns. Repeat
with the GSIA2. Bench parts cost about $150–250 (two 1075-ARs, one K1 and
socket, one HDR-15-24), Estimate.

- **If it re-arms:** use 5a as drawn.
- **If it remembers the trip: spare-GFCI changeover.** Fit **two** pixel GFCIs
  (P-A and P-B), both fed from the 15 A breaker. K1 becomes a **changeover**:
  its NC contacts (hot and neutral) connect P-A's load to the supplies, its NO
  contacts connect P-B's. Energising K1 moves the load to the fresh GFCI.
  Switching the neutral too keeps the two GFCIs' neutrals from being paralleled
  (reasoning). That gives **one remote recovery per segment between visits**,
  and K1 stays energised until someone resets P-A by hand. In this variant K1
  does make into the supplies' inrush, so check its capacitive-load rating.
  The same Finder 2CO relay serves both variants, so the choice can be made
  after the bench test without changing the bill of materials beyond the
  second GFCI.
- **If the AHJ insists on a single device with a reset input:** Bender LifeGuard
  (section 1). It needs Bender to confirm a current UL 943 listing, the
  temperature rating, the reset input type and a price. **Asking Bender for a
  quote needs your go-ahead.**

### 5c. Parts, per segment

| #   | Part                                                              | Maker / MPN                                                     | Key spec                                                                 | Price low / high  | Source                                                                                                                                                                                                    | Conf.                                            |
| --- | ----------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| R1  | Pixel GFCI, Class A, auto power-up                                | **Ericson 1075-AR**                                             | UL 943, 20 A, 4–6 mA, −35 to 66 °C                                       | $58.56 / $70.27   | [RSP Supply](https://rspsupply.com/p-583935-ericson-1075-ar-panel-mount-gfci-20-amp-2400-watts-1-ft-cable-nema-3r.aspx), [spec](https://www.homelectrical.com/sites/default/files/ERC-1075ARKIT-SPEC.pdf) | Quoted / Confirmed                               |
| R2  | Network GFCI, Class A                                             | Ericson 1075-AR (low) or Leviton GFNT2-DIN (high)               | as above / −35 to 66 °C                                                  | $58.56 / $126.07  | as R1; [Standard Electric](https://www.standardelectricsupply.com/LEVITON-GFNT2-DIN-GFCI-Receptacle)                                                                                                      | Quoted / Quoted\*                                |
| R3  | Network-circuit breaker, small UL 489 DIN                         | ABB SU201M-K… or Eaton FAZ-C… (2–6 A)                           | Calibrated at 40 °C (Eaton)                                              | $36.11 / $40.00   | [Standard Electric SU201M-K15](https://www.standardelectricsupply.com/ABB-SU201M-K15-Miniature-Circuit-Breaker); FAZ from `pricing-2026-10.md` P11                                                        | Quoted (15 A shown; small sizes Assumed similar) |
| R4  | K1 reset relay, 2 CO 16 A, 24 V DC coil, plug-in, plus DIN socket | **Finder 62.32.9.024** + socket (not chosen)                    | −40 to +70 °C (NHP listing for the 62.32 2CO 24 V DC); UL status Unknown | $37 / $60         | relay £20.09 at [RS UK](https://uk.rs-online.com/web/p/power-relays/2482541) (Quoted\*); [NHP](https://www.nhp.com.au/product/623280244040) (Reported); socket Estimate                                   | Quoted\* / Estimate                              |
| R5  | 24 V supply for K1's coil                                         | Mean Well HDR-15-24                                             | 15 W DIN; temperature derating not checked                               | $12.50 / $12.72   | aggregator [electronicsdatasheets.com](https://www.electronicsdatasheets.com/parts/mean-well/HDR-15-24)                                                                                                   | Quoted\*                                         |
| R6  | K2 trip-sense interface relay, 120 V coil                         | e.g. Finder 38.51 class (not chosen)                            | —                                                                        | $15 / $30         | —                                                                                                                                                                                                         | Estimate                                         |
| R7  | Network relay                                                     | **ICP DAS tPET-PD2R1** (low) or **ControlByWeb X-401-E** (high) | 75 °C / 65.5 °C; PoE                                                     | $116 / $366.49    | section 3                                                                                                                                                                                                 | Quoted / Quoted\*                                |
| R8  | Control cable (4-core), glands, ferrules                          | —                                                               | —                                                                        | $10 / $25         | —                                                                                                                                                                                                         | Estimate                                         |
|     | **Per segment, power-cycle design**                               |                                                                 |                                                                          | **$344 / $731**   |                                                                                                                                                                                                           |                                                  |
| R9  | Spare-GFCI variant: second pixel GFCI                             | Ericson 1075-AR                                                 |                                                                          | +$58.56 / +$70.27 | as R1                                                                                                                                                                                                     | Quoted                                           |
|     | **Per segment, spare-GFCI variant**                               |                                                                 |                                                                          | **$402 / $801**   |                                                                                                                                                                                                           |                                                  |

Not used: the ABB ESB20-02N-01 2NC 24 V installation contactor (£55.72 at
[RS UK](https://uk.rs-online.com/web/p/contactors/2111478), $294.99 at
[RSP Supply](https://rspsupply.com/p-116887-abb-esb20-02n-01-installation-contactor-nc-20-a-0-no-2-nc-24-v-control-circuit-dc.aspx),
Quoted\*) is a neater DIN part for K1 in the power-cycle design, but its family
is rated **−25 to +55 °C** (RS listings, Reported), below a hot box.

---

## 6. Cost for the ring (16 segments + 1 spare)

| Design                                                                        | Per segment | × 17              | Conf.                                   |
| ----------------------------------------------------------------------------- | ----------- | ----------------- | --------------------------------------- |
| **Power-cycle reset** (recommended, if the bench test passes)                 | $344–731    | **$5,846–12,419** | Quoted / Quoted\* / Estimate mix        |
| **Spare-GFCI changeover** (fallback)                                          | $402–801    | **$6,841–13,614** | same                                    |
| IEC RCCB + motor operator (ABB F202 110V + F2C-CM + MCB), for comparison only | $590–1,240  | $10,000–21,100    | Quoted\* (not Class A; not recommended) |
| UL 1053 relay (SE-704) + CT + contactor, for comparison only                  | over $1,300 | over $22,000      | Quoted + Estimate (not Class A)         |
| Bender LifeGuard                                                              | Unknown     | Unknown           | No public price                         |

- **Net change to the power budget:** these designs replace the "Per-segment
  GFCI" line in `docs/pricing-power-feed-2026-10.md` §8 ($727–4,938 for 17). Net
  addition: about **$5.1–7.5K** (power-cycle) or **$6.1–8.7K** (spare-GFCI).
- **What drives the range:** the network relay ($116 vs $366) and the second
  GFCI ($59 vs $126). On EU-sourced tPET relays and Ericson GFCIs throughout,
  the ring is about $5.8K.
- The existing 15 A breaker (FAZ, P11) and the SDR-240-48 are already budgeted
  elsewhere and are not counted here.

---

## Assumptions

1. Load per segment is at most 564 W (4.7 A) at 120 V (`pricing-power-feed-2026-10.md`
   §2), well inside the 1075-AR's 20 A and K1's 16 A.
2. The USW-Ultra has a spare PoE+ port to power the network relay (it has 4 spare
   per `plans/networking.md`).
3. Currency conversions at 1 EUR ≈ 1.15 USD and 1 GBP ≈ 1.33 USD (not checked).
4. Art. 525 is the governing article for a festival art installation ("similar
   functions"); not confirmed with any AHJ.
5. The 525.23 wording is the 2017/2020 text; 2023 changes, if any, not read.

## Could not verify

- **Whether an auto power-up Class A GFCI re-arms after a ground-fault trip when
  its supply is cycled** (1075-AR, GSIA2). This decides between the two designs.
- **Whether AHJs accept a remote, human-triggered reset** of personnel
  protection. UL 943's text forbids only _automatic_ reclosure after a fault.
- **Bender LifeGuard:** current UL 943 listing (vs UL 508A panel only),
  operating temperature, reset input type, price, availability of the Compact.
- **ICP DAS tPET-PD2R1:** whether it is phased out; any US distributor price;
  whether its outputs support a timed pulse or a host-watchdog safe state (so a
  dropped connection can't hold K1 open).
- **Finder 62.32:** UL recognition, the exact order code for the 24 V DC 2CO
  variant, and its capacitive-inrush rating (matters for the spare-GFCI
  variant). HDR-15-24 derating above 50 °C.
- **Box interiors:** every part here is rated 55–75 °C (1075-AR 66 °C, GFNT2-DIN
  66 °C, tPET 75 °C, X-401 65.5 °C, USW-Ultra 60 °C). The logged box
  temperature in `plans/weatherproofing.md` decides whether that is enough.
- **The generator's own L14-30R GFCI**, if any: two 5 mA devices in series give
  no selectivity, so a pixel fault could trip the generator and take down the
  whole ring, network included (carried over from the power-feed file).
- Prices marked Quoted\*: RS, DigiKey, Mouser and several US distributors
  blocked automated reading.
