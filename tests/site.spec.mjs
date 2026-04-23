import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const vp of VIEWPORTS) {
  test.describe(`viewport: ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("renders cleanly with finance-tailored content", async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
      page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));
      const failedRequests = [];
      page.on("requestfailed", (r) =>
        failedRequests.push(`${r.url()} :: ${r.failure()?.errorText}`)
      );

      await page.goto("/", { waitUntil: "networkidle" });

      // Title + meta
      await expect(page).toHaveTitle(/Veera Ravichandran/);
      // Hero structure
      await expect(page.locator("#displayHeadline .word").first()).toBeVisible();
      await expect(page.locator(".hero-sub")).toContainText(/Financial Economics/);
      // ID card
      await expect(page.locator(".card-id")).toBeVisible();
      await expect(page.locator(".id-meta")).toContainText("Binghamton");

      // Sections present
      for (const id of ["about", "experience", "education", "cases", "skills", "themes", "availability", "contact"]) {
        await expect(page.locator(`#${id}`)).toBeAttached();
      }

      // Dynamic renderers actually fired
      await expect(page.locator(".ticker-item").first()).toBeAttached();
      await expect(page.locator(".glance").first()).toBeVisible();
      await expect(page.locator("#timeline .t-item").first()).toBeVisible();
      await expect(page.locator("#eduCard .edu-school")).toContainText(/Binghamton University/);
      await expect(page.locator("#casesGrid .case").first()).toBeVisible();
      await expect(page.locator("#skillsGrid .skill-cluster").first()).toBeVisible();
      await expect(page.locator("#themesGrid .theme").first()).toBeVisible();
      await expect(page.locator("#availabilityList div").first()).toBeVisible();

      // Real signal: BCG and Goldman both present in case work
      await expect(page.locator("#casesGrid")).toContainText(/BCG/i);
      await expect(page.locator("#casesGrid")).toContainText(/Goldman Sachs/i);

      // External links
      await expect(page.locator('a[href*="linkedin.com/in/veeraravichandran"]').first()).toBeVisible();
      await expect(page.locator('a[href*="github.com/vrchandran12-dev"]').first()).toBeVisible();

      await page.screenshot({ path: `test-results/screenshot-${vp.name}-top.png`, fullPage: false });
      // Force-reveal so the full-page snapshot reflects what a scrolling user sees
      await page.evaluate(() =>
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"))
      );
      await page.waitForTimeout(700);
      await page.screenshot({ path: `test-results/screenshot-${vp.name}-full.png`, fullPage: true });

      expect(consoleErrors, `console:\n${consoleErrors.join("\n")}`).toEqual([]);
      expect(failedRequests, `failed:\n${failedRequests.join("\n")}`).toEqual([]);
    });

    test("theme toggle persists", async ({ page }) => {
      await page.goto("/");
      const html = page.locator("html");
      const before = (await html.getAttribute("data-theme")) ?? "light";
      await page.locator("#themeToggle").click();
      const after = await html.getAttribute("data-theme");
      expect(after).not.toBe(before);
      await page.reload();
      const persisted = await html.getAttribute("data-theme");
      expect(persisted).toBe(after);
    });

    test("nav anchors hit each section", async ({ page }) => {
      await page.goto("/");
      const targets = ["about", "experience", "education", "cases", "availability"];
      for (const id of targets) {
        const navLink = page.locator(`.nav-links a[href="#${id}"]`);
        if (await navLink.isVisible()) {
          await navLink.click();
        } else {
          await page.evaluate(
            (i) => document.getElementById(i).scrollIntoView({ behavior: "instant", block: "start" }),
            id
          );
        }
        await page.waitForTimeout(250);
        await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.01 });
      }
    });

    test("animated counter reaches target", async ({ page }) => {
      await page.goto("/");
      const first = page.locator(".glance-num").first();
      await first.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      const expected = await first.getAttribute("data-count");
      const text = (await first.textContent()) || "";
      expect(text).toContain(expected);
    });
  });
}
