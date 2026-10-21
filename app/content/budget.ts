/**
 * The V2 budget: every line item, and every total the site shows, computed
 * from them. Nothing else on the site holds a dollar figure.
 *
 * Prices are USD, before tax and shipping. A unit price is one number, or a
 * [low, high] range when two parts are still in the running or the price is
 * an estimate. The research behind every line, with links and the spec
 * checks, is docs/pricing-2026-10.md (2026-10-21).
 */

import type { CategoryId } from "./categories";

/** How sure we are of a price. Shown beside it everywhere. */
export type Confidence = "quoted" | "estimate" | "assumed";

export const CONFIDENCE: Record<
  Confidence,
  { label: string; explain: string }
> = {
  quoted: {
    label: "Quoted",
    explain:
      "A real price for a named part, seen on the maker's store or a distributor. A range means two quoted parts are still in the running.",
  },
  estimate: {
    label: "Estimate",
    explain:
      "A range from comparable parts, or a part with no US price found yet.",
  },
  assumed: {
    label: "Assumed",
    explain:
      "Rests on a fact about today's Gate we haven't confirmed yet (named in the note).",
  },
};

export const TIER_IDS = ["core", "hardened", "senses", "spokes"] as const;
export type TierId = (typeof TIER_IDS)[number];

export interface Tier {
  id: TierId;
  name: string;
  /** What reaching this tier gets the Gate, in one line. */
  promise: string;
}

/** In order: each stretch goal builds on the ones before it. */
export const TIERS: Tier[] = [
  {
    id: "core",
    name: "V2",
    promise:
      "Weatherproof power and boxes, the ring network, and a show computer with a real GPU.",
  },
  {
    id: "hardened",
    name: "Built for the heat",
    promise:
      "Industrial switches and a fanless industrial show computer, rated for a sealed box in the desert sun.",
  },
  {
    id: "senses",
    name: "Eyes and ears",
    promise: "Cameras on the rig and networked sound at the ring.",
  },
  {
    id: "spokes",
    name: "128 spokes",
    promise: "Double the spokes: twice the light, on the same ring.",
  },
];

export interface Source {
  label: string;
  url: string;
}

export interface LineItem {
  id: string;
  category: CategoryId;
  tier: TierId;
  name: string;
  /** The maker and part number, when one is chosen. */
  part?: string;
  /** Why it's needed, in a few words. */
  detail?: string;
  qty: number;
  /** For a non-obvious quantity: how it was counted. */
  qtyNote?: string;
  /** USD per unit: one number, or [low, high]. */
  unit: number | readonly [number, number];
  confidence: Confidence;
  /** Where the price came from. */
  source?: Source;
  /** The maker's spec page or datasheet. */
  datasheet?: string;
  note?: string;
  /**
   * Set on an extra that is only bought if something turns out to be true.
   * Extras are listed, but never counted in a tier's total.
   */
  onlyIf?: string;
}

/**
 * Held back on every tier for what the line items miss: small parts
 * (terminals, wire, ferrules, labels), shipping, tax, the part that arrives
 * broken.
 */
export const CONTINGENCY = 0.15;

/** Totals the site shows are rounded up to this. */
export const ROUND_TO = 500;

/**
 * Early figures carry a banner. Turn it off once the crew has reviewed the
 * line items and the open questions that move them (pixel load, compute).
 */
export const DRAFT = true;

/** For a price seen only in a search snippet or an aggregator. */
const RECHECK =
  "Price seen only in a search result or aggregator; recheck before ordering.";

const UI = (slug: string, path = "products"): Source => ({
  label: "store.ui.com",
  url: `https://store.ui.com/us/en/${path}/${slug}`,
});

export const ITEMS: LineItem[] = [
  // --- Power ---------------------------------------------------------------
  {
    id: "power-cable-male",
    category: "power",
    tier: "core",
    name: "Locking mains plug, cable end",
    part: "Neutrik powerCON TRUE1 NAC3M-TRUE1-L",
    detail: "One end of each segment's cord. Rated to break under load.",
    qty: 20,
    qtyNote: "16 segments + 4 spares",
    unit: 14.57,
    confidence: "quoted",
    source: {
      label: "Newark",
      url: "https://www.newark.com/neutrik/nac3m-true1-l/high-pwr-conn-plug-20a-250vac/dp/21AM0215",
    },
    datasheet: "https://www.neutrik.com/en/product/nac3f-true1-l",
    note: `IP65/67 mated or capped; 20 A UL. ${RECHECK}`,
  },
  {
    id: "power-cable-female",
    category: "power",
    tier: "core",
    name: "Locking mains socket, cable end",
    part: "Neutrik powerCON TRUE1 NAC3F-TRUE1-L",
    qty: 20,
    qtyNote: "16 segments + 4 spares",
    unit: 10.82,
    confidence: "quoted",
    source: {
      label: "Full Compass",
      url: "https://www.fullcompass.com/prod/639815-neutrik-nac3f-true1-l-d-powercon-true1-female-power-connector-10-16mm-out-bulk-50",
    },
    datasheet: "https://www.neutrik.com/en/product/nac3f-true1-l",
    note: RECHECK,
  },
  {
    id: "power-panel-inlet",
    category: "power",
    tier: "core",
    name: "Sealed mains inlet on each power box",
    part: "Neutrik NAC3MPX-TOP",
    qty: 18,
    qtyNote: "16 boxes + 2 spares",
    unit: 4.88,
    confidence: "quoted",
    source: {
      label: "Tour Supply",
      url: "https://www.toursupply.com/neutrik-nac3mpx-top-powercon-true1-top-appliance-inlet-connector.html",
    },
    datasheet: "https://www.neutrik.com/en/product/nac3mpx-top",
  },
  {
    id: "power-panel-outlet",
    category: "power",
    tier: "core",
    name: "Sealed mains outlet on each power box",
    part: "Neutrik NAC3FPX-TOP",
    qty: 18,
    qtyNote: "16 boxes + 2 spares",
    unit: 9.28,
    confidence: "quoted",
    source: {
      label: "Full Compass",
      url: "https://www.fullcompass.com/prod/564150-neutrik-nac3fpx-top-powercon-true1-top-receptacle-1-4-flat-tab-terminals",
    },
    datasheet: "https://www.neutrik.com/en/product/nac3fpx-top",
    note: RECHECK,
  },
  {
    id: "power-caps",
    category: "power",
    tier: "core",
    name: "Sealing caps for the mains connectors",
    part: "Neutrik SCNAC-01, SCNAC-03",
    detail: "Every open end of a chain must be capped to stay sealed.",
    qty: 36,
    unit: [1.51, 1.79],
    confidence: "estimate",
    source: {
      label: "Parts Express",
      url: "https://www.parts-express.com/Neutrik-SCNAC01-Sealing-Cover-for-powerCON-092-2990",
    },
  },
  {
    id: "power-cord",
    category: "power",
    tier: "core",
    name: "Outdoor 12/3 power cord, 500 ft spool",
    part: "12/3 SJOOW (300 V) or SOOW (600 V)",
    detail: "About 240 ft around the ring, plus the feeders.",
    qty: 1,
    unit: [695, 855],
    confidence: "quoted",
    source: {
      label: "Wire & Cable Your Way",
      url: "https://www.wireandcableyourway.com/12-3-soow-portable-cord-600v-ul-csa",
    },
    datasheet:
      "https://www.southwire.com/wire-cable/flexible-cord/600v-royal-soow-cord-with-black-jacket-90-c-msha-approved/p/SPEC70000",
    note: "Sunlight and water resistant, −40 to 90 °C. 10/3 is too thick for these connectors.",
  },
  {
    id: "power-box",
    category: "power",
    tier: "core",
    name: "Power box, 12 × 10 × 6 in, hinged polycarbonate",
    part: "Hammond PCJ12106H",
    qty: 17,
    qtyNote: "16 segments + 1 spare",
    unit: [77.33, 126.45],
    confidence: "quoted",
    source: {
      label: "Digi-Key",
      url: "https://www.digikey.com/en/products/detail/hammond-manufacturing/PCJ12106H/22148973",
    },
    datasheet:
      "https://asset.solutionsdirectonline.com/doc/Hammond_Manufacturing/hammond_pcj_h_data_sheet.pdf",
    note: `IP66, NEMA 4X, UV-rated. ${RECHECK}`,
  },
  {
    id: "power-box-panel",
    category: "power",
    tier: "core",
    name: "Mounting panel for the power box",
    part: "Hammond PCJA1109",
    qty: 17,
    unit: [17.54, 21.65],
    confidence: "quoted",
    source: {
      label: "Findchips",
      url: "https://www.findchips.com/search/PCJA1109",
    },
    note: RECHECK,
  },
  {
    id: "power-din",
    category: "power",
    tier: "core",
    name: "DIN rail, 10 × 1 m",
    part: "AutomationDirect DN-R35S1",
    qty: 1,
    unit: 42.5,
    confidence: "quoted",
    source: {
      label: "AutomationDirect",
      url: "https://www.automationdirect.com/adc/shopping/catalog/terminal_blocks/din_rail_-a-_mounting_accessories/din_rail/dn-r35s1",
    },
  },
  {
    id: "power-breaker",
    category: "power",
    tier: "core",
    name: "Breaker in each power box, 15 A",
    part: "Eaton FAZ-C15-1-NA-SP (UL 489)",
    qty: 17,
    unit: 40,
    confidence: "quoted",
    source: {
      label: "AutomationDirect",
      url: "https://automationdirect.com/adc/shopping/catalog/circuit_protection_-z-_fuses_-z-_disconnects/ul_489_miniature_circuit_breakers/single_pole_mini_circuit_breakers_(0.5a-40a,_faz-na_series)/c_curve_(0.5a-40a,_faz-cxx-1-na-sp)/faz-c15-1-na-sp",
    },
    datasheet: "https://cdn.automationdirect.com/static/specs/eatonfazna.pdf",
  },
  {
    id: "power-54v",
    category: "power",
    tier: "core",
    name: "54 V supply for the switch and its PoE ports",
    part: "Mean Well SDR-240-48",
    detail: "Lives in the power box. Full load to 60 °C.",
    qty: 17,
    qtyNote: "16 + 1 spare",
    unit: 95.03,
    confidence: "quoted",
    source: {
      label: "TRC Electronics",
      url: "https://www.trcelectronics.com/products/mean-well-sdr-240-48",
    },
    datasheet: "https://www.meanwell.com/Upload/PDF/SDR-240/SDR-240-SPEC.PDF",
  },
  {
    id: "power-glands",
    category: "power",
    tier: "core",
    name: "Cable glands, 4 per power box",
    part: "Lapp SKINTOP ST-M M20 + locknut",
    qty: 68,
    unit: [2.94, 3.13],
    confidence: "quoted",
    source: {
      label: "Digi-Key",
      url: "https://www.digikey.com/en/products/detail/lapp/53111220/18879218",
    },
  },
  {
    id: "power-vents",
    category: "power",
    tier: "core",
    name: "Breather vent per power box",
    part: "Amphenol LTW VENT-PS1YBK-O8002",
    qty: 17,
    unit: [2.48, 4.17],
    confidence: "quoted",
    source: {
      label: "Findchips",
      url: "https://www.findchips.com/search/VENT-PS1YBK-O8002",
    },
    note: RECHECK,
  },
  {
    id: "power-gfci",
    category: "power",
    tier: "core",
    name: "Auto-reset inline GFCIs, one per chain + a spare",
    part: "Leviton GSIA2",
    detail: "Resets itself after a power cut, so the show comes back alone.",
    qty: 1,
    qtyNote: "a set of 4 to 7: one per chain, 3 to 6 chains, plus a spare",
    unit: [171.08, 299.39],
    confidence: "assumed",
    source: {
      label: "Leviton",
      url: "https://store.leviton.com/products/self-test-in-line-user-attachable-gfci-20-amp-120-volt-automatic-reset-gsia2",
    },
    note: "$42.77 each. How many chains depends on the pixels' full-white load, not yet measured.",
  },
  // --- Networking ----------------------------------------------------------
  {
    id: "net-switch",
    category: "networking",
    tier: "core",
    name: "Ring switch, one per node box",
    part: "UniFi USW-Ultra",
    qty: 17,
    qtyNote: "16 + 1 spare",
    unit: [142, 219],
    confidence: "quoted",
    source: UI("usw-ultra"),
    datasheet: "https://techspecs.ui.com/unifi/switching/usw-ultra",
    note: "$142 for the bare switch. Ubiquiti lists the full 202 W PoE budget only with its 210 W adapter; if the bare switch can't be set to it on our own 54 V supply, the $219 kit is needed.",
  },
  {
    id: "net-switch-din",
    category: "networking",
    tier: "core",
    name: "DIN-rail mount for the switch",
    part: "UniFi UACC-Switch-DIN",
    qty: 17,
    unit: 15,
    confidence: "quoted",
    source: UI(
      "uacc-switch-din",
      "category/accessories-installations/products",
    ),
  },
  {
    id: "net-plugs",
    category: "networking",
    tier: "core",
    name: "Sealed Ethernet plugs at the segment joints",
    part: "Neutrik etherCON NE8MXR1-B-TOP (or NE8MX6 for flexible cable)",
    qty: 36,
    qtyNote: "2 per joint × 16 + 4 spares",
    unit: [11.12, 23.54],
    confidence: "quoted",
    source: {
      label: "Digi-Key",
      url: "https://www.digikey.com/en/products/result?keywords=NE8MXR1-B-TOP",
    },
    datasheet: "https://www.neutrik.com/en/product/ne8mxr1-b-top",
    note: `IP65 mated, or unmated with its cap closed; −30 to 80 °C. ${RECHECK}`,
  },
  {
    id: "net-couplers",
    category: "networking",
    tier: "core",
    name: "Sealed inline Ethernet couplers, one per joint",
    part: "Neutrik etherCON NE8FFX6-W",
    qty: 18,
    qtyNote: "16 joints + 2 spares",
    unit: 38.99,
    confidence: "quoted",
    source: {
      label: "Markertek",
      url: "https://markertek.com/product/ne8ffx6-w/neutrik-ne8ffx6-w-ethercon-cat6a-feedthrough-coupler-for-cable-extensions",
    },
    datasheet: "https://www.neutrik.com/en/product/ne8ffx6-w",
  },
  {
    id: "net-caps",
    category: "networking",
    tier: "core",
    name: "Sealing caps for the Ethernet plugs",
    part: "Neutrik SCMX-TOP",
    qty: 36,
    unit: [1, 3],
    confidence: "estimate",
    datasheet: "https://www.neutrik.com/en/product/scmx-top",
    note: "No US price found.",
  },
  {
    id: "net-cable",
    category: "networking",
    tier: "core",
    name: "Outdoor shielded Ethernet cable",
    part: "UniFi UISP-Cable-Pro 1000 ft, or flexible Cat6A at about 270 ft",
    detail: "About 270 ft around the ring.",
    qty: 1,
    unit: [135, 537],
    confidence: "quoted",
    source: UI("uisp-cable-pro"),
    datasheet: "https://techspecs.ui.com/uisp/accessory-tech/uisp-cable-pro",
    note: "The $135 spool is solid-core, fine fixed along the truss. Stranded tactical Cat6A ($537) takes repeated flexing at the joints better.",
  },
  {
    id: "net-rj45",
    category: "networking",
    tier: "core",
    name: "Shielded RJ45 plugs, 100-pack",
    part: "UniFi UISP-Connector-SHD",
    qty: 1,
    unit: 19,
    confidence: "quoted",
    source: UI("uisp-connector-shd"),
  },
  {
    id: "net-industrial",
    category: "networking",
    tier: "hardened",
    name: "Industrial switches instead of the Ultra (the difference)",
    part: "UniFi USW-Industrial-DIN-8-PoE, $362 each",
    detail: "Rated to 70 °C, not 60 °C; 60 W PoE per port.",
    qty: 17,
    unit: 205,
    confidence: "quoted",
    source: UI("usw-industrial-din-8-poe"),
    datasheet:
      "https://techspecs.ui.com/unifi/switching/usw-industrial-din-8-poe",
    note: "$362 less the $157 Ultra and mount it replaces. Listed as available November 2026.",
  },
  // --- Compute -------------------------------------------------------------
  {
    id: "compute-pc",
    category: "compute",
    tier: "core",
    name: "Show computer: small build with a low-profile GPU",
    part: "Mini-ITX with a GeForce RTX 5060 Low Profile",
    qty: 1,
    unit: [1600, 2000],
    confidence: "estimate",
    source: {
      label: "BuildCores (GPU)",
      url: "https://www.buildcores.com/products/GPU/ortf45z0f/GIGABYTE-GeForce-RTX-5060-OC-Low-Profile-8G-GDDR7",
    },
    note: "Consumer parts are rated to about 35–40 °C, below what a sealed box in the sun reaches; the 'Built for the heat' goal replaces it with an industrial machine. Memory prices are unusually high this month.",
  },
  {
    id: "compute-industrial",
    category: "compute",
    tier: "hardened",
    name: "Fanless industrial show computer instead (the difference)",
    part: "Neousys Nuvo-9160GC, RTX 2000E Ada 16 GB, wide-temperature memory",
    detail: "Rated −25 to 60 °C, runs on DC.",
    qty: 1,
    unit: [4065, 5560],
    confidence: "estimate",
    source: {
      label: "Coast IPC",
      url: "https://coastipc.com/nuvo-9160gc-rugged-ai-platform-supporting-nvdia-rtx-gpu-up-to-130w",
    },
    datasheet:
      "https://www.neousys-tech.com/en/product/feature/mezio/nuvo-9160gc-intel-12th-gpu-computing-platform",
    note: "Quoted at $6,065–$7,160 by a reseller, less the small build it replaces.",
  },
  // --- Weatherproofing -----------------------------------------------------
  {
    id: "wp-node-box",
    category: "weatherproofing",
    tier: "core",
    name: "Node box, 14 × 12 × 6 in, hinged polycarbonate",
    part: "Hammond PCJ14126H",
    detail:
      "Light controller and switch on DIN rail, room for 8 pixel outputs.",
    qty: 18,
    qtyNote: "16 + 2 spares",
    unit: [90.55, 97.99],
    confidence: "quoted",
    source: {
      label: "Findchips",
      url: "https://www.findchips.com/search/PCJ14126H",
    },
    datasheet:
      "https://asset.solutionsdirectonline.com/doc/Hammond_Manufacturing/hammond_pcj_h_data_sheet.pdf",
    note: `IP66 (not IP67), NEMA 4X, UV-rated. ${RECHECK}`,
  },
  {
    id: "wp-node-panel",
    category: "weatherproofing",
    tier: "core",
    name: "Mounting panel for the node box",
    part: "Hammond PCJR1311",
    qty: 18,
    unit: [23.31, 39.54],
    confidence: "quoted",
    source: {
      label: "Standard Electric",
      url: "https://www.standardelectricsupply.com/Hammond-Manufacturing-PCJR1311",
    },
    note: RECHECK,
  },
  {
    id: "wp-din",
    category: "weatherproofing",
    tier: "core",
    name: "DIN rail, 5 × 2 m",
    part: "Phoenix Contact 0801733",
    qty: 5,
    unit: [18.55, 20.61],
    confidence: "quoted",
    source: {
      label: "Findchips",
      url: "https://www.findchips.com/search/0801733",
    },
    note: RECHECK,
  },
  {
    id: "wp-glands",
    category: "weatherproofing",
    tier: "core",
    name: "Cable glands, 11 per node box",
    part: "Lapp SKINTOP ST-M M20 + locknut",
    detail: "4 pixel outputs, DC in, 6 Ethernet: RJ45s crimped inside the box.",
    qty: 200,
    unit: [2.94, 3.13],
    confidence: "quoted",
    source: {
      label: "Digi-Key",
      url: "https://www.digikey.com/en/products/detail/lapp/53111220/18879218",
    },
    note: "IP68.",
  },
  {
    id: "wp-vents",
    category: "weatherproofing",
    tier: "core",
    name: "Breather vents: let a box breathe, keep dust out",
    part: "Amphenol LTW VENT-PS1YBK-O8002",
    qty: 20,
    qtyNote: "18 node boxes + 2 on the brain box",
    unit: [2.48, 4.17],
    confidence: "quoted",
    source: {
      label: "Findchips",
      url: "https://www.findchips.com/search/VENT-PS1YBK-O8002",
    },
    note: RECHECK,
  },
  {
    id: "wp-brain-box",
    category: "weatherproofing",
    tier: "core",
    name: "Brain box for the show computer and gateway",
    part: "Hammond PCJ181610H, or Fibox ARCA AR20168CHSSL (IP67)",
    qty: 1,
    unit: [139.02, 356.41],
    confidence: "quoted",
    source: {
      label: "Findchips",
      url: "https://www.findchips.com/search/PCJ181610H",
    },
    datasheet: "https://www.fibox.com/products/arca/ar-20168/8561369",
    note: RECHECK,
  },
  {
    id: "wp-logger",
    category: "weatherproofing",
    tier: "core",
    name: "Temperature loggers, for the heat test before buying",
    part: "Onset HOBO MX2303, or Elitech RC-5+ TE",
    qty: 2,
    unit: [20.99, 255],
    confidence: "quoted",
    source: { label: "Onset", url: "https://www.onsetcomp.com/node/13046" },
  },
  {
    id: "wp-shields",
    category: "weatherproofing",
    tier: "core",
    name: "Sun shields: white aluminium on standoffs",
    detail:
      "On every box. A shield cuts the heat a box takes on by about half.",
    qty: 33,
    qtyNote: "16 node + 16 power + 1 brain",
    unit: [40, 120],
    confidence: "estimate",
    source: {
      label: "Zoro (sheet, for reference)",
      url: "https://www.zoro.com/online-metal-supply-0063-in-x-24-in-x-24-in-5052-h32-aluminum-sheet-mill-finish-505232bt0063w24l241/i/G923056860/",
    },
    note: "No enclosure maker sells one for these boxes; Hoffman's wall-mount shield ($357) measured about 56% less temperature rise.",
  },
  // --- Expansion -----------------------------------------------------------
  {
    id: "exp-cameras",
    category: "expansion",
    tier: "senses",
    name: "Outdoor 4K PoE cameras",
    part: "UniFi G6 Bullet",
    qty: 2,
    unit: 233,
    confidence: "quoted",
    source: UI("uvc-g6-bullet"),
    datasheet: "https://techspecs.ui.com/unifi/cameras-nvrs/uvc-g6-bullet",
    note: "IP66, −20 to 50 °C.",
  },
  {
    id: "exp-recorder",
    category: "expansion",
    tier: "senses",
    name: "Gateway that can also record the cameras",
    part: "UniFi Cloud Gateway Max",
    qty: 1,
    unit: 307,
    confidence: "quoted",
    source: UI("ucg-max"),
    datasheet: "https://techspecs.ui.com/unifi/cloud-gateways/ucg-max",
    note: "Today's gateway can't record. Rated only to 40 °C.",
  },
  {
    id: "exp-audio",
    category: "expansion",
    tier: "senses",
    name: "Networked audio endpoint",
    part: "AXIS C1310-E Mk II horn speaker, or an Aurora Dante PoE amplifier",
    qty: 1,
    unit: [498, 689],
    confidence: "quoted",
    source: {
      label: "networkcamerastore.com",
      url: "https://networkcamerastore.com/products/axis-axis-c1310-e-mk-ii-02813-001",
    },
  },
  {
    id: "exp-strips",
    category: "expansion",
    tier: "spokes",
    name: "LED strip for 64 more spokes, 5 m reels",
    part: "BTF-Lighting WS2815, 60/m, IP67",
    qty: 86,
    qtyNote: "64 spokes × 6.3 m = 403 m; offcuts pooled",
    unit: [43.99, 58.65],
    confidence: "assumed",
    source: {
      label: "BTF-Lighting",
      url: "https://www.btf-lighting.com/products/ws2815-rgb-addressable-led-strip-dc12v",
    },
    note: "Assumes today's strip is 12 V WS2815 at 60 LEDs per metre; not yet confirmed. Quoted on sale and at list.",
  },
  {
    id: "exp-leads",
    category: "expansion",
    tier: "spokes",
    name: "Waterproof pigtails and power-injection leads",
    qty: 1,
    qtyNote: "for 64 spokes",
    unit: [594, 914],
    confidence: "estimate",
    source: {
      label: "BTF-Lighting",
      url: "https://www.btf-lighting.com/products/5-pairs-led-connector-waterproof-ip68-2pin-3pin-4pin-5pin-20cm-male-to-female-22awg-24awg-black-white-cable-for-led-light-strip",
    },
  },
  {
    id: "exp-supplies",
    category: "expansion",
    tier: "spokes",
    name: "12 V supplies for the new spokes, one set per segment",
    part: "Mean Well HLG-320H-12, up to HLG-600H-12 + HLG-320H-12",
    qty: 16,
    unit: [96.86, 302.06],
    confidence: "assumed",
    source: {
      label: "TRC Electronics",
      url: "https://www.trcelectronics.com/products/mean-well-hlg-320h-12",
    },
    datasheet: "https://www.meanwell.com/Upload/PDF/HLG-320H/HLG-320H-SPEC.PDF",
    note: "Sized for 8 to 18 W per metre at full white, the range for this kind of strip. It also doubles the mains load: more chains and circuits, not priced here.",
  },
];

/** Bought only if something turns out to be true. Never in a total. */
export const EXTRAS: LineItem[] = [
  {
    id: "extra-pixel-supplies",
    category: "power",
    tier: "core",
    name: "New 12 V pixel supplies for all 16 segments",
    part: "Mean Well HLG-320H-12 / HLG-600H-12, outdoor, IP67",
    qty: 1,
    qtyNote: "one set per segment, sized by the pixel load",
    unit: [1743, 5135],
    confidence: "assumed",
    source: {
      label: "TRC Electronics",
      url: "https://www.trcelectronics.com/products/mean-well-hlg-320h-12",
    },
    datasheet: "https://www.meanwell.com/Upload/PDF/HLG-320H/HLG-320H-SPEC.PDF",
    note: "Mounted outside the sealed box, shaded.",
    onlyIf: "V2 replaces today's pixel supplies",
  },
  {
    id: "extra-gfci-distro",
    category: "power",
    tier: "core",
    name: "GFCI power distribution box",
    part: "CEP 6503GU spider box, up to a Lex 100 A distro",
    qty: 1,
    unit: [1522.47, 3225.88],
    confidence: "quoted",
    source: {
      label: "ATI Electrical",
      url: "https://atielectrical.com/products/6503gu-cep-spider-box-input-30a-125250v",
    },
    onlyIf: "the event's power has no GFCI distribution of its own",
  },
  {
    id: "extra-ups",
    category: "compute",
    tier: "core",
    name: "Backup power for the show computer",
    part: "APC BE600M1, or a Mean Well DRS-240-24 DIN DC UPS",
    qty: 1,
    unit: [101, 199.5],
    confidence: "quoted",
    source: {
      label: "Master Electronics",
      url: "https://masterelectronics.com/en/mean-well/drs24024-56536616.html",
    },
    note: "The APC is rated only to 40 °C.",
    onlyIf: "short power cuts turn out to be a problem",
  },
];

// --- Arithmetic --------------------------------------------------------------

export type Range = readonly [number, number];

export function unitRange(item: LineItem): Range {
  return typeof item.unit === "number" ? [item.unit, item.unit] : item.unit;
}

export function itemRange(item: LineItem): Range {
  const [lo, hi] = unitRange(item);
  return [lo * item.qty, hi * item.qty];
}

export function sumRanges(ranges: Iterable<Range>): Range {
  let lo = 0;
  let hi = 0;
  for (const [l, h] of ranges) {
    lo += l;
    hi += h;
  }
  return [lo, hi];
}

/** Items matching a filter; ITEMS unless another list is given. */
export function itemsIn(
  filter: { tier?: TierId; category?: CategoryId },
  items: LineItem[] = ITEMS,
): LineItem[] {
  return items.filter(
    (i) =>
      (!filter.tier || i.tier === filter.tier) &&
      (!filter.category || i.category === filter.category),
  );
}

/** Parts only, before contingency. */
export function subtotal(items: LineItem[]): Range {
  return sumRanges(items.map(itemRange));
}

export function contingencyOf(range: Range): Range {
  return [range[0] * CONTINGENCY, range[1] * CONTINGENCY];
}

export function roundUp(n: number, to = ROUND_TO): number {
  return Math.ceil(n / to) * to;
}

export interface TierTotal {
  tier: Tier;
  parts: Range;
  contingency: Range;
  /** Parts plus contingency. */
  total: Range;
  /** What we raise for this tier alone: the high end, rounded up. */
  goal: number;
  /** Running goal: this tier and every tier before it. */
  cumulative: number;
}

export function tierTotals(items: LineItem[] = ITEMS): TierTotal[] {
  let running = 0;
  return TIERS.map((tier) => {
    const parts = subtotal(itemsIn({ tier: tier.id }, items));
    const contingency = contingencyOf(parts);
    const total: Range = [parts[0] + contingency[0], parts[1] + contingency[1]];
    const goal = roundUp(total[1]);
    running += goal;
    return { tier, parts, contingency, total, goal, cumulative: running };
  });
}

/** One slice of a tier's budget: a category, or the contingency. */
export interface Slice {
  key: CategoryId | "contingency";
  range: Range;
}

/** A tier's high-end budget by category, then the contingency. */
export function slicesOf(tier: TierId, items: LineItem[] = ITEMS): Slice[] {
  const inTier = itemsIn({ tier }, items);
  const byCategory = new Map<CategoryId, LineItem[]>();
  for (const item of inTier) {
    const list = byCategory.get(item.category) ?? [];
    list.push(item);
    byCategory.set(item.category, list);
  }
  const slices: Slice[] = [...byCategory].map(([key, list]) => ({
    key,
    range: subtotal(list),
  }));
  slices.push({ key: "contingency", range: contingencyOf(subtotal(inTier)) });
  return slices;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function money(n: number): string {
  return usd.format(Math.round(n));
}

/**
 * A unit price: whole dollars from $100 up, cents below it, where rounding
 * would misstate a $14.57 connector as $15.
 */
export function moneyUnit(n: number): string {
  return n < 100 && !Number.isInteger(n) ? usdCents.format(n) : money(n);
}

/** "$1,200" or "$1,200–$2,400". */
export function moneyRange(
  [lo, hi]: Range,
  format: (n: number) => string = money,
): string {
  return format(lo) === format(hi) ? format(lo) : `${format(lo)}–${format(hi)}`;
}

/** "$12.9K" for tight spots like chart labels. */
export function moneyShort(n: number): string {
  if (n < 1000) return money(n);
  const k = n / 1000;
  return `$${k >= 100 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}K`;
}
