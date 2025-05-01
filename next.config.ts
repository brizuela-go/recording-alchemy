import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.builder.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
