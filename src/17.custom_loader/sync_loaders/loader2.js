module.exports = function (content) {
  console.log('loader2:', content)
  
  return content + 'ice'
}
