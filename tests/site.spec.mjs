import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const vp of VIEWPORTS) {
  test.describe(`viewport: ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test("renders without console errors and has expected sections", async ({ page }) => {
      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));

      const failedRequests = [];
      page.on("requestfailed", (req) =>
        failedRequests.push(`${req.url()} :: ${req.failure()?.errorText}`)
      );

      await page.goto("/", { waitUntil: "networkidle" });

      await expect(page).toHaveTitle(/Veera Ravichandran/i);
      await expect(page.locator(".title")).toContainText("Veera");
      await expect(page.locator("#about")).toBeVisible();
      await expect(page.locator("#experience")).toBeVisible();
      await expect(page.locator("#education")).toBeVisible();
      await expect(page.locator("#skills")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();

      // Dynamic sections actually rendered (content.js ran)
      await expect(page.locator("#timeline .t-item").first()).toBeVisible();
      await expect(page.locator("#education-grid .project").first()).toBeVisible();
      await expect(page.locator("#skillsGrid .skill-cluster").first()).toBeVisible();
      await expect(page.locator("#socials a").first()).toBeVisible();

      // External links present
      const linkedin = page.locator('a[href*="linkedin.com/in/veeraravichandran"]').first();
      const github = page.locator('a[href*="github.com/vrchandran12-dev"]').first();
      await expect(linkedin).toBeVisible();
      await expect(github).toBeVisible();

      await page.screenshot({
        path: `test-results/screenshot-${vp.name}-top.png`,
        fullPage: false,
      });
      // Force-reveal so the full-page snapshot reflects what a scrolling user sees
      await page.evaluate(() =>
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"))
      );
      await page.waitForTimeout(800);
      await page.screenshot({
        path: `test-results/screenshot-${vp.name}-full.png`,
        fullPage: true,
      });

      expect(consoleErrors, `console errors:\n${consoleErrors.join("\n")}`).toEqual([]);
      expect(failedRequests, `failed requests:\n${failedRequests.join("\n")}`).toEqual([]);
    });

    test("theme toggle flips data-theme", async ({ page }) => {
      await page.goto("/");
      const html = page.locator("html");
      const before = (await html.getAttribute("data-theme")) ?? "dark";
      await page.locator("#themeToggle").click();
      const after = await html.getAttribute("data-theme");
      expect(after).not.toBe(before);
    });

    test("nav anchors scroll to sections", async ({ page }) => {
      await page.goto("/");
      const targets = ["about", "experience", "education", "skills", "contact"];
      for (const id of targets) {
        const link = page.locator(`.nav-links a[href="#${id}"]`);
        if (vp.name === "mobile") {
          // nav-links hidden on mobile; jump directly via scrollIntoView
          await page.evaluate(
            (i) => document.getElementById(i).scrollIntoView({ behavior: "instant", block: "start" }),
            id
          );
        } else {
          await link.click();
        }
        await page.waitForTimeout(250);
        await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.01 });
      }
    });
  });
}
