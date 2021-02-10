const removeNewline = html => html.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, m => m.replace(/[\n\t]+/g, ''))

const findHref = html => {
  const matches1 = html.match(/href="([^"]*")/g)
  const matches2 = html.match(/src="([^"]*")/g)

  let matches = []
  if (matches1 !== null) matches = matches.concat(matches1)
  if (matches2 !== null) matches = matches.concat(matches2)

  return (matches.length > 0 ? matches.map(match => match.split(`\"`)[1]) : [])
}

const baseURL = 'ubc.beta.instructure.com' // 'canvas.ubc.ca'
const findCanvasHref = str => str.includes(baseURL)
const findCanvasLinks = matches => matches.filter(match => findCanvasHref(match))

const extractIDfromURL = url => {
  if (findCanvasHref(url)) {
    try {
        return Number(url.split('/files/')[1].split('?')[0].split('/')[0])
    }
    catch(err) {
      return ''
    }
  } else {
    return ''
  }
}
const modifyLinks = (syllabus, link, filename) => syllabus.replace(link, `./source/${filename}`)

module.exports = {
  removeNewline,
  findHref,
  findCanvasLinks,
  extractIDfromURL,
  modifyLinks
}
