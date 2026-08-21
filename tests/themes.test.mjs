import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const appRoot = new URL("../", import.meta.url);

async function exists(url) {
  try {
    await access(url);
    return true;
  } catch {
    return false;
  }
}

test("catalog exposes exactly three selling-point themes with three wallpapers each", async () => {
  const sourceUrl = new URL("app/themes.ts", appRoot);
  assert.equal(await exists(sourceUrl), true, "theme catalog should exist");

  const catalog = await import(sourceUrl);
  assert.deepEqual(catalog.themeIds, ["cats", "scenery", "anime"]);
  for (const id of catalog.themeIds) {
    const theme = catalog.themes[id];
    assert.equal(theme.wallpapers.length, 3, `${id} should have three wallpapers for left-center-right rotation`);
    assert.ok(theme.kicker && theme.headline && theme.sub, `${id} should carry complete copy`);
  }
  assert.equal(catalog.defaultThemeId, "cats");
  assert.equal(catalog.getTheme("missing"), null);
});

test("every wallpaper asset is project-local and present", async () => {
  const catalog = await import(new URL("app/themes.ts", appRoot));
  const all = catalog.themeIds.flatMap((id) => catalog.themes[id].wallpapers);
  const checks = await Promise.all(
    all.map((wallpaper) => exists(new URL(`public${wallpaper.src}`, appRoot))),
  );

  const missing = all.filter((_, i) => !checks[i]).map((wallpaper) => wallpaper.src);
  assert.deepEqual(missing, [], `missing assets: ${missing.join(", ")}`);
});

test("landing ships the new Salad brand icon (square)", async () => {
  const iconUrl = new URL("public/salad-icon.png", appRoot);
  assert.equal(await exists(iconUrl), true, "salad icon should exist");

  const image = await readFile(iconUrl);
  assert.equal(image.toString("ascii", 1, 4), "PNG", "icon should be a PNG image");
  assert.equal(image.readUInt32BE(16), image.readUInt32BE(20), "icon should be square");
});
