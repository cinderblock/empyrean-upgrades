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
    v2: "Each of the 16 truss segments carries its own sealed power run with locking, watertight connectors, so joining the truss joins the power. A separate sealed power box in each segment holds the supplies: mains never shares a box with the electronics.",
    points: [
      {
        title: "Watertight, locking connectors",
        body: "Every joint between segments and every box entry uses connectors rated for rain and dust, mated or not, that can't be pulled apart by a kicked cable.",
      },
      {
        title: "Installed once, joined on site",
        body: "Each segment arrives with its power run in place and daisy-chains to its neighbours. Setup becomes joining segments, not running cable.",
      },
      {
        title: "Ground-fault protection",
        body: "A wet, public, outdoor installation gets ground-fault protection on its feeds, and overcurrent protection on every branch.",
      },
      {
        title: "Power boxes apart from data boxes",
        body: "Supplies and mains live in their own boxes. Only low-voltage DC crosses to the electronics, on its own cable.",
      },
    ],
    unknowns: [
      "The LED strips' voltage and watts per pixel, which sets the size of everything else.",
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
    unknowns: [
      "A bench test of the chosen switch on DC power.",
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
        title: "A backup that already works",
        body: "The software already supports a follower machine. The current NUC takes that role.",
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
        body: "Enclosures rated IP65 or better, with every cable entry sealed.",
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
        body: "Views of the crowd and the rig, for monitoring or streaming.",
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
