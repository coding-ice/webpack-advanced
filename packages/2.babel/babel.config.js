const path = require('path')
module.exports = {
  // plugins: ['@babel/plugin-transform-block-scoping', '@babel/plugin-transform-arrow-functions'],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: 'cjs',
      },
    ],
  ],
}
