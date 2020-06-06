require('dotenv').config()
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})
const path = require('path')
const webpack = require('webpack')

const env = {
  API_URL: process.env.API_URL,
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  LOGROCKET: process.env.LOGROCKET,
  MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
  BASE_PATH: process.env.BASE_PATH
}
console.log(env)

module.exports = withMDX(
  withBundleAnalyzer({
    assetPrefix: process.env.BASE_PATH || '',
    target: 'server',
    pageExtensions: ['js', 'jsx', 'mdx'],
    env,
    publicRuntimeConfig: {
      basePath: process.env.BASE_PATH || ''
    },
    webpack: config => {
      // Allow `import 'lib/message'`
      config.resolve.alias['lib'] = path.join(__dirname, 'lib')

      // ESLint on build
      config.module.rules.push({
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      })

      // Ignore moment locales
      config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))

      return config
    }
  })
)
