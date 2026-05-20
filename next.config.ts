import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  // Use static export only for GitHub Pages builds.
  // Vercel should run standard Next.js output.
  ...(isGithubActions ? { output: "export" as const, trailingSlash: true } : {}),
  images: {
    unoptimized: isGithubActions,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  basePath,
  assetPrefix: basePath || undefined
};

export default nextConfig;
