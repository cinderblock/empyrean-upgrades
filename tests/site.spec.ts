import { expect, test } from "@playwright/test";
import { ITEMS, money, tierTotals } from "../app/content/budget";
import { CATEGORY_LIST } from "../app/content/categories";

const PAGES = [
  "/",
  "/budget/",
  "/review/",
  ...CATEGORY_LIST.map((c) => `/plans/${c.id}/`),
];

test.describe("every page", () => {
  for (const path of PAGES) {
    test(`${path} renders, unlisted, with no title= tooltips`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      // A hydration mismatch is only a console error, not a page error.
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
      });
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
    await expect(detail).toContainText("Segment A");
    await page.getByRole("button", { name: "Next segment" }).click();
    await expect(detail).toContainText("Segment B");
    await expect(detail).toContainText("SpokesB1, B3, B5, B7");
    await page.getByRole("button", { name: "Previous segment" }).click();
    await page.getByRole("button", { name: "Previous segment" }).click();
    await expect(detail).toContainText("Segment P");
  });

  test("the ring at rest draws every spoke, at 64 and 128", async ({
    page,
  }) => {
    await page.goto("/");
    /** Rasterise the still SVG and count spokes with no paint at mid-radius. */
    const blankSpokes = () =>
      page.evaluate(async () => {
        const svg = document.querySelector<SVGSVGElement>(".gate-still")!;
        const spokes = svg.querySelectorAll("line").length;
        const xml = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;
        await img.decode();
        const size = 400;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, size, size);
        const blank: number[] = [];
        for (let s = 0; s < spokes; s++) {
          const a = (s / spokes) * Math.PI * 2;
          // Halfway along the spoke, in viewBox units (-100..100).
          const r = 60;
          const x = Math.round(((Math.sin(a) * r + 100) / 200) * size);
          const y = Math.round(((-Math.cos(a) * r + 100) / 200) * size);
          const px = ctx.getImageData(x - 1, y - 1, 3, 3).data;
          let alpha = 0;
          for (let i = 3; i < px.length; i += 4) alpha = Math.max(alpha, px[i]);
          if (alpha === 0) blank.push(s);
        }
        return { spokes, blank };
      });
    expect(await blankSpokes()).toEqual({ spokes: 64, blank: [] });
    await page.getByRole("button", { name: /Stretch goal: 128/ }).click();
    await expect(page.locator(".gate-still line")).toHaveCount(128);
    expect(await blankSpokes()).toEqual({ spokes: 128, blank: [] });
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

test.describe("colour scheme", () => {
  const SCHEMES = {
    light: { bg: "rgb(247, 246, 251)", ink: "rgb(23, 22, 44)" },
    dark: { bg: "rgb(6, 6, 15)", ink: "rgb(242, 240, 247)" },
  } as const;
  const NIGHT_INK = SCHEMES.dark.ink;

  for (const [scheme, want] of Object.entries(SCHEMES)) {
    test.describe(scheme, () => {
      // No script: the stylesheet alone picks the scheme, so the first paint
      // is already right and nothing flashes.
      test.use({
        colorScheme: scheme as keyof typeof SCHEMES,
        javaScriptEnabled: false,
      });

      test("follows the system before any script runs", async ({ page }) => {
        await page.goto("/");
        const html = page.locator("html");
        await expect(html).toHaveCSS("background-color", want.bg);
        await expect(html).toHaveCSS("color", want.ink);
      });

      test("the demo is always night", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator(".demo h2")).toHaveCSS("color", NIGHT_INK);
      });
    });
  }
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

test.describe("review marks", () => {
  test("show by default, with who drove each block", async ({ page }) => {
    await page.goto("/plans/power/");
    await expect(page.locator("html")).toHaveAttribute("data-review", "on");
    const v2 = page.locator('[data-rid="power.v2"]');
    await expect(v2).toHaveAttribute("data-status", "mixed");
    await v2.locator(".rmark .tip-trigger").click();
    await expect(v2.locator(".rmark .tip-panel")).toContainText("H17");
    await expect(page.locator("[data-conflict] .rmark").first()).toContainText(
      "≠",
    );
  });

  test("?review=off hides them, and the browser remembers", async ({
    page,
  }) => {
    await page.goto("/plans/power/?review=off");
    await expect(page.locator(".rmark").first()).toBeHidden();
    await expect(page.locator(".fb-button")).toBeHidden();
    await page.goto("/budget/");
    await expect(page.locator("html")).toHaveAttribute("data-review", "off");
    await expect(page.locator(".rmark").first()).toBeHidden();
    await page.goto("/budget/?review=on");
    await expect(page.locator(".rmark").first()).toBeVisible();
  });

  test("never print", async ({ page }) => {
    await page.goto("/plans/power/");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator(".rmark").first()).toBeHidden();
    await expect(page.locator(".fb-button")).toBeHidden();
  });
});

test.describe("feedback", () => {
  test("point at a diagram and leave a comment", async ({ page }) => {
    await page.goto("/plans/power/");
    await page.locator(".fb-button").click();
    await page.getByRole("button", { name: "Point at something" }).click();
    await page.locator("figure h4").first().click();
    const form = page.locator(".fb-form");
    await expect(form).toContainText("Power box");
    const body = `A test comment ${Date.now()}`;
    await form.locator("textarea").fill(body);
    await form.getByRole("button", { name: "Send" }).click();
    await expect(page.locator(".fb-notice")).toContainText("Sent");
    await page.locator(".fb-button").click();
    await expect(page.locator(".fb-list")).toContainText(body);
  });

  test("select text and comment on it", async ({ page }) => {
    await page.goto("/plans/power/");
    const p = page.locator('[data-rid="power.v2"] p');
    await p.selectText();
    await page.locator(".fb-chip").click();
    await expect(page.locator(".fb-form .fb-on")).toContainText("“");
  });
});

test("the walk-through records a verdict and moves on", async ({ page }) => {
  await page.goto("/review/");
  const walk = page.locator(".walk");
  await expect(walk.getByRole("button", { name: /Looks right/ })).toBeVisible();
  const title = (await walk.locator("h3").textContent())!;
  await walk.getByRole("button", { name: /Looks right/ }).click();
  await expect(walk.locator("h3")).not.toHaveText(title);
  const row = page.locator(".review-list tr", {
    has: page.getByRole("link", { name: title, exact: true }),
  });
  await expect(row.locator(".rmark-chip")).toContainText("Reviewed");
});
