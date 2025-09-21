import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: [`cdn.dota2.com`],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dota2.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
