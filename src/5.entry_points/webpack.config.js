const { resolve } = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    stu: {
      import: './src/stu.js',
      dependOn: 'shared',
    },
    teacher: {
      import: './src/teacher.js',
      dependOn: 'shared',
    },
    shared: ['dayjs'],
  },
  output: {
    filename: '[name]_bundle.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html',
    }),
  ],
}
