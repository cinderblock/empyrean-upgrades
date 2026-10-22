/**
 * The five upgrade categories, as the site tells them. The working notes
 * behind each (requirements, open questions, decisions) are in `plans/` at
 * the repo root; keep the two in step when a decision lands.
 */

export const CATEGORY_IDS = [
  "power",
  "networking",
  "compute",
  "weatherproofing",
  "expansion",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

/** How settled a category's design is, said plainly for a reader. */
export type Maturity = "settled" | "designing" | "exploring";

export const MATURITY_LABEL: Record<Maturity, string> = {
  settled: "Design settled",
  designing: "Design in progress",
  exploring: "Early: options open",
};

export interface Point {
  title: string;
  body: string;
}

/** Where a candidate part stands. */
export type Verdict = "leading" | "stretch" | "considered" | "ruled-out";

export const VERDICT_LABEL: Record<Verdict, string> = {
  leading: "Leading choice",
  stretch: "Stretch goal",
  considered: "Considered",
  "ruled-out": "Ruled out",
};

/** A part we looked at for this category, and why it stands where it does. */
export interface Option {
  name: string;
  verdict: Verdict;
  /** A price as a reader would say it: "$142 each", "about $3,500 the set". */
  price?: string;
  why: string;
  /** The maker's page for it. */
  url?: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  /** One line for a card: what V2 does. */
  headline: string;
  /** What is wrong with V1, in a sentence or two. */
  today: string;
  /** What V2 does about it, in a sentence or two. */
  v2: string;
  points: Point[];
  /** Parts we compared, leading choice first. */
  options: Option[];
  /** What we still have to find out before buying. Said honestly. */
  unknowns: string[];
  maturity: Maturity;
  /** The working plan in this repo. */
  planFile: string;
}

export const CATEGORIES: Record<CategoryId, Category> = {
  power: {
    id: "power",
    name: "Power",
    headline: "Sealed power, built into every truss segment",
    today:
      "Mains power reaches the truss over ordinary extension cords and plugs. They aren't rated for rain or dust, and they are run by hand at every build.",
    v2: "One twist-lock plug, the kind every portable rental generator has, powers the whole ring. The power runs segment to segment inside the truss through locking, rain-proof joints, so joining the truss joins the power. A sealed power box in each segment holds the supplies: mains never shares a box with the electronics.",
    points: [
      {
        title: "Rain-proof, locking joints",
        body: "Each joint is a twist-lock that a kicked cable can't pull apart, under a rain cover. Every box entry is sealed. Rain-proof is enough: the Gate never stands in water.",
      },
      {
        title: "Installed once, joined on site",
        body: "Each segment arrives with its power run in place and daisy-chains to its neighbours. Setup becomes joining segments, not running cable.",
      },
      {
        title: "Plugs into any rental generator",
        body: "The feed is a 30 A twist-lock (L14-30): the locking outlet on nearly every portable generator. Towable rentals have a 50 A twist-lock instead, and the Gate carries an adapter for them.",
      },
      {
        title: "Room to spare",
        body: "The Gate averages 1.5 to 2 kW. The 30 A feed carries about 5.8 kW continuously: three times that, with room for 128 spokes.",
      },
      {
        title: "Each segment protected on its own",
        body: "A ground-fault breaker in every power box. A fault darkens one segment, not the whole Gate, and sixteen small protectors don't trip on the supplies' normal leakage the way one big one would.",
      },
      {
        title: "Power boxes apart from data boxes",
        body: "Supplies and mains live in their own boxes. Only low-voltage DC crosses to the electronics, on its own cable.",
      },
    ],
    options: [
      {
        name: "AC Works 8/4 L14-30 cords, cut in half, under rain covers",
        verdict: "leading",
        price: "about $143 a joint, cord included",
        why: "An off-the-shelf 10 ft cord on 8/4 SOOW with separately listed ends: each cut half is a listed plug on listed cord, it carries the full 30 A, and the cord is the segment's trunk. Rain-proof, not watertight.",
        url: "https://acworks.com/products/sdl1430pr-8-4-soow-super-duty-nema-l14-30-30a-125-250v-generator-rubber-cord",
      },
      {
        name: "Cheap molded generator cords (10/4 STW and similar)",
        verdict: "ruled-out",
        why: "60 °C cord, good for only about 17 A at 50 °C, and a cut molded end is no longer a listed plug.",
      },
      {
        name: "Hubbell Watertight Safety-Shroud L14-30",
        verdict: "considered",
        price: "about $410 a joint with trunk cord",
        why: "Watertight (IP66) and rated to 75 °C, but about $4,800 more for the ring than the cut cords, and watertight isn't needed. Its inlet stays at the feed box.",
        url: "https://www.hubbell.com/hubbell/en/p/170109",
      },
      {
        name: "Leviton Wetguard L14-30",
        verdict: "considered",
        price: "about $320 a joint with trunk cord",
        why: "The cheaper watertight route, rated only to 60 °C. Watertight isn't needed.",
        url: "https://leviton.com/products/28w74",
      },
      {
        name: "50 A twist-lock (CS6365) as the feed",
        verdict: "considered",
        why: "Every towable rental has it, but no portable does, and no watertight version is confirmed. The Gate carries a CS6365-to-L14-30 adapter for towables instead.",
      },
      {
        name: "Three-phase twist-lock (L21-30)",
        verdict: "ruled-out",
        why: "No rental generator has the outlet, and it adds about $4,500 for little more capacity (7.2 kVA against 5.8).",
      },
      {
        name: "RV 50 A (14-50) and SmartPlug",
        verdict: "ruled-out",
        why: "The RV 14-50 doesn't lock; SmartPlug is push-in, IP56.",
      },
      {
        name: "Neutrik powerCON TRUE1",
        verdict: "ruled-out",
        why: "Watertight and locking, but single-phase 20 A: it can't carry a 30 A split-phase trunk.",
        url: "https://www.neutrik.com/en/product/nac3f-true1-l",
      },
      {
        name: "8/4 SOOW, not 10/4",
        verdict: "leading",
        why: "8/4 carries the full 30 A at 50 °C. 10/4 is lighter but holds only 24.6 A at 50 °C, which would mean a 25 A feed.",
        url: "https://cabletechsupport.southwire.com/tile/10/spec/70000/?country=US",
      },
      {
        name: "Mean Well SDR-240-48 for the switch's 54 V",
        verdict: "leading",
        price: "$95 each",
        why: "Adjusts to 54 V and holds full load to 60 °C. The cheaper NDR-240-48 ($48) starts derating at 50 °C, too early for a hot box.",
        url: "https://www.meanwell.com/Upload/PDF/SDR-240/SDR-240-SPEC.PDF",
      },
    ],
    unknowns: [
      "The LED strips' voltage and watts per pixel. The estimates put full white above what the 30 A feed carries (the Gate averages far less); measuring one spoke at full white settles whether it fits.",
      "Whether a generator's own ground-fault outlet trips on the ring's leakage.",
      "Generator or grid at each event, and how many circuits at what current.",
      "Whether V2 keeps today's pixel supplies or replaces them.",
    ],
    maturity: "designing",
    planFile: "plans/power.md",
  },
  networking: {
    id: "networking",
    name: "Networking",
    headline: "A ring network that routes around a failure",
    today:
      "One central switch, with a long cable out to each of the 16 light controllers. That switch, or any one of those cables, can take part of the Gate dark.",
    v2: "A small managed switch in every node box, chained segment to segment and closed into a ring. If any one link fails, traffic goes the other way around. Internet can plug in at any segment, and every node gets spare powered ports for what comes next.",
    points: [
      {
        title: "A closed ring",
        body: "Sixteen switches, each linked to its neighbours. Rapid Spanning Tree keeps one link idle and switches to it within seconds if another fails.",
      },
      {
        title: "Cables stay inside their segment",
        body: "No more home runs to the middle. Each segment carries one short link to the next, through a sealed connector.",
      },
      {
        title: "Internet anywhere",
        body: "Starlink, the event's uplink, or a local cabinet can plug in at whichever segment is nearest; a dedicated network carries it around the ring to the gateway.",
      },
      {
        title: "Four spare PoE+ ports per node",
        body: "Sixty-four powered network ports around the ring, ready for cameras, speakers or whatever comes next.",
      },
    ],
    options: [
      {
        name: "UniFi USW-Ultra",
        verdict: "leading",
        price: "$142 each",
        why: "Eight gigabit ports with PoE+, runs from a 50–57 V DC supply, and it is managed by the UniFi gateway the Gate already uses. Rated to 60 °C: the weakest part in the node box.",
        url: "https://techspecs.ui.com/unifi/switching/usw-ultra",
      },
      {
        name: "UniFi Industrial DIN 8 PoE",
        verdict: "stretch",
        price: "$362 each",
        why: "Rated to 70 °C, with 60 W per port and DIN mounting built in. About 2.5 times the Ultra, and not on sale until November 2026.",
        url: "https://techspecs.ui.com/unifi/switching/usw-industrial-din-8-poe",
      },
      {
        name: "Neutrik etherCON plug and inline coupler at each joint",
        verdict: "leading",
        price: "about $61 a joint",
        why: "Locking and IP65 when mated, −30 to 80 °C, rated for PoE+. The cable enters the node box through a gland and is crimped inside.",
        url: "https://www.neutrik.com/en/product/ne8ffx6-w",
      },
      {
        name: "Amphenol RJField",
        verdict: "considered",
        price: "about $310 a joint",
        why: "IP67/68 and a wider temperature range, but there's no inline coupler: it only works mounted on a box wall.",
      },
    ],
    unknowns: [
      "A bench test of the chosen switch on DC power, including whether the bare $142 switch can use its full 202 W PoE budget on our own supply (Ubiquiti only lists that with its own adapter).",
      "Whether a sealed box in the sun stays inside the switch's 60 °C rating.",
    ],
    maturity: "settled",
    planFile: "plans/networking.md",
  },
  compute: {
    id: "compute",
    name: "Compute",
    headline: "A show computer with a real graphics card",
    today:
      "An Intel NUC with integrated graphics renders all 24,192 pixels sixty times a second, plus the live preview, video layers and patterns. It is at its limit.",
    v2: "A show computer with a discrete GPU, in a sealed brain box, that starts the show by itself after a power cut. Today's NUC stays on as the backup.",
    points: [
      {
        title: "Headroom for the patterns",
        body: "The Gate's software draws every frame on the GPU. A real graphics card means richer patterns, video, and the playground's community patches at full rate.",
      },
      {
        title: "Unattended",
        body: "Powers on after an outage and starts the show without anyone touching it, as today's machine does.",
      },
      {
        title: "Built for the heat (a stretch goal)",
        body: "Consumer computers are rated to about 35–40 °C, and a sealed box in the sun gets hotter. The first stretch goal swaps in a fanless industrial computer rated to 60 °C.",
      },
      {
        title: "A backup that already works",
        body: "The software already supports a follower machine. The current NUC takes that role.",
      },
    ],
    options: [
      {
        name: "Small build with a low-profile GeForce RTX 5060",
        verdict: "leading",
        price: "about $1,600–$2,000",
        why: "A real GPU for the money. Consumer parts, rated to about 35–40 °C, so it needs shade and airflow in the brain box.",
      },
      {
        name: "Neousys Nuvo-9160GC with an RTX 2000E Ada",
        verdict: "stretch",
        price: "$6,065–$7,160",
        why: "Fanless and rated −25 to 60 °C, the only option rated for a sealed box in the sun. Runs from DC, so it can share a battery backup with the network.",
        url: "https://www.neousys-tech.com/en/product/feature/mezio/nuvo-9160gc-intel-12th-gpu-computing-platform",
      },
      {
        name: "Dell Pro Max Micro with an RTX A1000",
        verdict: "considered",
        price: "$3,629",
        why: "Small and supported, but rated only 0–35 °C and twice the price of the build for a smaller GPU.",
      },
      {
        name: "Mini PC with an AMD Radeon 780M (Minisforum UM890 Pro)",
        verdict: "considered",
        price: "$919",
        why: "Cheap and small, but integrated graphics again, and no published temperature rating.",
        url: "https://store.minisforum.com/products/minisforum-um890pro-mini-pc",
      },
    ],
    unknowns: [
      "A benchmark on today's machine, to set a measured target for the new one.",
      "How much heat a GPU adds inside a sealed box in the sun.",
    ],
    maturity: "exploring",
    planFile: "plans/compute.md",
  },
  weatherproofing: {
    id: "weatherproofing",
    name: "Weatherproofing",
    headline: "Sealed boxes that live inside the truss",
    today:
      "The node boxes sit inside a sealed outer box in the sun, with their power supply inside. They weren't built for rain or fine alkaline dust.",
    v2: "New sealed node boxes and a brain box, living inside the truss next to their power boxes. Sealed glands or bulkhead connectors on every cable, and a vent that breathes without letting dust in.",
    points: [
      {
        title: "Rated for dust and rain",
        body: "Enclosures rated IP66 and NEMA 4X, UV-stable, with every cable through an IP68 gland and a breather vent that keeps dust out.",
      },
      {
        title: "In the shade",
        body: "A white aluminium shield over every box, on standoffs. Shading cuts a box's temperature rise by about half.",
      },
      {
        title: "Measured, not guessed",
        body: "A temperature logger in a real box in the sun before anything is bought, so every part's rating is checked against what the box actually reaches.",
      },
      {
        title: "Swappable on site",
        body: "Any node box can be swapped with a screwdriver without powering down its neighbours, with a complete spare on hand.",
      },
    ],
    options: [
      {
        name: "Hammond PCJ hinged polycarbonate boxes",
        verdict: "leading",
        price: "$91–$98 for a node box",
        why: "IP66, NEMA 4X and UV-rated, with stainless hardware. The 14 × 12 × 6 in size fits the switch and the light controller on DIN rail with room to bend 8 pixel cables.",
        url: "https://asset.solutionsdirectonline.com/doc/Hammond_Manufacturing/hammond_pcj_h_data_sheet.pdf",
      },
      {
        name: "Fibox ARCA",
        verdict: "considered",
        price: "$356 for the brain box size",
        why: "IP66 and IP67, and tougher, at over twice the price. The option if V2 settles on IP67.",
        url: "https://www.fibox.com/products/arca/ar-20168/8561369",
      },
      {
        name: "nVent Hoffman solar shield",
        verdict: "considered",
        price: "$357 each",
        why: "Measured about 56% less temperature rise, which shows shading works, but it is made for wall-mounted boxes. Simple white aluminium shields do the job for a fraction.",
        url: "https://www.nvent.com/sites/default/files/acquiadam/assets/Spec-01113.pdf",
      },
    ],
    unknowns: [
      "The truss profile and the space inside it for a box.",
      "Bulkhead connectors (faster to service) or cable glands (fewer failure points).",
    ],
    maturity: "exploring",
    planFile: "plans/weatherproofing.md",
  },
  expansion: {
    id: "expansion",
    name: "Expansion",
    headline: "Room to grow: cameras, sound, more spokes",
    today:
      "V1 has no spare power or network capacity at the ring. Anything new means another cable to the middle.",
    v2: "Every node of the V2 ring has spare powered network ports, so cameras and networked speakers plug straight in. Half of every light controller is already reserved for doubling the Gate to 128 spokes.",
    points: [
      {
        title: "Cameras",
        body: "Views of the crowd and the rig, for monitoring or streaming, recorded on site by a gateway that can store video.",
      },
      {
        title: "Sound around the ring",
        body: "Networked audio to speakers around the Gate, over the same ring.",
      },
      {
        title: "128 spokes",
        body: "Twice the spokes. The controllers already have the outputs for it; the strips, mounting and power are what it takes.",
      },
    ],
    options: [
      {
        name: "UniFi G6 Bullet camera",
        verdict: "leading",
        price: "$233",
        why: "4K, IP66, rated to 50 °C, and managed with the rest of the network.",
        url: "https://techspecs.ui.com/unifi/cameras-nvrs/uvc-g6-bullet",
      },
      {
        name: "UniFi G5 Bullet camera",
        verdict: "ruled-out",
        price: "$151",
        why: "Cheaper, but only IP55 and rated to 40 °C.",
      },
      {
        name: "AXIS C1310-E horn speaker, or an Aurora Dante PoE amplifier",
        verdict: "considered",
        price: "$689 or $498",
        why: "The horn is all-weather and powered by the network; the amplifier speaks Dante/AES67 but needs its own speaker and box. The choice waits on what the sound is for.",
      },
      {
        name: "12 V WS2815 strip for 64 more spokes",
        verdict: "leading",
        price: "about $3,800–$5,000",
        why: "Matches what we believe the Gate uses today (not yet confirmed). The light controllers already have the outputs reserved.",
        url: "https://www.btf-lighting.com/products/ws2815-rgb-addressable-led-strip-dc12v",
      },
    ],
    unknowns: [
      "Which comes first: cameras, sound, or more spokes.",
      "The audio protocol and speakers.",
    ],
    maturity: "exploring",
    planFile: "plans/expansion.md",
  },
};

export const CATEGORY_LIST: Category[] = CATEGORY_IDS.map(
  (id) => CATEGORIES[id],
);
