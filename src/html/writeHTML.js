const fs = require('fs')
const { promisify } = require('util')
const path = require('path')
const fsWrite = promisify(fs.writeFile)

const createFilePath = (term, course) => path.join(__dirname, `../../output/syllabi/${term}/${course.replace(/[^a-zA-Z0-9 ]/g, " ")}/index.html`)

const makeDirectory = (term, course) => {
  if (!fs.existsSync(path.join(__dirname, `../../output/syllabi/${term}`))) {
    fs.mkdirSync(path.join(__dirname, `../../output/syllabi/${term}`))
  }
  if (!fs.existsSync(path.join(__dirname, `../../output/syllabi/${term}/${course.replace(/[^a-zA-Z0-9 ]/g, " ")}`))) {
    fs.mkdirSync(path.join(__dirname, `../../output/syllabi/${term}/${course.replace(/[^a-zA-Z0-9 ]/g, " ")}`))
    fs.mkdirSync(path.join(__dirname, `../../output/syllabi/${term}/${course.replace(/[^a-zA-Z0-9 ]/g, " ")}/source`))
  }
}

const writeHTML = ({ html, term, name, course }) => {
  makeDirectory(term, course)
  const filePath = createFilePath(term, course)
  return new Promise((resolve, reject) => {
    fsWrite(filePath, html)
      .then(resolve(filePath))
      .catch(err => reject(err))
  })
}

module.exports = {
  writeHTML,
  makeDirectory
}
