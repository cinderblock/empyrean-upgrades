# V1 hardware: what is installed today

Every fact has a confidence and a source. Keep it that way when adding to this file.

- **Confirmed**: measured, verified against the rig, or from a datasheet.
- **Reported**: the user said so (dated), not independently verified.
- **Assumed**: inferred; treat as a guess until confirmed.
- **Unknown**: needed for V2, not yet known. These are the gaps to fill.

`Empyrean/` below means the show-software repo at `../Empyrean`.

## Structure and geometry

| Fact                                                           | Confidence           | Source                                       |
| -------------------------------------------------------------- | -------------------- | -------------------------------------------- |
| A ring of **16 truss segments**                                | Reported 2026-10-21  | User                                         |
| 64 LED spokes in a radial "wagon wheel", viewed from below     | Confirmed            | `Empyrean/plans/empyrean-gate.md`            |
| Outer diameter **60 ft** (was recorded as about 50 ft)         | Reported 2026-10-21  | James Logistic, via the user                 |
| Inner diameter about 15–20 ft                                  | Reported (uncertain) | same                                         |
| 378 pixels per spoke, 24,192 total                             | Confirmed 2026-08-23 | same                                         |
| Each strip is fed from the outside (pixel 0 at the outer ring) | Confirmed 2026-08-23 | same                                         |
| 4 spokes per truss segment (64 / 16)                           | Assumed              | Arithmetic; matches 4 strings per controller |
| LED density: 30 or 60 LED/m                                    | Unknown              | The software defaults to 60                  |
| Pixel chipset, strip voltage, watts per pixel                  | Unknown              |                                              |

## Pixel controllers ("nodes")

| Fact                                                                                                        | Confidence                                    | Source                                |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------- |
| 16× **Advatek PixLite E4-S Mk3**, one per node box                                                          | Reported 2026-10-20                           | User                                  |
| 1 × 10/100 Ethernet port (no pass-through port)                                                             | Confirmed                                     | E4-S Mk3 datasheet (2025-02-25)       |
| 4 outputs × 6 universes, or 8 × 3 in expanded mode; 24 universes total                                      | Confirmed                                     | datasheet                             |
| 5–24 V DC input, 2.5 W max                                                                                  | Confirmed                                     | datasheet                             |
| −20 to 70 °C ambient; ABS enclosure; DIN-rail mount (optional accessory)                                    | Confirmed                                     | datasheet                             |
| Answers Advatek "DiscProt" discovery (Mk3+)                                                                 | Confirmed in code, untested on the real boxes | `Empyrean/src-tauri/src/discovery.rs` |
| 4 strings wired per controller (every other output); the unused half is reserved for doubling to 128 spokes | Confirmed                                     | `Empyrean/plans/empyrean-gate.md`     |
| Patch: 6-universe block per spoke (3 carry data), spoke N starts at universe 1 + 6N, 192 data universes     | Confirmed                                     | same, and `Empyrean/README.md`        |

Datasheet: <https://www.ac-et.com/storage/product_images/advatek/e4_s_mk3/pixlite-e4-s-mk3-datasheet_20250225.pdf>

## Node boxes

| Fact                                                     | Confidence          | Source |
| -------------------------------------------------------- | ------------------- | ------ |
| One node box per PixLite (16)                            | Reported 2026-10-19 | User   |
| Each box has a 12 V supply today                         | Reported 2026-10-20 | User   |
| What the 12 V supply feeds (PixLite only, or pixels too) | Unknown             |        |
| Enclosure model, IP rating, cable entry                  | Unknown             |        |
| Where the pixel power supplies are, and how many         | Unknown             |        |

## Power distribution

| Fact                                                                      | Confidence          | Source                        |
| ------------------------------------------------------------------------- | ------------------- | ----------------------------- |
| 110 VAC to the truss, over cables and plugs that are **not weatherproof** | Reported 2026-10-21 | User                          |
| Power source (generator, grid, how many circuits, amps per circuit)       | Unknown             |                               |
| Average draw of the whole Gate in operation: about **1,500–2,000 W**      | Reported 2026-10-21 | User                          |
| Total load: pixels at full white, plus everything else                    | Unknown             | Needs pixel watts (see above) |

## Network

| Fact                                                                                | Confidence                             | Source                           |
| ----------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------- |
| One central switch, every node homed to it                                          | Reported 2026-10-19                    | User                             |
| Gateway: a UniFi Cloud Gateway (UCG) running the UniFi Network app on-prem          | Reported 2026-10-20                    | User; exact model Unknown        |
| WAN varies by event: Starlink, the Burning Man uplink, or a local Ethernet cabinet  | Reported 2026-10-20                    | User                             |
| sACN load about 52 Mbps at 60 fps, sent as one burst per frame                      | Confirmed (calculation from the patch) | `Empyrean/plans/gate-network.md` |
| Software supports unicast to each controller, by fixed IP or by MAC (auto-resolved) | Confirmed                              | `Empyrean` commit `34644f2`      |

## Show computer ("brain")

| Fact                                                                                                   | Confidence                        | Source                                                                                        |
| ------------------------------------------------------------------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------- |
| Hostname `empyreangate`: an Intel NUC, 12th-gen CPU with **Iris Xe integrated graphics** (device 46A6) | Confirmed 2026-08-23 / 2026-09-12 | `Empyrean/plans/empyrean-gate.md` ("Show machine"), `Empyrean/plans/show-feedback-2026-09.md` |
| Windows 11 Pro; Intel I225-V 2.5 GbE NIC                                                               | Confirmed                         | same                                                                                          |
| Auto-login, powers on after power loss, the app starts at login                                        | Confirmed                         | same                                                                                          |
| Multi-touch display; a 2560 × 1080 panel has been seen on it                                           | Reported                          | `Empyrean/README.md`                                                                          |
| Exact NUC model, RAM, storage                                                                          | Unknown                           |                                                                                               |
| The software needs a Vulkan-capable GPU                                                                | Confirmed                         | `Empyrean/README.md`                                                                          |

An older note in `Empyrean/plans/empyrean-gate.md` calls the show machine "an older
Mac mini". The later "Show machine" section supersedes it.

## Site and operation

| Fact                                                                  | Confidence          | Source                                                            |
| --------------------------------------------------------------------- | ------------------- | ----------------------------------------------------------------- |
| Deployed on the playa at Burning Man (heat, alkaline dust, sun, wind) | Assumed (strong)    | Empyrean README mentions the trash fence and BRC event categories |
| Boxes stay powered all day; the lights do not run by day              | Reported 2026-10-20 | User                                                              |
| Boxes sit in a sealed outer box in the sun                            | Reported 2026-10-20 | User                                                              |
| People are still at the Gate at 5 am                                  | Reported 2026-08-21 | `Empyrean/plans/empyrean-gate.md`                                 |
