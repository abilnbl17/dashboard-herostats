import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [`${process.env.DOTA_IMAGE_BASE_URL}`],
  },
};

export default nextConfig;
