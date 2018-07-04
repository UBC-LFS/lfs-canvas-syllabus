const path = require('path')
const { promisify } = require('util')
const { readdir } = require('fs')

const readdirP = promisify(readdir)

const pathToHTML = path.join(__dirname, '../../../output/')

const unneededDir = ['.DS_Store', '_assets', 'Default Term']
const filterOutDir = dirs =>
  dirs.filter(dir => !unneededDir.includes(dir))

const readDirs = (subdir = '') =>
  readdirP(path.join(pathToHTML, subdir))
    .then(dirs => filterOutDir(dirs))

module.exports = readDirs
