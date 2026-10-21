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
- [ ] Shortlist machines
