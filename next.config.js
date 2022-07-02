/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.ASSET_PREFIX,
  basePath: process.env.BASE_PATH,
};

module.exports = nextConfig;
