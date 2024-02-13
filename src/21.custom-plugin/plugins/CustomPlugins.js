class CustomPlugins {
  constructor() {}

  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('customPlugin', (compilation) => {
      const options = compilation.outputOptions
      const path = options.path
      console.log(path)
    })
  }
}

module.exports = CustomPlugins
module.exports.CustomPlugins = CustomPlugins
