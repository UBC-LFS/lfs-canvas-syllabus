const {
  getAllCourseSyllabiInAccount,
  getUsersInCourse,
  getOptions,
  downloadFile
} = require('node-canvas-api')
const {
  findHref,
  findCanvasLinks,
  extractIDfromURL,
  modifyLinks
} = require('./src/util/html')
const buildHTML = require('./src/html/buildHTML')
const writeHTML = require('./src/html/writeHTML')
const { flatten } = require('ramda')

const noSyllabus = x => x.syllabus === null || x.syllabus === ''

const getInstructors = courses => Promise.all(
  courses.map(({ courseId, courseCode }) =>
    getUsersInCourse(courseId, getOptions.users.enrollmentType.teacher)
      .then(instructors =>
        instructors.map(instructor =>
          Object.assign({}, instructor, {
            courseId,
            courseCode
          })
        )
      )
  )
)

const writeSyllabusToDisk = coursesWithSyllabi => {
  coursesWithSyllabi.forEach(({ syllabus, courseCode, term, name }) => {
    const syllabusHTML = buildHTML(syllabus)
    writeHTML({
      html: syllabusHTML,
      course: courseCode,
      name,
      term: term.name
    })
  })
}

const downloadCanvasLinks = coursesWithSyllabi => {
  const downloadPromises = []
  coursesWithSyllabi.forEach(({ syllabus, courseCode, term, name }) => {
    const links = findCanvasLinks(findHref(syllabus))
    if (links.length > 0) {
      downloadPromises.push(links
        .filter(link => link.includes('files'))
        .map(link => ({ link, id: extractIDfromURL(link) }))
        .filter(({ id }) => typeof id === 'number')
        .map(({ link, id }) => downloadFile(id, `./output/${term.name}/${courseCode}/source/`)
          .then(filename => {
            syllabus = modifyLinks(syllabus, link, filename)
            return filename
          })
          .catch(e => console.log(e))
        ))
    }
  })
  return Promise.all(flatten(downloadPromises))
}

; (async function () {
  const allSyllabi = await getAllCourseSyllabiInAccount(15)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => noSyllabus(x))

  // const instructorsWithNoSyllabus = flatten(await getInstructors(courseIdsWithNoSyllabi))

  const coursesWithSyllabi = allSyllabi
    .filter(x => !noSyllabus(x))

  downloadCanvasLinks(coursesWithSyllabi)
    .then(x => console.log(x))
    .then(writeSyllabusToDisk(coursesWithSyllabi))
})()
