/**
 * Names, links and the few facts about the Gate the whole site repeats.
 * Numbers about money live in budget.ts, never here.
 */

export const SITE = {
  name: "The Empyrean Gate",
  version: "V2",
  origin: "https://v2.empyreangate.org",
  /** The public site, for the full story and the playground. */
  parent: "https://empyreangate.org/",
  playground: "https://empyreangate.org/playground",
  /** The same donation page empyreangate.org uses. */
  donate: "https://www.givsum.com/charities/entheos-community-village",
  entheos: "https://www.entheosrising.org/",
  /** When the figures on the site were last gathered. */
  figuresAsOf: "2026-10-21",
} as const;

/** The rig as built (docs/v1-hardware.md). */
export const GATE = {
  segments: 16,
  spokes: 64,
  pixelsPerSpoke: 378,
  pixels: 64 * 378,
  outerDiameterFt: 50,
  controllers: 16,
} as const;
