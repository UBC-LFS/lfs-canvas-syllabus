const {
  getAllCourseSyllabiInAccount,
  downloadFile
} = require('node-canvas-api')
const {
  findHref,
  findCanvasLinks,
  extractIDfromURL,
  modifyLinks
} = require('./src/util/html')
const buildHTML = require('./src/html/buildHTML')
const { writeHTML, makeDirectory } = require('./src/html/writeHTML')

const noSyllabus = x => x.syllabus === null || x.syllabus === ''

const writeSyllabusToDisk = coursesWithSyllabi => {
  return Promise.all(coursesWithSyllabi.map(({ syllabus, courseCode, term, name }) => {
    const syllabusHTML = buildHTML(syllabus)
    return writeHTML({
      html: syllabusHTML,
      course: courseCode,
      name,
      term: term.name
    })
  }))
}

const downloadCanvasLinks = coursesWithSyllabi => {
  return coursesWithSyllabi.map(({ syllabus, courseCode, term, name }, i) => {
    const links = findCanvasLinks(findHref(syllabus))
    if (links.length > 0) {
      return Promise.all(links
        .filter(link => link.includes('files'))
        .map(link => ({ link, id: extractIDfromURL(link) }))
        .filter(({ id }) => typeof id === 'number')
        .map(({ link, id }) => {
          makeDirectory(term.name, courseCode)
          return downloadFile(id, `./output/${term.name}/${courseCode}/source/`)
            .then(filename => {
              if (filename) {
                syllabus = modifyLinks(syllabus, link, filename)
              }
            }).catch(err => console.log(err.options.uri, err.message))
        })).then(x => ({ syllabus, courseCode, term, name }))
    } else {
      return { syllabus, courseCode, term, name }
    }
  })
};
(async function () {
  const allSyllabi = await getAllCourseSyllabiInAccount(15)

  const coursesWithSyllabi = allSyllabi
    .filter(x => !noSyllabus(x))

  Promise.all(downloadCanvasLinks(coursesWithSyllabi))
    .then(syllabi => syllabi.filter(syllabus => !!syllabus))
    .then(syllabi => writeSyllabusToDisk(syllabi))
})()
