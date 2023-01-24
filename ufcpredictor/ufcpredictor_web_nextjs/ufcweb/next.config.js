/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

customConfig = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://www.ufc.com//:path*',
        },
      ]
    },
};

module.exports = customConfig
