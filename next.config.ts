import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "i3.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
