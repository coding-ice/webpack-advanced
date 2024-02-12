const { resolve } = require('path')
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
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env'],
          // },
        },
      },
    ],
  },
}
