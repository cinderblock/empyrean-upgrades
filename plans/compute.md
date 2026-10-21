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

- (none yet)

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
- The site budgets a **small build with a low-profile RTX 5060** ($1,600–$2,000,
  Estimate) for V2, and the industrial PC as the "Built for the heat" stretch
  goal (the difference, $4,065–$5,560).
- **DRAM prices are spiking** (Oct 2026): every 32 GB configuration carries it.
- The **UCG gateway** in the brain box is itself rated only to 40 °C (UCG-Max:
  −10 to 40 °C).
- **Backup power:** APC BE600M1 ($101, 0–40 °C) or a Mean Well DRS-240-24 DIN DC
  UPS ($200, −30 to 70 °C, feeds the industrial PC directly). Listed as an extra.
- Restore-on-AC-loss is undocumented for the consumer options.

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
