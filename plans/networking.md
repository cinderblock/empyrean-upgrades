# Networking

> **Who wrote this.** Most of this plan is an AI draft. 🧑 with a ledger id
> (H12) marks what a person said or approved (`docs/human-input.md`); 🤖 marks
> the AI's own call; anything unmarked is the AI's too. The site marks the
> same content block by block, and takes reviews and feedback on it.

## Goal

A managed switch in every node box, daisy-chained around the ring, so that cable
runs stay inside each truss segment and every node has **spare ports for
expansion** (PoE devices; see `plans/expansion.md`).

Most of this was worked through in the Empyrean repo first:
`../Empyrean/plans/gate-network.md`. That plan has the full reasoning, spec
links and gotchas; this file summarises it and tracks what V2 still needs.

## Known today

- One central switch; every node homed to it.
- UniFi Cloud Gateway (UCG) running the UniFi Network app on-prem.
- PixLite E4-S Mk3: a single 10/100 port per node.
- sACN about 52 Mbps at 60 fps, as one unpaced burst per frame.

- **V1 cabling** (`EG Network Cabling.pdf`, 2026-10-21): a home run from the
  switch by the stage to each controller, 7 to 100 ft, **893 ft** in all
  (`docs/v1-hardware.md`). V2's ring needs about 325 ft.

## Decisions already made (don't re-ask)

- **Ring of switches, one per node box, ring closed.** 🧑 H01 ("daisy chain
  switches around the run, and let [R]STP drop a link"), 🧑 H03 ("Boxes get
  switches"), 🧑 H11. 🤖 A 16-switch ring is inside RSTP's default 20-hop limit.
- **Unicast sACN**, by fixed IP and by MAC. 🧑 H08 ("Both should be
  supported"), after the user asked whether fixed IPs allow unicast. 🤖 The
  reason (10/100 PixLites, multicast without IGMP snooping overruns small
  switches' buffers) is the AI's analysis.
- **WAN can plug in at any node.** 🧑 H02 ("it would be nice if we could plug
  the WAN connection into an arbitrary port around the ring"). 🤖 The
  mechanism is the AI's: a VLAN-only "WAN transport" network (e.g. VLAN 4000)
  tagged on the ring links, one labelled port on every switch native VLAN
  4000; the UCG's WAN port plugs into any of those, its LAN port into any
  ordinary port.
- **PoE comes from each node box's switch.** 🧑 H06. 🧑 H07: the boxes have a
  12 V supply and will get a 48 V one.
- **Leading switch: UniFi USW-Ultra**, the user's pick, "maybe with the 210W
  adapter… or an aftermarket one" (🧑 H09). 🤖 Powering it from the box's own
  supply rather than the 210 W adapter is the AI's call. **The Industrial
  DIN 8 PoE is a stretch goal** (🧑 H09: "it like doubles the cost"). 🤖 The
  AI priced it at about 2.5×, not 2×.

## The USW-Ultra in a node box

- 8 × GbE: ring in, ring out, PixLite, WAN (labelled), and 4 spare PoE+ ports
  (30 W/port) for expansion. The eighth port is the PoE++ _input_.
- DC input 50–57 V on a 5.5 × 2.1 mm barrel. Run the box's "48 V" supply at about
  54 V (PoE+ needs at least 50 V at the switch). PoE budget up to 202 W.
- Rated −20/−30 to 60 °C. The official 210 W adapter is rated only 0–40 °C, which
  is why it is not used.
- No IGMP snooping (fine with unicast).
- Spec: <https://techspecs.ui.com/unifi/switching/usw-ultra>

## Findings from the pricing research

Source: `docs/pricing-2026-10.md` (research, 2026-10-21).

- **USW-Ultra is $142** with the store's surcharge ($129 base), not $129.
  Ubiquiti lists the 202 W PoE budget **only with the 210 W adapter**; nothing
  confirms the bare SKU can be set to it on a third-party 54 V supply. If not,
  the USW-Ultra-210W kit is $219 (+$1,309 for 17).
- The **Industrial DIN 8 PoE** is $362 (2.5× the Ultra, not "about twice"),
  −30 to 70 °C, 8 × 60 W PoE, 44–57 V DC. **Listed "available November 2026".**
  Now the networking half of the "Built for the heat" stretch goal.
- **Joints:** etherCON NE8MXR1-B-TOP plug ×2 + NE8FFX6-W inline coupler, about
  $61 a joint; IP65 mated, or unmated with the SCMX-TOP cap. −30 to 80 °C.
  Amphenol RJField has no inline coupler (box-mount only), about $310 a joint.
- **Cable:** UISP Cable Pro ($135 / 1000 ft) is shielded Cat5e, solid core,
  UV-rated, −40 to 80 °C: fine fixed along the truss, not for flexing at
  joints. Stranded tactical Cat6A (about $646 for 325 ft, on the 60 ft ring) is the flexible option.

## Open questions

1. Bench checks on a real Ultra: barrel polarity (expected centre positive), and
   whether the PoE++ input port passes data when the switch runs on DC.
2. Does a sealed node box in the sun stay under 60 °C inside? Log one.
3. UniFi per-port STP / BPDU filtering on the WAN port, for upstream networks that
   run STP (deferred by the user: "eventually/later").
4. Cable between segments: outdoor-rated Ethernet, and the watertight connector at
   each joint (shared problem with `plans/power.md` and `plans/weatherproofing.md`).
5. Where does the UCG live: in the brain box?

## Progress

- [x] Topology, sACN mode and WAN design (in the Empyrean repo)
- [x] Controller addressing by IP or MAC (Empyrean `34644f2`)
- [ ] Choose the switch (leaning USW-Ultra) and buy one for bench checks
- [ ] Heat check in a real box
- [x] Price a watertight Ethernet joint (etherCON plug + inline coupler)
- [ ] UniFi configuration written down: VLANs, port profiles, RSTP root priority
