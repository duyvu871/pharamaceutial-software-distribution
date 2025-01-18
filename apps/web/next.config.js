const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
module.exports = ({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4001",
      }
    ],
  },
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/login",
      }
    ]
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: 'http://localhost:4001/api/v1/:path*'
  //     },
  //     {
  //       source: '/storages/:path*',
  //       destination: 'http://localhost:4001/storages/:path*'
  //     }
  //   ];
  // },
});
