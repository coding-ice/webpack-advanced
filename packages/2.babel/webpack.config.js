const { resolve } = require('path')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: resolve(__dirname, './src/main.js'),
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          configFile: resolve(__dirname, './babel.config.js'),
        },
      },
    ],
  },
}
