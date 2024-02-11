const { resolve } = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolveLoader: {
    modules: ['node_modules', 'loaders'],
  },
  module: {
    rules: [{ test: /.js$/, use: ['ice-loader1.js', 'ice-loader2.js'] }],
  },
}
