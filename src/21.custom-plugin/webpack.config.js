const { resolve } = require('path')
const { CustomPlugins } = require('./plugins/CustomPlugins')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  plugins: [new CustomPlugins()],
}
