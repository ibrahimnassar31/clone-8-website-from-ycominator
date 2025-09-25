import type { NextConfig } from "next";
import path from "node:path";


const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
           { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'slelguoygbfzlpylpxfs.supabase.co' },
      { protocol: 'https', hostname: 'cdn.ficturo.pl' },
      { 
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
       { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
      { protocol: 'https', hostname: 'slelguoygbfzlpylpxfs.supabase.co' },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
      }
    }
  }
};

export default nextConfig;
