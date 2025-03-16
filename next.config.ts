import type { NextConfig } from "next";

module.exports = {
  experimental: {
    middlewarePrefetch: "strict",
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
