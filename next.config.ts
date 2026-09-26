
import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: 'export',
        basePath: '/Assigment06',
        assetPrefix: '/Assigment06/',
        trailingSlash: true,
      }
    : {}),

  images: {
    unoptimized: isGitHubPages,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
      },
    ],
  },
};

export default nextConfig;

