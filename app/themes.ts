export type Wallpaper = {
  id: string;
  title: string;
  src: string;
  glow: string;
};

export type Theme = {
  id: string;
  nav: string;
  kicker: string;
  headline: string;
  sub: string;
  wallpapers: readonly Wallpaper[];
};

export const themes = {
  cats: {
    id: "cats",
    nav: "萌宠",
    kicker: "萌宠治愈系",
    headline: "每天亮屏，都有小猫在等你",
    sub: "先看上屏效果，喜欢再下载",
    wallpapers: [
      { id: "cat-blanket-v2", title: "被窝奶橘", src: "/wallpapers/cat-blanket-v2.png", glow: "#f3a56c" },
      { id: "white-cat", title: "花间白猫", src: "/wallpapers/white-cat.png", glow: "#f6a8c1" },
      { id: "cat-window-v2", title: "窗边布偶", src: "/wallpapers/cat-window-v2.png", glow: "#8f9fd8" },
    ],
  },
  scenery: {
    id: "scenery",
    nav: "风景",
    kicker: "高清风景大片",
    headline: "把山河湖海，装进你的手机",
    sub: "每一张都能直接当锁屏",
    wallpapers: [
      { id: "scenery-snow-lake", title: "雪山镜湖", src: "/wallpapers/scenery-snow-lake.jpg", glow: "#b89ae8" },
      { id: "scenery-orange-sea", title: "橘子海", src: "/wallpapers/scenery-orange-sea.jpg", glow: "#ffb26e" },
      { id: "scenery-forest-mist", title: "雾光森林", src: "/wallpapers/scenery-forest-mist.jpg", glow: "#7cc4a0" },
    ],
  },
  anime: {
    id: "anime",
    nav: "动漫",
    kicker: "动漫插画精选",
    headline: "让喜欢的画面，住进你的屏幕",
    sub: "先看上屏效果，喜欢再下载",
    wallpapers: [
      { id: "anime-whale-sky", title: "云端鲸鱼", src: "/wallpapers/anime-whale-sky.jpg", glow: "#f7b28c" },
      { id: "anime-night-city", title: "暮色天台", src: "/wallpapers/anime-night-city.jpg", glow: "#7d8fe8" },
      { id: "anime-sakura-train", title: "樱花铁道", src: "/wallpapers/anime-sakura-train.jpg", glow: "#f2b8d0" },
    ],
  },
} as const satisfies Record<string, Theme>;

export type ThemeId = keyof typeof themes;

export const themeIds = Object.keys(themes) as ThemeId[];

export const defaultThemeId: ThemeId = "cats";

export function getTheme(id: string): Theme | null {
  return (themes as Record<string, Theme>)[id] ?? null;
}
