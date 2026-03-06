/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 14 uses this instead of serverExternalPackages
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;