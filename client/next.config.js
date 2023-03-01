/** @type {import('next').NextConfig} */

const { withContentlayer } = require('next-contentlayer');

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    scrollRestoration: true,
    appDir: true,
    typedRoutes: true
  },
  reactStrictMode: true,
  images: {
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ["picsum.photos", "images.unsplash.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
};

module.exports = withContentlayer(nextConfig)
// export default withContentlayer(nextConfig)