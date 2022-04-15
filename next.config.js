module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/class',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          }
        ]
      }
    ]
  }
}
