const path = require('path')
const { promisify } = require('util')
const { readdir } = require('fs')

const readdirP = promisify(readdir)

const pathToHTML = path.join(__dirname, '../../../output/')

const readDirs = readdirP(pathToHTML)
  .then(dirs => dirs.filter(dir => !['.DS_Store', '_assets'].includes(dir)))

module.exports = readDirs
