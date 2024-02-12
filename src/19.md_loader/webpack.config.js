const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  resolveLoader: {
    modules: ['node_modules', 'loader'],
  },
  module: {
    rules: [
      { test: /.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /.md$/,
        use: 'md-loader',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
}
