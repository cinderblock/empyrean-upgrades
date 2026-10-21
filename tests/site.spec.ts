import { expect, test } from "@playwright/test";
import { ITEMS, money, tierTotals } from "../app/content/budget";
import { CATEGORY_LIST } from "../app/content/categories";

const PAGES = ["/", "/budget/", ...CATEGORY_LIST.map((c) => `/plans/${c.id}/`)];

test.describe("every page", () => {
  for (const path of PAGES) {
    test(`${path} renders, unlisted, with no title= tooltips`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
      // Hover-only text is invisible on a phone; this site never uses it.
      await expect(page.locator("[title]")).toHaveCount(0);
      expect(errors).toEqual([]);
    });
  }
});

test("robots.txt disallows everything", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(await res.text()).toContain("Disallow: /");
});

test.describe("overview", () => {
  test("leads with the goal from the budget", async ({ page }) => {
    const totals = tierTotals();
    await page.goto("/");
    await expect(page.locator(".hero .figure-value").first()).toHaveText(
      money(totals[0].goal),
    );
    await expect(page.locator(".hero")).toContainText(
      money(totals[totals.length - 1].cumulative),
    );
    await expect(page.locator(".ladder-tier")).toHaveCount(
      totals.filter((t) => t.goal > 0).length,
    );
  });

  test("a donut slice shows its figure in the middle", async ({ page }) => {
    await page.goto("/");
    const center = page.locator(".screen-only .donut-center-label");
    await expect(center).toHaveText("High estimate");
    await page
      .locator(".screen-only .donut-legend tr", { hasText: "Power" })
      .hover();
    await expect(center).toHaveText("Power");
  });

  test("the ring diagram steps through segments", async ({ page }) => {
    await page.goto("/");
    const detail = page.locator(".ring-detail");
    await expect(detail).toContainText("Segment 1");
    await page.getByRole("button", { name: "Next segment" }).click();
    await expect(detail).toContainText("Segment 2");
    await expect(detail).toContainText("Spokes5–8");
    await page.getByRole("button", { name: "Previous segment" }).click();
    await page.getByRole("button", { name: "Previous segment" }).click();
    await expect(detail).toContainText("Segment 16");
  });

  test("the demo switches to 128 spokes and links to the playground", async ({
    page,
  }) => {
    await page.goto("/");
    const stretch = page.getByRole("button", { name: /Stretch goal: 128/ });
    await stretch.click();
    await expect(stretch).toHaveAttribute("aria-pressed", "true");
    await expect(
      page.getByRole("link", { name: /Open the playground/ }),
    ).toHaveAttribute("href", "https://empyreangate.org/playground");
  });
});

test.describe("budget", () => {
  test("lists every line item once", async ({ page }) => {
    await page.goto("/budget/");
    for (const item of ITEMS) {
      await expect(page.locator(`#item-${item.id}`)).toHaveCount(1);
    }
  });

  test("a confidence label opens on tap and closes on Escape", async ({
    page,
  }) => {
    await page.goto("/budget/");
    const tip = page.locator(".tip").first();
    const panel = tip.locator(".tip-panel");
    await expect(panel).toBeHidden();
    await tip.locator(".tip-trigger").click();
    await expect(panel).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
  });
});

test.describe("print", () => {
  test("the overview prints the handout and nothing else", async ({ page }) => {
    await page.goto("/");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".print-sheet")).toBeVisible();
    await expect(page.locator(".screen-only")).toBeHidden();
    await expect(page.locator(".masthead")).toBeHidden();
    await expect(page.locator(".print-sheet .qr")).toBeVisible();
  });

  test("on one sheet of Letter", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "page.pdf is Chromium-only");
    await page.goto("/");
    const pdf = (
      await page.pdf({ format: "Letter", preferCSSPageSize: true })
    ).toString("latin1");
    expect(pdf.match(/\/Type\s*\/Page[^s]/g)).toHaveLength(1);
  });

  test("hidden on screen", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".print-sheet")).toBeHidden();
  });
});
