const removeNewline = html => html.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, m => m.replace(/[\n\t]+/g, ''))
const findHref = html => html.match(/href="([^"]*")/g)

module.exports = {
  removeNewline,
  findHref
}
