import { expect, test, type Page } from "@playwright/test";
import { initialNavigation, navigationReducer } from "../lib/navigation";
import { stores } from "../data/stores";

async function visit(page: Page, category: string) {
  await page.getByRole("button", { name: "Explore the block" }).click();
  await page.getByRole("button", { name: new RegExp(`^${category} —`) }).click();
  await expect(page.locator("main")).toHaveAttribute("data-view", "interior");
}

test("portfolio data and navigation remain consistent", () => {
  expect(new Set(stores.map((store) => store.id)).size).toBe(5);
  for (const store of stores) {
    if (store.id === "manga") expect(store.items).toHaveLength(0);
    else expect(store.items.length).toBeGreaterThan(0);
    expect(new Set(store.items.map((item) => item.id)).size).toBe(store.items.length);
    expect(store.items.every((item) => item.category === store.category)).toBe(true);
    expect(store.scale.every((dimension) => dimension > 0)).toBe(true);
    const entering = navigationReducer(initialNavigation, { type: "visit", storeId: store.id });
    const focused = navigationReducer(entering, { type: "transition-complete", revision: entering.transitionRevision });
    expect(focused.storeId).toBe(store.id);
    expect(navigationReducer(focused, { type: "item", storeId: store.id, itemId: "invalid-id" })).toEqual(focused);
    if (!store.items.length) continue;
    const detailed = navigationReducer(focused, { type: "item", storeId: store.id, itemId: store.items[0].id });
    expect(detailed.itemId).toBe(store.items[0].id);
    expect(navigationReducer(detailed, { type: "close-item" }).storeId).toBe(store.id);
    const leaving = navigationReducer(detailed, { type: "overview" });
    expect(leaving.view).toBe("leaving");
    expect(navigationReducer(leaving, { type: "transition-complete", revision: leaving.transitionRevision }).storeId).toBeNull();
  }
});

test("renders the diorama without browser errors", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByTestId("scene")).toHaveAttribute("data-ready", "true");
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.getByRole("button", { name: /^Explore Projects at/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Explore Experience at/ })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("overview.png") });
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("projects open, preserve the scene, and support Escape", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await visit(page, "Projects");
  await expect(page.getByRole("heading", { name: "Shinobi Ramen", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "Open Shinobi Tracker", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Shinobi Tracker", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").getByText("MediaPipe", { exact: true })).toBeVisible();
  await expect(page.locator("canvas")).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("project.png") });
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "Shinobi Ramen", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("four resume rooms have functional details and the attic stays a placeholder", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [category, item, text] of [
    ["Experience", "Software Development Engineer", "Migrated 100K+ records."],
    ["Skills", "Programming Languages", "Rust"],
    ["Achievements", "Siemens Advanta Rising Star", "Awarded with the Siemens Advanta Rising Star award for innovation and eagerness to learn."],
  ]) {
    await visit(page, category);
    await page.getByRole("button", { name: `Open ${item}`, exact: true }).click();
    await expect(page.getByRole("heading", { name: item, exact: true })).toBeVisible();
    await expect(page.getByRole("dialog").getByText(text, { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Close details and return to room" }).click();
    await expect(page.locator("main")).toHaveAttribute("data-view", "interior");
  }
  await visit(page, "Experiments");
  await expect(page.getByText("A story still unwritten.")).toBeVisible();
  await expect(page.locator("[data-room-item]")).toHaveCount(0);
});

test("directory is keyboard accessible and includes education and about", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Explore the block" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Close directory" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole("button", { name: "Education", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Still learning." })).toBeVisible();
  await page.keyboard.press("Escape");
  await toggle.click();
  await page.getByRole("button", { name: "About me", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Hi, I’m Shanit." })).toBeVisible();
});

test("simplified presentation retains all content", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to simplified view" }).click();
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Five doors. Plenty to discover." })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("simplified.png") });
  await page.getByRole("button", { name: /GROUND FLOOR.*Shinobi Ramen/ }).click();
  await page.getByRole("button", { name: "Open MemBlock", exact: true }).click();
  await expect(page.getByRole("heading", { name: "MemBlock", exact: true })).toBeVisible();
});

test("reduced motion keeps store navigation functional", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await visit(page, "Skills");
  await page.getByRole("button", { name: "Open Programming Languages", exact: true }).click();
  await expect(page.getByRole("dialog").getByText("Rust", { exact: true })).toBeVisible();
});

test("unavailable WebGL degrades to the complete directory", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...args: unknown[]) {
      if (type.includes("webgl")) return null;
      return Reflect.apply(original, this, [type, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await expect(page.getByText("The 3D scene isn’t available on this device. Every story is still right here.")).toBeVisible();
  await visit(page, "Experience");
  await page.getByRole("button", { name: "Open Software Development Engineer", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Software Development Engineer", exact: true })).toBeVisible();
});

test("direct store picking, constrained orbit, zoom and reset work", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Touch users have the tested enlarged HTML labels and directory.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const marker = page.locator("#store-marker-ramen");
  await expect(marker).toBeVisible();
  const initialStyle = await marker.getAttribute("style");
  await page.mouse.move(1190, 400);
  await page.mouse.down();
  await page.mouse.move(1270, 430, { steps: 8 });
  await page.mouse.up();
  await expect(marker).not.toHaveAttribute("style", initialStyle!);
  const rotatedStyle = await marker.getAttribute("style");
  await page.mouse.wheel(0, -180);
  await expect(marker).not.toHaveAttribute("style", rotatedStyle!);
  await page.getByRole("button", { name: "Reset camera to overview" }).click();
  await expect(marker).toHaveAttribute("style", initialStyle!);
  const point = await marker.boundingBox();
  expect(point).not.toBeNull();
  await page.mouse.move(point!.x - 35, point!.y + 15);
  await expect(page.locator("body")).toHaveCSS("cursor", "pointer");
  await page.mouse.click(point!.x - 35, point!.y + 15);
  await expect(page.getByRole("heading", { name: "Shinobi Ramen", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Back to building", exact: true }).click();
  await expect(marker).toBeVisible();
});