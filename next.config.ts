import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  basePath: "/index",
  assetPrefix: "/index",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
