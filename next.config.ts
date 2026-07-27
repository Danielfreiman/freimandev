import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Project covers are served locally from /public/projects as pre-optimised webp.
    deviceSizes: [640, 828, 1080, 1200, 1600, 1920],
  },
  experimental: {
    optimizePackageImports: [],
  },
};

export default nextConfig;
