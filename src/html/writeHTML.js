const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const fsWrite = promisify(fs.writeFile)

const createFilePath = (term, course) => path.join(__dirname, `/output/${term}-${course}.html`)

const writeHTML = ({ html, term, name, course }) => {
  const filePath = createFilePath(term, course)
  try {
    fsWrite(filePath, html)
  } catch (e) {
    console.log(e)
  }
}

module.exports = writeHTML
