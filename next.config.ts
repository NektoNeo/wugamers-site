import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: '/Users/serjnavigatian/Projects/wugamers_new/wug-site',
  images: {
    unoptimized: true, // For static export compatibility
  },
  compress: true,
  poweredByHeader: false,
  // Performance optimizations
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
