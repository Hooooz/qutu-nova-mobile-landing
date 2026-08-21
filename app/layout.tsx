import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const publicSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://qutu-nova-mobile-landing.qutu-nova.workers.dev"
).replace(/\/$/, "");
const socialImage = `${publicSiteUrl}/og.png`;
const title = "沙拉壁纸｜先看上屏效果，喜欢再下载";
const description = "萌宠、风景、动漫高清竖屏壁纸，先看锁屏上屏效果，喜欢再下载。";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: socialImage, width: 1672, height: 941, alt: "沙拉壁纸" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
