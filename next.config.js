/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
