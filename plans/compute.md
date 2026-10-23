# Compute

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

- **The fanless industrial PC is the V2 show computer** (user, 2026-10-21):
  the Neousys Nuvo-9160GC with an RTX 2000E Ada, $6,065–$7,160, in the V2
  goal. The consumer build is a considered option only.

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
- **Cable distance is not a constraint** (user, 2026-10-23): "if we get a fiber
  adapter, any length is possible." So the fibre extender, sized for the
  longest likely run (100 m class).
- Open (user): whether the booth screen is the only
  screen; motorized faders a must?; who plays it; screen size; shade by day;
  the booth's power; how the cable runs; is a network console acceptable; a
  budget ceiling.
- **Software dependency:** the Empyrean app takes MIDI Timing Clock today but
  doesn't map MIDI controls (faders, knobs, buttons) to show parameters, nor
  drive motorized faders back. That is work in the Empyrean repo, not a cost
  here.

### The computer in the air (user, 2026-10-22)

"Would be nice to put the computer in the air... but 20' is limit of normal
USB-C4... there are extender boxes that send the data over fiber that should
work, right?" **Yes.** The V2 brain box already sits in the truss (about 21
ft up) by the stage leg. Two working routes, both in the research:

- **Fibre KVM extender** (Black Box KVXLCDPF-100): DisplayPort video and USB
  2.0 (touch, MIDI) over one fibre, to 100 m and beyond. $900–1,840 with
  armoured fibre.
- **DisplayPort fibre cable + an Icron USB 2.0-over-fibre extender**:
  $1,300–2,000 at 50–100 m.

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
- [ ] Define "better": target loads
- [x] Shortlist machines (three tiers priced; `docs/pricing-2026-10.md`)
