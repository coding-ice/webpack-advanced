module.exports = function (content) {
  console.log('loader2:', content)
  const callback = this.async()

  setTimeout(() => {
    callback(null, content + 'ice')
  }, 3000)
}
