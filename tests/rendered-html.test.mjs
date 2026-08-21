import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Salad wallpaper landing page", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>沙拉壁纸/);
  assert.match(html, /class="sl-stage"/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("page keeps a single Salad brand identity with the new logo", async () => {
  const html = await (await render("/")).text();

  assert.match(html, /沙拉壁纸/);
  assert.match(html, /salad-icon\.png/);
  assert.doesNotMatch(html, /趣图新境|趣图壁纸/);
  assert.doesNotMatch(html, /qutu-nova-app-icon|cat-app-icon-v2|cat-campaign-backdrop/);
});

test("hero is a left-center-right rotating trio, no thumbnail controls", async () => {
  const html = await (await render("/")).text();

  assert.match(html, /class="sl-hero" role="group"/);
  const tiles = html.match(/class="sl-tile sl-pos-\d"/g) ?? [];
  assert.equal(tiles.length, 3);
  assert.match(html, /sl-pos-0/);
  assert.match(html, /sl-pos-1/);
  assert.match(html, /sl-pos-2/);
  assert.doesNotMatch(html, /lp-dot|lp-picker|campaign-thumbs|role="tablist"/);
});

test("conversion path links the CTA directly to the Android release", async () => {
  const html = await (await render("/")).text();

  assert.match(
    html,
    /<a class="sl-cta" href="https:\/\/github\.com\/Hooooz\/qutu-nova-mobile-landing\/releases\/download\/android-v0\.1\.0\/app-release\.apk">立即下载<\/a>/,
  );
  assert.equal((html.match(/class="sl-cta"/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<button class="sl-cta"/);
  assert.doesNotMatch(html, /备案|ICP|NEXT_PUBLIC_ICP/);
  assert.doesNotMatch(html, /免费|4K|动态壁纸|一键设置/);
});

test("download proof identifies the APK as Android-only", async () => {
  const html = await (await render("/")).text();

  assert.match(html, /Android 安装包 · 版本 0\.1\.0/);
  assert.doesNotMatch(html, /iPhone/);
});

test("theme routes render scenery and anime selling points", async () => {
  const scenery = await render("/t/scenery");
  assert.equal(scenery.status, 200);
  const sceneryHtml = await scenery.text();
  assert.match(sceneryHtml, /把山河湖海，装进你的手机/);
  assert.match(sceneryHtml, /雪山镜湖|橘子海|雾光森林/);

  const anime = await render("/t/anime");
  assert.equal(anime.status, 200);
  const animeHtml = await anime.text();
  assert.match(animeHtml, /让喜欢的画面，住进你的屏幕/);
  assert.match(animeHtml, /云端鲸鱼|暮色天台|樱花铁道/);
});

test("unknown theme id falls back to not-found", async () => {
  const response = await render("/t/unknown-theme");
  assert.notEqual(response.status, 200);
});

test("theme nav links all three landing variants", async () => {
  const html = await (await render("/")).text();

  assert.match(html, /href="\/t\/scenery"/);
  assert.match(html, /href="\/t\/anime"/);
  assert.match(html, /aria-current="page"/);
});
