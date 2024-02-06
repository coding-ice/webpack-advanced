const { resolve } = require('path')
const { merge } = require('webpack-merge')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')

const prodWebpackConfig = require('./prod.config')
const devWebpackConfig = require('./dev.config')

const smp = new SpeedMeasurePlugin()

const getCommonConfig = (isProd) => {
  return smp.wrap({
    entry: './src/main.js',
    output: {
      filename: 'js/[hash:6]_bundle.js',
      path: resolve(__dirname, '../build'),
      clean: true,
    },
    module: {
      rules: [
        { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'] },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: './index.html',
      }),
      new CompressionPlugin({
        test: /\.(css|js)$/,
        minRatio: 0.8,
        algorithm: 'gzip',
      }),
    ],
  })
}

module.exports = function (env) {
  const isProd = env.production
  const config = isProd ? prodWebpackConfig : devWebpackConfig

  return merge(getCommonConfig(isProd), config)
}
