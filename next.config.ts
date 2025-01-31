import type { NextConfig } from "next";

module.exports = {
  experimental: {
    middlewarePrefetch: true,
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
