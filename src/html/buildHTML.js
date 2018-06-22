const fs = require('fs')
const { promisify } = require('util')

const fswrite = promisify(fs.writeFile)

const buildHTML = syllabus =>
`

${syllabus}

`

module.exports = buildHTML
