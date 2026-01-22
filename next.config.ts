import type { NextConfig } from 'next';
import createBundleAnalyzer from '@next/bundle-analyzer';
import path from 'path';
import envConfig from '@/config';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: envConfig.NEXT_PUBLIC_MEDIA_HOST,
        pathname: '/**'
      }
    ]
  },
  outputFileTracingRoot: path.join(__dirname),
  reactCompiler: true
};

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

export default withBundleAnalyzer(nextConfig);
