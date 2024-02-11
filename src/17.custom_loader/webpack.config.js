const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolveLoader: {
    modules: ['node_modules', 'options_loaders'], //loaders sync_loaders async_loaders
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'validate-loader',
          options: {
            name: 'ice',
            age: "20",
          },
        },
      },
    ],
  },
}
