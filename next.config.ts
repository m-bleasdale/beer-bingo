import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xtucncquysjcsrkylewg.supabase.co",
        pathname: "/**", // allow any path from your Supabase project
      },
    ],
  },
};

export default nextConfig;
