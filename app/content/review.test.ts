import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { LEDGER_FILE, ledgerMarkdown } from "../../scripts/ledger";
import { HUMAN, HUMAN_IDS, type Said } from "./human";
import {
  COMMITTED,
  REVIEW_BY_ID,
  REVIEW_ITEMS,
  hashText,
  pacific,
  statusOf,
} from "./review";

describe("the review list", () => {
  test("every item has its own id", () => {
    const ids = REVIEW_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test("every committed review names an item that exists", () => {
    for (const rid of Object.keys(COMMITTED)) {
      expect(REVIEW_BY_ID.has(rid)).toBe(true);
    }
  });

  test("a review goes stale when the text changes", () => {
    const item = REVIEW_ITEMS.find((i) => i.origin === "ai")!;
    const r = {
      verdict: "ok" as const,
      who: "main",
      at: "2026-10-23T00:00:00Z",
    };
    expect(statusOf(item, { [item.id]: { ...r, hash: item.hash } })).toBe(
      "reviewed",
    );
    expect(statusOf(item, { [item.id]: { ...r, hash: hashText("old") } })).toBe(
      "changed",
    );
    expect(statusOf(item, {})).toBe("ai");
  });

  test("a wrong flag beats even a human credit", () => {
    const item = REVIEW_ITEMS.find((i) => i.origin === "human")!;
    const flag = {
      verdict: "wrong" as const,
      who: "main",
      at: "x",
      hash: item.hash,
    };
    expect(statusOf(item, { [item.id]: flag })).toBe("flagged");
  });
});

describe("the ledger", () => {
  test("ids run in order with no gaps", () => {
    HUMAN_IDS.forEach((id, n) => {
      expect(id as string).toBe(`H${String(n + 1).padStart(2, "0")}`);
    });
  });

  test("replacements point at later entries that exist", () => {
    for (const id of HUMAN_IDS) {
      const h: Said = HUMAN[id];
      if (!h.supersededBy) continue;
      expect(HUMAN_IDS).toContain(h.supersededBy as never);
      expect(h.supersededBy > id).toBe(true);
    }
  });

  test(`${LEDGER_FILE} is up to date (bun run ledger)`, () => {
    const onDisk = readFileSync(LEDGER_FILE, "utf8").replace(/\r\n/g, "\n");
    expect(onDisk).toBe(ledgerMarkdown());
  });
});

test("times read Pacific first, UTC beside", () => {
  expect(pacific("2026-10-23T20:54:00Z")).toBe(
    "Oct 23, 2026 1:54 PM PDT (20:54Z)",
  );
  expect(pacific("2026-12-01T08:05:00Z")).toBe(
    "Dec 1, 2026 12:05 AM PST (08:05Z)",
  );
});
