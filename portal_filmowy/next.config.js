/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = {
    // ...
    rewrites: () => [
        {
            source: '/SOME_PATH/:path*',
            destination: 'https://self-signed-url:port/SOME_PATH/:path*',
            basePath: false,
        }
    ]
    //...
}
module.exports = nextConfig
