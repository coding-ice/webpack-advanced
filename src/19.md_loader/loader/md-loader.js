const { Marked } = require('marked')
const { markedHighlight } = require('marked-highlight')
const hljs = require('highlight.js')

module.exports = function (content) {
  const marked = new Marked(
    markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang, info) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
      },
    })
  )

  const html = marked.parse(content)
  const code = '`' + html + '`' // 解析为模块
  const ctt = `const code = ${code}; export default code`
  return ctt
}
