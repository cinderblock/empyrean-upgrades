# Compute

> **Who wrote this.** Most of this plan is an AI draft. 🧑 with a ledger id
> (H12) marks what a person said or approved (`docs/human-input.md`); 🤖 marks
> the AI's own call; anything unmarked is the AI's too. The site marks the
> same content block by block, and takes reviews and feedback on it.

## Goal

A new show computer with a **better GPU** than V1's integrated Iris Xe, living in
the weatherproof brain box.

## Known today

- `empyreangate`: an Intel NUC, 12th-gen CPU with Iris Xe integrated graphics,
  Windows 11 Pro, Intel I225-V 2.5 GbE. Auto-login, powers on after power loss,
  Empyrean starts at login. Managed over SSH on the headscale tailnet.
- Empyrean renders every frame on the GPU through **Vulkan** (wgpu), at 24,192
  pixels and 60 fps, plus a live preview, video layers, node-graph patches and
  games.
- The software is Windows-first today; the show machine's setup notes are in
  `../Empyrean/plans/empyrean-gate.md` → "Show machine".

## Requirements

- A Vulkan-capable discrete (or much stronger integrated) GPU.
- Survives the brain box: heat from the sun, dust, no outside air.
- Powers on by itself after a power loss, and starts the show unattended.
- Wired Ethernet to the ring; a display output for the touch screen.

## Decisions already made (don't re-ask)

- **A new computer with a better GPU.** 🧑 H12.
- **The industrial show computer is in the V2 goal**, not a stretch goal.
  🧑 H28 ("v2"). 🤖 Which one is the AI's pick: the Neousys Nuvo-9160GC with
  an RTX 2000E Ada, $6,065–$7,160. The consumer build is a considered option
  only.
- **A VJ console as a stretch goal.** 🧑 H37: touch screen, buttons, sliders,
  knobs, "maybe even flying ones", on a USB-C dock over a long (fibre?) link.
  ⚠ 🤖 The AI ruled out the USB-C dock (no video on the show computer's
  USB-C) and read "flying" as motorised faders. Since H90 the idea is back
  in another form: the OREI pair extends a Thunderbolt port over Cat6a.
- **The console link extends the show computer's Thunderbolt port** with the
  OREI pair. 🧑 H79, H85, H90 (2026-11-09: "Current PC has "thunderbolt"
  connections, which send power, displayport, and USB2 data over a single
  USB-C connection. The OEI transceiver pair extends that USB-C... if our
  video card choice forces us to use something that has displayport and USB
  separate input/output plugs, we can consider that"). So the V2 computer
  should keep a Thunderbolt port; the Kramer pair is the fallback.

## Options to evaluate

- Small-form-factor PC with a low-profile discrete GPU.
- Fanless or sealed industrial PC with a discrete GPU.
- A mini PC with a strong integrated GPU (current AMD APUs) as the lower-power
  option.

## Findings from the pricing research

Source: `docs/pricing-2026-10.md` (research, 2026-10-21).

- **Only an industrial PC is rated for a sealed box in the sun.** The Neousys
  Nuvo-9160GC with an RTX 2000E Ada is −25 to 60 °C, fanless, 8–48 V DC,
  $6,065–$7,160. The Dell Pro Max Micro (RTX A1000, $3,629) is rated 0–35 °C;
  the mini PCs (UM890 Pro $919, Beelink SER8 $799) publish no rating.
- The site first budgeted a **small build with a low-profile RTX 5060**
  ($1,600–$2,000, Estimate) for V2, with the industrial PC as a stretch goal.
  Superseded 2026-10-21: the industrial PC is in the V2 goal.
- **DRAM prices are spiking** (Oct 2026): every 32 GB configuration carries it.
- The **UCG gateway** in the brain box is itself rated only to 40 °C (UCG-Max:
  −10 to 40 °C).
- **Backup power:** APC BE600M1 ($101, 0–40 °C) or a Mean Well DRS-240-24 DIN DC
  UPS ($200, −30 to 70 °C, feeds the industrial PC directly). Listed as an extra.
- Restore-on-AC-loss is undocumented for the consumer options.

## VJ console (stretch goal)

Asked for 2026-10-22: a **VJ console**, a USB-C dock-based unit that plugs
into the show computer over a long USB-C link (fiber-extended?) plus power,
with a good touch screen and physical controls: buttons, maybe sliders and
knobs, maybe motorized ("flying") faders. It goes on the stretch-goal ladder
(a normal-sized ask, not a big project), under Compute.

- Researched 2026-10-22: `docs/pricing-vj-console-2026-10.md`. On the site
  as Stretch goal 3 (before 128 spokes), option A "Simple", goal $4,500.
- **The USB-C dock idea doesn't work with this computer:** the Nuvo-9160GC's
  one USB-C port is data only (no DisplayPort Alt Mode, datasheet). Video
  comes from a GPU Mini DisplayPort; USB travels alongside; the extender's
  far-end box is the dock. USB 3 fiber cables are out too: they don't carry
  USB 2.0 devices (touch, MIDI).
- **Link by distance:** ~10 m DP fiber cable + Icron USB 2.0 extender
  $415–1,075; ~30 m two Kramer EXT3-XR-TR on one Cat6a (video, USB 2.0,
  Ethernet) $1,480–1,950 (or $900–1,330 two-cable); 50–100 m Black Box
  KVXLCDPF-100 over armoured fiber $900–1,840.
- **Options:** A Simple (faytech 15.6" industrial touch panel, −10 to 60 °C,
  sealed front; X-Touch Compact; Kramer link; hard case) $2.6–3.6K. B Full
  (21.5" panel, X-Touch + Midi Fighter Twister + Launchpad X, fiber, Pelican
  cases) $3.7–6.0K. C Custom (Teensy, motorized faders, custom case)
  $3.0–6.5K + 120–240 h. D Network console (a small PC at the booth running
  Empyrean's web UI over Ethernet) $1.4–3.3K + software work.
- Portable touch monitors are all 0–40 °C at best; the industrial panels cost
  about the same. The brain-box end of the extender is rated 40–50 °C, the
  same limit as the gateway.
- Recommendation: buy the X-Touch Compact ($309) first and build the MIDI
  mapping in the show app against it; then measure the cable route and buy
  the link for that distance.
- **Cable distance is not a constraint.** 🧑 H62: "if we get a fiber
  adapter, any length is possible." 🤖 So the fibre extender, sized for the
  longest likely run (100 m class).
- Open, for the user: whether the booth screen is the only
  screen; motorized faders a must?; who plays it; screen size; shade by day;
  the booth's power; how the cable runs; is a network console acceptable; a
  budget ceiling.
- **Software dependency:** the Empyrean app takes MIDI Timing Clock today but
  doesn't map MIDI controls (faders, knobs, buttons) to show parameters, nor
  drive motorized faders back. That is work in the Empyrean repo, not a cost
  here.

### The computer in the air (🧑 H55)

"Would be nice to put the computer in the air... but 20' is limit of normal
USB-C4... there are extender boxes that send the data over fiber that should
work, right?" **Yes.** The V2 brain box already sits in the truss (about 21
ft up) by the stage leg. Two working routes, both in the research:

- **Fibre KVM extender** (Black Box KVXLCDPF-100): DisplayPort video and USB
  2.0 (touch, MIDI) over one fibre, to 100 m and beyond. $900–1,840 with
  armoured fibre.
- **DisplayPort fibre cable + an Icron USB 2.0-over-fibre extender**:
  $1,300–2,000 at 50–100 m.

- **One Cat6a, copper** (🧑 H79, 2026-11-08: "let's us put the show
  computer up high and have a full featured console on the ground that
  plugs into a single CAT6A"): **OREI USB-C/DP + USB 3.2 extender, 115 ft**
  (`USB3-EXB130CR-K`,
  [orei.com](https://www.orei.com/products/usb-c-dp-usb3-2-extender-rs232-audio-extract-115ft-cat6a-usb3-exb130cr-k)).
  🧑 H83, from its listing: **$599.99** (regularly $669); 4K to 40 m, 5K
  to 35 m; DisplayPort Alt Mode 1.4a; USB 3.2 Gen 1 at up to 2.5 Gbps; the
  **transmitter's input is USB-C only**; the receiver has USB-C out plus
  three USB 3.2 ports (keyboards and mice listed, so USB 2 devices likely
  work); 24 V power over the cable from either end; audio and RS-232.
  🤖 About $900–1,350 less than the Kramer pair in the budget (`vj-link`,
  $1,480–1,950).
  ⚠ **The catch:** it needs a USB-C port that carries video (DP Alt
  Mode), and the Nuvo-9160GC's doesn't; its GPU has Mini DisplayPort
  only.
  **It plugs into the show computer itself** (🧑 H85: "the USB-C extender
  is fed from the main show computer so we have direct control on the
  touch screen"). 🤖 So the show computer needs a video-carrying USB-C or
  Thunderbolt port (the console's screen can run from the integrated
  graphics). Searched 2026-11-08:
  - No adapter was found that merges DisplayPort and USB into a USB-C
    source; Delock's (61059) takes DP to USB-C for video and power only,
    no USB data.
  - Neousys's RTX 2000E fanless machines (Nuvo-9160GC, GT-92GC,
    SEMIL-1300GC) list no video USB-C.
  - **OnLogic Karbon 520** (fanless, rugged) lists **2 × Thunderbolt 4**
    and 2 × DP; whether it takes an Ada GPU and its temperature range are
    not checked. A candidate to replace the Nuvo if this route wins.
  - **The current show PC** (the NUC) has Thunderbolt carrying DP and USB
    on one USB-C (🧑 H90, Reported 2026-11-09), so the OREI pair works
    with it today.
  - 🤖 The graphics card doesn't have to feed the console: on most PCs the
    Thunderbolt port carries the CPU's own graphics, which is plenty for
    the console's screen while the card renders the show. What decides it
    is whether the V2 computer has a Thunderbolt port with video, and the
    Nuvo-9160GC doesn't. ⚠ So the leading computer and the leading link
    don't fit together yet: check the Karbon 520 (or another rugged
    computer with Thunderbolt) before buying either.
  - The Kramer pair in the budget is also fed from the show computer (DP
    and USB separately), so it gives the same direct control with the
    current computer. Also not checked: its temperature rating for the
    brain box, and MIDI and touch in practice. 35 m starts 21 ft up, so the
    booth must be within about 28 m of the stage leg.

Not USB4/Thunderbolt optical cables: the Nuvo-9160GC's USB-C port carries no
video, and those cables don't carry USB 2.0 devices.

## Open questions

1. What is "better" measured against? Which features or loads are limited by
   today's Iris Xe? Run Empyrean's GPU regression suite (`../Empyrean/README.md`,
   24,192-pixel size) on the current machine to get a baseline first.
2. Stay on Windows, or move to Linux?
3. Power budget for the brain box, and the heat a discrete GPU adds inside a
   sealed box in the sun.
4. Does the touch screen live at the brain box, or somewhere else (DJ booth)?
5. Keep the current NUC as a backup? (Empyrean supports a follower/backup
   machine.)

## Progress

- [ ] Baseline benchmark on the current show machine
- [ ] Find a rugged V2 computer with the GPU and a video Thunderbolt port
      (check OnLogic Karbon 520 first), or fall back to the Kramer pair (H90)
- [ ] Define "better": target loads
- [x] Shortlist machines (three tiers priced; `docs/pricing-2026-10.md`)
