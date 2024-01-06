const { resolve } = require('path')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: resolve(__dirname, './src/main.js'),
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
}
