module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    // port: 3000,
    compress: true,
    static: ['public', 'abc'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
}
