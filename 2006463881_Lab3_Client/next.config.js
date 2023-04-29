/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/post/:path*",
        destination: "http://localhost:8000/api/post/:path*",
      }
    ];
  },
};

module.exports = nextConfig;
