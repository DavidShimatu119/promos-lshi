/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Autorise toutes les images externes (Unsplash, Freepik, etc.)
      },
    ],
  },
};

export default nextConfig;