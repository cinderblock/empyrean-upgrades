/**
 * Everything on the site a human should check, in one list: each category's
 * today and V2 statements, its points, options and unknowns, every tier and
 * every line item. The site marks each by who drove it (human.ts) and whether
 * anyone has reviewed it; `/review` walks through them, conflicts and the
 * biggest AI decisions first.
 *
 * A review is kept against a hash of the text it saw (reviews.json, written by
 * `bun run feedback sync`), so editing an item after it was reviewed shows it
 * as changed rather than quietly keeping the tick.
 */

import {
  EXTRAS,
  ITEMS,
  TIERS,
  itemRange,
  moneyRange,
  moneyUnit,
  tierLabel,
  unitRange,
  type LineItem,
} from "./budget";
import { CATEGORY_LIST, VERDICT_LABEL, type CategoryId } from "./categories";
import { originOf, type Conflict, type Credit, type Origin } from "./human";
import REVIEWS from "./reviews.json";

/**
 * Whether review marks and the feedback button show when the URL doesn't say.
 * `?review=off` and `?review=on` override it, and the browser remembers.
 */
export const REVIEW_DEFAULT = true;
/** Where the browser remembers the choice. */
export const REVIEW_KEY = "v2-review";

export type ItemKind =
  | "today"
  | "v2"
  | "point"
  | "option"
  | "unknown"
  | "tier"
  | "line";

export const KIND_LABEL: Record<ItemKind, string> = {
  today: "Today",
  v2: "In V2",
  point: "How",
  option: "Part choice",
  unknown: "Still to find out",
  tier: "Goal",
  line: "Line item",
};

export interface ReviewItem {
  /** Stable while the item's title is: `power.option.ac-works-l14-30-plug`. */
  id: string;
  kind: ItemKind;
  category?: CategoryId;
  /** Where it shows, with the anchor that scrolls to it. */
  href: string;
  title: string;
  /** Everything a reviewer is asked to check, as one string. */
  text: string;
  credit?: Credit;
  conflict?: Conflict;
  origin: Origin;
  /** Walk-through order: lower first. */
  rank: number;
  hash: string;
}

export type Verdict = "ok" | "wrong" | "unsure";

export interface Review {
  hash: string;
  verdict: Verdict;
  who: string;
  at: string;
  note?: string;
}

export type Status =
  | "human"
  | "mixed"
  | "reviewed"
  | "flagged"
  | "unsure"
  | "changed"
  | "doc"
  | "ai";

export const STATUS_LABEL: Record<Status, string> = {
  human: "Human",
  mixed: "Human idea, AI details",
  reviewed: "Reviewed",
  flagged: "Flagged wrong",
  unsure: "Not sure",
  changed: "Changed since review",
  doc: "From a document",
  ai: "AI draft",
};

export const STATUS_EXPLAIN: Record<Status, string> = {
  human: "A person said or approved this. The wording may still be the AI's.",
  mixed:
    "A person set the direction (quoted below); the AI chose the details. The details still need checking.",
  reviewed: "An AI draft that a person has checked and said is right.",
  flagged: "A person said this is wrong. It waits for a fix.",
  unsure: "A person looked and wasn't sure. It needs someone who knows.",
  changed: "Reviewed once, but the text has changed since. Check it again.",
  doc: "Read by the AI from a document (a V1 drawing, the Empyrean repo). Not yet checked by a person.",
  ai: "Written by the AI to make the plan complete: a guess or a design choice nobody has checked.",
};

/** Whether a status still needs a person to look at it. */
export function needsReview(status: Status): boolean {
  return status !== "human" && status !== "reviewed";
}

const PACIFIC = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Los_Angeles",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

/**
 * "Oct 23, 2026 1:54 PM PDT (20:54Z)": Pacific first, UTC beside it. Built
 * from parts, so the prerender and the browser agree on every character.
 */
export function pacific(iso: string): string {
  const d = new Date(iso);
  const p = Object.fromEntries(
    PACIFIC.formatToParts(d).map((x) => [x.type, x.value]),
  );
  const utc = d.toISOString().slice(11, 16);
  return `${p.month} ${p.day}, ${p.year} ${p.hour}:${p.minute} ${p.dayPeriod} ${p.timeZoneName} (${utc}Z)`;
}

/** 32-bit FNV-1a, as hex: enough to notice an edit. */
export function hashText(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .split("-")
    .slice(0, 6)
    .join("-");
}

function make(
  item: Omit<ReviewItem, "origin" | "hash" | "rank"> & { rank: number },
): ReviewItem {
  return {
    ...item,
    origin: originOf(item.credit),
    // Conflicts first, whatever their kind.
    rank: item.conflict ? -1 : item.rank,
    hash: hashText(item.text),
  };
}

function lineText(i: LineItem): string {
  return [
    i.name,
    i.part,
    i.detail,
    `${i.qty} × ${moneyRange(unitRange(i), moneyUnit)}`,
    i.qtyNote,
    i.onlyIf && `Only if ${i.onlyIf}`,
    i.note,
  ]
    .filter(Boolean)
    .join(" · ");
}

function build(): ReviewItem[] {
  const out: ReviewItem[] = [];
  for (const c of CATEGORY_LIST) {
    const href = (anchor: string) => `/plans/${c.id}/#${anchor}`;
    const base = { category: c.id };
    out.push(
      make({
        ...base,
        id: `${c.id}.today`,
        kind: "today",
        href: href(`r-${c.id}.today`),
        title: `${c.name}: today`,
        text: c.today,
        credit: c.todayBy,
        rank: 1,
      }),
      make({
        ...base,
        id: `${c.id}.v2`,
        kind: "v2",
        href: href(`r-${c.id}.v2`),
        title: `${c.name}: in V2`,
        text: `${c.headline}. ${c.v2}`,
        credit: c.v2By,
        rank: 1,
      }),
    );
    for (const p of c.points) {
      const id = `${c.id}.point.${slug(p.title)}`;
      out.push(
        make({
          ...base,
          id,
          kind: "point",
          href: href(`r-${id}`),
          title: p.title,
          text: `${p.title}. ${p.body}`,
          credit: p.by,
          rank: 4,
        }),
      );
    }
    for (const o of c.options) {
      const id = `${c.id}.option.${slug(o.name)}`;
      out.push(
        make({
          ...base,
          id,
          kind: "option",
          href: href(`r-${id}`),
          title: o.name,
          text: `${VERDICT_LABEL[o.verdict]}: ${o.name}. ${o.price ? `${o.price}. ` : ""}${o.why}`,
          credit: o.by,
          conflict: o.conflict,
          // The leading choices are the decisions; the rest is background.
          rank: o.verdict === "leading" || o.verdict === "stretch" ? 2 : 5,
        }),
      );
    }
    for (const u of c.unknowns) {
      const id = `${c.id}.unknown.${slug(u)}`;
      out.push(
        make({
          ...base,
          id,
          kind: "unknown",
          href: href(`r-${id}`),
          title: u.length > 80 ? `${u.slice(0, 77)}…` : u,
          text: u,
          rank: 6,
        }),
      );
    }
  }
  for (const t of TIERS) {
    const id = `tier.${t.id}`;
    out.push(
      make({
        id,
        kind: "tier",
        category: t.project,
        href: `/budget/#tier-${t.id}`,
        title: tierLabel(t),
        text: `${t.name}. ${t.promise}`,
        credit: t.by,
        rank: 2,
      }),
    );
  }
  // Line items, the most expensive first within their rank.
  const lines = [...ITEMS, ...EXTRAS].sort(
    (a, b) => itemRange(b)[1] - itemRange(a)[1],
  );
  lines.forEach((i, n) => {
    out.push(
      make({
        id: `line.${i.id}`,
        kind: "line",
        category: i.category,
        href: `/budget/#item-${i.id}`,
        title: i.name,
        text: lineText(i),
        credit: i.by,
        conflict: i.conflict,
        // The top dozen by price rank with the decisions.
        rank: n < 12 ? 2.5 : 3,
      }),
    );
  });
  return out.sort((a, b) => a.rank - b.rank);
}

export const REVIEW_ITEMS: ReviewItem[] = build();

export const REVIEW_BY_ID = new Map(REVIEW_ITEMS.map((i) => [i.id, i]));

/** Reviews committed to the repo, by item id. */
export const COMMITTED: Record<string, Review> = REVIEWS as Record<
  string,
  Review
>;

/** An item's status, given the reviews known (committed, plus any live). */
export function statusOf(
  item: ReviewItem,
  reviews: Record<string, Review | undefined> = COMMITTED,
): Status {
  const r = reviews[item.id];
  if (r?.verdict === "wrong") return "flagged";
  if (item.origin === "human") return "human";
  if (!r) return item.origin;
  if (r.hash !== item.hash) return "changed";
  return r.verdict === "ok" ? "reviewed" : "unsure";
}

/** The id a line item's review mark uses, for components. */
export const lineRid = (i: LineItem) => `line.${i.id}`;
