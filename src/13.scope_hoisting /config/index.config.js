const { resolve } = require('path')
const { merge } = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const prodWebpackConfig = require('./prod.config')
const devWebpackConfig = require('./dev.config')

const getCommonConfig = (isProd) => {
  return {
    entry: './src/main.js',
    output: {
      filename: 'js/[hash:6]_bundle.js',
      path: resolve(__dirname, '../build'),
      clean: true,
    },
    module: {
      rules: [{ test: /\.css$/, use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'] }],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: './index.html',
      }),
    ],
  }
}

module.exports = function (env) {
  const isProd = env.production
  const config = isProd ? prodWebpackConfig : devWebpackConfig

  return merge(getCommonConfig(isProd), config)
}
