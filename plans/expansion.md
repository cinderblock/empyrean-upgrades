# Expansion

> **Who wrote this.** Most of this plan is an AI draft. 🧑 with a ledger id
> (H12) marks what a person said or approved (`docs/human-input.md`); 🤖 marks
> the AI's own call; anything unmarked is the AI's too. The site marks the
> same content block by block; `/review` walks through it.

## Goal

Leave room, in power, ports and network design, for devices V2 doesn't ship with
yet: **PoE cameras**, **streaming audio to speakers**, and whatever comes after.

## Known today

- The leading node switch (USW-Ultra) leaves **4 spare PoE+ ports per node** (30 W
  each, up to 202 W per switch), across 16 nodes around the ring.
- The ring is a daisy chain of gigabit links; sACN uses about 52 Mbps of it.
- The rig may double from 64 to 128 spokes later. Half of each PixLite's outputs
  are deliberately left free for it.

## Candidate uses

- **Cameras** (PoE): crowd and rig views, for streaming or monitoring. Each one
  adds steady traffic on the ring.
- **Streaming audio to speakers** (PoE or PoE-powered endpoints): a networked
  audio protocol over the ring. Audio needs low jitter, and that has to coexist
  with the sACN bursts.
- **128 spokes**: doubles sACN to about 104 Mbps. Still small for gigabit, but the
  PixLite side and power side both grow.

## Requirements this puts on the other categories

- Power: a per-node PoE budget beyond the switch's own draw. Size the 54 V
  supply with expansion in mind.
- Networking: VLANs to keep camera and audio traffic apart from sACN; QoS if audio
  shares links with the sACN bursts.
- Weatherproofing: expansion ports reachable from outside the node box.

## Findings from the pricing research

Source: `docs/pricing-2026-10.md` (research, 2026-10-21).

- **Cameras:** UniFi G6 Bullet ($233, 4K, IP66, −20 to 50 °C) over the G5 Bullet
  ($151, IP55, only to 40 °C). The UCG-Ultra **can't run Protect**; recording
  needs a UCG-Max ($307), which could replace it as the gateway.
- **Audio:** AXIS C1310-E Mk II PoE horn ($689, IP66, −40 to 60 °C, no AES67
  listed) or an Aurora DTX-AMP25-M Dante/AES67 PoE amp ($498; needs a speaker
  and a sealed box; temperature rating not found).
- **128 spokes (Assumed 12 V WS2815 60/m):** 403 m of strip, 86 BTF 5 m reels,
  $3,783–$5,044; BTF rates the strip −20 to 40 °C. Plus leads ($594–$914) and a
  supply set per segment ($97–$302 each). Doubles the mains load: more chains,
  GFCIs and circuits, not priced.
- Every device above fits a 30 W PoE+ port.

## Open questions

1. Which expansion is most likely first: cameras, audio, or 128 spokes?
2. Audio: which protocol (Dante, AES67, something simpler), and powered speakers or
   PoE endpoints with amplifiers?
3. Cameras: where would the video go (local recording, a stream off-site), and how
   much WAN bandwidth does that need?
4. How much PoE per node should V2 provision now?

## Progress

- [ ] Pick the first expansion target
- [ ] Per-node PoE and bandwidth budget
