import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.kasa.com",
      },
      {
        protocol: "https",
        hostname: "ncghpvggrjvfufhlprlw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
