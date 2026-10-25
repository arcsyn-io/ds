import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("documentação não possui violações WCAG A/AA sérias ou críticas", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toBeVisible();

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  const blockingViolations = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");

  expect(blockingViolations).toEqual([]);
});

test("controles preservam alvos touch e campos evitam zoom no mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Contrato exclusivo de ponteiro coarse.");

  await page.goto("/#/components/input");
  const sidebarTrigger = page.locator(".arcsyn-sidebar__trigger");
  const input = page.locator(".docs-preview .arcsyn-input").first();

  await expect(sidebarTrigger).toBeVisible();
  await expect(input).toBeVisible();
  await expect.poll(() => sidebarTrigger.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  await expect.poll(() => input.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
  await expect.poll(() => input.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))).toBeGreaterThanOrEqual(16);

  await page.goto("/#/components/checkbox");
  const checkbox = page.locator(".docs-preview .arcsyn-checkbox").first();
  await expect.poll(() => checkbox.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);

  await page.goto("/#/components/switch");
  const switchControl = page.locator(".docs-preview .arcsyn-switch").first();
  await expect.poll(() => switchControl.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
});
