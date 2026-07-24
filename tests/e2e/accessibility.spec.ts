import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("documentação não possui violações WCAG A/AA sérias ou críticas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const blockingViolations = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");

  expect(blockingViolations).toEqual([]);
});
