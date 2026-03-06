/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This tells Next.js 16 to allow our custom logic even with Turbopack active
  turbopack: {}, 
  serverExternalPackages: ['pizzip', 'docxtemplater'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig;