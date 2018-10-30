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
const prompts = require('prompts')
const prompt = require('./src/server/constants/promptOptions')

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
  return coursesWithSyllabi.map(({ syllabus, courseCode, term, name }) => {
    const links = findCanvasLinks(findHref(syllabus))
    if (links.length > 0) {
      return Promise.all(links
        .filter(link => link.includes('files'))
        .map(link => ({ link, id: extractIDfromURL(link) }))
        .filter(({ id }) => typeof id === 'number')
        .map(({ link, id }) => {
          makeDirectory(term.name, courseCode)
          return downloadFile(id, `./output/syllabi/${term.name}/${courseCode.replace(/[^a-zA-Z0-9 ]/g, " ")}/source/`)
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
  let { year, terms, account } = await prompts(prompt)
  if (!account) {
    account = 15
  }

  if (terms.length === 1 && terms[0] === 'all') {
    terms = ['S1', 'SA', 'S2', 'S', 'S1-2', 'W1', 'WA', 'W2', 'WC', 'W', 'W1-2']
  }

  const selectedTerms = terms.map(term => year + term)

  const allCourses = await getAllCourseSyllabiInAccount(account)

  const coursesWithSyllabi = allCourses
    .filter(({ term }) => selectedTerms.includes(term.name))
    .filter(x => !noSyllabus(x))

  Promise.all(downloadCanvasLinks(coursesWithSyllabi))
    .then(syllabi => syllabi.filter(syllabus => !!syllabus))
    .then(syllabi => writeSyllabusToDisk(syllabi))
})()
