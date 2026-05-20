const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubActions
    ? {
        output: "export",
        trailingSlash: true
      }
    : {}),
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
