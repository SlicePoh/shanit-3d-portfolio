import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { marked, type Tokens } from "marked";
import { stores, storeById } from "../data/stores";
import { initialNavigation, navigationReducer } from "../lib/navigation";

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
function listText(list: Tokens.List): string[] {
  return list.items.map((item) => normalize(item.tokens.filter((token) => token.type !== "list").map((token) => "text" in token ? token.text : "").join(" ") + " " + item.tokens.filter((token): token is Tokens.List => token.type === "list").flatMap(listText).join(", ")));
}

test("all supplied resume bullets and skills survive the content pipeline", () => {
  const original = readFileSync("update with chat gpt/experience.md", "utf8").split("# Museum Presentation")[0];
  const bullets = marked.lexer(original).filter((token): token is Tokens.List => token.type === "list").flatMap(listText);
  expect(storeById.museum.items.flatMap((item) => item.highlights ?? [])).toEqual(bullets);
  const sourceSkills = readFileSync("update with chat gpt/skills.md", "utf8").split("# Room Presentation")[0];
  const skills = marked.lexer(sourceSkills).filter((token): token is Tokens.List => token.type === "list").flatMap(listText);
  expect(skills).toHaveLength(42);
  expect(storeById.music.items.flatMap((item) => item.technologies ?? [])).toEqual(skills);
  expect(storeById.ramen.items).toHaveLength(3);
  expect(storeById.football.items.filter((item) => item.kind === "certification")).toHaveLength(6);
  expect(stores.flatMap((store) => store.items).some((item) => item.prototype)).toBe(false);
  expect(stores.flatMap((store) => store.items).some((item) => item.github?.includes("[ADD") || item.link?.includes("[ADD"))).toBe(false);
});

test("entry cancellation rejects stale transitions and exterior item selection", () => {
  const entering = navigationReducer(initialNavigation, { type: "visit", storeId: "ramen" });
  expect(navigationReducer(entering, { type: "item", storeId: "ramen", itemId: "memblock" })).toEqual(entering);
  const cancelled = navigationReducer(entering, { type: "overview" });
  expect(navigationReducer(cancelled, { type: "transition-complete", revision: entering.transitionRevision })).toEqual(cancelled);
  const next = navigationReducer(entering, { type: "visit", storeId: "music" });
  expect(navigationReducer(next, { type: "transition-complete", revision: entering.transitionRevision })).toEqual(next);
  expect(storeById.ramen.rotation[1]).toBe(0);
  expect(storeById.football.rotation[1]).toBe(Math.PI);
  expect(storeById.music.rotation[1] - storeById.museum.rotation[1]).toBe(Math.PI);
  expect(storeById.manga.position).toEqual([-0.35, 9.28, -0.5]);
});

test("all room surfaces fit their physical frames without browser errors", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const store of stores) {
    await page.getByRole("button", { name: "Explore the block" }).click();
    await page.getByRole("button", { name: `${store.category} — ${store.name}`, exact: true }).click();
    await expect(page.locator("main")).toHaveAttribute("data-view", "interior");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator(".room-surface").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: store.name, exact: true })).toBeFocused();
    await expect.poll(() => page.locator(".room-surface").evaluateAll((elements) => elements.every((element) => element.scrollHeight <= element.clientHeight + 1 && element.scrollWidth <= element.clientWidth + 1))).toBe(true);
    await expect(page.locator("[data-room-item]")).toHaveCount(store.items.length);
    for (const button of await page.locator("[data-room-item]").all()) await expect(button).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`${store.id}-room.png`) });
    await page.getByRole("button", { name: "Back to building", exact: true }).click();
    await expect(page.locator("main")).toHaveAttribute("data-view", "exterior");
  }
  expect(errors).toEqual([]);
});

test("every certificate opens and accurately reports missing links", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Explore the block" }).click();
  await page.getByRole("button", { name: /^Achievements —/ }).click();
  await expect(page.locator("main")).toHaveAttribute("data-view", "interior");
  for (const item of storeById.football.items.filter((entry) => entry.kind === "certification")) {
    const button = page.getByRole("button", { name: `Open ${item.title}`, exact: true });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog").getByRole("heading", { name: item.title, exact: true })).toBeVisible();
    await expect(page.getByText("Credential URL not supplied.", { exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(button).toBeFocused();
  }
});

test("normal-motion transition can be cancelled and revisited", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.getByTestId("scene")).toHaveAttribute("data-ready", "true");
  await page.clock.install();
  await page.clock.pauseAt(new Date(Date.now() + 10_000));
  await page.getByRole("button", { name: "Explore the block" }).click();
  await page.getByRole("button", { name: /^Projects —/ }).click();
  await expect(page.locator("main")).toHaveAttribute("data-view", "entering");
  await page.keyboard.press("Escape");
  await expect(page.locator("main")).toHaveAttribute("data-view", "exterior");
  await page.clock.resume();
  await page.getByRole("button", { name: "Explore the block" }).click();
  await page.getByRole("button", { name: /^Skills —/ }).click();
  await expect(page.locator("main")).toHaveAttribute("data-view", "interior");
  await page.getByRole("button", { name: "Open Frontend", exact: true }).click();
  await expect(page.getByRole("dialog").getByText("R3F.js", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await expect(page.locator("main")).toHaveAttribute("data-view", "exterior");
});