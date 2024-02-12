const { transform } = require('@babel/core')
const babelConfig = require('../babel.config')

module.exports = function (content) {
  const callback = this.async()
  let options = this.getOptions()
  if (!Object.keys(options).length) {
    options = babelConfig
  }

  transform(content, options, (err, { code }) => {
    if (err) {
      callback(err)
    } else {
      callback(null, code)
    }
  })
}
