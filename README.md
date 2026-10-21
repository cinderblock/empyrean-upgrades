# Empyrean Upgrades

Planning for **Version 2** of the Empyrean Gate's physical installation: power,
networking, compute, weatherproofing, and room to expand.

The Gate is a 50 ft ring of 16 truss segments carrying 64 LED spokes over a dance
floor, driven over sACN by the [Empyrean](../Empyrean) software. V1 works, but its
power and enclosures are not weatherproof, its network is one central switch, and
its show computer is an integrated-graphics mini PC. This repo is where the V2
upgrade is worked out before anything is bought or built.

## Upgrade categories

| Category        | Goal                                                                                                                                                  | Plan                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Power           | Replace V1's non-weatherproof 110 VAC cables and plugs with watertight, daisy-chained segments permanently installed in each of the 16 truss segments | [plans/power.md](plans/power.md)                     |
| Networking      | A switch in every node box, daisy-chained around the ring, with spare ports for expansion                                                             | [plans/networking.md](plans/networking.md)           |
| Compute         | A new show computer with a better GPU                                                                                                                 | [plans/compute.md](plans/compute.md)                 |
| Weatherproofing | New node and brain boxes, living inside the truss beside separate power boxes                                                                         | [plans/weatherproofing.md](plans/weatherproofing.md) |
| Expansion       | Future PoE devices: cameras, streaming audio to speakers                                                                                              | [plans/expansion.md](plans/expansion.md)             |

## Reference

- [docs/v1-hardware.md](docs/v1-hardware.md): what is installed today, with how
  sure we are of each fact and where it came from.
- [docs/requirements.md](docs/requirements.md): constraints every category shares
  (site conditions, the power/data separation rule, serviceability).

## Status

Seeded 2026-10-21. Every plan is a skeleton: known facts and open questions, no
designs yet. Networking is furthest along, because it was worked through in the
Empyrean repo first (`plans/gate-network.md` there).

## Related repos

- `../Empyrean`: the show software (TomSawyerLabs/empyrean-gate). Its README and
  `plans/` hold most of what is known about V1 hardware.
- `../ops`: infrastructure-as-code for the servers. Gate network devices are not in
  it yet.
