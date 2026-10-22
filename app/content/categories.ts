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
  "rigging",
  "solar",
  "transport",
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
      "Six circuits fan out from the stage over ordinary 3-way extension cords, 10 to 100 ft long. None of it is rated for rain or dust, and it is all run by hand at every build.",
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
        name: "AC Works L14-30 plug and connector on 8/4 SOOW, under rain covers",
        verdict: "leading",
        price: "about $140 a joint, cord included",
        why: "Listed ends fitted to listed 8/4 cord cut to each segment's length. Carries the full 30 A. Rain-proof, not watertight, which is enough.",
        url: "https://acworks.com/products/locking-adapter-asl1430p-nema-l14-30p",
      },
      {
        name: "AC Works 8/4 L14-30 cords, cut in half",
        verdict: "considered",
        price: "about $280 a joint (25 ft cords)",
        why: "The same ends, factory-fitted. The 10 ft cord is too short for an 11.8 ft segment, and the 25 ft one wastes half its cord. The fallback if the loose ends don't grip 8/4.",
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
        name: "A 50 A feed instead: CS6364/CS6365 twist-locks on 6/4 cord",
        verdict: "considered",
        price: "about $2,500–$6,100 more for the power category",
        why: "9.6 kVA continuous against 5.76: enough for V1's estimated maximum with no margin, and half of what 128 spokes might draw at full white (two 50 A feeds would cover it). Plugs straight into towable rentals; portables connect through an adapter at 30 A. Heavier cord, and the joints need boots instead of the rain covers.",
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
      "One switch by the stage, with its own cable to each of the 16 light controllers: 893 ft in all. That switch, or any one cable, can take part of the Gate dark.",
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
    v2: "A fanless industrial show computer with a discrete GPU, rated for a sealed brain box in the sun, that starts the show by itself after a power cut. Today's NUC stays on as the backup.",
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
        title: "Built for the heat",
        body: "Consumer computers are rated to about 35–40 °C, and a sealed box in the sun gets hotter. V2's computer is fanless and rated to 60 °C.",
      },
      {
        title: "A VJ console (a stretch goal)",
        body: "A sealed touch screen and motorized faders at the VJ booth, on one cable from the brain box, so the Gate can be played by hand.",
      },
      {
        title: "A backup that already works",
        body: "The software already supports a follower machine. The current NUC takes that role.",
      },
    ],
    options: [
      {
        name: "Neousys Nuvo-9160GC with an RTX 2000E Ada",
        verdict: "leading",
        price: "$6,065–$7,160",
        why: "Fanless and rated −25 to 60 °C, the only option rated for a sealed box in the sun. Runs from DC, so it can share a battery backup with the network.",
        url: "https://www.neousys-tech.com/en/product/feature/mezio/nuvo-9160gc-intel-12th-gpu-computing-platform",
      },
      {
        name: "Small build with a low-profile GeForce RTX 5060",
        verdict: "considered",
        price: "about $1,600–$2,000",
        why: "A real GPU for the money, but consumer parts are rated to about 35–40 °C: too low for a sealed box in the sun.",
      },
      {
        name: "VJ console: a touch panel, an X-Touch Compact, one cable",
        verdict: "stretch",
        price: "about $2,600–$3,600",
        why: "A 15.6 inch industrial touch panel and nine motorized faders, linked over one Cat6a run. The best start: build the show app's MIDI mapping against it.",
      },
      {
        name: "VJ console, full: 21.5 inch panel, faders, knobs and pads, fiber",
        verdict: "considered",
        price: "about $3,700–$6,000",
        why: "For a guest VJ who expects pads and knobs too, at any distance over fiber.",
      },
      {
        name: "VJ console, custom-built surface",
        verdict: "considered",
        price: "about $3,000–$6,500 in parts",
        why: "Eight motorized faders, sixteen lit knobs and thirty-two buttons on a Teensy, in a sealed case. Plus an estimated 120–240 hours of design and build.",
      },
      {
        name: "A USB-C dock on a long USB-C cable",
        verdict: "ruled-out",
        why: "The show computer's USB-C port carries no video, and long USB 3 fiber cables don't carry the USB 2 devices touch screens and MIDI controllers are.",
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
      "For the VJ console: the cable route to the booth, and who will play it.",
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
  rigging: {
    id: "rigging",
    name: "Rigging",
    headline: "A ring that raises itself",
    today:
      "The 60 ft ring has to be lifted onto its eight legs by other means at every build.",
    v2: "Each leg gets a sleeve that the ring rides up, and an electric hoist at the top. The whole ring climbs its own legs, level at all eight, and locks off at height so it never hangs on the chains for the week.",
    points: [
      {
        title: "Climbs its own legs",
        body: "A stock ground-support sleeve at each leg is the pass-through: the leg runs through it and the ring's arcs bolt to it. The ring is built at ground level and climbs.",
      },
      {
        title: "Level at all eight points",
        body: "One controller runs all eight hoists together, with a kill switch, and load monitoring stops the motors if any point carries too much or too little.",
      },
      {
        title: "Safe over a dance floor",
        body: "Double-brake hoists, a mechanical lock at every leg once up, guys or ballast for the wind, a wind gauge, and an engineer's sign-off.",
      },
    ],
    options: [
      {
        name: "Stock sleeve blocks in the ring, V1 arcs kept",
        verdict: "leading",
        price: "about $82,000–$171,000 with electric hoists",
        why: "Every part is stock and load-rated, the load sits centred on each leg, and the ring ties all eight legs into one frame. The ring grows about 1.0–1.3 m across.",
        url: "https://www.globaltruss.com/ground-support",
      },
      {
        name: "Custom arcs with a built-in pass-through, keeping exactly 60 ft",
        verdict: "considered",
        price: "about $100,000–$231,000",
        why: "Half the arcs replaced with custom ones that carry the sleeve. Keeps the size, but custom truss is quote-only and needs its own certification.",
      },
      {
        name: "A shelf hanging off each vertical, ring unchanged",
        verdict: "considered",
        price: "about $85,000–$184,000",
        why: "The arcs stay as they are and sit on eight shelves. The load hangs off-centre: rated 400 kg at 0.5 m, enough for 12-inch truss but marginal for 20.5-inch.",
      },
      {
        name: "Hand chain hoists instead of electric",
        verdict: "considered",
        price: "saves about $29,000–$56,000",
        why: "Fine for one lift up and one down per event, with eight people pulling in step. Slow, and the same safety gear applies.",
      },
    ],
    unknowns: [
      "Whether the legs meet the ring at a junction block today, and the ring's weight with everything on it.",
      "Whether the V1 legs can be reused as tower sections.",
      "Three-phase power at setup: the hoists need it.",
    ],
    maturity: "exploring",
    planFile: "plans/rigging.md",
  },
  solar: {
    id: "solar",
    name: "Solar",
    headline: "Run the Gate on sunlight",
    today: "A rental generator runs all night, every night.",
    v2: "A 12 kW array and a 57 kWh battery run the Gate through the night on the day's sun. The inverter plugs into the same twist-lock the generator used, and starts a small generator itself only on a dust-storm day or a loud night.",
    points: [
      {
        title: "Same plug as the generator",
        body: "The inverter makes 120/240 V split-phase into the Gate's L14-30, so nothing else on the Gate changes.",
      },
      {
        title: "Sized for the playa",
        body: "About 6.9 kWh per kW of panels a day in late August, with dust and heat counted. The battery carries a 10–11 hour night with margin for a bad day.",
      },
      {
        title: "Kept cool",
        body: "Batteries stop charging at about 50 °C, so they live shaded, insulated and cooled.",
      },
      {
        title: "Speakers, maybe",
        body: "Each kW of speakers adds about $6,000–$9,000 of panels and battery, or a few hours of the backup generator.",
      },
    ],
    options: [
      {
        name: "Gate on sun, small generator as backup",
        verdict: "leading",
        price: "about $25,000–$50,000",
        why: "Runs the Gate on sun alone in a typical year; the generator only bridges a dust storm or a loud night. Covers 2 kW of speakers with a few generator hours over ten days.",
      },
      {
        name: "Gate and speakers on sun alone",
        verdict: "considered",
        price: "about $35,000–$66,000 (2 kW of speakers)",
        why: "50 % more panels and battery, to avoid a few generator hours. Worth it only if a generator is ruled out.",
      },
      {
        name: "A smaller hybrid",
        verdict: "considered",
        price: "about $15,000–$35,000",
        why: "Half the battery: the generator covers bad nights and can't keep up with speakers.",
      },
      {
        name: "A turnkey solar trailer",
        verdict: "ruled-out",
        price: "about $65,000",
        why: "The one listed (5.6 kW, 41 kWh) is too small to run the Gate through the night.",
      },
    ],
    unknowns: [
      "A one-night energy reading on the Gate's feed: every size here scales from it.",
      "The speakers: how many watts, for how many hours.",
      "Where the array goes (about 90–120 m², or a shade roof) and who cleans it.",
    ],
    maturity: "exploring",
    planFile: "plans/solar.md",
  },
  transport: {
    id: "transport",
    name: "Transport",
    headline: "Roll it in, roll it out",
    today:
      "The Gate fills a 26 ft box truck and is carried in and out by hand. The LEDs come out of the sails at every event, because they were damaged once when left in.",
    v2: "The Gate gets its own 40 ft container, kept in Oakland and set in camp on the playa, fitted with a ramp, tie-downs, shelves and a rack the sails hang from with their LEDs in. A cart for every kind of part, on wheels big enough for playa dust. Segments ride with their boxes installed.",
    points: [
      {
        title: "One box for the whole Gate",
        body: "A 40 ft high cube with doors at both ends holds the Gate with a little room to spare; a 20 ft is too small.",
      },
      {
        title: "Sails ride with their LEDs in",
        body: "Each of the 16 sails rolls onto its own tube with its LEDs still stitched in, and the rolls ride on a rack along the container wall, instead of the LEDs coming out and going back in at every build.",
      },
      {
        title: "Wheels that work on the playa",
        body: "Off-the-shelf truss dollies roll on 4 inch casters that sink in dust. The arc and leg carts are one custom design on 12–16 inch pneumatic or flat-free wheels.",
      },
      {
        title: "Loaded in order",
        body: "Tie-down rails, load bars and shelves keep every cart and case in its place for the drive, in the order it comes out.",
      },
      {
        title: "Yearly costs, kept apart",
        body: "Hauling the box from Oakland to the playa and back is an estimated $5,000–$10,000 a year, more for other events; storage is likely covered. That isn't in this goal.",
      },
    ],
    options: [
      {
        name: "40 ft high cube, one-trip, doors at both ends",
        verdict: "leading",
        price: "$3,690 in Oakland",
        why: "Fits the Gate with its carts, where it lives. Containers go in camps at Burning Man, and the Gate's camp is on the Esplanade.",
        url: "https://www.westerncontainersales.com/shipping-containers-for-sale/california/oakland",
      },
      {
        name: "A used cargo-worthy 40 ft box",
        verdict: "considered",
        price: "saves about $1,500",
        why: "Cheaper, but older doors and floors, and more dust gets in.",
      },
      {
        name: "A 20 ft box",
        verdict: "ruled-out",
        why: "About 14 m² of floor, a third less than the 26 ft truck the Gate fills today.",
      },
      {
        name: "A second 20 ft box",
        verdict: "considered",
        price: "$2,600–$5,300",
        why: "Needed only if both the hoists and the solar kit are bought and ride along.",
      },
    ],
    unknowns: [
      "How far the V2 boxes stick out of the truss.",
      "Hauling quotes, Oakland to the playa and to other events.",
    ],
    maturity: "exploring",
    planFile: "plans/transport.md",
  },
};

export const CATEGORY_LIST: Category[] = CATEGORY_IDS.map(
  (id) => CATEGORIES[id],
);
