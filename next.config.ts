import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jnjuuyhucqmpdthjhgxt.supabase.co", // Ganti dengan project ID Anda jika berbeda
        port: "",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
};

export default nextConfig;