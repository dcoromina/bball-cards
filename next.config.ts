import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewarePrefetch: "strict",
  },
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
