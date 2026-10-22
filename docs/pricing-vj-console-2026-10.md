# VJ Console: pricing, October 2026

A **stretch goal**: a "VJ Console" at the booth near the stage. It is a touch screen
plus physical controls (buttons, knobs, sliders, maybe motorized faders), linked to
the V2 show computer over a long cable. The show computer is the **Neousys
Nuvo-9160GC with an RTX 2000E Ada** (`plans/compute.md`). It sits in the sealed
brain box in the truss by the stage leg. It runs Empyrean: Windows 11, a multi-touch
UI, Vulkan rendering. The console has its own power from the Gate's local 20 A outlet.

**Method.** Specs and prices were checked on **2026-10-21 and 2026-10-22** by
read-only browsing. Nothing was ordered, carted or quoted, and no vendor was
contacted. Many retailer pages (B&H, Sweetwater, Amazon, DigiKey, Odyssey, Pelican)
blocked automated reading, so many prices are search-snippet or aggregator only
(Quoted\*). The session's web-search budget ran out before every gap was closed; the
gaps are listed in "Not yet checked" at the end. EUR prices are converted at an
**assumed** 1 EUR ≈ 1.15 USD and DKK at 1 DKK ≈ 0.154 USD; current rates were not
checked. Prices are before tax, and before shipping unless a line says otherwise.

**Confidence key** (same as the other `docs/pricing-*.md` files)

| Mark          | Meaning                                                               |
| ------------- | --------------------------------------------------------------------- |
| **Quoted**    | Price seen today on the retailer or maker page at the URL given       |
| **Quoted\***  | Price seen only in a search snippet or a price aggregator. Recheck it |
| **Estimate**  | A range from comparable parts, or no price found                      |
| **Confirmed** | Spec read in a manufacturer datasheet, manual or spec page            |
| **Reported**  | Spec from a retailer, secondary article, forum or snippet             |
| **Assumed**   | Depends on an unchecked fact; the assumption is named                 |
| **Unknown**   | Looked for and not found                                              |

Anything marked **(reasoning)** is my inference, not a cited fact.

---

## Summary

- **The "one USB-C cable to a USB-C dock" idea doesn't work with this computer.**
  The Nuvo-9160GC has a single USB-C port: USB 3.2 Gen 2x2, 20 Gbps, with a screw
  lock. Its datasheet lists video only on the integrated-graphics VGA, DVI-D and DP
  connectors. It has no DisplayPort Alt Mode, Thunderbolt or USB4 (Confirmed,
  [datasheet, last updated 8 Sep 2026](https://neousys-web-bucket.s3.us-west-1.amazonaws.com/datasheet/nuvo-9160gc-intel14th-gpu-embedded-computer.pdf)).
  - **Video should come from one of the GPU's four Mini DisplayPort 1.4a outputs.**
    The app renders on that GPU. Driving the console from the integrated-graphics
    DP instead would make Windows copy every frame between adapters (reasoning).
  - **USB travels separately.** Touch and MIDI controllers are USB 2.0 devices.
  - So the console end needs no USB-C dock. **The extender's receiver is the dock**:
    it gives HDMI or DP plus USB-A ports. Add a small powered hub only if more ports
    are needed.
- **Trap: USB 3 fibre cables don't carry USB 2.0 devices.** SIIG and Tripp Lite say so
  explicitly. Touch screens and USB MIDI controllers are USB 2.0, so they won't work
  over these cables. The same goes for "keyboard/mouse" KVM extenders with 1.5 Mbit/s
  ports, such as the StarTech FD121: MIDI won't pass. Every extender below passes
  full USB 2.0.
- **The link, by distance** (detail in Section 1):

  | Distance | Recommended link                                                                                                                                                                                        | Cost                        |
  | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
  | ~10 m    | A 10 m DP 1.4 fibre cable from the GPU, plus an Icron Ranger 2311 or 2304 USB 2.0 extender over Cat6                                                                                                    | $400–1,050                  |
  | ~30 m    | **Two Kramer EXT3-XR-TR HDBaseT 3.0 units** on one shielded Cat6a cable: uncompressed 4K60 HDMI, full USB 2.0 and 1 GbE Ethernet. The cheaper two-cable route: a 30 m DP fibre cable plus an Icron 2304 | $1,480–1,950, or $900–1,330 |
  | 50–100 m | **Fibre.** A Black Box KVXLCDPF-100 (DP plus transparent USB 2.0, 1080p60, 4K30 maximum) over tactical multimode fibre. Or a DP fibre cable plus an Icron Ranger 2324 (USB 2.0, 500 m multimode)        | $900–1,800                  |

- **Every extender's computer-side unit is rated only 0–40 °C (Kramer) or 0–50 °C
  (Icron, Black Box), and it goes in the brain box beside the Nuvo** (rated −25 to
  60 °C). This is the same limit the UCG gateway already sets (40 °C,
  `plans/compute.md`), so the brain box's cooling has to hold that limit anyway. The
  Kramer unit also draws up to about 38 W (12 V, 3.2 A), which adds heat in the box.
- **The screen: a 15.6" or 21.5" industrial PCAP panel rather than a portable monitor.**
  - The faytech FT156TMCAPOB (15.6") and FT215TMCAPOB (21.5") are rated **−10 to
    60 °C** with an **IP65 front**. They take DP or HDMI and run on 12 V DC. They cost
    $566–703 delivered, about what a good portable costs.
  - Every portable touch monitor found is rated **0–40 °C or worse**.
- **The controls:**
  - **Simple:** a Behringer X-Touch Compact ($309), 9 motorized faders and 16
    encoders.
  - **Full:** an X-Touch ($419) plus a Midi Fighter Twister ($270) plus a Novation
    Launchpad X ($220), $909 in all.
  - All are class-compliant USB MIDI with no driver.
  - The motorized-fader units need mains or DC power; the pad and encoder units run
    on USB bus power.
  - Only Behringer publishes a temperature rating: 5–40 °C (Reported).
- **A custom surface costs about the same as the off-the-shelf sets.** It is a Teensy
  4.1 with 8 Bourns motorized faders, 16 LED-ring encoders and 32 RGB buttons: parts
  about **$850–1,500**, plus a **guessed 120–240 hours** of work. It isn't cheaper; do
  it only for the fit, the dust sealing or the fun.
- **Packaged options** (table below):
  - **A, Simple:** about **$2.6–3.6K**.
  - **B, Full:** about **$3.7–6.0K**.
  - **C, Custom:** about **$3.0–6.5K**, plus the build time.
  - A cheaper **network console** alternative (Section 7) is about **$1.4–3.3K**, plus
    software work. It works because Empyrean's UI is already a web client of the show
    computer.
- **Software work (not a hardware cost).**
  - Mapping MIDI controls to show parameters isn't built yet; Empyrean accepts only
    MIDI Timing Clock today (`../Empyrean/README.md`).
  - Motorized faders and LED rings also need the app to _send_ MIDI back (the Mackie
    Control protocol, or each device's own MIDI mode).
  - None of this hardware is useful until that exists.
- **Recommendation:**
  1. **Buy one controller first** (the X-Touch Compact, $309). Build the MIDI mapping
     against it on the current NUC; it needs no long link.
  2. **Measure the cable route** to the booth.
  3. **Then buy option A's link for that distance.** Upgrade the display and controls
     to option B's later if the VJ wants more.
  4. Skip the custom build unless the owner wants it as a project.

## Options

The options assume a **~30 m** link. Swap in the link line for the real distance from
Section 1.

| Line                   | A: Simple                                                                   | B: Full                                                                                                 | C: Custom build                                                                                |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Touch screen           | faytech 15.6" FT156TMCAPOB, IP65 front, −10 to 60 °C: **$566–650**          | faytech 21.5" FT215TMCAPOB, IP65 front, −10 to 60 °C: **$703–950**                                      | faytech 15.6" or 21.5", built into the case: **$566–950**                                      |
| Link (30 m)            | Kramer EXT3-XR-TR × 2 + Cat6a + mDP→HDMI adapter: **$1,480–1,950**          | Black Box KVXLCDPF-100 + SFPs + tactical fibre + mDP→DP: **$900–1,840**                                 | Either: **$900–1,950**                                                                         |
| USB hub at the console | none (the Kramer receiver has 3 USB-A ports): **$0**                        | StarTech ST4300USBM, 0–55 °C, 5–24 V: **$151**                                                          | none (touch + Teensy = 2 ports): **$0**                                                        |
| Controls               | X-Touch Compact, optionally + APC mini mk2: **$309–408**                    | X-Touch + Midi Fighter Twister + Launchpad X, optionally + X-Touch Extender: **$909–1,209**             | Teensy 4.1 surface: 8 motorized faders, 16 ring encoders, 32 RGB buttons: **$850–1,500** parts |
| Console power          | Power strip; the screen and extender have their own adapters: **$20–40**    | 12 V DC supply for the screen and hub, plus a strip: **$40–120**                                        | In the build's parts list, plus a strip: **$20–40**                                            |
| Housing                | Thon X-Touch Compact case, or an SKB/Pelican hard case: **$200–450**        | Pelican 1650 (controls) + Pelican 1610 (screen) + deck and glands, or a custom ATA case: **$800–1,500** | Custom ATA console case with a lid, shelf and cutouts: **$700–2,000**                          |
| Dust covers, cleaning  | **$20–60**                                                                  | Decksaver X-Touch, Twister Chroma Cover, Launchpad X cover: **$150–250**                                | Built in, plus a cover: **$0–60**                                                              |
| **Total**              | **$2,595–3,558**                                                            | **$3,653–6,020**                                                                                        | **$3,036–6,500**, plus **120–240 h** (guess)                                                   |
| Best for               | One VJ who wants faders and a big touch UI; one cable to run                | A guest VJ who expects pads, knobs and faders; any distance                                             | A sealed, purpose-built surface; owner wants the project                                       |
| Weak points            | Copper link at its limit near 100 m; Kramer's 40 °C rating in the brain box | Black Box compresses video (inferred) and tops out at 4K30; 2560×1080 not listed                        | Months of design and firmware; spares are self-made                                            |

---

## 1. The long link

### 1a. Where the video comes from

| Fact                                                                                                                                             | Confidence                                                                                                                                                                                                                                                                                                                                                                                                                                        | Source                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Nuvo-9160GC: one **USB 3.2 Gen 2x2 (20 Gbps) Type-C** port with screw lock, 4 × USB 3.2 Gen 2 Type-A, 2 × USB 3.2 Gen 1 Type-A, **2 × USB 2.0**  | Confirmed                                                                                                                                                                                                                                                                                                                                                                                                                                         | [Neousys datasheet, 8 Sep 2026](https://neousys-web-bucket.s3.us-west-1.amazonaws.com/datasheet/nuvo-9160gc-intel14th-gpu-embedded-computer.pdf) |
| "Video Port (Integrated Graphics)": VGA 1920 × 1200, DVI-D 1920 × 1200, DP 4096 × 2304. **No video, DP Alt Mode or Thunderbolt listed on USB-C** | Confirmed (by what the sheet leaves out)                                                                                                                                                                                                                                                                                                                                                                                                          | same                                                                                                                                             |
| −25 to 60 °C with a 35 W CPU; 50 °C with a 65 W CPU; storage −40 to 85 °C                                                                        | Confirmed                                                                                                                                                                                                                                                                                                                                                                                                                                         | same                                                                                                                                             |
| RTX 2000E Ada: **4 × Mini DisplayPort 1.4a**, single slot, 50 W                                                                                  | Reported (retailers [B&H](https://www.bhphotovideo.com/c/product/1860618-REG/pny_vcnrtx2000adas_llp_nvidia_rtx_2000e_ada.html), [SHI](https://www.shi.com/product/48300464/NVIDIA-RTX-2000E-Ada-Generation)). The sibling RTX 2000 Ada is Confirmed at 4 × mDP 1.4a ([PNY datasheet](https://www.pny.com/en-eu/file%20library/professional/datasheet/workstation/lp%20power%20limited%20cards/acmk0869_datasheet_pny_rtx-2000_power-limited.pdf)) |                                                                                                                                                  |

**Consequences (reasoning):**

- Use a GPU mDP output, through a latching mDP-to-DP cable or an mDP-to-HDMI adapter
  with strain relief. Bare mDP doesn't latch, and the truss moves.
- An active mDP-to-HDMI adapter is needed for 4K60 HDMI; 1080p works with a passive
  one.
- The touch display's USB cable goes over the extender. Its video goes over the video
  path.

### 1b. Candidates

| Product                                                                                                                       | Carries                                                                                                                                                                                                             | Max length                                                                                          | Power to devices                      | Operating temp                              | Price                                                                                                                                                                                                                           | Spec source                                                                                                                                           | Confidence                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Kramer EXT3-XR-TR** (HDBaseT 3.0). **One unit is one end**: set as the transmitter or the receiver, **so a link needs two** | HDMI 2.0 4K60 4:4:4, uncompressed; **USB 2.0 and 1.1** (480 Mbps rate, up to 300 Mbps carried), host at either end; 3 × USB-A + 1 × USB-B; **1 GbE Ethernet**; RS-232; IR                                           | 100 m over Cat (with Kramer HDBaseT cable)                                                          | 2 A total for USB devices             | **0–40 °C**; 12 V DC 5 A supply, 3.2 A draw | **$700 each** (MSRP $875) at [ConferenceRoomAV](https://conferenceroomav.com/p/kramer-av-ext3-xr-tr): **$1,400 a pair**                                                                                                         | [Datasheet](https://files.hdtvsupply.com/kramer-ext3-xr-tr-ds.pdf)                                                                                    | Confirmed / Quoted                                                              |
| C2G 30055 HDBaseT 3.0 kit                                                                                                     | HDMI 4K60; USB 2.0 at 350 Mbps                                                                                                                                                                                      | 100 m Cat6a (40 m at 4:4:4 on Cat6)                                                                 | –                                     | 0–45 °C                                     | [$935.99, out of stock](https://www.markertek.com/product/c2g-30055/c2g-30055-4k60hz-hdmi-hdbaset-3-0-extender-kit-tx-rx-up-to-328-feet-over-cat6a)                                                                             | retailer                                                                                                                                              | Reported / Quoted\*                                                             |
| **Black Box KVXLCDP-100** (Cat) and **KVXLCDPF-100** (fibre), kit with transmitter and receiver                               | DP in and out; **1920 × 1080 at 60 Hz and 2560 × 1440 at 60 Hz listed; 3840 × 2160 only at 30 Hz**; 2560 × 1080 not listed. Transparent USB 2.0 (the datasheet says 2 × USB 2.0 + 2 × USB 1.1 ports); serial; audio | 100 m Cat; fibre by SFP (multimode SFP up to 550 m, single-mode to 30 km; **SFPs sold separately**) | Unknown                               | **0–50 °C**                                 | Cat: $676.95, out of stock, at [Markertek](https://www.markertek.com/product/bbx-kvxlcdp-100/black-box-kvxlcdp-100-kvm-extender-kit-catx-4k-sh-dp-usb-2-0-serial-audio-local-video) (Quoted). Fibre: $710–746 at SHI (Quoted\*) | [Datasheet](https://www.42u.com/pdf/Black%20Box/KVXLCDP-100/KVXLCDP-100-Data-Sheet.pdf)                                                               | Confirmed / Quoted                                                              |
| **Icron Ranger 2304** (kit)                                                                                                   | USB 2.0 only; 4 ports; "all USB 2.0 and 1.1 traffic types / device types"                                                                                                                                           | 100 m Cat5e/6/7                                                                                     | 600 mA per port                       | 0–50 °C                                     | $672.99 list at [SHI](https://texas.gs.shi.com/product/49677483/RANGER-2304,-4PRT-100M-CAT5E-EXT)                                                                                                                               | [Datasheet](https://advdownload.advantech.com/productfile/PIS/BB-00-00348/Product%20-%20Datasheet/USB2-0_Ranger2304_90-01097-B03ds20190315214744.pdf) | Confirmed / Quoted\*                                                            |
| Icron Ranger 2311                                                                                                             | USB 2.0, 1 port (add a hub at the far end)                                                                                                                                                                          | 100 m Cat                                                                                           | 1 A; power brick at either end        | 0–50 °C                                     | [$299, in stock](https://www.markertek.com/product/icr-2311/icron-2311-usb-2-0-ranger-2311-single-port-cat-5e-6-7-100m-extender)                                                                                                | retailer                                                                                                                                              | Reported / Quoted                                                               |
| **Icron Ranger 2324**                                                                                                         | USB 2.0, 4 ports                                                                                                                                                                                                    | **500 m** multimode fibre (OM2 or better), duplex LC                                                | 1 A, or 600 mA each with all 4 in use | 0–50 °C                                     | [$1,152.95, out of stock](https://www.markertek.com/product/icr-2324/icron-ranger-2324-extremeusb-2-0-four-port-multimode-fiber-500m-extender)                                                                                  | retailer                                                                                                                                              | Reported / Quoted                                                               |
| Icron Raven 3124                                                                                                              | USB 3 and USB 2.0/1.1 at the same time                                                                                                                                                                              | 200 m OM3                                                                                           | 1.2 A per port                        | 0–50 °C                                     | [$1,713.95, out of stock](https://www.markertek.com/product/icr-3124/icron-raven-3124-4-port-usb-3-1-extender-system-up-to-656ft-over-duplex-lc-multi-mode-fiber)                                                               | retailer                                                                                                                                              | Reported / Quoted. More than this needs                                         |
| StarTech F35023-USB-EXTENDER                                                                                                  | 2-port USB 3.2 Gen 1, "compatible with USB 3.2 Gen 1/2.0/1.1"                                                                                                                                                       | 350 m OM3 LC (SFP+ modules included)                                                                | 0.9 A per port                        | 0–50 °C                                     | [$1,097.95](https://markertek.com/product/st-f35023usbext/startech-2-port-usb-3-0-optical-extender-over-om3-multimode-fiber-lc-lc-1148-foot-350m-range)                                                                         | retailer                                                                                                                                              | Reported / Quoted                                                               |
| DP 1.4 fibre cable, 10 m (Ophit FTAD-A010)                                                                                    | DP 1.4 8K, one direction                                                                                                                                                                                            | 10 m                                                                                                | –                                     | Unknown                                     | [$360, Markertek](https://www.markertek.com/product/ophi-ftad-a010/ophit-ftad-a010-8k-displayport-1-4-active-optical-cable-32-8-feet-10-meters)                                                                                 | retailer                                                                                                                                              | Quoted\*                                                                        |
| DP fibre cable, 30 m: 4XEM / Monoprice SlimRun #21808 / KanexPro CBL-DP14AOC30M                                               | DP 1.4 (the Monoprice is probably DP 1.3), one direction                                                                                                                                                            | 30 m                                                                                                | –                                     | Unknown                                     | 4XEM $162.99; [Monoprice $362.79](https://www.monoprice.com/product?p_id=21808); [KanexPro $499.99, out of stock](https://www.sabrepc.com/CBL-DP14AOC30M-KanexPro-S2727400); generic $95–100 on Newegg                          | retailers                                                                                                                                             | Quoted\*                                                                        |
| DP fibre cable, 50–100 m (Danbit K-DP8KO)                                                                                     | DP 1.4                                                                                                                                                                                                              | 50 / 70 / 100 m                                                                                     | –                                     | Unknown                                     | 50 m about 940 DKK (~$145, assumed rate); 100 m call for price ([Danbit](https://www.danbit.dk/en/1431-via-fiber))                                                                                                              | retailer                                                                                                                                              | Quoted                                                                          |
| Opticis DPX-1F12-TR (box extender)                                                                                            | DP 1.2 4K60 over one OM3 LC fibre                                                                                                                                                                                   | 300 m                                                                                               | –                                     | 0–50 °C                                     | [$3,348, special order](https://www.markertek.com/product/opti-dpx-1f12tr/opticis-dpx-1f12-tr-4k-displayport-1-2-optical-extender-with-transmitter-and-receiver-extends-984ft-over-one-lc-mm-om3)                               | retailer                                                                                                                                              | Quoted. Too costly                                                              |
| Full-featured USB-C fibre cables (DVDO, ReThink AV, Delock 84179)                                                             | USB-C DP Alt Mode + USB, 10–15 m                                                                                                                                                                                    | 10–15 m                                                                                             | 60 W                                  | Unknown                                     | DVDO [$349, unavailable](https://avlgear.com/products/dvdo-full-featured-usb-c-aoc-fiber-cable-10m)                                                                                                                             | retailers                                                                                                                                             | Reported. **Not usable: they need a DP Alt Mode source, and the Nuvo has none** |
| Corning Thunderbolt 3 optical                                                                                                 | Thunderbolt 3                                                                                                                                                                                                       | 10–50 m                                                                                             | –                                     | Unknown                                     | 50 m [~A$1,135](https://www.macfixit.com.au/products/optical-cables-by-corning-thunderbolt-3-usb-type-c-male-optical-cable-50-m)                                                                                                | retailer                                                                                                                                              | Quoted\*. **Not usable: no Thunderbolt host**                                   |
| SIIG CB-US0V11-S1, Tripp Lite U330F-50M-G1 (USB 3 fibre, 50 m)                                                                | USB 3 only. **"Not compatible with USB 2.0 or USB 1.1 devices"**                                                                                                                                                    | 50 m                                                                                                | –                                     | SIIG 0–65 °C                                | [SIIG $379.99](https://siig.com/products/usb-3-0-aoc-male-to-female-active-cable-50m); Tripp Lite $336                                                                                                                          | maker                                                                                                                                                 | Quoted. **Not usable**                                                          |
| StarTech FD121-KVM-EXTENDER                                                                                                   | DP 1.2 4K60; far-end USB listed as **"USB-A (1.5 Mbps)"**: keyboard and mouse only                                                                                                                                  | 300 m multimode                                                                                     | –                                     | 0–50 °C                                     | [$793.34](https://www.startech.com/en-us/kvm-switches-accessories/fd121-kvm-extender)                                                                                                                                           | maker                                                                                                                                                 | Confirmed / Quoted. **Avoid: MIDI won't pass**                                  |

### 1c. Cable and fibre

| Item                                                                                   | Price                                                                                                                                                                                                                                                  | Confidence                         |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| Shielded outdoor Cat6a, 30 m / 100 m, with field-terminated or moulded ends            | $60–150 / $150–350                                                                                                                                                                                                                                     | Estimate (not priced this session) |
| Armoured OM3 duplex LC-LC with TPU jacket, 50–100 m                                    | $115–627, marketplace listings; maker unknown                                                                                                                                                                                                          | Quoted\* (reliability Unknown)     |
| Camplex opticalCON DUO tactical OM3: 50 ft (15 m) / 100 ft (30 m)                      | [$994.95](https://www.markertek.com/product/hf-oc2m-0050/camplex-hf-oc2m-opticalcon-duo-nko2m-om3-multimode-tactical-fiber-optic-cable-50-foot) / [$1,044.49](https://markertek.com/product/HF-OC2M-0100), special order. A 100 m length wasn't priced | Quoted\*                           |
| Neutrik NKO2M-A-2-50 opticalCON DUO, 50 m on a reel                                    | [Thomann](https://www.thomann.co.uk/neutrik_nko2m_a_2_50.htm), price not read                                                                                                                                                                          | Unknown                            |
| Multimode SFPs for the Black Box fibre unit (2 needed; Black Box LFP442 or compatible) | $60–400 the pair                                                                                                                                                                                                                                       | Estimate                           |
| Latching mDP-to-DP cable, or active mDP-to-HDMI 4K60 adapter                           | $15–50                                                                                                                                                                                                                                                 | Estimate                           |

**Link costs by distance** (used in the options table):

| Distance       | Route                                                                                                                                              | Low    | High                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------- |
| ~10 m          | 10 m DP fibre cable ($95–360) + Icron 2311 ($299) or 2304 ($673) + Cat6 ($20–40)                                                                   | ~$415  | ~$1,075                                |
| ~30 m          | Kramer pair ($1,400–1,750) + Cat6a ($60–150) + adapter ($20–50)                                                                                    | $1,480 | $1,950                                 |
| ~30 m, cheaper | 30 m DP fibre cable ($163–500) + Icron 2304 ($673) + Cat6 ($60–150)                                                                                | ~$900  | ~$1,330                                |
| 50–100 m       | Black Box KVXLCDPF-100 ($710–746) + SFPs ($60–400) + armoured LC fibre ($115–627) + mDP-to-DP ($15–40); or 50–100 m DP fibre + Icron 2324 ($1,153) | ~$900  | ~$1,840 (about $2,200 with opticalCON) |

### 1d. Robustness notes

- **Temperature.** No extender or fibre cable found is rated above 50 °C, and the
  fibre cables publish no rating at all. The computer-side unit lives in the brain
  box. Night at the booth (10–40 °C) is fine for all of them; a booth in the day sun
  is not. Shade the console and turn it off by day (reasoning).
- **Grounding (reasoning).** Copper HDBaseT and Cat USB extenders bond the console's
  power ground to the brain box's. That matters little if both run off the Gate's own
  feed, and more if the booth is on another generator. Fibre isolates the two ends.
- **Dust.**
  - A fibre cable with moulded ends has no exposed optics, but it can't be repaired
    or pulled through conduit with the heads on.
  - Bare LC connectors need dust caps and a one-click cleaner.
  - Neutrik opticalCON (shuttered, used in touring) is the event-industry answer
    (Reported, general knowledge).
  - RJ45 needs boots or a Neutrik etherCON-style shell (reasoning).
- **Latency.** HDBaseT is uncompressed. The Black Box carries DP 1.2-class video over
  a 1.25 Gb fibre link, so it must compress, and it may add a little delay. That is
  inferred from its specs; test it.
- **Availability.** Several units are out of stock or special order (Icron 2324 and
  3124, Black Box Cat, the opticalCON cables). The StarTech DP14MM15MAO DP fibre
  cable is discontinued.

## 2. The console end: a dock or hub

The Nuvo has no DP Alt Mode (Section 1a), so a USB-C dock at the console has no
USB-C video to break out. **The extender receiver is the dock.** USB-C docks were
still checked in case the design changes:

| Product                                                                                                                                                                           | Fit here                                                                                         | Operating temp     | Price                 | Confidence                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------ | --------------------- | --------------------------------------------------------------------------------------------------------- |
| **StarTech ST4300USBM** powered industrial hub: 4 × USB-A 5 Gbps, steel case, DIN or wall mount, screw-lock ports, 5–24 V DC in (terminal block or barrel; 36 W adapter included) | **Use it when the receiver's ports run short** (option B). It can share the screen's 12 V supply | **0–55 °C**        | $150.88 at Staples    | Confirmed ([datasheet](https://media.startech.com/cms/pdfs/st4300usbm_datasheet.pdf)) / Quoted\*          |
| Coolgear CG-G14PHHT industrial hub: 4 × USB 3.2 Gen 1, DIN rail, 7–48 V DC                                                                                                        | Wider-temperature alternative                                                                    | −40 to 85 °C       | $164.95               | Reported / Quoted\*                                                                                       |
| Plugable USB3-HUB7C, 7-port consumer hub                                                                                                                                          | Cheap spare                                                                                      | Unknown            | $39.95                | Quoted\*                                                                                                  |
| StarTech 120B-USBC-MULTIPORT: true DP 1.4 Alt Mode, 2 × HDMI, 2 × USB-A, takes a PD charger                                                                                       | Only if a USB-C video source ever exists                                                         | 0–45 °C            | ~$96                  | Confirmed ([datasheet](https://media.startech.com/cms/pdfs/120b-usbc-multiport_datasheet.pdf)) / Quoted\* |
| StarTech DK30C2DAGPD: 2 × DP Alt Mode, USB-A, takes a PD charger                                                                                                                  | same                                                                                             | 0–50 °C            | ~$70                  | Confirmed ([datasheet](https://media.startech.com/cms/pdfs/dk30c2dagpd_datasheet.pdf)) / Quoted\*         |
| Dell WD19S; CalDigit TS4                                                                                                                                                          | Own power supply, but rated only to 35 °C                                                        | 0–35 °C / 10–35 °C | $160–348 / not priced | Reported                                                                                                  |
| Anker 563, Plugable UD-ULTC4K                                                                                                                                                     | **DisplayLink**: needs a driver, loads the CPU, adds latency. Avoid                              | Unknown            | $200 / $234           | Reported / Quoted\*                                                                                       |

Whether a device exists that **combines a DP output and USB into one USB-C DP Alt Mode
signal** wasn't checked (search limit): **Unknown**. Such a device would let a USB-C
fibre cable and a USB-C monitor work. It would add a part and save nothing, so it
isn't pursued.

## 3. Touch screen

Brightness is low priority at night; heat and dust decide it. **Every portable touch
monitor found is rated 0–40 °C or worse.** The industrial panels are rated −10 to
60 °C with a sealed front, for about the same money.

| Product                                          | Size / res                                     | Touch                 | Front seal                      | Video in                                                                        | Power                               | Operating temp                                                                  | Price                                                                                                                                    | Spec source                                                                                                                 | Confidence           |
| ------------------------------------------------ | ---------------------------------------------- | --------------------- | ------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **faytech FT156TMCAPOB (v3)**                    | 15.6", 1920 × 1080, 250 nits, optically bonded | PCAP, 10-point, USB   | **IP65** front / IP40 back, IK7 | HDMI 1.3, **DP**, VGA                                                           | **12 V DC**, 13 W; adapter included | **−10 to 60 °C**                                                                | $433.86 + $132 shipping (DigiKey, sold by faytech; ~30-day lead)                                                                         | [Datasheet](https://csi.pl/wp-content/uploads/2021/04/EN_FT156TMCAPOB.pdf)                                                  | Confirmed / Quoted\* |
| **faytech FT215TMCAPOB / FT215TMACAPOB**         | 21.5", 1920 × 1080, 250 nits, bonded           | PCAP, 10-point, USB-B | **IP65** / IP40, IK7, aluminium | HDMI, **DP**, VGA                                                               | **12 V**, 24 W                      | **−10 to 60 °C**. The sheet says "indoor use … protect against direct sunlight" | ~$531 + $172 shipping (DigiKey)                                                                                                          | [Datasheet](https://www.faytech.us/wp-content/uploads/2026/08/ds_2023_FT215TMACAPOB_EN.pdf)                                 | Confirmed / Quoted\* |
| faytech FT215TMCAPOFHBOB (open frame, 1000 nits) | 21.5", FHD                                     | PCAP, 10-point        | IP65 / IP40                     | HDMI, DP, VGA                                                                   | 12 V, 50 W                          | −10 to 60 °C                                                                    | **$932.20**, 5 in stock, at [faytech.us](https://www.faytech.us/product/ft215tmcapofhbob-21-5-inch-open-frame-capacitive-touch-monitor/) | [Datasheet](https://www.faytech.us/wp-content/uploads/2018/02/V3_EN_FT215TMCAPOFHBOB.pdf)                                   | Confirmed / Quoted   |
| faytech FT156TMCAPOFHBOB (open frame)            | 15.6"                                          | PCAP                  | not stated on the shop page     |                                                                                 |                                     |                                                                                 | **$861.41** at [faytech.us](https://www.faytech.us/touchscreen-monitor/high-brightness/)                                                 | shop page                                                                                                                   | Quoted               |
| Xenarc 1579GFP (top-end rugged)                  | 15.6", FHD, 1000 nits, UV-resistant            | PCAP, USB             | **IP66 / NEMA 4X, IP69K**       | HDMI, DP, VGA                                                                   | **9–36 V DC**, ≤23.5 W              | **−30 to 85 °C**                                                                | Mouser €1,363.96 (~$1,570)                                                                                                               | [xenarc.com](https://www.xenarc.com/1579GFP.html)                                                                           | Confirmed / Quoted\* |
| Winmate W15L100-PPL1OD / W22L100-EHB1OD          | 15.6" / 21.5", FHD, 1000 nits                  | PCAP                  | IP65                            | **VGA by default**; HDMI is an order option                                     | 12 V (24 V optional)                | −10 to 60 °C                                                                    | quote only                                                                                                                               | [Winmate](https://www.winmate.com/en/product/exportHtml/W15L100-PPL1OD)                                                     | Confirmed / Unknown  |
| Elo 1502L / 2202L (commercial)                   | 15.6" / 21.5"                                  | PCAP, 10-point        | IPX1                            | USB-C, HDMI, VGA / HDMI, VGA, DP                                                | 12 V                                | 0–40 °C                                                                         | CDW $676.30 / $623.99                                                                                                                    | retailer                                                                                                                    | Reported / Quoted\*  |
| Lenovo ThinkVision M14t Gen 2 (portable)         | 14", 2240 × 1400                               | 10-point + pen        | none                            | **USB-C DP Alt Mode only, no HDMI**. Unusable here without a USB-C video source | 5–20 V over USB-C                   | **0–40 °C**                                                                     | $330–469                                                                                                                                 | [Lenovo PSREF](https://psref.lenovo.com/syspool/Sys/PDF/ThinkVision/ThinkVision_M14t_Gen_2/ThinkVision_M14t_Gen_2_Spec.pdf) | Confirmed / Quoted\* |
| ASUS ZenScreen Touch MB16AHT (portable)          | 15.6", FHD                                     | PCAP, 10-point        | none                            | 2 × USB-C, mini-HDMI (touch over a separate USB cable)                          | USB-C                               | **0–40 °C**                                                                     | $329; **end of life**                                                                                                                    | [ASUS](https://www.asus.com/displays-desktops/monitors/zenscreen/zenscreen-touch-mb16aht/techspec/)                         | Confirmed / Quoted\* |
| ViewSonic TD1655 (portable)                      | 15.6", FHD                                     | PCAP, 10-point        | none                            | USB-C, mini-HDMI                                                                | USB-C, 60 W                         | **0–40 °C**                                                                     | €216–272 (~$250–315); no US listing found                                                                                                | [ViewSonic](https://manuals.viewsonic.com/TD1655_Specifications)                                                            | Confirmed / Quoted\* |
| ASUS MB16AMT (portable, built-in battery)        | 15.6"                                          | PCAP                  | none                            | USB-C, micro-HDMI                                                               | battery                             | **5–35 °C**. Avoid                                                              | $362.99                                                                                                                                  | [ASUS](https://www.asus.com/displays-desktops/monitors/zenscreen/zenscreen-touch-mb16amt/techspec/)                         | Confirmed / Quoted\* |

**Notes:**

- **IP65 covers only the front.** The back is IP40 with open connectors. The case,
  dust caps and strain relief must do the rest.
- **The V1 screen was 2560 × 1080** (Reported, `docs/v1-hardware.md`). Every panel
  here is 1920 × 1080 or 16:10. The Empyrean UI layout at 1920 × 1080 hasn't been
  checked.
- **Windows touch mapping** follows the USB device path. A touch cable moved to
  another port can map touch to the wrong screen. Label the ports and fix the layout
  (Reported; set it in Tablet PC Settings → Setup).

## 4. Controls

### 4a. Off-the-shelf controllers

**Codes:** MF = motorized faders. "CC" = USB MIDI class-compliant, no driver. Prices
are US street prices from retailer pages or the
[Equipboard price trackers](https://equipboard.com/items/behringer-x-touch) (updated
2026-10-18 to 22). Treat all as Quoted\* until rechecked at the store.

| Unit                                         | Controls                                                                                                                  | CC / protocol                                                                                                                                                                                                                                                                                                                                                                     | Power               | Size, weight               | Price                                                                                                                | Confidence                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Behringer X-Touch Compact**                | **9 × 100 mm touch-sensitive MF**, 16 encoders with LED collars, 39 lit buttons, 2 rear USB host ports, DIN MIDI          | CC; Mackie Control (MCU)                                                                                                                                                                                                                                                                                                                                                          | **IEC mains, 25 W** | 391 × 301 × 100 mm, 3.7 kg | **$309** (Sweetwater, B&H, GC); $204 at Thomann                                                                      | Reported / Quoted\*                                                                |
| **Behringer X-Touch**                        | **9 × 100 mm touch MF**, 8 encoders with rings, 92 lit buttons, 8 LCD scribble strips, meters, jog; **Ethernet RTP-MIDI** | CC; MCU + HUI                                                                                                                                                                                                                                                                                                                                                                     | IEC mains, ~30 W    | 452 × 301 × 100 mm, 4.3 kg | **$419**; $279 at Thomann                                                                                            | Reported / Quoted\*                                                                |
| Behringer X-Touch Extender                   | 8 MF, 8 encoders, 8 LCDs, Ethernet, **powered USB hub for 2 more controllers**                                            | CC; MCU + HUI                                                                                                                                                                                                                                                                                                                                                                     | mains, 30 W         | –                          | $299.99 on sale, else $349                                                                                           | Confirmed ([Behringer](https://www.behringer.com/ja/products/0808-AAH)) / Quoted\* |
| Behringer X-Touch One                        | 1 MF, jog, 34 buttons, LCD                                                                                                | CC; MCU + HUI                                                                                                                                                                                                                                                                                                                                                                     | 9 V DC              | 196 × 233 × 65 mm          | $189                                                                                                                 | Confirmed (Quick Start Guide) / Quoted\*                                           |
| Behringer X-Touch Mini                       | 1 × 60 mm fader (not motorized), 8 encoders with collars, 16 buttons                                                      | CC; MCU                                                                                                                                                                                                                                                                                                                                                                           | **USB bus**         | small                      | $70.90                                                                                                               | Reported / Quoted\*                                                                |
| PreSonus FaderPort 8 / 16                    | 8 / 16 touch MF, scribble strips                                                                                          | Driverless; MIDI Mode sends fixed CCs ([PreSonus KB](https://support.presonus.com/hc/en-us/articles/217070166-Faderport-Family-Native-Mode-HUI-Mode-MCU-Modes-and-MIDI-Mode)); MCU + HUI                                                                                                                                                                                          | external 12 V       | FP8: 334 × 301 × 57 mm     | $499.99 / $699.99                                                                                                    | Confirmed / Quoted\*                                                               |
| PreSonus FaderPort (single)                  | 1 touch MF                                                                                                                | MCU + HUI                                                                                                                                                                                                                                                                                                                                                                         | 12 V                | 140 × 230 × 45 mm          | $209.99                                                                                                              | Reported / Quoted\*                                                                |
| iCON Platform M+ / X+                        | 9 / 8 touch MF                                                                                                            | CC; MCU + HUI                                                                                                                                                                                                                                                                                                                                                                     | 12 V 2.5 A          | 400 × 200 × 45 mm          | **sold out at several US stores**; X+ $439.99                                                                        | Reported / Quoted\*                                                                |
| SSL UF8 (reference)                          | 8 MF, colour displays                                                                                                     | **Not CC: needs SSL 360 running**, which makes virtual MIDI ports. These ports broke under the new Windows 11 MIDI Services, and SSL says it's fixed in builds from late April 2026 ([SSL support](https://support.solidstatelogic.com/hc/en-gb/articles/34029588513437), [UF8 guide](https://www.solidstatelogic.com/assets/uploads/downloads/UF8/SSL%20UF8%20User%20Guide.pdf)) | external            | –                          | $1,199.99                                                                                                            | Confirmed / Quoted\*. **Avoid**                                                    |
| **Akai APC40 mkII**                          | 9 faders + crossfader, 16 encoders, **40 RGB clip pads**                                                                  | CC                                                                                                                                                                                                                                                                                                                                                                                | **USB bus**         | 424 × 254 × 46 mm, 1.8 kg  | $299 (was $349); said to be discontinued, still in stock                                                             | Confirmed (Akai guide) / Quoted\*                                                  |
| **Akai APC mini mk2**                        | 9 faders, **64 RGB pads**, 16 lit buttons                                                                                 | CC likely, not stated                                                                                                                                                                                                                                                                                                                                                             | USB bus             | 241 × 211 × 33 mm, 0.81 kg | ~$99                                                                                                                 | Reported / Quoted\*                                                                |
| **Novation Launchpad X**                     | **64 RGB velocity- and pressure-sensitive pads**, 16 buttons                                                              | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus (USB-C)     | 241 × 241 × 17 mm, 0.82 kg | $219.99                                                                                                              | Reported / Quoted\*                                                                |
| Novation Launchpad Pro mk3 / Mini mk3        | 64 RGB pads                                                                                                               | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus             | –                          | $399.99 / $129.99                                                                                                    | Reported / Quoted\*                                                                |
| Novation Launch Control XL 3 (2025)          | 8 × 60 mm faders, **24 RGB encoders**, 16 buttons, OLED                                                                   | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus (USB-C)     | 250 × 239 × 43 mm          | $249.99                                                                                                              | Reported / Quoted\*                                                                |
| **DJ TechTools Midi Fighter Twister**        | **16 endless encoders with RGB and indicator rings**, push, 4 banks; open-source firmware                                 | CC                                                                                                                                                                                                                                                                                                                                                                                | **USB bus**         | 152 × 152 × 58 mm          | **$269.99** at the [DJTT store](https://store.djtechtools.com/products/midi-fighter-twister)                         | Confirmed / Quoted                                                                 |
| DJTT Midi Fighter 3D                         | 16 Sanwa RGB buttons                                                                                                      | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus             | –                          | **Discontinued**; the successor, the [Spectra](https://store.djtechtools.com/products/midi-fighter-spectra), is $259 | Confirmed / Quoted                                                                 |
| DJTT Midi Fighter 64                         | 64 Sanwa buttons                                                                                                          | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus             | 254 × 254 × 44 mm          | $499.99                                                                                                              | Confirmed / Quoted                                                                 |
| Faderfox EC4 / UC4 / MX12 / PC12             | encoders without LED rings, faders, pots; single-colour LEDs                                                              | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus, <500 mW    | EC4: 180 × 105 × 70 mm     | €350 / €350 / €700 / €700                                                                                            | Confirmed ([faderfox.de](https://faderfox.de/ec4.html)) / Quoted                   |
| Intech Grid EN16 / PO16 / BU16 / PBF4 / EF44 | magnetic modules; 16 encoders, pots, buttons or faders; RGB per control; Lua scripting                                    | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus (USB-C)     | –                          | $159–189 each at [intech.studio](https://intech.studio/shop)                                                         | Reported / Quoted                                                                  |
| Korg nanoKONTROL2                            | 8 faders, 8 pots, 24 buttons                                                                                              | CC                                                                                                                                                                                                                                                                                                                                                                                | USB bus             | –                          | $52–70                                                                                                               | Reported / Quoted\*                                                                |

**Notes:**

- **Temperature.** Only Behringer publishes a rating: the X-Touch Extender is
  **5–40 °C** (Reported, retailer listing). The family likely shares it (Assumed). No
  other maker publishes one (Unknown). 40 °C nights are at the limit.
- **Power.** Every motorized-fader unit needs mains or a DC adapter. The pad and
  encoder units run on USB bus power, about 0.5 A or less.
- **What VJs know.**
  - The APC40 has been the default Resolume controller.
  - Resolume staff now suggest a Launchpad plus a Twister, and call Midi Fighters
    "very robust" ([Resolume forum](https://www.resolume.com/forum/viewtopic.php?p=92776)).
  - That is anecdotal (Reported).
- **The X-Touch speaks RTP-MIDI over Ethernet** (Reported,
  [Sweetwater](https://www.sweetwater.com/sweetcare/articles/how-do-i-set-up-my-behringer-x-touch-as-an-rtp-midi-device-over-a-network-connection/)).
  It could join the Gate network directly, through the free rtpMIDI driver on
  Windows. That driver is third-party, so the setup is no longer driverless.
- **Prefer class-compliant devices that need no vendor app.** The SSL episode shows
  the risk: the new Windows MIDI stack broke vendor virtual ports.

### 4b. A custom surface (8 motorized faders, 16 LED-ring encoders, 32 RGB buttons)

| Part                                                                                                                                                        | Qty | Unit                                                  | Line            | Source                                                                                                                                                                        | Confidence           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----------------------------------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| Teensy 4.1: class-compliant USB MIDI, up to 16 virtual ports, 480 Mbit/s USB, optional 10/100 Ethernet                                                      | 1   | $31.50                                                | $31.50          | [SparkFun DEV-16771](https://www.sparkfun.com/teensy-4-1.html), [PJRC](https://www.pjrc.com/store/teensy41.html)                                                              | Confirmed / Quoted   |
| Ethernet magjack kit                                                                                                                                        | 1   | –                                                     | $5–10           | –                                                                                                                                                                             | Estimate             |
| **Bourns PSM01-082A-103B2** motorized fader: 100 mm, 10 k linear, **touch-sense lever**, 100k cycles, **−10 to 55 °C**, 10 V motor, 800 mA starting current | 8   | $30.17 ($21.78 at 70+)                                | $241            | [Bourns datasheet](https://www.bourns.com/docs/Product-Datasheets/psm.pdf); [price aggregator](https://thepartsdirect.com/part/psm01082a103b2~bourns) (28-week lead reported) | Confirmed / Quoted\* |
| _or_ ALPS RSA0N11M9A0J motorized fader                                                                                                                      | 8   | ~$19 grey market; €50–67 historically at distributors | ~$152–620       | [Conrad listing](https://www.conrad.com/en/p/alps-rsaon11m9-motorised-fader-10-k-0-5-w-linear-1-pc-s-442081.html)                                                             | Reported / Quoted\*  |
| Pololu TB6612FNG dual motor driver (1 A continuous, 3 A peak, 13.5 V)                                                                                       | 4   | $4.55                                                 | $18.20          | [Pololu #713](https://www.pololu.com/product/713)                                                                                                                             | Confirmed / Quoted   |
| Adafruit MPR121 capacitive touch board (fader touch)                                                                                                        | 1   | $7.95                                                 | $7.95           | [Adafruit](https://www.adafruit.com/product/1982)                                                                                                                             | Quoted               |
| Metal fader caps                                                                                                                                            | 8   | $2–5                                                  | $16–40          | –                                                                                                                                                                             | Estimate             |
| Encoders (Bourns PEC11R or ALPS EC11) and knobs                                                                                                             | 16  | $2.5–6.5                                              | $40–104         | –                                                                                                                                                                             | Estimate             |
| Ring LEDs, SK6812MINI-E reverse-mount, ~14 per encoder, on a custom PCB                                                                                     | 224 | ~$0.08                                                | ~$18            | –                                                                                                                                                                             | Estimate             |
| _or_ Adafruit 12-LED NeoPixel ring (36.8 mm across, too wide at 40 mm pitch)                                                                                | 16  | $8.06                                                 | $129            | [Adafruit #1643](https://www.adafruit.com/product/1643)                                                                                                                       | Confirmed / Quoted   |
| RGB buttons: Sanwa OBSF-30 with an LED board ($90–120), or low-profile key switches with SK6812 and translucent caps (~$48, better sealed)                  | 32  | –                                                     | $48–120         | [Focus Attack](https://www.focusattack.com/search.php?search_query=OBSF-30+clear)                                                                                             | Quoted / Estimate    |
| I/O expanders, shift registers, level shifter                                                                                                               | –   | –                                                     | $10–20          | –                                                                                                                                                                             | Estimate             |
| PCBs (JLCPCB/PCBWay): 3–4 designs × 5, LED assembly                                                                                                         | –   | –                                                     | $100–250        | –                                                                                                                                                                             | Estimate             |
| 12 V 8 A supply with 10 V (motors) and 5 V (LEDs) bucks. 8 faders moving at once ≈ 6.4 A at 10 V; LEDs capped at ~15 % ≈ 3 A at 5 V                         | 1   | –                                                     | $50–80          | (reasoning from the Bourns figure)                                                                                                                                            | Estimate             |
| Front panel, 3 mm aluminium ~400 × 280 mm: SendCutSend cut $50–100; Front Panel Express anodised and engraved $150–300; Protocase enclosure $300–600        | 1   | –                                                     | $50–600         | –                                                                                                                                                                             | Estimate             |
| Enclosure body (if not Protocase), wiring, connectors, standoffs                                                                                            | –   | –                                                     | $100–280        | –                                                                                                                                                                             | Estimate             |
| **Parts total, before the case**                                                                                                                            |     |                                                       | **~$850–1,500** |                                                                                                                                                                               | Estimate             |

**Labour (guess):**

- Mechanical 20–40 h, PCBs 30–60 h, firmware 40–80 h, assembly 20–40 h, integration
  10–20 h: **120–240 h** in all.
- tttapa's Arduino "Control Surface" library already has motorized-fader and Mackie
  Control support (Reported). It would shorten the firmware work.

**What it buys:**

- A layout you choose.
- Ethernet (OSC or sACN) instead of USB, if wanted.
- Brush-sealed fader slots and sealed key switches.
- Self-made spares.
- It costs about the same as option B's controls, plus months of work.

### 4c. Dust

- **Motorized faders are the weak point.** They have open slots over a carbon track,
  and no maker publishes a dust rating (Unknown).
- **Encoders and pads tolerate dust better.** The Twister and the Launchpads have no
  slots.
- **Mitigations:**
  - a fitted cover whenever the console isn't in use;
  - a hinged clear lid;
  - storage in a gasketed case with desiccant by day;
  - a blower after each night;
  - spare faders. Behringer and ALPS faders are about $19 each (Quoted\*).
- **Covers:**
  - Decksaver makes covers for the X-Touch (DS-PC-XTOUCH, **$89.99**), APC40 mkII
    ($80–90), Launchpad X ($54.99, often out of stock), Launch Control XL 3 ($54.99)
    and FaderPort 8. All Quoted\*.
  - **No Decksaver was found for the X-Touch Compact or the APC mini mk2.**
  - The Twister takes DJTT's Chroma Cover (€39, ~$45).

## 5. Housing

**Controller sizes:** the X-Touch Compact is 391 × 301 × 100 mm, the X-Touch
452 × 301 × 100 mm (Reported,
[Thomann](https://www.thomannmusic.com/behringer_x_touch_compact.htm); Behringer
publishes no dimensions). **Universal DJ-controller cases with a laptop shelf are too
shallow for either.** They have 45–89 mm of usable height, against the X-Touch's
100 mm.

| Product                                                                                               | Inside                                          | Features                                                                                                                                                                                                                                                                                                      | Price                                                     | Confidence                                                        |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| [Thon case for X-Touch Compact](https://www.thomannmusic.com/thon_case_behringer_x_touch_compact.htm) | made to fit; outside 465 × 465 × 185 mm, 5.6 kg | 7 mm phenolic ply, fitted foam, cable duct, can be played in the case. No gasket                                                                                                                                                                                                                              | $165                                                      | Reported / Quoted                                                 |
| [Thon X-Touch "Notebook" case](https://www.thomannmusic.com/thon_behringer_x_touch_notebook.htm)      | made to fit; 570 × 490 × 200 mm, 9.1 kg         | slide-out tray (could hold a portable screen)                                                                                                                                                                                                                                                                 | $230                                                      | Reported / Quoted                                                 |
| ProX XS-UXLT MK2, Odyssey FZGSDJC1/2, Gator G-TOURDSPUNICNTL                                          | 45–89 mm usable height                          | glide laptop shelves                                                                                                                                                                                                                                                                                          | $260–390                                                  | Quoted / Quoted\*. **Fits an APC mini + Twister, not an X-Touch** |
| **SKB 3i-2918-10**                                                                                    | 737 × 457 × 276 mm                              | **IP67**, wheels                                                                                                                                                                                                                                                                                              | **$294.99 empty**, $384.99 with cubed foam                | Reported / Quoted\*                                               |
| **Pelican 1650**                                                                                      | 726 × 445 × 271 mm (lid 46 / base 225 mm)       | **IP67**, 4 wheels, purge valve, −40 to 99 °C; Desert Tan option                                                                                                                                                                                                                                              | $378.95 (TestEquity, Full Compass) to $495.95 MSRP        | Confirmed (Pelican spec sheet, 05-09-25) / Quoted\*               |
| Pelican 1610                                                                                          | 553 × 424 × 270 mm                              | IP67, 2 wheels. Fits a 21.5" panel; too tight for an X-Touch Compact + Twister                                                                                                                                                                                                                                | $347.95–354.95                                            | Confirmed / Quoted\*                                              |
| Pelican 1650 GridPoint panel kit (1650MODP)                                                           | lid-mounted panel                               | a mounting plate for a screen in the lid                                                                                                                                                                                                                                                                      | $199.95                                                   | Quoted\*                                                          |
| Odyssey FZ1002BL, 10U slant + 2U rack                                                                 | 21.5 × 24 × 15.25 in outside                    | 19" rack top for a rack-mount screen; controllers sit beside it                                                                                                                                                                                                                                               | $299.95                                                   | Quoted\*                                                          |
| Custom ATA console case, ~800 × 500 × 250 mm inside: lid, foam, cutouts, screen shelf                 | –                                               | [Thomann Case Factory](https://www.thomannmusic.com/casefactory.html) "Live Case" from $199 (size not priced); [Road Case Designer](https://build.roadcasedesigner.com/) default build $919.46; [SpectraCase ATA-27400](https://shop.casesbysource.com/products/ata-spectracase-ata-27400) stock case $664.90 | **$700–1,500** US-built; $250–500 + shipping from Thomann | Estimate (from those benchmarks; no quotes requested)             |

**Fit check (reasoning from the dimensions):**

- The **Pelican 1650 / SKB 2918** holds an X-Touch Compact plus a Twister (545 mm
  across) or plus an APC mini (631 mm). That leaves a ~145 mm strip behind them for
  the extender receiver, hub and power strip.
- The full X-Touch plus a Twister (606 mm) also fits.
- A 21.5" panel goes in a second case (a Pelican 1610).

**Heat (Reported):**

- A black enclosure in direct sun reached **67.6 °C, about 40 °C above the outside
  air** ([element14](https://community.element14.com/challenges-projects/design-challenges/experimenting-with-extreme-environments/b/blog/posts/exploring-hidden-extremes-of-sheltered-environment---extra-blog-4--greenhouse-in-the-box)).
- A closed case on the playa by day exceeds every controller's rating.

**What to do (reasoning):**

- Pick a light colour.
- Keep the case in shade and put a reflective cover over it.
- Never close it while the gear is running.
- Use sealed cable glands, or unplug before closing, so the IP67 seal isn't lost to
  drilled holes.

## 6. Line items for the budget

Prices are low–high. Pick one row per group.

| #   | Group                      | Item                                                                | Low    | High   | Source                                                                                                                                      | Confidence                                         |
| --- | -------------------------- | ------------------------------------------------------------------- | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| L1  | Link ~10 m                 | 10 m DP fibre cable + Icron Ranger 2311 / 2304 + Cat6               | $415   | $1,075 | Section 1                                                                                                                                   | Quoted / Quoted\*                                  |
| L2  | Link ~30 m                 | **Kramer EXT3-XR-TR × 2** + Cat6a + adapter                         | $1,480 | $1,950 | [ConferenceRoomAV](https://conferenceroomav.com/p/kramer-av-ext3-xr-tr), [datasheet](https://files.hdtvsupply.com/kramer-ext3-xr-tr-ds.pdf) | Confirmed / Quoted                                 |
| L2b | Link ~30 m, cheaper        | 30 m DP fibre cable + Icron Ranger 2304 + Cat6                      | $900   | $1,330 | Section 1                                                                                                                                   | Quoted\*                                           |
| L3  | Link 50–100 m              | **Black Box KVXLCDPF-100** + SFPs + armoured LC fibre + mDP-to-DP   | $900   | $1,840 | [datasheet](https://www.42u.com/pdf/Black%20Box/KVXLCDP-100/KVXLCDP-100-Data-Sheet.pdf), SHI                                                | Confirmed / Quoted\*                               |
| L3b | Link 50–100 m, alternative | DP fibre cable 50–100 m + Icron Ranger 2324 + fibre                 | $1,300 | $2,000 | Section 1                                                                                                                                   | Quoted / Estimate (the 100 m DP cable is unpriced) |
| D1  | Screen                     | faytech FT156TMCAPOB 15.6", shipping included                       | $566   | $650   | DigiKey                                                                                                                                     | Quoted\*                                           |
| D2  | Screen                     | faytech FT215TMCAPOB 21.5", shipping included                       | $703   | $950   | DigiKey; faytech.us (open frame $932.20)                                                                                                    | Quoted\* / Quoted                                  |
| D3  | Screen, rugged             | Xenarc 1579GFP 15.6", IP69K, −30 to 85 °C                           | $1,570 | $1,700 | Mouser (EUR)                                                                                                                                | Quoted\*                                           |
| D4  | Screen, cheap              | ViewSonic TD1655 15.6" portable (0–40 °C)                           | $250   | $350   | Bechtle (EUR)                                                                                                                               | Quoted\*                                           |
| H1  | Hub                        | StarTech ST4300USBM industrial hub                                  | $151   | $165   | Staples; Coolgear alternative                                                                                                               | Quoted\*                                           |
| C1  | Controls, simple           | X-Touch Compact (+ APC mini mk2)                                    | $309   | $408   | Equipboard / retailers                                                                                                                      | Quoted\*                                           |
| C2  | Controls, full             | X-Touch + Midi Fighter Twister + Launchpad X (+ X-Touch Extender)   | $909   | $1,209 | Equipboard; DJTT store                                                                                                                      | Quoted\* / Quoted                                  |
| C3  | Controls, custom           | Teensy 4.1 surface parts (labour not costed)                        | $850   | $1,500 | Section 4b                                                                                                                                  | Estimate                                           |
| P1  | Console power              | Power strip, 12 V DC supply for the screen and hub                  | $20    | $120   | –                                                                                                                                           | Estimate                                           |
| K1  | Housing, simple            | Thon X-Touch Compact case, or SKB 3i-2918-10                        | $200   | $450   | Thomann; Specialty Cases                                                                                                                    | Quoted / Estimate                                  |
| K2  | Housing, full              | Pelican 1650 + Pelican 1610 + deck and glands                       | $800   | $1,500 | Pelican spec sheets; TestEquity                                                                                                             | Quoted\* / Estimate                                |
| K3  | Housing, custom            | Custom ATA console case                                             | $700   | $2,000 | benchmarks in Section 5                                                                                                                     | Estimate                                           |
| V1  | Covers, cleaning           | Decksaver / Chroma covers, blower, caps, fibre cleaner              | $20    | $250   | Section 4c                                                                                                                                  | Quoted\* / Estimate                                |
| S1  | Software (not hardware)    | MIDI input mapping, MIDI feedback to faders and LEDs, touch mapping | –      | –      | `../Empyrean/README.md`                                                                                                                     | Not costed                                         |

## 7. An alternative: a network console

Empyrean's UI is already a client of the show computer, so there is a cheaper
architecture. Per `../Empyrean/README.md` (Confirmed in the code's own docs):

- **"Every UI is a WebSocket client"**: the backend serves the web UI on port 9520.
- The desktop window, LAN browsers and phones "all speak the same protocol".
- An iPad can run it as a full-screen PWA.
- One limit is stated: **"Editing works on the Gate machine only; remote clients get
  a read-only view"** (patch editing).

So the booth could hold a **small fanless PC with the touch panel**, running the UI in
a kiosk browser, on **one Ethernet link** to the Gate network. That link is Cat6 up to
100 m, or fibre with media converters for any distance and isolated grounds.
Controllers would plug into that booth PC, and their MIDI would reach the show
computer over the network:

- the free rtpMIDI driver, with the X-Touch speaking RTP-MIDI natively; or
- Web MIDI in the browser, forwarded over the WebSocket.

| Line                                                                          | Low         | High        | Confidence |
| ----------------------------------------------------------------------------- | ----------- | ----------- | ---------- |
| Fanless booth PC                                                              | $250        | $900        | Estimate   |
| faytech 15.6" (D1)                                                            | $566        | $650        | Quoted\*   |
| Ethernet link: outdoor Cat6, or a fibre media-converter pair + armoured fibre | $60         | $700        | Estimate   |
| Controls (C1)                                                                 | $309        | $408        | Quoted\*   |
| Housing, power, covers (K1 + P1 + V1)                                         | $240        | $650        | Estimate   |
| **Total**                                                                     | **~$1,425** | **~$3,300** |            |

**Trade-offs:**

- **For:** no USB extender at all, and no extra electronics or heat in the brain box.
  Any distance works on fibre. Controllers plug into a local PC, so the USB tiers and
  port power are local.
- **Against:**
  - A second Windows machine to keep patched and powered.
  - Software work: remote MIDI and the kiosk UI. Today only MIDI Clock is read.
  - The remote-client limits (patch editing).
  - The booth traffic shares a network with the 52 Mbps sACN bursts (separate VLAN
    or port; see `plans/networking.md`).
- The Kramer link in option A also carries 1 GbE, so option A can grow into this
  later.

## Questions the owner must answer

1. **How far is the booth, by the cable route?** Measure from the brain box at the
   stage leg, down the leg, to the booth table. Is it the same at every event? This
   picks the link: 10 m, 30 m or 100 m. _Recommendation: measure it before buying any
   link._
2. **Does the touch screen live only at the booth now?** With the brain up in the
   truss, the V1 screen can't stay beside it (`plans/compute.md` open question 4).
   Is the console the only screen, or is a second screen needed at the brain box for
   service?
3. **Motorized faders: must-have or nice-to-have?** They drive the cost, power and
   dust risk. _Recommendation: yes, with the X-Touch Compact. It's the cheapest
   motorized option and well proven._
4. **Who plays it?** One resident VJ, or guest VJs who bring their own habits? Guests
   tend to know APC40, Launchpad and Twister.
5. **Screen size: 15.6" or 21.5"?** Is 1920 × 1080 enough for the Empyrean UI, which
   was seen at 2560 × 1080 in V1?
6. **Is the booth shaded, and can the console be packed away by day?** No controller
   or extender found is rated above 40–50 °C.
7. **What powers the booth: the Gate's own feed or another source?** If another
   source, prefer fibre, so the two grounds aren't bonded.
8. **How must the cable be run?** Across a walkway, buried, or under a ramp? That
   decides whether armoured fibre, tactical opticalCON, or plain outdoor Cat6a is
   needed.
9. **Is the network console in Section 7 acceptable?** It is cheaper hardware, but
   more software and a second PC.
10. **Is there a budget ceiling for this stretch goal?**

## Bench tests before buying for real

- Touch HID and a class-compliant MIDI controller through the chosen extender, with
  the hub at the far end. Check latency, hot-plug, and the touch-to-screen mapping
  after a reboot.
- The Black Box's latency and its handling of the panel's native mode. Its supported
  modes don't list 2560 × 1080.
- A DP fibre cable driven from a GPU mDP output through an adapter. Fibre DP cables
  draw power from the source's DP connector, so check it works (Assumed).
- The brain box's internal temperature with the extender's transmitter in it: the
  Kramer draws up to ~38 W and is rated 0–40 °C.

## Not yet checked (the search budget ran out)

- US prices for the Cable Matters, FIBBR, CABLETIME and Unitek DP fibre cables, and a
  100 m DP fibre cable.
- Copper USB 2.0 active repeater cables, as a cheap 10–25 m USB route.
- Gefen, Atlona and IHSE KVM extenders.
- FS.com tactical LC prices, and the price of a 100 m opticalCON DUO.
- NVIDIA's own RTX 2000E Ada datasheet (the outputs are retailer-reported).
- Whether a DP + USB → USB-C DP Alt Mode combiner exists.
- Live ALPS fader prices at a distributor.
- Decksaver coverage for the X-Touch Compact.
- Cases made for the APC40 or Launchpad.
- Road Ready, Jan-Al, Anvil and Calzone pricing.
