const path = require('path')

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    loadPaths: [path.join(__dirname, 'styles')],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
  },
  images: {
    formats: ['image/webp'],
    deviceSizes: [82, 110, 140, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    domains: ['picsum.photos', 'images.unsplash.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
