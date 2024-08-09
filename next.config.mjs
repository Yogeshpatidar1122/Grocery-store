/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'grocery-strore-backend.onrender.com',
          pathname: '/**',
        },
      ],
  },
};

export default nextConfig;
