const removeNewline = html => html.replace(/(?:^|<\/pre>)[^]*?(?:<pre>|$)/g, m => m.replace(/[\n\t]+/g, ''))

module.exports = removeNewline
