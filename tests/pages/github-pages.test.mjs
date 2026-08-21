import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const siteRoot = new URL("../../dist/client/", import.meta.url);
const basePath = "/qutu-nova-mobile-landing";

async function exists(path) {
  try {
    await access(new URL(path, siteRoot));
    return true;
  } catch {
    return false;
  }
}

async function html(path) {
  return readFile(new URL(path, siteRoot), "utf8");
}

test("exports every public landing route as static HTML", async () => {
  assert.equal(await exists("index.html"), true, "homepage export is missing");
  assert.equal(await exists("t/scenery/index.html"), true, "scenery export is missing");
  assert.equal(await exists("t/anime/index.html"), true, "anime export is missing");

  assert.match(await html("index.html"), /先看上屏效果/);
  assert.match(await html("t/scenery/index.html"), /把山河湖海，装进你的手机/);
  assert.match(await html("t/anime/index.html"), /让喜欢的画面，住进你的屏幕/);
});

test("uses the GitHub repository base path for navigation and assets", async () => {
  const homepage = await html("index.html");

  assert.match(homepage, new RegExp(`href="${basePath}/t/scenery/"`));
  assert.match(homepage, new RegExp(`href="${basePath}/t/anime/"`));
  assert.match(homepage, new RegExp(`src="${basePath}/salad-icon\\.png"`));
  assert.match(homepage, new RegExp(`src="${basePath}/wallpapers/`));
  assert.doesNotMatch(homepage, /\/_next\/image\?/);

  const assetReferences = [...homepage.matchAll(/(?:href|src)="(\/qutu-nova-mobile-landing\/[^"?#]+)"/g)]
    .map((match) => match[1])
    .filter((path) => /\.(?:css|js|png|jpe?g|svg|woff2?)$/i.test(path));
  assert.ok(assetReferences.length > 0, "homepage should reference deployable assets");

  for (const assetPath of assetReferences) {
    const artifactPath = assetPath.slice(`${basePath}/`.length);
    assert.equal(await exists(artifactPath), true, `missing published asset: ${artifactPath}`);
  }
});

test("keeps GitHub Pages from applying Jekyll processing", async () => {
  assert.equal(await exists(".nojekyll"), true, ".nojekyll is missing from the publish artifact");
});
