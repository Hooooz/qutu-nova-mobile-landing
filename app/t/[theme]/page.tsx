import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SaladCampaign } from "../../SaladCampaign";
import { getTheme, themeIds } from "../../themes";

type ThemePageProps = {
  params: Promise<{ theme: string }>;
};

export function generateStaticParams() {
  return themeIds.filter((id) => id !== "cats").map((id) => ({ theme: id }));
}

export async function generateMetadata({ params }: ThemePageProps): Promise<Metadata> {
  const { theme: themeId } = await params;
  const theme = getTheme(themeId);
  if (!theme) return {};
  return {
    title: `沙拉壁纸｜${theme.headline}`,
    description: `${theme.kicker}：${theme.sub}。`,
  };
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { theme: themeId } = await params;
  const theme = getTheme(themeId);
  if (!theme) notFound();

  return (
    <main className="mobile-landing-shell" style={{ maxWidth: 430 }}>
      <SaladCampaign theme={theme} />
    </main>
  );
}
