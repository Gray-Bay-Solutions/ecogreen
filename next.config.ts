import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3'],
  async redirects() {
    return [
      {
        source: '/tours/kayak-tour',
        destination: '/tours/mangrove-tour',
        permanent: true,
      },
      {
        source: '/tours/paddle-board',
        destination: '/tours/mangrove-tour',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
