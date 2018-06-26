const removeNewline = html => html.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, m => m.replace(/[\n\t]+/g, ''))
const findHref = html => {
  const matches = html.match(/href="([^"]*")/g)
  return matches.map(match => match.split(`\"`)[1])
}
const findCanvasv = str => str.includes('canvas.ubc.ca')
const findCanvasLinks = matches => matches.filter(match => findCanvasv(match))

module.exports = {
  removeNewline,
  findHref,
  findCanvasLinks
}
