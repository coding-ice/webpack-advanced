const { validate } = require('schema-utils')
const schema = require('./schema.json')

module.exports = function (content) {
  const options = this.getOptions()
  validate(schema, options)

  return content
}
