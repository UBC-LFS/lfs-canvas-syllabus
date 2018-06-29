const path = require('path')
const { promisify } = require('util')
const { readdir } = require('fs')

const readdirP = promisify(readdir)

const pathToHTML = path.join(__dirname, '../../../output/')

const unneededDir = ['.DS_Store', '_assets']
const filterOutDir = dirs => dirs.filter(dir => !unneededDir.includes(dir))

const readDirs = readdirP(pathToHTML)
  .then(dirs => filterOutDir(dirs))

module.exports = readDirs
