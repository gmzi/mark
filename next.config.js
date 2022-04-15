const API_URL = process.env.API_URL;

console.log(API_URL)

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}:path*`,
      },
    ]
  },
}
