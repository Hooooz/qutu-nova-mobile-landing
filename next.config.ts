import type { NextConfig } from "next";

const isGitHubPages = process.env.QUTU_GITHUB_PAGES === "true";
const [repositoryOwner, repositoryName] = (
  process.env.GITHUB_REPOSITORY ?? "Hooooz/qutu-nova-mobile-landing"
).split("/");
const basePath = isGitHubPages ? `/${repositoryName}` : "";
const publicSiteUrl = isGitHubPages
  ? `https://${repositoryOwner.toLowerCase()}.github.io${basePath}`
  : process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://qutu-nova-mobile-landing.qutu-nova.workers.dev";
const appDownloadUrl =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL?.trim() ||
  "https://github.com/Hooooz/qutu-nova-mobile-landing/releases/download/android-v0.1.0/app-release.apk";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export" as const,
        assetPrefix: basePath,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: publicSiteUrl,
    NEXT_PUBLIC_APP_DOWNLOAD_URL: appDownloadUrl,
  },
};

export default nextConfig;
