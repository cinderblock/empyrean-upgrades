/**
 * The V2 budget: every line item, and every total the site shows, computed
 * from them. Nothing else on the site holds a dollar figure.
 *
 * Prices are USD. A unit price is one number when it was seen on an official
 * store or distributor, or a [low, high] range when it is an estimate. The
 * research behind them, with links, is docs/pricing-2026-10.md.
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
      "Seen on the maker's store or a major distributor, on the date given.",
  },
  estimate: {
    label: "Estimate",
    explain: "A range from comparable parts; the exact part isn't chosen yet.",
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
    name: "Hardened",
    promise:
      "Industrial-rated switches, with more heat margin in a sealed box, and spares for the parts most likely to fail.",
  },
  {
    id: "senses",
    name: "Eyes and ears",
    promise: "Cameras on the rig and networked sound around the ring.",
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
  /** Why it's needed, in a few words. */
  detail?: string;
  qty: number;
  /** For a non-obvious quantity: how it was counted. */
  qtyNote?: string;
  /** USD per unit: exact when quoted, [low, high] when estimated. */
  unit: number | readonly [number, number];
  confidence: Confidence;
  /** Where the price came from. */
  source?: Source;
  /** The maker's spec page or datasheet. */
  datasheet?: string;
  note?: string;
}

/**
 * Held back on every tier for what an estimate misses: shipping, tax,
 * fasteners, the part that arrives broken.
 */
export const CONTINGENCY = 0.15;

/** Totals the site shows are rounded up to this. */
export const ROUND_TO = 500;

/** Draft figures carry a banner until the line items are researched. */
export const DRAFT = true;

export const ITEMS: LineItem[] = [
  // --- Power ---------------------------------------------------------------
  {
    id: "power-connectors",
    category: "power",
    tier: "core",
    name: "Watertight locking mains connectors",
    detail: "A cable plug and a panel socket at each end of each segment.",
    qty: 64,
    qtyNote: "16 segments × in and out × cable and panel half",
    unit: [15, 30],
    confidence: "estimate",
  },
  {
    id: "power-cord",
    category: "power",
    tier: "core",
    name: "Outdoor UV-rated power cord (ft)",
    qty: 240,
    qtyNote: "16 segments × 15 ft",
    unit: [1.5, 3.5],
    confidence: "estimate",
  },
  {
    id: "power-box",
    category: "power",
    tier: "core",
    name: "Power box per segment",
    detail: "Sealed enclosure, DIN rail, breaker, terminals.",
    qty: 16,
    unit: [90, 180],
    confidence: "estimate",
  },
  {
    id: "power-54v",
    category: "power",
    tier: "core",
    name: "54 V supply for each switch and its PoE ports",
    qty: 16,
    unit: [45, 95],
    confidence: "estimate",
  },
  {
    id: "power-gfci",
    category: "power",
    tier: "core",
    name: "Ground-fault protection for the feeds",
    qty: 2,
    unit: [100, 300],
    confidence: "estimate",
  },
  // --- Networking ------------------------------------------------------------
  {
    id: "net-switch",
    category: "networking",
    tier: "core",
    name: "Ring switch: UniFi USW-Ultra",
    detail: "One per node box, plus a spare.",
    qty: 17,
    unit: 129,
    confidence: "quoted",
    datasheet: "https://techspecs.ui.com/unifi/switching/usw-ultra",
  },
  {
    id: "net-joints",
    category: "networking",
    tier: "core",
    name: "Watertight Ethernet joints",
    qty: 32,
    qtyNote: "16 joints × cable and panel half",
    unit: [25, 55],
    confidence: "estimate",
  },
  {
    id: "net-cable",
    category: "networking",
    tier: "core",
    name: "Outdoor shielded Cat6 (ft)",
    qty: 300,
    unit: [0.5, 1.2],
    confidence: "estimate",
  },
  {
    id: "net-industrial",
    category: "networking",
    tier: "hardened",
    name: "Industrial DIN-rail PoE switches instead of the Ultra",
    detail: "The difference in price, per switch.",
    qty: 17,
    unit: [130, 250],
    confidence: "estimate",
  },
  // --- Compute ---------------------------------------------------------------
  {
    id: "compute-pc",
    category: "compute",
    tier: "core",
    name: "Show computer with a discrete GPU",
    qty: 1,
    unit: [1200, 2400],
    confidence: "estimate",
  },
  {
    id: "compute-ups",
    category: "compute",
    tier: "core",
    name: "Battery backup for the show computer",
    qty: 1,
    unit: [150, 350],
    confidence: "estimate",
  },
  // --- Weatherproofing -------------------------------------------------------
  {
    id: "wp-node-box",
    category: "weatherproofing",
    tier: "core",
    name: "Sealed node box",
    detail: "Holds the light controller and the switch; one spare.",
    qty: 17,
    unit: [80, 160],
    confidence: "estimate",
  },
  {
    id: "wp-glands",
    category: "weatherproofing",
    tier: "core",
    name: "Cable glands and a dust-proof vent, per box",
    qty: 33,
    qtyNote: "17 node boxes + 16 power boxes",
    unit: [25, 55],
    confidence: "estimate",
  },
  {
    id: "wp-brain-box",
    category: "weatherproofing",
    tier: "core",
    name: "Brain box for the show computer and gateway",
    qty: 1,
    unit: [250, 600],
    confidence: "estimate",
  },
  {
    id: "wp-logger",
    category: "weatherproofing",
    tier: "core",
    name: "Temperature loggers for the heat test",
    qty: 2,
    unit: [25, 70],
    confidence: "estimate",
  },
  {
    id: "wp-spares",
    category: "weatherproofing",
    tier: "hardened",
    name: "Spare connectors, glands and a spare power box",
    qty: 1,
    unit: [300, 600],
    confidence: "estimate",
  },
  // --- Expansion -------------------------------------------------------------
  {
    id: "exp-cameras",
    category: "expansion",
    tier: "senses",
    name: "Outdoor PoE cameras",
    qty: 4,
    unit: [130, 250],
    confidence: "estimate",
  },
  {
    id: "exp-audio",
    category: "expansion",
    tier: "senses",
    name: "Networked speakers or PoE amplifiers",
    qty: 4,
    unit: [300, 900],
    confidence: "estimate",
  },
  {
    id: "exp-strips",
    category: "expansion",
    tier: "spokes",
    name: "LED strip for 64 more spokes (m)",
    qty: 404,
    qtyNote: "64 spokes × 378 px at 60 per metre ≈ 6.3 m each",
    unit: [8, 16],
    confidence: "assumed",
    note: "Assumes today's strip is 12 V, 60 LEDs per metre; not yet confirmed.",
  },
  {
    id: "exp-supplies",
    category: "expansion",
    tier: "spokes",
    name: "Pixel power for the new spokes",
    qty: 16,
    unit: [80, 160],
    confidence: "assumed",
    note: "Assumes one outdoor 12 V supply per segment for its four new spokes.",
  },
  {
    id: "exp-mounting",
    category: "expansion",
    tier: "spokes",
    name: "Mounting and cabling for 64 spokes",
    qty: 64,
    unit: [20, 50],
    confidence: "estimate",
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

export function money(n: number): string {
  return usd.format(Math.round(n));
}

/** "$1,200" or "$1,200–$2,400". */
export function moneyRange([lo, hi]: Range): string {
  return Math.round(lo) === Math.round(hi)
    ? money(lo)
    : `${money(lo)}–${money(hi)}`;
}

/** "$12.9K" for tight spots like chart labels. */
export function moneyShort(n: number): string {
  if (n < 1000) return money(n);
  const k = n / 1000;
  return `$${k >= 100 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, "")}K`;
}
