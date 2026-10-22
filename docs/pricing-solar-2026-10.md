# Solar power for the Gate: sizing and pricing, October 2026

This file researches the stretch goal in `plans/solar.md`: **a full solar power
system for the Gate, possibly big enough to run the dance floor's speakers too**
(user, 2026-10-21). It sizes the system from an hourly simulation of a 10-day
event, prices three options, and lists what the owner must answer before any of
it can be firmed up.

The power design it plugs into is in `plans/power.md`: **one 120/240 V
split-phase feed into an L14-30 twist-lock** (30 A; a 50 A CS-series feed is
being compared in `docs/pricing-feed-options-2026-10.md`). Solar only has to
deliver 120/240 V into that connector, and the Gate can't tell it from a
generator.

**Method.** Specs and prices were checked on **2026-10-21** by read-only
browsing. Nothing was ordered, carted or quoted, and no vendor was contacted.
The solar resource is NREL's (now NLR's) **PVWatts v8** API for Black Rock City
(40.786 N, 119.206 W), hourly, TMY-2020. The sizing is my own hourly simulation
on that data (section 3). The web-search budget for the session ran out before
the balance-of-system parts and the enclosure cooling could be priced, so those
lines are Estimates and are marked so. All prices are USD before tax and
shipping. Ring geometry in feet, everything else metric and °C.

**Confidence key** (same as `docs/pricing-power-feed-2026-10.md`)

| Mark          | Meaning                                                            |
| ------------- | ------------------------------------------------------------------ |
| **Quoted**    | Price seen today on the distributor or maker page at the URL given |
| **Quoted\***  | Price seen only in a search snippet or aggregator. Recheck it      |
| **Estimate**  | A range from comparable parts, or no price found                   |
| **Confirmed** | Spec read in a manufacturer datasheet or an official page          |
| **Reported**  | From the user, a retailer, an article, a forum or a snippet        |
| **Assumed**   | Depends on an unchecked fact; the assumption is named              |
| **Unknown**   | Looked for and not found, or not yet measured                      |

Anything marked **(reasoning)** is my inference, not a cited fact.

---

## Summary

- **The Gate alone needs about 19–30 kWh a day**, about 16–23 kWh of it after dark
  (Assumed loads built on the user's measured 1.5–2 kW average; section 1).
  **Speakers add about 8 kWh a night for every 1 kW they average over 8 hours**
  (their draw is Unknown).
- **The playa has excellent sun for the event.** PVWatts gives **6.9 kWh per kW of
  panels per day** (DC, 20° tilt, late August to early September, cell heat
  included) before dust and wiring losses. The worst day in the typical year is
  about two-thirds of a good one. The night is about 10.5–11 h long.
- **The battery, not the array, is the big cost.** The battery has to carry the
  whole night plus a margin for a dust-storm day. The array refills it in one
  good day. A larger battery lets the array shrink (section 3c).
- **The inverter must make 120/240 V split-phase and feed an L14-30R.**
  Off-grid hybrid inverters do this natively.
  - **Pick: the EG4 18kPV** ($4,000, NEMA 4X, 12 kW, 50 A, generator
    auto-start). It covers the L14-30's full 7.2 kVA with room for about 2 kW of
    speakers on their own outlet.
  - **4 kW of speakers, or the 50 A Gate feed, needs a second unit in
    parallel** (sections 4a and 5).
- **Heat is the main hazard.** LiFePO4 stops charging at about 50–55 °C cell
  temperature (EG4 datasheets), and a sealed box in the sun gets hotter than
  that. The battery and inverter need shade, insulation and active cooling. That
  cooling uses about 3 kWh a day, and the sizing includes it.

### Options

| Option                                             | What it runs                                                                 | Array                        | Battery                   | Inverter              | Cost, before 15 % contingency                                     | Generator                                                                                                                |
| -------------------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------- | ------------------------- | --------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **A. Gate only**                                   | The Gate, every night, with margin for a dust day and for the high load case | **12 kW** (about 26 × 460 W) | **57 kWh** (4 × 14.3 kWh) | 1 × 12 kW split-phase | **$25,000–44,000**                                                | None                                                                                                                     |
| **B. Gate + speakers** (2 kW average, 8 h a night) | The Gate plus the sound system                                               | **18 kW** (about 40 × 460 W) | **86 kWh** (6 × 14.3 kWh) | 1–2 × 12 kW           | **$35,000–66,000**                                                | None                                                                                                                     |
| **C. Hybrid** (recommended)                        | A's hardware plus a small auto-start generator as backup                     | 12 kW                        | 57 kWh                    | 1 × 12 kW             | **$25,000–50,000** (A plus $0–5,900 for a generator and its cord) | The Gate alone: none in a typical year. Plus 2 kW speakers: 0–22 generator hours in 10 days (0–7 h at the Gate-mid load) |
| C-small (budget hybrid)                            | The Gate, with the generator covering bad nights                             | 8 kW                         | 29 kWh (2 × 14.3)         | 1 × 8–12 kW           | **$15,000–35,000**                                                | 0–19 h in 10 days                                                                                                        |
| Turnkey trailer (for comparison)                   | SunWing Gecko-15: 5.6 kW PV, 41 kWh, 8 kW                                    | 5.6 kW                       | 41 kWh                    | 8 kW                  | $65,000 (Quoted, listing)                                         | Too small to run the Gate alone through a dust day                                                                       |

(Totals are built from section 6. The site adds its 15 % contingency on top.)

**Recommendation: Option C.**

- **It is Option A's hardware, plus a small generator.** A sized for the Gate
  runs the Gate on sun alone in a typical year. The generator only bridges a dust
  storm or a loud night.
- **It covers the speakers for little extra.** On top of A, 2 kW of speakers
  needs only a few generator hours in 10 days (section 3d).
- **B mostly buys insurance for rare nights.** B buys 50 % more panels and
  battery to avoid those few generator hours. That only pays if a generator
  must be ruled out entirely.
- **Measure first.** Put an energy meter on the Gate's feed for one night before
  buying anything. Every number here scales from the Reported 1.5–2 kW average
  and an Assumed electronics load.

---

## 1. Energy budget

### 1a. Loads

| Load                                                       | Value                                                                   | Confidence                                 | Source                                                                                    |
| ---------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Whole Gate while lit, average                              | **1.5–2.0 kW**                                                          | Reported 2026-10-21                        | User (measured); `plans/power.md`                                                         |
| Lit hours                                                  | 8 PM–6 AM PDT, **10 h** (high case 7 PM–6 AM, 11 h)                     | Assumed                                    | Brief; sunset/sunrise below. People are still at the Gate at 5 am (`docs/v1-hardware.md`) |
| Electronics all day (switches, PixLites, show PC, gateway) | **300–600 W** around the clock                                          | **Assumed**                                | Not measured. Included in the 1.5–2.0 kW at night (Assumed)                               |
| Pixels' estimated max                                      | about 9.6 kVA (80 A at 120 V)                                           | Reported                                   | `EG AC Power.pdf`; "never really reached" (user)                                          |
| Feed ceiling                                               | L14-30: 7.2 kVA, **5.76 kVA continuous**                                | Confirmed (rating)                         | `plans/power.md`                                                                          |
| Speakers, average over the hours played                    | **1–4 kW** (2 kW mid)                                                   | **Unknown** (range assumed)                | Brief                                                                                     |
| Speaker hours                                              | 9 PM–5 AM PDT, **8 h**                                                  | Assumed                                    |                                                                                           |
| Inverter self-consumption                                  | 60–150 W around the clock in the sizing; the EG4 18kPV draws about 70 W | Confirmed (18kPV datasheet); range Assumed | Section 4a                                                                                |
| Battery-enclosure cooling                                  | about 0.4 kW, 11 AM–7 PM                                                | Assumed                                    | Section 4e                                                                                |

### 1b. Daily energy

AC energy at the Gate's plug (section 3 adds conversion losses on top):

| Case                     | Lit (kW × h) | Day (kW × h) | Speakers | **AC kWh/day** | of which 7 PM–7 AM | Plus idle + cooling (DC) |
| ------------------------ | ------------ | ------------ | -------- | -------------- | ------------------ | ------------------------ |
| Gate low                 | 1.5 × 10     | 0.30 × 14    | —        | **19.2**       | 15.6               | 4.6                      |
| Gate mid                 | 1.75 × 10    | 0.45 × 14    | —        | **23.8**       | 18.4               | 5.1                      |
| Gate high                | 2.0 × 11     | 0.60 × 13    | —        | **29.8**       | 22.6               | 5.6                      |
| Gate mid + speakers 1 kW |              |              | 1 × 8    | **31.8**       | 26.4               | 5.6                      |
| Gate mid + speakers 2 kW |              |              | 2 × 8    | **39.8**       | 34.4               | 6.1                      |
| Gate mid + speakers 3 kW |              |              | 3 × 8    | **47.8**       | 42.4               | 6.3                      |
| Gate mid + speakers 4 kW |              |              | 4 × 8    | **55.8**       | 50.4               | 6.8                      |

**How it scales (reasoning):** every 1 kW of average speaker draw over 8 h adds
8 kWh a night. Nearly all of that comes out of the battery, because the sound
plays after dark. Each extra 1 kW of speakers costs about one more 14.3 kWh
battery plus 3–6 kW of panels: **about $6,000–9,000 per kW of speakers**
(section 3c).

For scale: 10 nights of Gate-only operation is about 200–300 kWh in all.

### 1c. Peak power

| Case                     | Continuous peak                                                                                                                                                                                                                                                                                                                                                           | Short peaks                                                                                                        | Confidence                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| Gate                     | Average 1.5–2.0 kW. Busy patterns go higher, capped by the L14-30 at 5.76 kVA continuous (7.2 kVA at the breaker)                                                                                                                                                                                                                                                         | Power-on inrush of the ~32+ switch-mode supplies switching on together: a few ms, many times their running current | Reported (average); the inrush is (reasoning) |
| Speakers at 2 kW average | Music's crest factor puts short bass peaks at about 2–3× the average: **4–6 kW**                                                                                                                                                                                                                                                                                          | Amplifier power-on inrush, unless the amps soft-start                                                              | Assumed                                       |
| Speakers at 4 kW average | **8–12 kW** peaks                                                                                                                                                                                                                                                                                                                                                         | same                                                                                                               | Assumed                                       |
| **Design**               | (a) Gate: the inverter covers the full **7.2 kVA** of the L14-30 so the feed breaker, not the inverter, is the limit. (b) Gate + 2 kW speakers: the worst case is 7.2 + 6 ≈ **13 kVA**, but with the Gate near its 2 kW average it is about 8 kVA: one 12 kW unit (14.7 kW for 10 min) normally, two for full margin. (b4) with 4 kW speakers: about 14–19 kVA, two units |                                                                                                                    | (reasoning)                                   |

The Gate's 9.6 kVA estimated max can't reach the inverter anyway: the L14-30
breaker trips first (`plans/power.md`, "Capacity").

---

## 2. Sun and solar resource at Black Rock City

### 2a. Night length

Event dates assumed for 2027: build days from about Aug 26, gates Aug 29–Sep 6
(Labor Day). Computed with the NOAA sunrise equation for 40.786 N, 119.206 W
(about ±2 min; check with the [NOAA solar
calculator](https://gml.noaa.gov/grad/solcalc/)):

| Date (2027) | Civil dawn  | Sunrise     | Sunset      | Civil dusk  | Sunset to sunrise |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------------- |
| Aug 22      | 5:45 AM PDT | 6:14 AM PDT | 7:45 PM PDT | 8:14 PM PDT | 10.5 h            |
| Aug 29      | 5:52 AM PDT | 6:21 AM PDT | 7:34 PM PDT | 8:02 PM PDT | 10.8 h            |
| Sep 6       | 6:01 AM PDT | 6:29 AM PDT | 7:21 PM PDT | 7:49 PM PDT | 11.1 h            |

The assumed 8 PM–6 AM lit window (10 h) sits inside the dark hours. Panels
produce nothing useful from about 7 PM to 7 AM PDT (PVWatts hourly profile
below), so **the battery carries about 12 h**. The early evening and morning
hours have only the electronics on.

### 2b. PVWatts v8 (NLR, formerly NREL)

Request: `developer.nlr.gov/api/pvwatts/v8.json`, lat 40.786, lon −119.206, 1 kW
DC, fixed open rack, standard module, azimuth 180°. The old
`developer.nrel.gov` domain was retired on 2026-05-29
([NLR docs](https://developer.nlr.gov/docs/solar/pvwatts/v8/)). Weather is
NSRDB PSM V3 TMY-2020, grid cell 40.77 N, 119.22 W, elevation 1,178 m
(Confirmed, API response 2026-10-21).

| Tilt                                                       | DC kWh/kW/day, Aug 20–Sep 9, no system losses (cell heat included) | AC kWh/kW/day with PVWatts' default 14 % losses: mean (worst day – best day) |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| 0° (flat, e.g. a shade roof)                               | 6.23                                                               | 5.11 (3.89–5.51)                                                             |
| 10°                                                        | 6.68                                                               | —                                                                            |
| **20°** (used for sizing)                                  | **6.94**                                                           | **5.71 (4.13–6.18)**                                                         |
| 30°                                                        | —                                                                  | 5.79 (4.10–6.31)                                                             |
| 20° bifacial (bifaciality 0.7, ground albedo 0.4, Assumed) | 7.47 (+7.6 %)                                                      | 6.83 with no losses                                                          |

- Monthly at 20°: plane-of-array sun **7.72 kWh/m²/day in August, 6.76 in
  September**. AC is 176 kWh/kW for August and 153 for September (Confirmed,
  PVWatts).
- **The worst day in the window** is Aug 23 in the TMY, at 4.13 kWh/kW, 72 % of
  the mean. Other weak days are about 5.1 (90 %). The TMY has no full dust storm,
  so the sizing adds one (section 3).
- **Hourly shape** (20° tilt, Aug 26–Sep 4 mean, kW per kW DC, PDT):

  | Time (PDT)   | 7 AM | 8 AM | 9 AM | 10 AM | 11 AM | Noon | 1 PM | 2 PM | 3 PM | 4 PM | 5 PM | 6 PM | 7 PM |
  | ------------ | ---- | ---- | ---- | ----- | ----- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
  | kW per kW DC | 0.12 | 0.37 | 0.60 | 0.76  | 0.88  | 0.94 | 0.91 | 0.78 | 0.70 | 0.50 | 0.33 | 0.09 | 0    |

- **Heat on the cells.** In the TMY the ambient peaks at 38 °C in the window and
  the cells at 59 °C. On a real 40 °C day expect the cells at about 65–70 °C
  (reasoning). That costs about 13 % (TOPCon, −0.30 %/°C) to 16 % (PERC,
  −0.35 %/°C) against the label rating. PVWatts already includes this in the
  figures above.
- **Ambient** in the TMY window: 9–38 °C. The Survival Guide says daytime
  "routinely exceed 100°F" (38 °C) and nights "can be in the 40s" °F (4–9 °C)
  ([Survival Guide](https://survival.burningman.org/survival-health-and-safety/survival/),
  Confirmed). The brief's 50 °C is used for sealed boxes in sun, not for shade
  air (Reported).

### 2c. Losses applied in the sizing

| Loss                                                                | Typical value         | Playa value used                                                    | Source                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Soiling (dust)                                                      | 2 % (PVWatts default) | **5 %** with cleaning every day or two; **15 %** if cleaning lapses | Desert studies: about 0.5 %/day uncleaned, about 4 % with cleaning every 15 days ([PV-Tech](https://www.pv-tech.org/challenges-of-pv-soiling-in-desert-climates/), Reported). Burners report 20 %+ from a film "you can write your name in" ([ePlaya](https://eplaya.burningman.org/viewtopic.php?t=29128), Reported). **No measured playa data found** |
| Mismatch, wiring, connections, light-induced degradation, nameplate | 7 %                   | 6 %                                                                 | PVWatts defaults, rounded                                                                                                                                                                                                                                                                                                                               |
| Shading, availability                                               | 6 %                   | 0 %                                                                 | Open playa, owner-run. Neighbours' structures can shade the array: one camp lost 7 h of sun down to 5.5 h ([Sun Light & Power](https://www.sunlightandpower.com/blog/embracing-solar-power-burning-man), Reported)                                                                                                                                      |
| Heat on the cells                                                   | —                     | In the PVWatts output                                               | Above                                                                                                                                                                                                                                                                                                                                                   |
| MPPT (array to battery bus)                                         | —                     | 97.5 %                                                              | Assumed                                                                                                                                                                                                                                                                                                                                                 |
| Battery, each way                                                   | —                     | 97.5 % (95 % round trip)                                            | Assumed, typical LiFePO4                                                                                                                                                                                                                                                                                                                                |
| Inverter (DC to AC)                                                 | —                     | 94 %                                                                | Assumed, typical for hybrid inverters at partial load                                                                                                                                                                                                                                                                                                   |

---

## 3. Sizing

### 3a. How it was sized

The simulation runs hour by hour through 10 TMY days (Aug 27–Sep 5). It starts
with the battery full (charged during build days). It uses the loads in 1b, the
losses in 2c, and a 10–100 % usable state-of-charge window. Each size is tested
against three skies:

1. **Typical**: the TMY days as they come, 5 % soiling.
2. **Bad week**: the worst TMY day (Aug 23) dropped into day 4, and day 7 cut to
   **40 % of normal output (a dust storm)**, at 5 % soiling.
3. **Bad week, dirty panels**: the same at 15 % soiling.

**The design rule: the battery never drops below 20 % in any of the three.**
That leaves 10 % of its capacity as reserve above the 10 % floor. The rule
covers the brief's margins. It holds for a dust-storm day, it holds for dust
on the panels, and the heat margin is the cooling load plus the 20 % floor.
LiFePO4 holds its capacity in heat; what heat does is cut charging off (section
4b).

### 3b. Results

Minimum battery charge over the 10 days (%):

| Case                                     | Array / battery    | Typical | Bad week | Bad week, dirty |
| ---------------------------------------- | ------------------ | ------- | -------- | --------------- |
| Gate mid                                 | 10 kW / 43 kWh     | 50      | 28       | 23              |
| Gate mid                                 | 12 kW / 57 kWh     | 62      | 54       | 49              |
| Gate high                                | 10 kW / 43 kWh     | 38      | 0        | **−5 (dark)**   |
| **Gate high (Option A)**                 | **12 kW / 57 kWh** | 54      | 33       | **28**          |
| Gate high                                | 15 kW / 43 kWh     | 39      | 26       | 18              |
| Gate mid + speakers 2 kW                 | 20 kW / 57 kWh     | 31      | 19       | 12              |
| Gate mid + speakers 2 kW                 | 24 kW / 57 kWh     | 32      | 31       | 25              |
| **Gate high + speakers 2 kW (Option B)** | **18 kW / 86 kWh** | 49      | 29       | **24**          |
| Gate mid + speakers 4 kW                 | 30 kW / 86 kWh     | 34      | 29       | 22              |
| Gate mid + speakers 4 kW                 | 32 kW / 100 kWh    | 43      | 43       | 36              |

### 3c. The array–battery trade-off

The smallest array that meets the 20 % rule, for each battery size (14.3 kWh
units):

| Battery →                | 29 kWh  | 43 kWh  | 57 kWh  | 72 kWh  | 86 kWh  | 100 kWh | 114 kWh |
| ------------------------ | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| Gate mid (24 kWh/day)    | 15.5 kW | 9.5 kW  | 6.5 kW  | 6 kW    | 5.5 kW  | 5 kW    | 5 kW    |
| Gate high (30 kWh/day)   | none    | 15.5 kW | 10 kW   | 7.5 kW  | 7 kW    | 7 kW    | 6.5 kW  |
| Gate mid + speakers 1 kW | none    | 19.5 kW | 13.5 kW | 8.5 kW  | 8 kW    | 7.5 kW  | 7 kW    |
| Gate mid + speakers 2 kW | none    | none    | 23 kW   | 16.5 kW | 11 kW   | 10 kW   | 9.5 kW  |
| Gate mid + speakers 4 kW | none    | none    | none    | 35.5 kW | 29.5 kW | 23.5 kW | 17.5 kW |

- **Below a minimum battery no array is enough.** The battery has to hold one
  whole night: about 1.3–1.5 × the 7 PM–7 AM energy in 1b.
- **Above that minimum, more battery buys a smaller array.** At about $220 per
  kWh of battery against about $0.6–1.2 per W of array, racked and wired, the
  totals are within about 15 % across each row (reasoning).
- **The options use the middle of each row, not the cheapest corner:**
  - A big battery with a small array only recovers if the following days are
    good, and costs more cooling.
  - A big array with a small battery means more wind load, more panels to
    clean, and more ground.
  - Batteries weigh about 140 kg per 14.3 kWh; panels about 22 kg per 460 W.

### 3d. Hybrid: how much generator

Same skies. A generator of **5.5 kW** (a Honda EU7000iS class) starts when the
battery falls to 15 % and stops at 35 %. That is the inverter's
generator-start logic, set so the sun does the rest.

| Hardware                      | Load                         | Generator hours in 10 days: typical | dirty bad week |
| ----------------------------- | ---------------------------- | ----------------------------------- | -------------- |
| 12 kW / 57 kWh (Option A = C) | Gate, any case               | 0                                   | 0              |
| same                          | Gate mid + speakers 1 kW     | 0                                   | 3 h            |
| same                          | **Gate mid + speakers 2 kW** | **0**                               | **7 h**        |
| same                          | Gate high + speakers 2 kW    | 10 h                                | 22 h           |
| same                          | Gate mid + speakers 3 kW     | 27 h                                | 31 h           |
| same                          | Gate mid + speakers 4 kW     | 45 h                                | 48 h           |
| 8 kW / 29 kWh (C-small)       | Gate mid                     | 0                                   | 4 h            |
| same                          | Gate high                    | 18 h                                | 19 h           |

**Fuel (Assumed):** a 5.5 kW inverter generator near full load burns roughly
2.5–3 L/h of petrol, so 7–48 h comes to about 20–140 L for the event. **The
Gate's present fuel use is Unknown.** For comparison only (reasoning): a 20–25
kW towable diesel idling at a 1.5–2 kW load around the clock might burn 2–3 L/h,
**500–700 L in 10 days**. Ask James for the real figure; it is the payback case.

### 3e. Array area and layout

| Array | Panels (460 W, 1.91 × 1.13 m) | Panel area                 | Footprint at 20° tilt with row spacing (reasoning) |
| ----- | ----------------------------- | -------------------------- | -------------------------------------------------- |
| 8 kW  | 18                            | 39 m²                      | about 60–80 m²                                     |
| 12 kW | 26                            | 56 m² (a 7.5 × 7.5 m roof) | about 90–120 m²                                    |
| 18 kW | 40                            | 87 m²                      | about 130–180 m²                                   |

- **A flat roof** (a shade structure) loses 10 % against 20° (6.23 against 6.94),
  so it would need about 13 kW for Option A.
- **A 10° tilt** loses 4 % and cuts the wind load a lot (section 7). It is the
  likely compromise for a ground array or a shade roof (reasoning).

---

## 4. Products

### 4a. Inverters (120/240 V split-phase, off-grid hybrid)

Specs from the manufacturers' datasheets and manuals (Confirmed, linked below
the table). Prices are retailer listings read 2026-10-21 (Quoted unless marked).

| Unit                                        | Continuous out (240 V) / per leg                            | Surge                                                   | PV in: W / Voc / MPPTs                                              | Generator input / auto-start                                   | Operating temp; derating                   | Enclosure, cooling                    | Idle                 | Weight     | Price                                                                                                  |
| ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------ | ------------------------------------- | -------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| **EG4 18kPV-12LV**                          | **12 kW, 50 A**; 8 kW per leg off-grid                      | 14.7 kW 10 min (with PV), 13.5 kW 10 min (battery only) | 18 kW used (21 kW recommended) / 600 V / 3                          | **GEN port, 90 A** pass-through; **2-wire start contact**      | −25 to 60 °C; derating start not published | **NEMA 4X**, fans                     | ~70 W (18 W standby) | 55 kg      | **$3,999.99** ([Signature Solar](https://signaturesolar.com/all-products/inverters/))                  |
| EG4 12kPV                                   | 8 kW, 33.3 A; 4 kW per leg                                  | 16 kW 0.5 s, 12 kW 1 s, 10 kW 1 min                     | 12 kW (15 kW recommended) / 600 V / 2                               | 80 A; generator must be over 5 kW; auto-start not checked      | −25 to 60 °C                               | NEMA 4X                               | <55 W                | 50 kg      | $2,999.99 (same)                                                                                       |
| EG4 FlexBOSS21                              | 16 kW (12 kW from battery only); 50 A, 6 kW per leg         | 24 kW 0.5 s, 18 kW 1 s, 15 kW 6 min                     | 21 kW / 600 V / 3                                                   | **Only with an EG4 GridBOSS** (manual §11)                     | −25 to 60 °C; **derates above 45 °C**      | NEMA 4X, fans                         | <65 W                | 55 kg      | $3,599.99 (same)                                                                                       |
| EG4 6000XP × 2                              | 6 kW, 25 A each; 12 kW the pair                             | 12 kW ≈ 3.5 s each                                      | 8 kW (10 kW recommended) / 480 V / 2                                | 50 A bypass; generator start/stop settings                     | **0 to 45 °C**                             | **IP20, fan with dust filters**       | ~50 W each           | 24 kg each | $1,499.99 each (same)                                                                                  |
| **Sol-Ark 15K-2P-LV** (Rev 8, Sept 2026)    | **12 kW off-grid, 62.5 A**; up to 50 % imbalance            | 13 kW 30 min, **24 kW 10 s**                            | 19.5 kW / 500 V / 3                                                 | GEN port 80 A, up to 19.2 kW; **integrated 2-wire auto-start** | −25 to 55 °C; **derates above 45 °C**      | **IP65 / NEMA 3R**, "intelligent fan" | 90 W                 | 61.2 kg    | $4,999 ([ShopSolar](https://shopsolarkits.com/products/sol-ark-15k); page also shows $8,999 "regular") |
| Sol-Ark Limitless 12K-2P-LL                 | 10 kW                                                       | 24 kW 10 s                                              | —                                                                   | 60 A GEN                                                       | —                                          | IP65 / NEMA 3R                        | 96 W                 | —          | $3,849 ([ShopSolar](https://shopsolarkits.com/collections/sol-ark))                                    |
| Victron Quattro 48/5000/70-100/100 120V × 2 | 4.0 kW each at 25 °C, **3.7 kW at 40 °C** (7.4 kW the pair) | 10 kW each                                              | none: add MPPT RS 450/200 ($1,938.85 each) and a Cerbo GX ($248.20) | **Two AC inputs**, 100 A; relay starts a generator             | −40 to 65 °C, published derating curve     | **IP21**                              | 30 W each            | 34 kg each | $2,351.10 each ([ShopSolar](https://shopsolarkits.com/collections/victron-energy))                     |
| Victron MultiPlus-II 48/3000 120V × 2       | 2.2 kW each at 40 °C (4.4 kW the pair)                      | 5.5 kW each                                             | none (separate MPPT)                                                | One AC input                                                   | −40 to 60 °C                               | IP22                                  | 11 W                 | 19 kg      | ~$1,052 each (model not confirmed on listing)                                                          |
| Growatt SPF 6000T DVM-MPV                   | 6 kW, split-phase                                           | 18 kW (low-frequency transformer)                       | 7 kW / 250 V / 2                                                    | AC charging 60 A                                               | **0 to 45 °C**                             | **IP20**                              | not stated           | 52 kg      | not found                                                                                              |
| Growatt SPE 12000 US                        | 12 kW, 50 A                                                 | 104–120 % for 10 s                                      | 18 kW / 550 V / 2                                                   | 70 A                                                           | −10 to 50 °C                               | **IP20**                              | ~75 W                | 21.5 kg    | not found                                                                                              |
| Schneider XW Pro 6848 NA                    | 6.0 kW at 40 °C                                             | 12 kW 60 s                                              | separate MPPT                                                       | AC2 gen input                                                  | derates above 25 °C                        | NEMA 1, indoor                        | <8 W                 | 55.2 kg    | **Discontinued 2025-07-27** ([se.com](https://www.se.com/us/en/product/865-6848-21/))                  |

Datasheets: [EG4 18kPV spec](https://eg4electronics.com/wp-content/uploads/2024/04/EG4-18KPV-12LV-Spec-Sheet.pdf)
and [manual](https://eg4electronics.com/wp-content/uploads/2024/04/EG4-18KPV-12LV-Manual-1.pdf) ·
[EG4 12kPV](https://eg4electronics.com/wp-content/uploads/2024/05/EG4®-12kPV-Spec-Sheet.pdf) ·
[FlexBOSS21](https://eg4electronics.com/wp-content/uploads/2024/10/EG4-FlexBoss21-Spec-Sheet.pdf)
and [manual](https://eg4electronics.com/wp-content/uploads/2024/08/FlexBOSS-21-Manual.pdf) ·
[6000XP](https://eg4electronics.com/wp-content/uploads/2024/04/EG4-6000XP-Inverter-Spec-Sheet.pdf) ·
[Sol-Ark 15K-2P-LV](https://sol-ark.com/wp-content/uploads/2026/09/15KDatasheet_PS-00001_Rev_8_10Sept2026.pdf) ·
[Sol-Ark 12K-LL](https://sol-ark.com/wp-content/uploads/2026/09/12K-LL_Datasheet_PS-00045_Rev_4_9Sept2026.pdf) ·
[Quattro 120V](https://www.victronenergy.com/upload/documents/Datasheet-Quattro-3-10kVA-120V-EN-.pdf) ·
[MultiPlus-II 120V](https://www.victronenergy.com/upload/documents/Datasheet-MultiPlus-II-120V-EN-.pdf) ·
[MPPT RS](https://www.victronenergy.com/upload/documents/Datasheet-SmartSolar-MPPT-RS-EN-.pdf) ·
[Growatt SPF](https://us.growatt.com/upload/file/SPF_4000-12000_DVM-MPV_Datasheet_EN_202212.pdf) ·
[Growatt SPE](https://us.growatt.com/upload/file/SPE_6000-12000_US_Datasheet_EN_202410.pdf).

- **Pick: EG4 18kPV-12LV**, with the **Sol-Ark 15K** as the alternative.
  - Both are sealed (NEMA 4X; IP65 / NEMA 3R).
  - Both make 120/240 V split-phase on their own and take the full 18–19.5 kW of
    panels.
  - Both have a generator port with a two-wire auto-start, which Option C needs.
- **The 18kPV is $1,000 cheaper and rated to 60 °C**, but EG4 doesn't publish
  where its output starts derating.
- **The Sol-Ark has double the short surge** (24 kW for 10 s), but derates above
  45 °C. It also idles at 90 W against about 70 W (2.2 kWh a day against 1.7).
- **Either way, put it in the shade.** Both list fans; whether those cool only a
  sealed heat sink is not stated (Assumed).
- **Excluded:**
  - **FlexBOSS** handles a generator only with a GridBOSS.
  - **6000XP, 12000XP and Growatt** are IP20 open-vent units rated only to
    45 °C.
  - **Victron** is IP21/22 and needs separate charge controllers. A
    Quattro pair with an MPPT RS and a Cerbo GX costs about $6,900 and gives
    7.4 kW at 40 °C. Its very low idle draw (MultiPlus-II 11 W) is its only
    edge.
  - **Schneider XW Pro** is discontinued.
- **Altitude** (BRC about 1,190 m) is below the 2,000 m where EG4 and Sol-Ark
  start altitude derating (Confirmed, datasheets).
- **Paralleling two 18kPVs** for Option B's high case: EG4 supports parallel
  units, but the count and the setup weren't checked (Assumed).

### 4b. Batteries (48 V LiFePO4)

| Battery                                                                      | kWh (usable at 80 % DoD) | Cycle life               | **Charge °C**                                         | Discharge °C | IP       | Weight  | Price              | $/kWh    | Conf. / source                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------- | ------------------------ | ------------------------ | ----------------------------------------------------- | ------------ | -------- | ------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **EG4 WallMount All-Weather 280Ah** (WP-16/280-1AWLL, = "PowerPro 14.3 kWh") | 14.3 (11.4)              | >8,000 at 80 % DoD, 0.5C | **0–50**; BMS trips >70 °C                            | −20–55       | **IP65** | 140 kg  | **$3,124.99** sale | **$219** | Confirmed, [datasheet v1.2.1](https://eg4electronics.com/wp-content/uploads/2025/09/EG4-WallMount-All-Weather-Battery-Spec-Sheet.pdf); Quoted, [Signature Solar](https://signaturesolar.com/eg4-powerpro-14kwh-all-weather-lithium-solar-battery-wallmount/)                 |
| EG4 WallMount Indoor 280Ah                                                   | 14.3                     | 8,000                    | 0–45                                                  | −20–50       | indoor   | —       | $2,700–3,110       | $189–217 | Reported / Quoted\*, [Signature Solar](https://signaturesolar.com/eg4-wallmount-indoor-battery-280ah-51-2v-14-3kwh-indoor-heated-ul1973-ul9540a/)                                                                                                                            |
| EG4 LifePower4 48V 100Ah (rack)                                              | 5.12 (4.1)               | >7,000 at 80 %           | **0–50**; BMS cuts charging >55 °C                    | −20–55       | IP21     | 46.3 kg | $1,149–1,471       | $224–287 | Confirmed, [datasheet v2.3.1](https://ressupply.com/documents/eg4/LifePower4_Rack_Mounted_48V_100Ah_Battery_Data_Sheet.pdf); Quoted\*, [Signature Solar](https://signaturesolar.com/eg4-lifepower4-v2-lithium-battery-48v-100ah-server-rack-battery/)                        |
| Discover HELIOS ESS 52-48-16000                                              | 16.08                    | 93 MWh throughput        | operating −25–55 (charge range not on datasheet)      | −25–55       | **IP65** | 136 kg  | **$3,550**         | **$221** | Confirmed, [datasheet](https://www.solarelectricsupply.com/media/sparsh/product_attachment/808-0046-helios-datasheet.pdf); Quoted, [solar-electric.com](https://www.solar-electric.com/discover-energy-systems-helios-ess-battery-16-1-kwh-51-2v-314-ah-outdoor-system.html) |
| Rolls S48-100LFP ESS                                                         | 5.12                     | >6,000 at 80 %           | 0–55, **derated: 0.5C at 10–35 °C, 0.2C at 35–50 °C** | −20–60       | IP54     | 50.5 kg | not found          | —        | Confirmed, [datasheet](https://www.solar-electric.com/lib/wind-sun/rolls-S48-100LFP_ESS_data_sheet.pdf)                                                                                                                                                                      |
| RUiXU / SOK / Jakiper 48 V 100Ah racks                                       | 5.12                     | 4,000–6,000              | 0–45 or 0–50 (listings disagree)                      | —            | rack     | ~50 kg  | $999–1,299         | $195–254 | Reported / Quoted\* ([RUiXU](https://www.santansolar.com/?p=114350), [SOK](https://shop.explorist.life/shop/all-products/components/batteries/sok-48v-100ah-server-rack-lifepo4-battery/), [Jakiper](https://shopsolarkits.com/products/jakiper-48v-1st-gen))                |

- **Pick: EG4 WallMount All-Weather** (or Discover HELIOS).
  - Both are IP65, sealed against dust.
  - Both talk to the hybrid inverters in 4a over closed-loop communication.
  - Both cost about $220 a kWh.
  - The budget uses **$3,125–3,800 a unit** (sale price to an Assumed list
    price).
- **The heat limit is the design driver.**
  - The common LiFePO4 charge limit is **45–55 °C at the cells**.
  - A pack in 50 °C air under sun goes past it, and then **stops charging just
    when the sun is up**. Shading, insulation and cooling are needed with any of
    these batteries (section 4e).
  - None of them has active cooling. Their heaters are for cold only (the EG4
    AW heater: 224 W, on at 0 °C, Confirmed).
  - Heat also ages LiFePO4 faster. Ten days a year is a small share of its
    life (reasoning).
- **Not a fit:**
  - **Sol-Ark L3** is high-voltage commercial (40.96 / 61.44 kWh,
    [datasheet](https://sol-ark.com/wp-content/uploads/2024/05/SK150-0021-008_L3_Series_208V_Datasheet.pdf),
    Reported).
  - **Victron Lithium Smart** is 12.8 V and 25.6 V only.
  - **Fortress eVault Max** costs $350–636 a kWh and is discontinued at one
    retailer.
- **Storage between events (reasoning):** keep the batteries at about 50 % in a
  cool place. They don't need to come back to the playa full; the build days
  charge them.

### 4c. Panels

| Module                         | Pallet       | Price              | $/W           | Conf.                                                                                                                   |
| ------------------------------ | ------------ | ------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Waaree 540 W bifacial (PERC)   | 31 (16.7 kW) | $5,189.40          | **$0.31**     | Quoted, [Signature Solar pallets](https://signaturesolar.com/shop-all/solar-panels/pallets/?page=1)                     |
| Maxeon 415 W                   | 26           | $3,560.70          | $0.33         | Quoted, same                                                                                                            |
| ZnShine 440 W bifacial         | 36           | $5,385.60          | $0.34         | Quoted, same                                                                                                            |
| Seraphim 440 W bifacial        | 36           | $5,544.00          | $0.35         | Quoted, same                                                                                                            |
| CW Energy 450 W                | 35           | $5,985.00          | $0.38         | Quoted, same                                                                                                            |
| Aptos 460 W mono / bifacial    | 31 (14.3 kW) | $5,704 / $5,846.60 | $0.40 / $0.41 | Quoted, same                                                                                                            |
| Market average, 451–600 W      | —            | —                  | $0.442        | Reported, [Portlandia index Jun–Jul 2026](https://www.portlandiaelectric.supply/pages/solar-equipment-price-index-2026) |
| Used JA Solar 310 W, lot of 25 | 25 (7.75 kW) | $1,375             | ~$0.18        | Quoted\*, [SanTan Solar](https://www.santansolar.com/?p=131003)                                                         |

Two datasheets:

|                              | Jinko Tiger Neo JKM425–445N-54HL4R-B (TOPCon)                                                          | Aptos DNA-120-BF10-460W (bifacial PERC)                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Pmax temperature coefficient | **−0.30 %/°C**                                                                                         | −0.35 %/°C                                                                                                                     |
| NOCT                         | 45 ± 2 °C                                                                                              | 45 ± 2 °C                                                                                                                      |
| Size, weight                 | 1762 × 1134 × 30 mm, 22 kg                                                                             | 1908 × 1134 × 35 mm, 22.8 kg                                                                                                   |
| Load rating                  | 2,400 Pa wind / 5,400 Pa snow                                                                          | 5,400 Pa / 5,400 Pa (UL 1703)                                                                                                  |
| Source                       | [datasheet](https://solarproof.com.au/datasheets/panel_datasheet_JKM425-445N-54HL4R-B.pdf) (Confirmed) | [datasheet](https://signaturesolar.com/content/downloads/Spec%20sheets/DNA-120-BF10-460W_Datasheet_Ref.121924.pdf) (Confirmed) |

- **Bifacial: yes, if it costs nothing extra.** The pallet prices above show
  that it doesn't.
  - The pale playa adds about 7–8 % (PVWatts, albedo 0.4 Assumed).
  - Dust on the rear glass cuts the gain, and a shade roof with people under
    it gets little rear light (reasoning).
  - Glass-glass bifacials also tend to carry the higher 5,400 Pa wind rating.
- **TOPCon** handles heat about 2–3 % better than PERC at 65–70 °C cells.
- **A full pallet is the cheap unit.**
  - One pallet of 540 W panels is 16.7 kW for $5.2K. That is more than Option
    A needs, at about the price of 12 kW bought loose.
  - Buy the pallet and keep the spares, or build A at 16 kW and use a smaller
    battery (section 3c).
- **Freight** to Reno or the Bay Area: Estimate **$400–1,000 a pallet**, not
  price-checked.

### 4d. Racking and mounting

| Option                                                                                                     | Cost                                                               | Notes                                                                                                                                                    | Conf.                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Tamarack ground-mount column kits                                                                          | $404–575 per column of 3–4 modules, about $0.26–0.31/W before pipe | Designed for 2″ Sch 40 pipe in **concrete**. Needs re-engineering for stakes or ballast                                                                  | Quoted\*, [solar-electric](https://www.solar-electric.com/tamarack-solar-90798-ground-mount-kit.html)                    |
| IntegraRack IR-30 BallastRack                                                                              | $129.99 a unit                                                     | Aluminium, fixed 30°, "150 mph"; ballast option needs about 700 lb of fill per section                                                                   | Quoted, [thesolarstore](https://thesolarstore.com/products/integrarack-ir-30-solar-panel-ground-mount-bracket); Reported |
| A home-built low-tilt frame (Unistrut or aluminium angle) lagged to the playa                              | Estimate $0.15–0.30/W                                              | 10–15° tilt, short legs, lag bolts and rebar at every leg                                                                                                | Estimate                                                                                                                 |
| **A shade structure as the array** (a roof of panels over the battery/inverter enclosure and a crew space) | Estimate $0.30–0.60/W for the frame, if built for it               | Panels as the roof: shade and power from one structure. Playa precedents (Solar Library, SOLARPUNKS' Solar Station) exist but have no published costs    | Estimate                                                                                                                 |
| On the Gate's truss                                                                                        | —                                                                  | **Not recommended** without a rigging engineer. It adds sail area at height on a structure people stand under (see `plans/rigging.md`, another thread's) | (reasoning)                                                                                                              |

The budget uses **$0.15–0.60/W** for racking and anchors.

### 4e. Enclosure and cooling for the battery and inverter

**Not price-checked** (search budget ran out). Estimates:

| Approach | What                                                                                                                                                                                                    | Cost         | Power                                       | Conf.                                                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Low      | Under the array's shade. An insulated, sealed box (or IP65 batteries left un-boxed in deep shade). Inverter settings that charge mostly before about 2 PM. A temperature logger                         | $500–1,500   | 0                                           | Estimate. Shade alone cut local temperature by about 6–8 °C for one camp ([Sun Light & Power](https://www.sunlightandpower.com/blog/embracing-solar-power-burning-man), Reported) |
| High     | An insulated enclosure (a small insulated cargo trailer, or a walled corner under the array) with a 9–12k BTU ductless mini-split, or a closed-loop enclosure air conditioner. **No outside air**: dust | $2,500–6,000 | about 0.4 kW average, by day. In the sizing | Estimate                                                                                                                                                                          |

- **A filtered vent with a fan** (one camp used MERV-8 and a USB fan,
  [Sun Light & Power](https://www.sunlightandpower.com/blog/embracing-solar-power-burning-man),
  Reported) keeps dust out but can't cool the box below the outside air.
- **Fan-cooled inverters pull air through their heat sinks.** Check each unit's
  dust rating in 4a before shutting it in a box with the batteries.
- **Log first.** `docs/requirements.md` already asks for a logged temperature in
  one real box before trusting any part's rating. Do the same for the battery
  enclosure on a build day.

### 4f. Balance of system (not price-checked)

All Estimates (search budget ran out before these could be priced):

| Item                                                                                                                                                   | Option A         | Option B         | C-small          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ---------------- | ---------------- |
| PV wire, MC4s, string fuses or combiner, PV disconnect                                                                                                 | $600–1,200       | $900–1,800       | $400–800         |
| Battery cables, busbar, a 48 V class-T fuse or breaker per battery                                                                                     | $500–1,000       | $800–1,500       | $300–700         |
| AC distro: a 2-pole 30 A breaker and an **L14-30R** (watertight, as in the feed research) for the Gate; a 50 A CS6369 receptacle for the speakers in B | $400–900         | $700–1,500       | $400–900         |
| Grounding (rods are no use on the playa; bond to frame), surge protection, labels                                                                      | $200–400         | $300–600         | $200–400         |
| Local monitoring that works offline (e.g. a Raspberry Pi on the inverter's RS485/CAN)                                                                  | $150–300         | $150–300         | $150–300         |
| Cleaning kit (soft brush, squeegee, sprayer, small blower) and spares (MC4s, a breaker)                                                                | $150–300         | $200–400         | $150–300         |
| **Total**                                                                                                                                              | **$2,000–4,100** | **$3,050–6,100** | **$1,600–3,400** |

### 4g. Turnkey trailers, rentals and power stations

**Solar trailers with 120/240 V out** (buy, or rent where noted):

| Unit                              | PV         | Battery                       | Inverter                     | Outlets                                             | Price                                 | Conf.                                                                                                                               |
| --------------------------------- | ---------- | ----------------------------- | ---------------------------- | --------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| SunWing Gecko-15 (NewUse Energy)  | 5.6 kW     | 40.96 kWh LiFePO4             | 8 kW (17 kW peak), 120/240 V | —                                                   | **$65,000** listing, "call for quote" | Confirmed spec, Quoted price, [newuseenergy.com](https://newuseenergy.com/products/sunwing)                                         |
| SRX-12/15 (Mobile Solar Power)    | 4.5–5.6 kW | 40.96 kWh                     | 8 kW                         | 2 × 20 A 120 V, 1 × 30 A + 2 × 50 A 120/240 V       | Unknown                               | Confirmed, [mobilesolarpower.net](https://www.mobilesolarpower.net/generators/)                                                     |
| MS-425 (Sun For Rent, **rental**) | 2.8 kW     | 60 kWh lead-acid (48 usable)  | 16 kW (32 peak) 120/240 V    | 2 × 20 A, 1 × 30 A + 2 × 50 A 120/240 V, 50 A inlet | Not published                         | Confirmed, [sunforrent.com](https://www.sunforrent.com/solar-rentals/16kw-solar-generator/)                                         |
| Model G (YouLoveSolar)            | Unknown    | about 45 kWh                  | 12 kW (24 peak) 120/240 V    | 2 × 50 A Hubbell, 4 × 20 A                          | $19,950                               | Reported / Quoted\*, [youlovesolar.com](https://youlovesolar.com/products/copy-of-mobile-solar-power-wagon-solar-with-light-towers) |
| BigBattery 12 kW trailer          | 2.4 kW     | 28 kWh                        | 2 × 6 kW                     | —                                                   | $28,281                               | Reported / Quoted\*, [bigbattery.com](https://bigbattery.com/products/solar-trailer-12kw-power-28kwh-lithium/)                      |
| Homestead Hybrid (**rental**)     | —          | 30 kWh usable + diesel backup | 12 kW                        | 2 × 50 A Hubbell, 4 × 20 A GFCI                     | Unknown                               | Reported, [homesteadhybrid.com](https://www.homesteadhybrid.com/products/hybrid-solar-trailer-12-000w-output-30kwh-of-storage)      |

- Sun For Rent, Mobile Solar Power and NewUse Energy appear to be one company
  group in Atascadero, CA (shared address, matching specs; Reported). They are
  the nearest California rental source.
- **None of these trailers carries enough panel to run the Gate alone through a
  dust day.** Their 2.4–5.6 kW arrays are a third to half of Option A's
  12 kW. Rented with an extra array (Sun For Rent lists an SA-15, about 5 kW)
  they might. Rental prices aren't published; getting them needs a quote, which
  is the owner's call.
- **Battery-only rentals** for pairing with the existing generator (a hybrid
  with no solar): Generac MBE40 (32 kW, 90 kWh gel lead-acid, 120/240 V,
  [Generac](https://www.generac.com/industrial-products/mobile-power-light-solutions/mobile-energy-storage/40kva-battery-energy-storage-mbe40/),
  Confirmed). United Rentals rents a 40 kVA class
  ([UR](https://www.unitedrentals.com/marketplace/equipment/power-generation-equipment/battery-energy-storage-systems),
  Reported). Prices Unknown. Moxion (the MP-75 Sunbelt still lists) went into
  Chapter 7 in 2024 ([Latitude Media](https://latitudemedia.com/news/portable-battery-startup-moxion-is-bankrupt-what-happened),
  Reported). Support is Unknown.
- **Consumer power stations with 120/240 V:**
  - **Anker SOLIX F3800 Plus** has an **L14-30R (25 A)**, 6 kW (12 kW with
    two), 3.84 kWh expandable to 26.9 kWh per unit, and 3.2 kW of solar input
    ([Anker](https://www.ankersolix.com/products/f3800-plus), Confirmed). Price
    about $3.6–8.6K per bundle, Quoted\*.
  - **EcoFlow DELTA Pro Ultra**: 7.2 kW 120/240 V, $4,199, plus $2,299 per 6 kWh
    battery, sold out ([EcoFlow](https://us.ecoflow.com/products/delta-pro-ultra),
    Quoted).
  - Two F3800 Plus units top out at 6.4 kW of solar input and about 54 kWh. That
    is enough for the Gate on typical days, not for the margin. Their
    temperature ratings weren't checked; consumer units are usually rated to
    about 40 °C (Assumed). **Not recommended** for a sealed box on the playa.
- **Reno rentals:** Amerigen (Reno) is recommended by burners for on-playa
  generator power ([Reddit](https://lr.ggtyler.dev/r/BurningMan/comments/1fk69nb/camp_generator_rental_costs),
  Reported). RenTech Global Solutions lists solar generators on the Spark board
  ([Spark](https://spark.burningman.org/listing/eco-tech-solutions-for-burning-man-power-water-shelter-sustainability),
  Reported). Neither publishes prices.

---

## 5. Inverter output into the Gate's feed

**Yes: the solar system can simply replace the generator at the L14-30.**
Every inverter in 4a hardwires its AC output (L1, L2, N, G), so the receptacle
goes on a small weatherproof subpanel beside it:

- **Gate:** a 2-pole 30 A breaker and an **L14-30R**. Use the watertight
  receptacle family picked for the feed (`docs/pricing-power-feed-2026-10.md`).
  The Gate's 50 ft feeder (AC Works SDL1430PR-050, `plans/power.md`) plugs in
  exactly as it does into a portable generator.
  - The 18kPV gives 50 A at 240 V, up to 8 kW per leg off-grid (Confirmed).
    That is well over the L14-30's 30 A (3.6 kW) per leg, so **the Gate's own
    breaker stays the limit**.
- **Speakers** (B and C): a second 2-pole breaker and a **CS6369** (50 A) or
  another L14-30R, so the sound and the Gate trip separately.
  - **One 18kPV covers both at 2 kW of speakers** (reasoning). The Gate
    averages 2 kW and the speakers peak at 4–6 kW, which together stay under
    12 kW (14.7 kW for 10 min).
  - That holds only while the Gate stays well below the L14-30's 7.2 kVA.
    **With 4 kW speakers, or with the Gate on the 50 A feed, use two units in
    parallel.**
- **If the Gate moves to the 50 A feed** (`docs/pricing-feed-options-2026-10.md`),
  one 18kPV exactly matches it (50 A) with nothing left for the speakers.
- **Neutral–ground bond** (reasoning; check against the 18kPV manual): an
  off-grid inverter is a separately derived source. Bond neutral to ground once,
  in the inverter or the subpanel, just as a portable generator bonds at its
  frame. The Gate's per-segment GFCIs work either way. Ground rods are no use on
  the playa's dry clay, so bond the frame.
- **Leg balance:** the Gate's segments alternate legs (8 + 8, `plans/power.md`),
  so it loads both legs evenly. Wire the speakers' 120 V loads across both legs
  too.
- **Inrush (reasoning):** the Gate switching on all its switch-mode supplies at
  once is the sharpest load either inverter will see. EG4 publishes no
  sub-second surge figure for the 18kPV; Sol-Ark gives 24 kW for 10 s. Test a
  cold start of the whole Gate on the chosen inverter before the event. If it
  trips, stagger the segments.
- **The generator** (C) plugs into the inverter's GEN input, not the Gate:
  - 18kPV: 90 A pass-through and a two-wire start contact.
  - Sol-Ark: 80 A and a built-in auto-start.
  - The inverter runs the Gate from the battery and charges from the generator
    only when the battery is low (section 3d).

---

## 6. Line items by option

Unit prices from section 4. "Quoted" means a price seen today; everything not
seen today is an Estimate. Totals are before the site's 15 % contingency.

### Option A: Gate only (12 kW / 57 kWh / 1 inverter)

| Line item                                                                                     | Qty      | Unit price   | Total low   | Total high  | Confidence                                        | Source / datasheet                                                                                                      |
| --------------------------------------------------------------------------------------------- | -------- | ------------ | ----------- | ----------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Panels, 12 kW (26 × 460 W bifacial, or 22 × 540 W)                                            | 12 kW    | $0.31–0.45/W | $3,720      | $5,400      | Quoted (low: full pallet); Estimate (high: loose) | 4c                                                                                                                      |
| Panel freight                                                                                 | 1 pallet | $400–1,000   | $400        | $1,000      | Estimate                                          | —                                                                                                                       |
| Racking and anchors (low-tilt frame, lag bolts, rebar)                                        | 12 kW    | $0.15–0.60/W | $1,800      | $7,200      | Estimate                                          | 4d                                                                                                                      |
| **Batteries: EG4 WallMount All-Weather 14.3 kWh**                                             | 4        | $3,125–3,800 | $12,500     | $15,200     | Quoted (sale) / Assumed (list)                    | 4b, [datasheet](https://eg4electronics.com/wp-content/uploads/2025/09/EG4-WallMount-All-Weather-Battery-Spec-Sheet.pdf) |
| **Inverter: EG4 18kPV-12LV** (or Sol-Ark 15K)                                                 | 1        | $4,000–5,000 | $4,000      | $5,000      | Quoted                                            | 4a, [datasheet](https://eg4electronics.com/wp-content/uploads/2024/04/EG4-18KPV-12LV-Spec-Sheet.pdf)                    |
| Balance of system (wire, fuses, combiner, AC subpanel with L14-30R, monitoring, cleaning kit) | 1        | —            | $2,000      | $4,100      | Estimate                                          | 4f                                                                                                                      |
| Enclosure and cooling                                                                         | 1        | —            | $500        | $6,000      | Estimate                                          | 4e                                                                                                                      |
| **Total**                                                                                     |          |              | **$24,920** | **$43,900** |                                                   |                                                                                                                         |

About 1.5–1.8 t to haul (reasoning).

**Option A at the Gate-mid load only** (if the meter shows the low end): 10 kW
and 43 kWh (3 batteries) pass the 20 % rule (section 3c). That saves about
$3,700–4,800 (one battery and 2 kW of panels).

### Option B: Gate + speakers at 2 kW (18 kW / 86 kWh / 2 inverters)

| Line item                                                                                    | Qty         | Unit price   | Total low   | Total high  | Confidence        | Source / datasheet |
| -------------------------------------------------------------------------------------------- | ----------- | ------------ | ----------- | ----------- | ----------------- | ------------------ |
| Panels, 18 kW (a 540 W pallet + a few, or 40 × 460 W)                                        | 18 kW       | $0.31–0.45/W | $5,580      | $8,100      | Quoted / Estimate | 4c                 |
| Panel freight                                                                                | 1–2 pallets | $400–1,000   | $500        | $1,500      | Estimate          | —                  |
| Racking and anchors                                                                          | 18 kW       | $0.15–0.60/W | $2,700      | $10,800     | Estimate          | 4d                 |
| **Batteries: EG4 WallMount All-Weather 14.3 kWh**                                            | 6           | $3,125–3,800 | $18,750     | $22,800     | Quoted / Assumed  | 4b                 |
| **Inverter: EG4 18kPV-12LV** (1 at 2 kW speakers; 2 in parallel for margin or 4 kW speakers) | 1–2         | $4,000–5,000 | $4,000      | $10,000     | Quoted            | 4a, section 5      |
| Balance of system (adds a 50 A speaker outlet)                                               | 1           | —            | $3,050      | $6,100      | Estimate          | 4f                 |
| Enclosure and cooling (a larger box)                                                         | 1           | —            | $800        | $7,000      | Estimate          | 4e                 |
| **Total**                                                                                    |             |              | **$35,380** | **$66,300** |                   |                    |

About 2.3–2.8 t to haul (reasoning).

**Scaling with the speakers (section 3c):**

| Speakers (8 h) | Battery           | Array          | Inverters |
| -------------- | ----------------- | -------------- | --------- |
| 1 kW           | 72 kWh (5 units)  | about 9–14 kW  | 1         |
| 2 kW           | 86 kWh (6 units)  | about 11–18 kW | 1–2       |
| 4 kW           | 114 kWh (8 units) | about 18–30 kW | 2         |

Each kW of speakers adds roughly $6,000–9,000 (reasoning, from the unit
prices).

### Option C: hybrid (A's hardware + a generator)

**C (recommended): Option A's line items, plus:**

| Line item                                                                                                                           | Qty | Unit price | Total low   | Total high  | Confidence                   | Source                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------- | --- | ---------- | ----------- | ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Option A, as above                                                                                                                  | 1   | —          | $24,920     | $43,900     |                              | above                                                                                                                     |
| Generator: the current rental on standby ($0 extra), or a bought 5.5 kW inverter generator with remote start (Honda EU7000iS class) | 1   | $0–5,500   | $0          | $5,500      | Estimate (not price-checked) | [Honda EU7000iS](https://integration-powerequipment.honda.ca/generators/ultra-quiet-7000i-es) (L14-30R, 5.5 kW, Reported) |
| A cord from the generator to the inverter's GEN input; a speaker outlet in the subpanel                                             | 1   | $150–400   | $150        | $400        | Estimate                     | —                                                                                                                         |
| **Total**                                                                                                                           |     |            | **$25,070** | **$49,800** |                              |                                                                                                                           |

- Fuel: about 20–60 L for the event at 2 kW of speakers (3–22 generator hours,
  section 3d; Assumed burn rate).
- At 4 kW of speakers it is about 45–48 h and 120–140 L. That is still far
  below a generator running all night, every night.

**C-small (budget hybrid: 8 kW / 29 kWh / 1 inverter + generator):**

| Line item                                                                                | Qty      | Unit price   | Total low   | Total high  | Confidence        |
| ---------------------------------------------------------------------------------------- | -------- | ------------ | ----------- | ----------- | ----------------- |
| Panels, 8 kW                                                                             | 8 kW     | $0.31–0.45/W | $2,480      | $3,600      | Quoted / Estimate |
| Panel freight                                                                            | 1 pallet | $400–1,000   | $400        | $1,000      | Estimate          |
| Racking and anchors                                                                      | 8 kW     | $0.15–0.60/W | $1,200      | $4,800      | Estimate          |
| Batteries: EG4 WallMount All-Weather                                                     | 2        | $3,125–3,800 | $6,250      | $7,600      | Quoted / Assumed  |
| Inverter: EG4 12kPV (8 kW, 33.3 A per leg: covers the L14-30) up to the 18kPV or Sol-Ark | 1        | $3,000–5,000 | $3,000      | $5,000      | Quoted            |
| Balance of system                                                                        | 1        | —            | $1,600      | $3,400      | Estimate          |
| Enclosure and cooling                                                                    | 1        | —            | $500        | $4,000      | Estimate          |
| Generator (rental standby, or bought)                                                    | 1        | $0–5,500     | $0          | $5,500      | Estimate          |
| **Total**                                                                                |          |              | **$15,430** | **$34,900** |                   |

- **The trade-off:** C-small runs the Gate on sun alone only at the mid load.
- **At the high load** its generator runs about 2 h a night (18–19 h in 10
  days).
- **It can't take the speakers** without the generator running most nights.
- **Why the 12kPV:** its auto-start wasn't checked, and it needs a generator
  over 5 kW (Confirmed).

### Rent or buy

- **Buy** the DIY system (A, B or C). No rental exists for a system this size
  with enough panel, and a bought system serves every year after.
  - Option A's hardware, 57 kWh at 8,000 cycles, would outlast many decades of
    10-day events. **The panels and batteries will age out by calendar years,
    not cycles** (reasoning).
- **Rent** only to try it first: a Sun For Rent MS-425 or SRX trailer, or a
  battery-only BESS beside the current generator, for one event. That would
  prove the loads, the heat and the dust before buying. Rental prices are not
  published; getting them means a quote (owner's call).
- **The generator in C** can be the one already rented, kept as backup on its
  own L14-30 or CS6369 into the inverter's generator input. It doesn't need to
  be bought.
  - **Unknown: whether the rental can auto-start.** Most towables have a
    two-wire start.
  - If it can't, a person starts it when the app shows the battery low. A
    bought 5.5 kW inverter generator with remote start is $1,500–5,500
    (Estimate, not price-checked).

---

## 7. Practical playa issues

| Issue                    | What we know                                                                                                                                                                                                                                                                                                                     | What to do (reasoning unless cited)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dust on panels**       | Uncleaned desert panels lose about 0.5 %/day ([PV-Tech](https://www.pv-tech.org/challenges-of-pv-soiling-in-desert-climates/), Reported); a playa film can cost 20 %+ ([ePlaya](https://eplaya.burningman.org/viewtopic.php?t=29128), Reported). No measured playa data                                                          | Clean every day or two, and after every dust storm: a dry blow-off or soft brush first, then water with a little vinegar and a squeegee, early or late in the day only (thermal shock) ([Sun Light & Power](https://www.sunlightandpower.com/blog/embracing-solar-power-burning-man), Reported; vinegar isn't maker-endorsed). Tilted panels hold less dust. The sizing already allows 15 % dirt                                                                                                                         |
| **Wind**                 | "75-mph winds are a common occurrence" ([Burning Man: securing your structure](https://burningman.org/black-rock-city/preparation/camping-tips/securing-your-structure/), Confirmed); can't dig, so #4 rebar (capped) or 12–14″ lag bolts, cable for raised platforms (same page)                                                | At 120 km/h and playa air (about 1.0 kg/m³) the dynamic pressure is about 560 Pa. With a net pressure coefficient of 1.2–1.8 that is **700–1,000 Pa: 1.4–2.2 kN of uplift per panel**, roughly **35–55 kN for a 12 kW array** (reasoning). The panels are rated for it (2,400–5,400 Pa); **the anchors are the weak point.** Keep the tilt low (10–15°) and the frame low, tie rows together, pull-test a lag bolt in playa before trusting a number, and have the frame checked by whoever engineers the Gate's rigging |
| **Heat on the battery**  | Charge limit 50 °C (EG4 AW, LP4), 55 °C with a 0.2C derate above 35 °C (Rolls) (section 4b, Confirmed)                                                                                                                                                                                                                           | Shade, insulate, cool (4e), and log the box temperature. A battery that hits its charge limit at noon fails the next night                                                                                                                                                                                                                                                                                                                                                                                               |
| **Heat on the inverter** | See 4a for each unit's derating temperature                                                                                                                                                                                                                                                                                      | Shade it, keep it out of the sealed battery box unless it's sealed itself                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Theft**                | Someone tried to unbolt a cabinet of an unattended art piece's solar controls in 2022 ([BWB](https://burnerswithoutborders.org/uncategorized/bwb-brc2022/), Reported). One camp chose a generator over solar for fear of theft without insurance (Reported)                                                                      | Lock the enclosure; security-bolt the panels; cable-lock the batteries; site it where the crew sleeps; insure it                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Setup time**           | A turnkey trailer deploys in about 5 min (SunWing, maker claim)                                                                                                                                                                                                                                                                  | DIY: the battery and inverter pre-wired in their enclosure (or a trailer) are a 1–2 h job; a 26-panel ground array with anchors is about a half day for 4 people (Assumed). Build-week sun pre-charges the battery                                                                                                                                                                                                                                                                                                       |
| **Transport**            | Option A weighs roughly 1.5–1.8 t (4 × 140 kg batteries, 26 × 22 kg panels, racking, inverter); B roughly 2.3–2.8 t (reasoning)                                                                                                                                                                                                  | Does it fit on the Gate's truck or container? (Question 8)                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Inspection and rules** | No BMOrg page found requiring a permit for solar or limiting panel height. Art is registered through the Art Installation Questionnaire ([burningman.org](https://burningman.org/black-rock-city/bring-your-art/register-your-art/)). Fuel rules change yearly (an old cap: 110 gal per camp, 110 % containment; 2015, Reported) | Check the current year's art and power rules before relying on this                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### How other Burning Man camps do it

- **Solar is now the norm, not the exception.** In **2025, 59 % of placed camps
  had solar and 19 % dropped generators entirely**. **63 % of art installations
  used solar**, and 15 of 41 infrastructure grids were solar. **Over 16 MWh of
  batteries** were deployed across Burning Man's power grids and service camps.
  Generator run-time fell 59 %, because "batteries supply continuous power, and
  generators only kick on to charge them". That saved more than 24,000 gal of
  diesel ([Burning Man Journal, July 2026](https://journal.burningman.org/2026/07/black-rock-city/leaving-no-trace/the-race-to-decarbonize-black-rock-city/),
  Confirmed). That last pattern is Option C.
- **SOLARPUNKS' Solar Station** is the largest grid in BRC, with free charging for
  camps and art. Its 2022 microgrid: 48 kW PV, 233 kWh battery, 57 kW inverter
  ([ESS News](https://www.ess-news.com/?p=4851), Reported).
- **The Renewables for Artists Team (RAT)** offers free mentoring for renewably
  powered art, and free solar panels for pickup in BRC (the 2026 journal
  article above, Confirmed). It supplies no money, equipment or labour for
  builds (Reported). **Worth the owner's time; contacting them is the owner's
  call.**
- **Black Rock Solar** (2007–2017) installed 6.6 MW across about 100 Nevada
  projects and once rented panels to burners at $50 each (Reported,
  [Journal 2014](https://journal.burningman.org/2014/09/black-rock-city/survive-and-thrive/tap-the-sun-solar-camping-on-playa-with-raspa/));
  defunct.
- **The Alternative Energy Zone** has been a no-generator camp since about 2000
  ([IEEE Spectrum, 2012](https://spectrum.ieee.org/electrifying-burning-man),
  Reported).
- **Shade structures as arrays:** the brief calls this common. I found playa
  precedents (the Solar Library, the Knitwork Pavilion,
  [MIT News](https://news.mit.edu/2023/from-mit-to-burning-man-living-knitwork-pavilion-1013))
  but no costed design. Treat it as Reported.

---

## 8. Questions the owner must answer

1. **The speakers.** What system is it (amplifier models, powered speakers or
   not)? How many watts on average, for how many hours a night? Do they run by
   day too? Does it already have its own generator? Is powering it the Gate's
   job at all? Option B can't be sized without this. _Recommendation:_ meter it
   for one night, the same as the Gate.
2. **Must solar carry everything, or is a backup generator fine?**
   _Recommendation:_ a backup generator (Option C). It is what 2025's grids did,
   and it keeps B's extra $10–17K for something else.
3. **Measure the Gate.** An energy meter (kWh, and peak kW) on the feed for one
   full night and day. It replaces both the Reported 1.5–2 kW average and the
   **Assumed** 300–600 W daytime electronics load. Battery size follows it
   directly.
4. **What does power cost today?** The generator's rental, delivery and fuel
   per event (for James). That is the payback case, and it says whether the
   rental can auto-start (question 9).
5. **Where would the array go?**
   - Ground beside the Gate (about 90–120 m² for 12 kW), or a shade structure
     (is there one at the dance floor, or would one be welcome?).
   - Who cleans the panels every day or two?
6. **Buy or rent?** Is this an every-year asset (and where are 1.5–2.8 t of
   panels and batteries stored between events, ideally cool), or is one rented
   trial event first worth a quote?
7. **The feed size.** If the 50 A option replaces the L14-30
   (`docs/pricing-feed-options-2026-10.md`), the inverter must supply 50 A per
   leg. That probably means two units, even for the Gate alone (section 5).
8. **Transport:** is there room on the Gate's truck or container for another
   1.5–2.8 t?
9. **The generator for C:** keep the current rental on standby (can it
   auto-start on a two-wire signal?), or buy a 5.5 kW inverter generator?
10. **Where does this sit among the stretch goals**, and how much of the
    $25–50K range is realistic to raise?
11. **Other events:** does the Gate go anywhere besides Burning Man? A second
    event changes the buy case and the sun data.
12. **RAT:** do you want to talk to the Renewables for Artists Team (free
    mentoring, free panels)? I haven't contacted anyone.

## 9. Gaps in this research

- **Balance of system and enclosure cooling are unpriced Estimates.** The
  session's web-search budget ran out. Next pass: PV wire, MC4, combiner (e.g.
  MidNite MNPV), class-T fuses, busbars, a 9–12k BTU mini-split, a 48 V DC
  enclosure air conditioner.
- **Turnkey and battery-only rental prices are not published.** They need
  quotes, which need the owner's go-ahead.
- No measured soiling data for the playa.
- The temperature ratings of the cheap server-rack batteries (RUiXU, SOK,
  Jakiper) conflict between listings.
- The HELIOS charge-temperature range isn't on its datasheet.
- The sizing uses a typical year plus a synthetic dust storm. It is not a
  worst-case year. A two-day dust storm would need the generator in A and C,
  and would drain B to about its floor (reasoning).
