/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: repoName ? `/${repoName.replace(/^\//, '')}` : '',
  assetPrefix: repoName ? `/${repoName.replace(/^\//, '')}/` : undefined,
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
