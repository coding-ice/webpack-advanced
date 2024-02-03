const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[hash:6].css',
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserWebpackPlugin()],
  },
}
