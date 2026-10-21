import { describe, expect, test } from "bun:test";
import { CATEGORY_IDS } from "./categories";
import {
  CONTINGENCY,
  ITEMS,
  TIER_IDS,
  itemRange,
  moneyRange,
  moneyShort,
  roundUp,
  slicesOf,
  subtotal,
  tierTotals,
  type LineItem,
} from "./budget";

describe("line items", () => {
  test("ids are unique", () => {
    const ids = ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every item has a known tier and category", () => {
    for (const item of ITEMS) {
      expect(TIER_IDS).toContain(item.tier);
      expect(CATEGORY_IDS).toContain(item.category);
    }
  });

  test("ranges run low to high, and quotes are exact", () => {
    for (const item of ITEMS) {
      const [lo, hi] = itemRange(item);
      expect(lo).toBeGreaterThan(0);
      expect(hi).toBeGreaterThanOrEqual(lo);
      if (item.confidence === "quoted") {
        expect(typeof item.unit).toBe("number");
      }
    }
  });

  test("a quoted price names its source", () => {
    for (const item of ITEMS.filter((i) => i.confidence === "quoted")) {
      expect(item.source?.url ?? item.datasheet).toBeTruthy();
    }
  });

  test("an assumed price says what it assumes", () => {
    for (const item of ITEMS.filter((i) => i.confidence === "assumed")) {
      expect(item.note).toBeTruthy();
    }
  });
});

describe("totals", () => {
  const items: LineItem[] = [
    {
      id: "a",
      category: "power",
      tier: "core",
      name: "a",
      qty: 2,
      unit: 100,
      confidence: "quoted",
    },
    {
      id: "b",
      category: "compute",
      tier: "core",
      name: "b",
      qty: 1,
      unit: [400, 1000],
      confidence: "estimate",
    },
    {
      id: "c",
      category: "expansion",
      tier: "senses",
      name: "c",
      qty: 3,
      unit: [100, 200],
      confidence: "estimate",
    },
  ];

  test("subtotal adds ranges", () => {
    expect(subtotal(items)).toEqual([900, 1800]);
  });

  test("tiers add contingency, round up, and accumulate", () => {
    const [core, hardened, senses] = tierTotals(items);
    expect(core.parts).toEqual([600, 1200]);
    expect(core.total[1]).toBeCloseTo(1200 * (1 + CONTINGENCY));
    expect(core.goal).toBe(roundUp(1200 * (1 + CONTINGENCY)));
    expect(hardened.goal).toBe(0);
    expect(senses.cumulative).toBe(core.goal + roundUp(600 * 1.15));
  });

  test("slices cover the tier, contingency last", () => {
    const slices = slicesOf("core", items);
    expect(slices.map((s) => s.key)).toEqual([
      "power",
      "compute",
      "contingency",
    ]);
    const sum = slices.reduce((n, s) => n + s.range[1], 0);
    expect(sum).toBeCloseTo(1200 * (1 + CONTINGENCY));
  });
});

describe("formatting", () => {
  test("money", () => {
    expect(moneyRange([1200, 1200])).toBe("$1,200");
    expect(moneyRange([1200, 2400])).toBe("$1,200–$2,400");
    expect(moneyShort(950)).toBe("$950");
    expect(moneyShort(12_900)).toBe("$12.9K");
    expect(moneyShort(4000)).toBe("$4K");
  });
});
