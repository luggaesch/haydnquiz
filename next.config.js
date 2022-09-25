/** @type {import('next').NextConfig} */
/*const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["m.media-amazon.com"]
  }
}

module.exports = nextConfig;*/

const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: ["i.imgur.com", "imgur.com"]
  },
  webpack(config, options) {
    const { isServer } = options;
    config.optimization.minimize = false;
    config.module.rules.push({
      test: /\.(ogg|mp3|mp4|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false
          }
        }
      ]
    });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    })
    return config;
  },
  experimental: { esmExternals: true }
})
