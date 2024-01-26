const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',
  devtool: false,
  entry: './src/main.js',
  output: {
    filename: 'js/[name]_bundle.js',
    path: resolve(__dirname, 'build'),
    clean: true,
  },
  module: {
    rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[hash:6].css',
    }),
  ],
}
