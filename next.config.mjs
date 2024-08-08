/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: '192.168.7.98',
            port: '1337',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
