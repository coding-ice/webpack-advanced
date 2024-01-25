const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/main.js',
  output: {
    // filename: '[name]_bundle.js',
    // publicPath: 'https://cdn.com',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  optimization: {
    chunkIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      minSize: 1 * 100,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          // filename: '[id]_vendors.bundle.js',
        },
        utils: {
          test: /utils/,
          filename: '[id]_utils.js',
          minSize: 1,
        },
      },
    },
  },
  externals: {
    dayjs: 'dayjs',
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
