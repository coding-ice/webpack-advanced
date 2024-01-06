const path = require('path')
module.exports = {
  mode: 'production',
  devtool: "source-map",
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
}
