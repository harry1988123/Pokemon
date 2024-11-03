/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/pokeapi/**',
      },
    ],
    unoptimized: true // This can help with Netlify deployment
  },
  output: 'standalone', // Optimizes for deployment
  reactStrictMode: true,
  swcMinify: true,
  // Handle build-time optimizations
  webpack: (config, { isServer }) => {
    // Add any necessary webpack customizations here
    return config;
  }
};

module.exports = nextConfig;