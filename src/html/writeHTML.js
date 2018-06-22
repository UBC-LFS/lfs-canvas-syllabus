const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const fsWrite = promisify(fs.writeFile)

const createFilePath = (year, course) => path.join(__dirname, `/output/${year}-${course}.html`)

const writeHTML = ({ html, year, course }) => {
  const filePath = createFilePath(year, course)
  return fsWrite(filePath, html)
}

module.exports = writeHTML
