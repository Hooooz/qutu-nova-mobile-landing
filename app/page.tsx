import type { Metadata } from "next";
import { SaladCampaign } from "./SaladCampaign";
import { themes } from "./themes";

export const metadata: Metadata = {
  title: "沙拉壁纸｜每天亮屏，都有小猫在等你",
  description: "萌宠治愈系壁纸：先看上屏效果，喜欢再下载。",
};

export default function Home() {
  return (
    <main className="mobile-landing-shell" style={{ maxWidth: 430 }}>
      <SaladCampaign theme={themes.cats} />
    </main>
  );
}
