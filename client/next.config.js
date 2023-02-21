/** @type {import('next').NextConfig} */

import withMDX from '@next/mdx';
import remarkFrontmatter from 'remark-frontmatter';

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    scrollRestoration: true,
    appDir: true,
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
};

const mdxConfig = withMDX({
  extension: /\.(mdx)$/,
  options: {  
    providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
  },
})(nextConfig);

export default mdxConfig;