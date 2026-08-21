import { access, copyFile, cp, mkdir } from "node:fs/promises";

const publishRoot = new URL("../dist/client/", import.meta.url);
const repositoryName = (process.env.GITHUB_REPOSITORY || "Hooooz/qutu-nova-mobile-landing")
  .split("/")
  .at(-1);

if (!repositoryName) {
  throw new Error("Cannot determine the GitHub repository name");
}

const generatedAssets = new URL(`${repositoryName}/_next/`, publishRoot);
await access(generatedAssets);
await cp(generatedAssets, new URL("_next/", publishRoot), { recursive: true, force: true });

for (const route of ["t/scenery", "t/anime"]) {
  const routeDirectory = new URL(`${route}/`, publishRoot);
  await mkdir(routeDirectory, { recursive: true });
  await copyFile(new URL(`${route}.html`, publishRoot), new URL("index.html", routeDirectory));
}
