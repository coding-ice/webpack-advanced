const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 1 * 1024,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          filename: 'vendors.bundle.js',
        },
        utils: {
          test: /utils/,
          filename: 'utils.js',
          minSize: 1
        }
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
