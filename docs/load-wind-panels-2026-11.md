# Ring load and wind check: panels and batteries on the Tomcat ring

Research notes, 2026-11-08. Not an engineering calculation. Tags: **Confirmed** (manufacturer
document, linked), **Reported** (third party / forum / news), **Assumed** (my input value),
**Reasoning** (my arithmetic or engineering judgement on the above).

## 1. Tomcat 12" light-duty load data

Source: Tomcat catalogue pages 24-25, "Light duty truss 12 x 12 plated" (www.tomcatglobal.com
footer), hosted by dealer MTN:
https://cdn.shopify.com/s/files/1/0923/3012/files/BT_Light-duty-truss-12-x-12-plated.pdf
(Tomcat's own download page needs a login: https://www.tomcatglobal.com/products/light-duty-12-truss)

Confirmed (that PDF):

- Chords 2" OD x 1/8" Al, diagonals 1" OD x 1/8" Al, 10 ft section 61 lb (28 kg).
- Load tables "reprinted from engineering reports developed by Parkhill, Smith & Cooper";
  apply to truss built after December 1989; based on 10 ft sections; deflections are
  "for full loadings (indoors only)". Bolted plates: 5/8" Grade 8 bolts through 3/8" gussets.
- Simply supported straight spans:

| Span          | UDL lb/ft | UDL total         | Centre point      | Third points (each) | Quarter points (each) |
| ------------- | --------- | ----------------- | ----------------- | ------------------- | --------------------- |
| 20 ft (6.1 m) | 106       | 2,120 lb (962 kg) | 1,063 lb (482 kg) | 797 lb              | 531 lb                |
| 30 ft (9.1 m) | 43        | 1,290 lb (585 kg) | 650 lb (295 kg)   | 487 lb              | 325 lb                |

- Not stated: safety factor, whether self-weight is deducted, lateral (horizontal) or uplift
  ratings, torsion, wind, or anything for curved/circular truss. No Tomcat data found for
  circles (TC 1212-60D16B) anywhere public.

Reasoning, 23.6 ft (7.2 m) clear span between legs if the arc were straight:

- UDL by moment scaling from the 20 ft row: 106 x (20/23.6)^2 = ~76 lb/ft = ~1,800 lb
  (~815 kg) total. Linear interpolation gives ~1,820 lb. Use ~1,750-1,800 lb.
- Centre point: 1,063 x 20/23.6 = ~900 lb (~410 kg).

Curvature (Reasoning; maker silent): a 23.6 ft arc on a 30 ft radius bows 2.3 ft
(30 x (1 - cos 22.5°)) off the straight line between legs. Gravity load on that arc
causes torsion as well as bending, and the ring is spliced mid-span (two 11.8 ft segments
per span), so the straight-span table is an upper bound, not a rating. Ask Tomcat
(sales@tomcatusa.com) for the circle's rating; only they or an engineer can give it.

Added gravity load per span (2 segments):

- 4 panels x 21 kg = 84 kg (Assumed, from the brief).
- Racking ~4 kg/panel = 16 kg (Assumed).
- 4-8 batteries x 11 kg = 44-88 kg, plus boxes ~5-10 kg (Assumed).
- Total ~150-200 kg = 330-440 lb (Reasoning) = ~20-25% of the straight-span UDL above.
- Existing loads not counted, weights unknown: LED spokes (and the hub's share), node box,
  power box, cabling, the truss self-weight question.
- Verdict (Reasoning): gravity alone looks comfortable on a straight-span basis, but the
  curved-truss rating is unknown and wind (below) is the governing case, not gravity.

## 2. Wind

Design wind speeds:

- Burning Man: no numeric design wind speed in the art guidelines. They ask an engineer to
  pick "the appropriate wind speed" (Confirmed, BM page):
  https://burningman.org/black-rock-city/bring-your-art/art-installation-guidelines/building-safe-structures/
- Burning Man weather page: "The desert wind can whip up to speeds exceeding 75 mph in an
  instant" (Confirmed, BM page): https://burningman.org/black-rock-city/preparation/playa-living/weather/
- Measured: 52 mph gust at the BRC airport station, 2025-08-23 5:50 PM PDT (Reported, SF
  Chronicle via search; an 8-ton art piece was destroyed in that storm, Reported, multiple outlets).
- Forum: designers cite 80-100 mph; one claims Washoe County code 130 mph; a 2002 storm
  "70 mph sustained, gusts over 100" (Reported, ePlaya, unverified).
- ASCE 7 site wind speed for Pershing County not looked up (do it on the ASCE Hazard Tool).
  Recalled, not verified: ASCE 37 lets temporary structures under 6 weeks use 0.75 x V.
- Exposure: ASCE 7 puts mud flats / salt flats in Exposure D (Reasoning, recalled); the
  playa is the textbook case. Kz at 22 ft: 0.92 (C) / 1.10 (D) (Reasoning, ASCE formula).

Method (Reasoning): p = 0.613 Kz Kd V^2 x G x CN, Kd 0.85, G 0.85, V = 3 s gust.
CN for a flat-ish panel row: ASCE 7 open monoslope roof (Fig 27.3-4) gives |CN| around
1.1-1.2 at 0° (recalled, not verified), and its h/L limits do not fit a 1.13 m-wide strip
21 ft up, so I bracket CN 1.2-1.5. Panel area 1.944 m², 32 panels = 62.2 m² (669 ft²).

Net normal (mostly uplift) force on panels, Exposure D:

| Gust    | Per panel                | Per span (4)                 | All 32 panels                 |
| ------- | ------------------------ | ---------------------------- | ----------------------------- |
| 52 mph  | 0.6-0.8 kN (140-170 lbf) | 2.5-3.1 kN (550-690 lbf)     | 20-25 kN (4,400-5,500 lbf)    |
| 75 mph  | 1.3-1.6 kN (290-360 lbf) | 5.1-6.4 kN (1,150-1,440 lbf) | 41-51 kN (9,200-11,500 lbf)   |
| 90 mph  | 1.8-2.3 kN (410-520 lbf) | 7.4-9.2 kN (1,660-2,070 lbf) | 59-74 kN (13,200-16,600 lbf)  |
| 105 mph | 2.5-3.1 kN (560-700 lbf) | 10-12.5 kN (2,250-2,820 lbf) | 80-100 kN (18,000-22,500 lbf) |

Exposure C is about 17% lower. All Reasoning.

What that means (Reasoning):

- Panel weight is 206 N each (6.6 kN for 32). At 75 mph uplift is ~6x panel weight, so
  clamps and racking-to-truss connections must carry ~1.3-1.6 kN each, upward.
- Per span, 75 mph uplift ~5.1 kN (1,150 lbf) is ~50 lb/ft upward, reversing the load the
  Tomcat tables cover (gravity only, indoors). Plated bolted joints and slender diagonals
  must then work in reverse; no maker data.
- Whole rig dead weight, rough: ring ~1,150 lb if ~6.1 lb/ft like straight truss (Assumed),
  legs 8 x 2 x 61 lb = ~980 lb, panels ~1,480 lb, batteries ~375-750 lb: ~18-20 kN plus
  unknown spokes/boxes. Uplift at 52 mph (~20 kN) roughly equals that; at 75 mph (~41 kN)
  it is about double. Without hold-downs at the leg bases, the ring with panels lifts in a
  storm the playa already produced. Net ~22 kN at 75 mph = ~2.8 kN (620 lbf) per leg.
  BM's own anchors are 3,000 lb vertical tension, "NOT rated for shear" (Confirmed, BM page).
- Horizontal: flat panels add little drag edge-on (~2-4 kN at 75 mph, Assumed edge+racking
  area ~4 m²). At 10° tilt the normal force has a horizontal part of sin 10° = 0.17:
  ~7-9 kN at 75 mph, applied at 21.5 ft. Steeper tilt grows it fast and adds windward
  pressure.
- Asymmetric pressure across the 1.13 m panel (windward edge loaded more, ASCE "case B")
  twists the truss: ~0.6 kN·m per span at 75 mph (Reasoning, rough).
- Sail area vs bare truss (Reasoning, rough): ring + 8 legs as lattice ~20-25 m² of
  Cf x A (chords 2" give ~45% solidity per face). Flat panels add 62 m² of near-solid
  plate, horizontal: small edge-on, ~11 m² effective at 10° tilt. Vertical: ~75-95 m²
  effective, which the bare truss essentially lacks. The panels turn a see-through ring
  into a wing.
- Overturning (qualitative): more horizontal load at the ring height means more guy tension
  and more shear at the lag bolts (which carry shear badly in playa mud). Uplift on the ring
  unloads the legs, so guys that rely on dead weight to stay effective lose it, and legs go
  into tension. Dust devils give rotating, vertical and sudden gusts, which load panels as
  levers on racking.

## 3. Standard mitigations

- Wind management plan with a logging anemometer and stated limits (ANSI E1.21 practice for
  temporary outdoor structures): design an operational limit and a survival limit. Panels
  stowed above X mph only works if stowing is quick. 32 x 21 kg panels at 21 ft cannot come
  down in the minutes before a playa storm, so in practice design for survival with panels on.
- Put the panels on the ground (ballasted ground racks, low tilt) and run DC up. Removes
  uplift, sail and weight from the ring. Usual answer for playa solar.
- Fewer/smaller panels on the ring (load scales with area).
- Lowest tilt (0-5°) cuts horizontal load; uplift stays.
- Gaps between panels and around edges reduce net pressure (perforated/mesh does not exist
  for PV cells; flexible/lightweight panels cut weight, not wind).
- Positive hold-down at each leg base, rated anchors; engineered panel clamps.
- Burning Man paperwork for over 20 ft (Confirmed, BM page): everything from the lower tiers
  (drawings, materials, anchor details, uplift and bearing calcs, construction drawings,
  rigging forces, wind and gravity loads with inputs) plus "the engineering calculation
  package (if available)". BM has started requiring third-party peer review for larger
  installations (Reported, STRUCTURE mag: https://www.structuremag.org/article/black-rock-lighthouse-service/).

## Gaps

- Tomcat circle (curved) rating, lateral and uplift ratings: ask Tomcat.
- ASCE 7 site wind speed and exact CN: an engineer with the code.
- Spoke, hub, node box and power box weights.
