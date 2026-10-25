/**
 * The V2 budget: every line item, and every total the site shows, computed
 * from them. Nothing else on the site holds a dollar figure.
 *
 * Prices are USD, before tax and shipping. A unit price is one number, or a
 * [low, high] range when two parts are still in the running or the price is
 * an estimate. The research behind every line, with links and the spec
 * checks, is docs/pricing-2026-10.md and, for the power feed and joints,
 * docs/pricing-power-feed-2026-10.md and docs/pricing-joint-cords-2026-10.md
 * (all 2026-10-21).
 */

import type { CategoryId } from "./categories";
import type { Conflict, Credit } from "./human";

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

export const TIER_IDS = [
  "core",
  "hardened",
  "senses",
  "console",
  "spokes",
  "rigging",
  "solar",
  "transport",
] as const;
export type TierId = (typeof TIER_IDS)[number];

export interface Tier {
  id: TierId;
  name: string;
  /** What reaching this tier gets the Gate, in one line. */
  promise: string;
  /**
   * A big project, and the category whose plan it is: its own goal, raised on
   * its own. It stays off the ladder of stretch goals and out of their running
   * total.
   */
  project?: CategoryId;
  /** Who drove it. Absent: an AI draft (app/content/human.ts). */
  by?: Credit;
}

/**
 * In order: V2, then each stretch goal building on the ones before it, then
 * the big projects.
 */
export const TIERS: Tier[] = [
  {
    id: "core",
    by: {
      h: ["H10", "H11", "H12", "H13", "H14", "H28"],
      what: "The five V2 upgrades, and the industrial PC in V2",
    },
    name: "V2",
    promise:
      "Weatherproof power and boxes, the ring network, and a fanless show computer with a real GPU, rated for the heat.",
  },
  {
    id: "hardened",
    by: { h: ["H09"], what: "Industrial switches as a stretch goal" },
    name: "Built for the heat",
    promise:
      "Industrial switches rated to 70 °C, for a sealed box in the desert sun.",
  },
  {
    id: "senses",
    by: { h: ["H15"], what: "Cameras and streaming audio" },
    name: "Eyes and ears",
    promise: "Cameras on the rig and networked sound at the ring.",
  },
  {
    id: "console",
    by: { h: ["H37"] },
    name: "VJ console",
    promise:
      "A touch screen and real faders at the VJ booth, wired to the show computer: play the Gate by hand.",
  },
  {
    id: "spokes",
    name: "128 spokes",
    promise: "Double the spokes: twice the light, on the same ring.",
  },
  {
    id: "rigging",
    by: { h: ["H34"] },
    name: "A ring that raises itself",
    promise:
      "The ring climbs its own legs on eight hoists, level and locked off at height: no forklift, no crane.",
    project: "rigging",
  },
  {
    id: "solar",
    by: { h: ["H35", "H53"] },
    name: "Run on sunlight",
    promise:
      "Panels and a battery that run the Gate through the night, with a small generator only as backup.",
    project: "solar",
  },
  {
    id: "transport",
    by: { h: ["H36"] },
    name: "Roll it in, roll it out",
    promise:
      "The Gate's own 40 ft container, and carts with playa wheels for every part, so load-in and strike are a roll, not a carry.",
    project: "transport",
  },
];

/** V2 and the stretch goals, in order. */
export const LADDER = TIERS.filter((t) => !t.project);
/** The big projects, each raised on its own. */
export const PROJECTS = TIERS.filter((t) => t.project);

/** How a tier is named in captions: "V2", "Stretch goal 2: …", "Big project: …". */
export function tierLabel(tier: Tier, short = false): string {
  if (tier.project) return `Big project: ${tier.name}`;
  const i = LADDER.indexOf(tier);
  if (i === 0) return tier.name;
  return `${short ? "Stretch" : "Stretch goal"} ${i}: ${tier.name}`;
}

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
  /** Who drove it. Absent: an AI draft. */
  by?: Credit;
  /** Where the AI's choice goes against what a human said. */
  conflict?: Conflict;
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
export const DRAFT = false;

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
    id: "power-joint-plug",
    conflict: {
      h: ["H22"],
      note: "The user asked for off-the-shelf extension cords cut in half; these are loose ends on bulk cord (the AI's change after the ring grew to 60 ft).",
    },
    by: {
      h: ["H17", "H60", "H69"],
      what: "A three-phase L21-30 twist-lock at each joint. The parts are the AI's",
    },
    category: "power",
    tier: "core",
    name: "Three-phase 30 A twist-lock plug (L21-30), one per joint",
    part: "Hubbell HBL2811 (or AC Works ASL2130P, cULus E237606)",
    detail: "Fitted to the trunk cord on site: a listed plug on listed cord.",
    qty: 18,
    qtyNote: "16 joints + 2 spares",
    unit: [30.04, 31.99],
    confidence: "quoted",
    source: {
      label: "Stage Lighting Store (HBL2811)",
      url: "https://www.stagelightingstore.com/Hubbell-HBL2811-L21-30-Male-Plug",
    },
    datasheet: "https://www.hubbell.com/hubbell/en/p/157046",
    note: "Hubbell publishes a 9–29 mm cord grip (the 8/5 is 26.4 mm), #16–#8 wire and 75 °C. AC Works publishes no grip range; trial-fit one if it's chosen.",
  },
  {
    id: "power-joint-connector",
    conflict: {
      h: ["H22"],
      note: "The user asked for off-the-shelf extension cords cut in half; these are loose ends on bulk cord (the AI's change after the ring grew to 60 ft).",
    },
    by: {
      h: ["H17", "H60", "H69"],
      what: "A three-phase L21-30 twist-lock at each joint. The parts are the AI's",
    },
    category: "power",
    tier: "core",
    name: "Three-phase 30 A twist-lock connector (L21-30), one per joint",
    part: "AC Works ASL2130R (or Hubbell HBL2813)",
    qty: 18,
    qtyNote: "16 joints + 2 spares",
    unit: [36.99, 44.32],
    confidence: "quoted",
    source: {
      label: "AC Works",
      url: "https://acworks.com/products/asl2130r-nema-l21-30r-30a-3-phase-120-208v-3py-5-wire-locking-female-connector",
    },
    datasheet: "https://www.hubbell.com/hubbell/en/p/157051",
    note: "The Hubbell HBL2813 ($44.32) has the published grip and 75 °C rating; AC Works publishes neither.",
  },
  {
    id: "power-trunk",
    by: { h: ["H60", "H69"], what: "Three-phase. The 8/5 cord is the AI's" },
    category: "power",
    tier: "core",
    name: "Power trunk around the ring: 8/5 outdoor cord (ft)",
    part: "Southwire 8/5 SOOW 600 V, UL listed",
    detail:
      "Three hots, neutral, ground. 25 A at 50 °C (30 A at 45 °C or below), with the supplies wired leg to leg so the neutral carries little.",
    qty: 240,
    qtyNote:
      "188.5 ft around the 60 ft ring, plus slack and two spare segments",
    unit: 7.59,
    confidence: "quoted",
    source: {
      label: "Wire & Cable Your Way",
      url: "https://www.wireandcableyourway.com/8-5-soow-portable-cord-600v-ul-csa",
    },
    datasheet:
      "https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US",
    note: "UL listing is required for event wiring. About 8.5 lb a segment. 8/5 is the heaviest cord any L21-30 takes: 6/5 fits none.",
  },
  {
    id: "power-joint-covers",
    by: { h: ["H24"], what: "Rain-proof is enough" },
    category: "power",
    tier: "core",
    name: "Rain cover over each mated joint",
    part: "Twist and Seal Cord Vault (or the larger Cord Dome)",
    detail:
      "Rain-proof (NEMA 3R / IP44), not watertight: joints stay off the ground.",
    qty: 18,
    qtyNote: "16 joints + 2 spares",
    unit: [12.95, 26.95],
    confidence: "quoted",
    source: {
      label: "Twist and Seal",
      url: "https://twistandseal.com/products/twist-and-seal-cord-vault-keeps-large-cord-connections-dry-and-secure",
    },
    note: "May not fit: the Cord Vault's published closed depth (1.75 in) is smaller than the 58 mm plug bodies. Trial-fit one before buying 18; the high price is the Cord Dome ($26.95, fit also unknown).",
  },
  {
    id: "power-feeder",
    category: "power",
    tier: "core",
    name: "Feeder cord, generator to the feed box: 50 ft 8/5 L21-30",
    part: "AC Works ASL2130P + ASL2130R on 50 ft 8/5 SOOW, or a UL-listed Locking Power Cords IBX-5809-50",
    qty: 1,
    unit: [448.48, 495],
    confidence: "quoted",
    source: {
      label: "Locking Power Cords",
      url: "https://lockingpowercords.com/product/l21-30-extension-cords-30a-120-208v-8-5-soow",
    },
  },
  {
    id: "power-end-cap",
    by: { h: ["H20"], what: "An open loop, capped at the far end (approved)" },
    category: "power",
    tier: "core",
    name: "Cap for the open connector at the far end of the ring",
    part: "AC Works CVFE",
    qty: 1,
    unit: 8.99,
    confidence: "quoted",
    source: {
      label: "AC Works",
      url: "https://acworks.com/products/cvfe-cable-end-weather-cover",
    },
    note: 'AC Works says it fits "5-prong female connectors"; fit not yet checked.',
  },
  {
    id: "power-feed-sockets",
    category: "power",
    tier: "core",
    name: "Feed box: L21-30 inlet and outlet",
    part: "Hubbell HBL2815 inlet + WP2 weatherproof cover + an L21-30 pigtail out (low); HBL2815SW watertight inlet + HBL2810SW receptacle (high)",
    detail: "Where the generator's cord plugs in.",
    qty: 1,
    unit: [161.8, 601.66],
    confidence: "quoted",
    source: {
      label: "Stage Lighting Store (inlet)",
      url: "https://www.stagelightingstore.com/Hubbell-HBL2815-L21-30-Flanged-Inlet",
    },
    datasheet:
      "https://www.northcoast.com/product/detail/136973/hubbell-kellems-hbl2815sw",
    note: "The HBL2810SW's price (about $262) was seen only in a search result; recheck before ordering.",
  },
  {
    id: "power-half-split",
    by: { h: ["H70"], what: "Room to split the power in half" },
    category: "power",
    tier: "core",
    name: "Second output from the feed box, so the ring runs as two halves",
    part: "An L21-30 pigtail (AC Works ASL2130R on 3 ft of 8/5) and a second end cap",
    detail:
      "The two halves run opposite ways from the feed joint and meet, capped, across the ring. One feed powers both; each carries half the current. A second feed later doubles the power with no rewiring. The light is never split.",
    qty: 1,
    unit: [60, 170],
    confidence: "estimate",
    note: "Later, a second feeder, inlet and breaker (about $800–$1,400) give each half its own 25 A three-phase feed. Segments in one half are wired the other way round, so a segment can't move between halves.",
  },
  {
    id: "power-feed-box",
    category: "power",
    tier: "core",
    name: "Feed box with a 25 A three-pole main breaker",
    part: "Hammond PCJ12106H + Eaton FAZ-C25/3-NA (UL 489)",
    detail:
      "25 A is what the 8/5 cord carries at 50 °C. Not the FAZ-C30-3 without -NA: that one is only a supplementary protector (UL 1077).",
    qty: 1,
    unit: [200.33, 249.45],
    confidence: "quoted",
    source: {
      label: "AutomationDirect (breaker)",
      url: "https://www.automationdirect.com/adc/shopping/catalog/circuit_protection_-z-_fuses_-z-_disconnects/circuit_breakers_-a-_circuit_protectors/miniature_circuit_breakers_(mcb)/faz-c25-3-na",
    },
  },
  {
    id: "power-box",
    by: {
      h: ["H13", "H14"],
      what: "A power box in each segment, apart from the data",
    },
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
    id: "power-gfci",
    by: {
      h: ["H20"],
      what: "A ground-fault breaker per segment (approved). The Ericson part is the AI's",
    },
    category: "power",
    tier: "core",
    name: "20 A breaker and ground-fault protector in each power box, reset from the ground",
    part: "A 20 A breaker + Ericson 1075-AR panel-mount Class A GFCI (UL 943)",
    detail:
      "Each segment protected on its own: a fault darkens one segment, not the Gate. The GFCI mounts through the box's floor, its reset button facing down, so a pole resets it from the ground.",
    qty: 17,
    qtyNote: "16 + 1 spare",
    unit: [98.56, 290.77],
    confidence: "quoted",
    source: {
      label: "RSP Supply (1075-AR)",
      url: "https://rspsupply.com/p-583935-ericson-1075-ar-panel-mount-gfci-20-amp-2400-watts-1-ft-cable-nema-3r.aspx",
    },
    datasheet:
      "https://www.homelectrical.com/sites/default/files/ERC-1075ARKIT-SPEC.pdf",
    note: "Not yet right for line-to-line supplies (208 V on the three-phase feed, H64): those need a two-pole ground-fault breaker; this is the single-pole 120 V pick. One 5 mA GFCI for the whole ring would trip on the summed leakage of the supplies. 20 A per segment, matching its 20 A outlets. The 1075-AR is 20 A, −35 to 66 °C, NEMA 4/4X face, and powers itself back up after an outage. Low: a $40 breaker + the 1075-AR at $58.56 (sale; $70.27 regular). High: an Allen-Bradley 1492-MCGAT120 DIN GFCI breaker (about $276 + adapters) behind a sealed window.",
  },
  {
    id: "power-reset-pole",
    by: { h: ["H48"] },
    category: "power",
    tier: "core",
    name: "Insulated reset pole, for the ground-fault protectors overhead",
    detail: "A tripped segment is reset from the ground, no ladder.",
    qty: 2,
    unit: [40, 150],
    confidence: "estimate",
    note: "A fibreglass telescoping pole with a push tip; one spare.",
  },
  {
    id: "power-54v",
    by: { h: ["H07"], what: "A 48 V class supply in each box" },
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
    name: "Small cable glands, 4 per power box (DC out, supply leads)",
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
    id: "power-trunk-glands",
    category: "power",
    tier: "core",
    name: "Large cable glands for the trunk, in and out of each power box",
    part: "Lapp SKINTOP M32–M40 class",
    qty: 34,
    unit: [6, 15],
    confidence: "estimate",
    note: "The 26.4 mm trunk is too big for the M20 glands; a SKINTOP ST-M M40 (19–28 mm) takes it. Not priced yet.",
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
    id: "power-outlets",
    by: {
      h: ["H23", "H25", "H33"],
      what: "Four 20 A local outlets per power box",
    },
    category: "power",
    tier: "core",
    name: "Local outlets on each power box: four 20 A, 120 V, behind the segment's 20 A ground-fault breaker",
    part: "Bell 5337-0 die-cast box, 2 × 20 A weather-resistant duplex, Eaton WIU-2WX in-use cover",
    detail:
      "For whatever is mounted on that segment. The cover closes over plugged-in cords.",
    qty: 17,
    qtyNote: "16 + 1 spare",
    unit: [45.47, 97.44],
    confidence: "estimate",
    source: {
      label: "homelectrical (cover)",
      url: "https://www.homelectrical.com/2-gang-weather-protective-cover-extra-dutywhite.etw-wiu2wx.1.html",
    },
    note: 'Parts are quoted; the nipple or short lead to the power box is estimated. Four outlets is a placeholder for "a handful". docs/pricing-joint-cords-2026-10.md.',
  },
  // --- Networking ----------------------------------------------------------
  {
    id: "power-3phase-distro",
    by: { h: ["H69"], what: "Three-phase. The adapter is the AI's" },
    category: "power",
    tier: "core",
    name: "Adapter for three-phase towable generators (cam-lok to L21-30)",
    part: "Field-built: 5 × Hubbell HBL300MBK cam-loks on short tails, a 3-pole breaker, an L21-30 outlet (low); Motion Labs 1325-04-21-06-002, ETL listed (high)",
    detail:
      "No rental generator has an L21-30 outlet: three-phase comes off a towable's cam-loks or lugs, with its selector at 208Y/120.",
    qty: 1,
    unit: [580, 3899.88],
    confidence: "estimate",
    source: {
      label: "Film & Video Lighting (Motion Labs)",
      url: "https://www.filmandvideolighting.com/motion-labs-stackable-distro-box-cam-input-to-8-l21-30-outlets-1325-04-21-06-002.html",
    },
    note: "A home-made box isn't a listed assembly, and an inspector may not accept it; the Motion Labs box is. Or rent an event distro with L21-30 outlets. Portable generators are single-phase and can't feed the ring.",
  },
  {
    id: "net-switch",
    by: { h: ["H03", "H09"], what: "A switch per node box; the USW-Ultra" },
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
    part: "UniFi UISP-Cable-Pro 1000 ft, or flexible Cat6A at about 325 ft",
    detail: "About 325 ft around the 60 ft ring.",
    qty: 1,
    unit: [135, 646],
    confidence: "quoted",
    source: UI("uisp-cable-pro"),
    datasheet: "https://techspecs.ui.com/uisp/accessory-tech/uisp-cable-pro",
    note: "The $135 spool is solid-core, fine fixed along the truss. Stranded tactical Cat6A ($1.99 a foot) takes repeated flexing at the joints better.",
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
    by: { h: ["H09"], what: "The Industrial DIN as a stretch goal" },
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
    id: "compute-industrial",
    by: { h: ["H28"], what: "An industrial PC in V2. Which one is the AI's" },
    category: "compute",
    tier: "core",
    name: "Fanless industrial show computer",
    part: "Neousys Nuvo-9160GC, RTX 2000E Ada 16 GB, wide-temperature memory",
    detail: "Rated −25 to 60 °C, runs on DC.",
    qty: 1,
    unit: [6065, 7160],
    confidence: "estimate",
    source: {
      label: "Coast IPC",
      url: "https://coastipc.com/nuvo-9160gc-rugged-ai-platform-supporting-nvdia-rtx-gpu-up-to-130w",
    },
    datasheet:
      "https://www.neousys-tech.com/en/product/feature/mezio/nuvo-9160gc-intel-12th-gpu-computing-platform",
    note: "Reseller prices; the range is the memory and storage options. Consumer parts are rated to about 35–40 °C, below what a sealed box in the sun reaches.",
  },
  // --- Weatherproofing -----------------------------------------------------
  {
    id: "wp-node-box",
    by: { h: ["H13"] },
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
    by: { h: ["H13"] },
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
    by: {
      h: ["H51"],
      what: "Something simple on the truss above the boxes. Count and price are the AI's",
    },
    category: "weatherproofing",
    tier: "core",
    name: "Sun shields: a simple white sheet on the truss above each segment's boxes",
    detail: "Shading cuts the heat a box takes on by about half.",
    qty: 17,
    qtyNote: "16 segments + the brain box",
    unit: [50, 150],
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
    by: { h: ["H15"] },
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
    by: { h: ["H15"] },
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
    note: "Sized for 8 to 18 W per metre at full white, the range for this kind of strip. The 30 A feed carries 128 spokes at their average draw; whether it carries full white waits on measuring a spoke.",
  },
  // --- VJ console (stretch goal, Compute) -----------------------------------
  // Option A, "Simple", at a ~30 m link (docs/pricing-vj-console-2026-10.md).
  {
    id: "vj-screen",
    category: "compute",
    tier: "console",
    name: "Industrial touch screen, 15.6 inch, sealed front",
    part: "faytech FT156TMCAPOB",
    detail: "Rated −10 to 60 °C; portable touch monitors stop at 40 °C.",
    qty: 1,
    unit: [566, 650],
    confidence: "estimate",
    note: "Price from a search listing.",
  },
  {
    id: "vj-link",
    category: "compute",
    tier: "console",
    name: "Link to the brain box, about 30 m: video, USB and Ethernet on one cable",
    part: "Kramer EXT3-XR-TR × 2, Cat6a, a Mini DisplayPort adapter",
    detail:
      "The show computer's USB-C port carries no video, so the screen runs from the graphics card and USB rides alongside. The far-end box is the dock.",
    qty: 1,
    unit: [1480, 1950],
    confidence: "quoted",
    source: {
      label: "ConferenceRoomAV",
      url: "https://conferenceroomav.com/p/kramer-av-ext3-xr-tr",
    },
    datasheet: "https://files.hdtvsupply.com/kramer-ext3-xr-tr-ds.pdf",
    note: "About $415–1,075 at 10 m; $900–1,840 over fibre at 50–100 m. Measure the cable route first.",
  },
  {
    id: "vj-controls",
    category: "compute",
    tier: "console",
    name: "Motorized faders, knobs and buttons",
    part: "Behringer X-Touch Compact, optionally an Akai APC mini mk2",
    detail:
      "Nine motorized faders that follow the show. Class-compliant MIDI: no drivers.",
    qty: 1,
    unit: [309, 408],
    confidence: "estimate",
    note: "Prices from listings. The show app doesn't map MIDI controls yet: software work, not a cost here.",
  },
  {
    id: "vj-case",
    category: "compute",
    tier: "console",
    name: "Hard case for the console, with a lid against the dust",
    qty: 1,
    unit: [200, 450],
    confidence: "estimate",
  },
  {
    id: "vj-power-covers",
    category: "compute",
    tier: "console",
    name: "Console power strip, dust covers, cleaning kit",
    qty: 1,
    unit: [40, 100],
    confidence: "estimate",
  },
  // --- Rigging: a self-climbing ring (big project) ------------------------
  // Option 1b, electric (docs/pricing-self-climbing-2026-10.md): stock sleeve
  // blocks at the 8 legs, V1 arcs kept. Assumes 12" (F34-class) truss.
  {
    id: "rig-sleeves",
    category: "rigging",
    tier: "rigging",
    name: "Sleeve block at each leg: the pass-through the ring rides up",
    part: "Global Truss GT-BLOCK or F34 4-way box sleeve",
    detail:
      "The leg runs through it and two arcs bolt to its faces, so the V1 arcs stay.",
    qty: 8,
    unit: [1267, 1959],
    confidence: "estimate",
    datasheet: "https://www.globaltruss.com/ground-support",
    note: "Prices partly from search listings, for Global Truss F34-class 12-inch parts; the Gate is Tomcat 12-inch light-duty, so the sleeves must match Tomcat's. The ring grows about 1.0–1.3 m across unless V1 already has a block at each leg.",
  },
  {
    id: "rig-sleeve-fittings",
    category: "rigging",
    tier: "rigging",
    name: "Couplers for the sleeves, and longer spoke ties",
    qty: 8,
    unit: [200, 440],
    confidence: "estimate",
    note: "Not priced: conical couplers and pins, and the 0.5–0.65 m the outer spoke ties grow.",
  },
  {
    id: "rig-towers",
    category: "rigging",
    tier: "rigging",
    name: "Tower parts per leg: base, outriggers, a top section for the hoist",
    part: "Global Truss F34 ground support (GT-44BS-1, GT-49214S-1, GT-TOP/CM)",
    qty: 8,
    unit: [3285, 5197],
    confidence: "estimate",
    datasheet: "https://www.globaltruss.com/ground-support",
    note: "Base $1,166, four outriggers $1,480, top section $639–799, hinges up to $252, and up to $1,500 of new tower sections if the V1 legs can't be reused.",
  },
  {
    id: "rig-hoists",
    category: "rigging",
    tier: "rigging",
    name: "Electric chain hoists, 500 kg, double brake (D8+)",
    part: "Chainmaster D8+ Ultra DC 500 kg, up to a CM Lodestar D8+",
    qty: 8,
    unit: [3199, 4556],
    confidence: "quoted",
    source: {
      label: "Thomann",
      url: "https://www.thomannmusic.com/chainmaster_d8_ultra_dc_500kg_1875m_h_h.htm",
    },
    note: "Three-phase, and rated to 40 °C: lift in the cool hours. Hand chain hoists ($400–1,200 each) work too, slowly, and save about $29–56K.",
  },
  {
    id: "rig-hoist-cables",
    category: "rigging",
    tier: "rigging",
    name: "Motor cable, controller to each hoist",
    qty: 8,
    unit: [100, 300],
    confidence: "estimate",
  },
  {
    id: "rig-safety",
    category: "rigging",
    tier: "rigging",
    name: "Safety per leg: lock-off at height, secondary steels, guys or ballast",
    detail:
      "The ring never hangs on the chains for the week, and the legs stay up in wind.",
    qty: 8,
    unit: [1038, 2600],
    confidence: "estimate",
    note: "Two slings and four shackles $338–600, a sleeve lock-off $100–500, guys or ballast $600–1,500.",
  },
  {
    id: "rig-controller",
    category: "rigging",
    tier: "rigging",
    name: "8-channel hoist controller with a kill switch",
    part: "Gamma, up to a Motion Labs 1200-8 (ETL, UL 1640)",
    qty: 1,
    unit: [3860, 5656],
    confidence: "estimate",
    note: "Prices from search listings.",
  },
  {
    id: "rig-load-monitoring",
    category: "rigging",
    tier: "rigging",
    name: "Load monitoring at the 8 points",
    detail:
      "Low: dynamometers for setup checks. High: load cells that stop the motors.",
    qty: 1,
    unit: [2000, 25000],
    confidence: "estimate",
    note: "Entertainment systems are sold by quote.",
  },
  {
    id: "rig-anemometer",
    category: "rigging",
    tier: "rigging",
    name: "Logging wind gauge at height, for the wind plan",
    qty: 1,
    unit: [535, 3320],
    confidence: "estimate",
  },
  {
    id: "rig-engineering",
    category: "rigging",
    tier: "rigging",
    name: "Engineer's calculations, wind and anchor plan, sign-off",
    detail: "Burning Man asks for one over 20 ft; the legs would be 20–26 ft.",
    qty: 1,
    unit: [3000, 15000],
    confidence: "estimate",
  },
  {
    id: "rig-3phase",
    category: "rigging",
    tier: "rigging",
    name: "Three-phase power for setup and strike",
    qty: 1,
    unit: [300, 1500],
    confidence: "estimate",
    note: "The hoists are three-phase; the Gate's feed isn't. Rental generators carry no L21-30 outlet.",
  },
  // --- Solar (big project) --------------------------------------------------
  // Option C (docs/pricing-solar-2026-10.md): 12 kW of panels, 57 kWh of
  // battery, one split-phase inverter, a small generator as backup.
  {
    id: "solar-panels",
    category: "solar",
    tier: "solar",
    name: "Solar panels, 12 kW",
    part: "About 26 × 460 W bifacial, by the pallet",
    qty: 1,
    unit: [3720, 5400],
    confidence: "estimate",
    source: {
      label: "Signature Solar (pallets)",
      url: "https://signaturesolar.com/shop-all/solar-panels/pallets/?page=1",
    },
    note: "Low is a full pallet's price; high, loose panels.",
  },
  {
    id: "solar-freight",
    category: "solar",
    tier: "solar",
    name: "Panel freight",
    qty: 1,
    unit: [400, 1000],
    confidence: "estimate",
  },
  {
    id: "solar-racking",
    category: "solar",
    tier: "solar",
    name: "Racking and anchors for the array",
    detail: "A low-tilt frame, or the array as a shade roof.",
    qty: 1,
    unit: [1800, 7200],
    confidence: "estimate",
  },
  {
    id: "solar-batteries",
    category: "solar",
    tier: "solar",
    name: "Batteries, 57 kWh in all",
    part: "EG4 WallMount All-Weather 14.3 kWh LiFePO4",
    detail:
      "Carries the Gate through a 10–11 hour night, with margin for a dust-storm day.",
    qty: 4,
    unit: [3125, 3800],
    confidence: "quoted",
    source: {
      label: "Signature Solar",
      url: "https://signaturesolar.com/eg4-powerpro-14kwh-all-weather-lithium-solar-battery-wallmount/",
    },
    datasheet:
      "https://eg4electronics.com/wp-content/uploads/2025/09/EG4-WallMount-All-Weather-Battery-Spec-Sheet.pdf",
    note: "Low is a sale price. LiFePO4 stops charging at about 50–55 °C: the batteries need shade and cooling.",
  },
  {
    id: "solar-inverter",
    category: "solar",
    tier: "solar",
    name: "Inverter: into the Gate's feed plug",
    part: "EG4 18kPV-12LV (or a Sol-Ark 15K)",
    detail:
      "Replaces the generator at the same plug, and starts a backup generator itself.",
    qty: 1,
    unit: [4000, 5000],
    note: "Priced split-phase (120/240 V), for the L14-30 feed. With the three-phase L21-30 feed (H69) it needs a 120/208 V three-phase output; not yet repriced.",
    confidence: "quoted",
    source: {
      label: "Signature Solar",
      url: "https://signaturesolar.com/all-products/inverters/",
    },
    datasheet:
      "https://eg4electronics.com/wp-content/uploads/2024/04/EG4-18KPV-12LV-Spec-Sheet.pdf",
  },
  {
    id: "solar-bos",
    category: "solar",
    tier: "solar",
    name: "Wiring, fuses, combiner, a subpanel with the Gate's feed outlet, monitoring, cleaning kit",
    qty: 1,
    unit: [2000, 4100],
    confidence: "estimate",
  },
  {
    id: "solar-cooling",
    category: "solar",
    tier: "solar",
    name: "Shaded, insulated, cooled enclosure for the batteries and inverter",
    qty: 1,
    unit: [500, 6000],
    confidence: "estimate",
  },
  {
    id: "solar-generator",
    category: "solar",
    tier: "solar",
    name: "Backup generator hookup, or a bought 5.5 kW generator",
    detail:
      "The rental on standby costs nothing extra; a bought inverter generator with remote start is the high end.",
    qty: 1,
    unit: [150, 5900],
    confidence: "estimate",
  },
  // --- Transport (big project) ----------------------------------------------
  // The recommended setup (docs/pricing-container-carts-2026-10.md): a 40 ft
  // high cube and carts, Gate only, 12" truss. Yearly storage and hauling are
  // operating costs, not here.
  {
    id: "tr-container",
    by: { h: ["H44", "H54", "H61"], what: "The crew's own 40 ft container" },
    category: "transport",
    tier: "transport",
    name: "Container: fix up the crew's own 40 ft, kept in Oakland",
    detail:
      "V1 fills a 26 ft box truck. A 20 ft container has about a third less floor than that truck; a 40 ft has about 40 % more, room for the carts.",
    qty: 1,
    unit: [0, 1500],
    confidence: "estimate",
    source: {
      label: "Western Container Sales (Oakland)",
      url: "https://www.westerncontainersales.com/shipping-containers-for-sale/california/oakland",
    },
    note: "The crew has a 40 ft container, standard height, in fair condition (user). Low: as it is; high: door seals, floor and rust repair (estimated). A new one-trip high cube is $3,690 in Oakland if it won't do.",
  },
  {
    id: "tr-mods",
    category: "transport",
    tier: "transport",
    name: "Fitting it out: a ramp, E-track, load bars, shelving, dust-filtered vents, lights, a lockbox, a reflective roof",
    qty: 1,
    unit: [2430, 9300],
    confidence: "estimate",
  },
  {
    id: "tr-arc-carts",
    category: "transport",
    tier: "transport",
    name: "Arc carts on 12–16 inch playa wheels, 8 arcs each",
    detail:
      "No truss dolly on the market has wheels for the playa: a custom frame.",
    qty: 2,
    unit: [1200, 3000],
    confidence: "estimate",
  },
  {
    id: "tr-leg-carts",
    category: "transport",
    tier: "transport",
    name: "Leg carts",
    qty: 2,
    unit: [370, 3000],
    confidence: "estimate",
    note: "Low: a stock truss dolly kit; high: the same custom design as the arc carts.",
  },
  {
    id: "tr-hub-cart",
    category: "transport",
    tier: "transport",
    name: "Hub cart",
    qty: 1,
    unit: [600, 2500],
    confidence: "estimate",
    note: "How the hub breaks down is unknown.",
  },
  {
    id: "tr-wagons",
    category: "transport",
    tier: "transport",
    name: "Playa wagons, 16 inch pneumatic, 3,000 lb",
    part: "Uline H-2547",
    qty: 3,
    unit: [599, 780],
    confidence: "quoted",
    source: {
      label: "Uline",
      url: "https://www.uline.com/Product/Detail/H-2547/Platform-Trucks/Wagon-Cart-24-x-48",
    },
  },
  {
    id: "tr-utility-carts",
    category: "transport",
    tier: "transport",
    name: "Light utility carts, 13 inch pneumatic",
    part: "Gorilla GOR1201B",
    qty: 2,
    unit: [200, 230],
    confidence: "estimate",
  },
  {
    id: "tr-rack-case",
    category: "transport",
    tier: "transport",
    name: "Rack case on casters for the show computer and network gear",
    qty: 1,
    unit: [370, 2085],
    confidence: "estimate",
  },
  {
    id: "tr-trunks",
    category: "transport",
    tier: "transport",
    name: "Trunks on casters: spares, cables, tools and hardware",
    qty: 3,
    unit: [517, 875],
    confidence: "estimate",
  },
  {
    id: "tr-sail-rack",
    by: { h: ["H43", "H45"], what: "A rack for the 16 sails" },
    category: "transport",
    tier: "transport",
    name: "Sail rolls and rack: each sail stored with its LEDs left in",
    detail:
      "Each of the 16 sails (22.5 ft long, 11.3 ft wide at the ring) rolls onto a 24 ft tube across its width, so the LED strips stay straight, and the rolls ride on a rack along the 40 ft container's wall. Leaving the LEDs in makes setup faster.",
    qty: 16,
    unit: [140, 320],
    confidence: "estimate",
    note: "Not priced from a design yet: a tube, a sleeve and a share of the wall rack per sail. Hanging each sail folded lengthwise from roof rails is the alternative.",
  },
  {
    id: "tr-spares",
    category: "transport",
    tier: "transport",
    name: "Spare wheels, tubes or flat-free tyres, a pump",
    qty: 1,
    unit: [150, 400],
    confidence: "estimate",
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

function totalOf(tier: Tier, items: LineItem[]): Omit<TierTotal, "cumulative"> {
  const parts = subtotal(itemsIn({ tier: tier.id }, items));
  const contingency = contingencyOf(parts);
  const total: Range = [parts[0] + contingency[0], parts[1] + contingency[1]];
  return { tier, parts, contingency, total, goal: roundUp(total[1]) };
}

/** V2 and the stretch goals, with the running total. */
export function tierTotals(items: LineItem[] = ITEMS): TierTotal[] {
  let running = 0;
  return LADDER.map((tier) => {
    const t = totalOf(tier, items);
    running += t.goal;
    return { ...t, cumulative: running };
  });
}

/** The big projects: each one's own goal, never added to the ladder. */
export function projectTotals(items: LineItem[] = ITEMS): TierTotal[] {
  return PROJECTS.map((tier) => {
    const t = totalOf(tier, items);
    return { ...t, cumulative: t.goal };
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
