export const siteBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export function withSiteBasePath(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteBasePath}${normalizedPath}`;
}

export function siteRoute(path: string): string {
  const normalizedPath = path === "/" ? path : path.replace(/\/+$/, "");
  const pagesPath = siteBasePath && normalizedPath !== "/" ? `${normalizedPath}/` : normalizedPath;
  return withSiteBasePath(pagesPath);
}
