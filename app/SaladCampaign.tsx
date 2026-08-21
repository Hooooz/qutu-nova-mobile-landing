"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteBasePath, siteRoute, withSiteBasePath } from "./site-paths";
import { themes, themeIds, type Theme } from "./themes";

const APP_DOWNLOAD_HREF = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL?.trim() || "";
const ROTATE_MS = 3400;

export function SaladCampaign({ theme }: { theme: Theme }) {
  const wallpapers = theme.wallpapers;
  const count = wallpapers.length;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const intervalId = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(intervalId);
  }, [count]);

  const active = wallpapers[index];

  return (
    <section className="sl-stage" id="top" aria-labelledby="sl-title">
      <div className="sl-ambient" aria-hidden="true">
        <Image
          key={active.src}
          src={withSiteBasePath(active.src)}
          alt=""
          width={720}
          height={1280}
          sizes="430px"
          priority
          unoptimized={Boolean(siteBasePath)}
        />
      </div>
      <div className="sl-feature">
        <p className="sl-kicker">{theme.kicker}</p>
        <h1 className="sl-title" id="sl-title">
          {theme.headline}
        </h1>
        <p className="sl-sub">{theme.sub}</p>

        <div className="sl-hero" role="group" aria-label={`${theme.nav}壁纸上屏效果轮播`}>
          <div className="sl-glow" style={{ background: active.glow }} aria-hidden="true" />
          {wallpapers.map((wallpaper, i) => {
            const position = (i - index + count) % count; // 0=中 1=右 2=左
            return (
              <div
                key={wallpaper.id}
                className={`sl-tile sl-pos-${position}`}
                aria-hidden={position !== 0}
              >
                <Image
                  src={withSiteBasePath(wallpaper.src)}
                  alt={position === 0 ? `${wallpaper.title}锁屏上屏效果` : ""}
                  width={720}
                  height={1280}
                  sizes="(max-width: 430px) 52vw, 220px"
                  priority
                  unoptimized={Boolean(siteBasePath)}
                />
                {position === 0 ? (
                  <>
                    <div className="sl-lock" aria-hidden="true">
                      <span>9:41</span>
                      <small>8月21日 星期五</small>
                    </div>
                    <span className="sl-name" aria-live="polite">
                      {wallpaper.title}
                    </span>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="sl-card">
        <div className="sl-brand">
          <Image
            className="sl-logo"
            src={withSiteBasePath("/salad-icon.png")}
            alt="沙拉壁纸 logo"
            width={92}
            height={92}
            sizes="46px"
            priority
            unoptimized={Boolean(siteBasePath)}
          />
          <div className="sl-brand-copy">
            <strong>沙拉壁纸</strong>
            <span>高清竖屏 · 全屏预览 · 喜欢再换</span>
          </div>
        </div>

        {APP_DOWNLOAD_HREF ? (
          <a className="sl-cta" href={APP_DOWNLOAD_HREF}>
            立即下载
          </a>
        ) : (
          <button className="sl-cta" type="button">
            立即下载
          </button>
        )}

        <p className="sl-proof">Android · iPhone 均可使用</p>

        <nav className="sl-themes" aria-label="更多主题落地页">
          {themeIds.map((id) => (
            <a
              key={id}
              href={siteRoute(id === "cats" ? "/" : `/t/${id}`)}
              aria-current={id === theme.id ? "page" : undefined}
            >
              {themes[id].nav}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
