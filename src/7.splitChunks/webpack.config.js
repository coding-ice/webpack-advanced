const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
