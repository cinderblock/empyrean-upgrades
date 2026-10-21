# Expansion

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
