const {
  getAllCourseSyllabiInAccount,
  getUsersInCourse,
  getOptions,
  downloadFile
} = require('node-canvas-api')
const {
  removeNewline,
  findHref,
  findCanvasLinks,
  extractIDfromURL
} = require('./src/util/html')
const buildHTML = require('./src/html/buildHTML')
const writeHTML = require('./src/html/writeHTML')
// const { flatten } = require('ramda')

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
  coursesWithSyllabi.forEach(({ syllabus, courseCode, term, name }) => {
    const links = findCanvasLinks(findHref(syllabus))
    if (links.length > 0) {
      const fileIDs = links.map(link => extractIDfromURL(link))
      fileIDs.forEach(id => downloadFile(id, './src/html/output/'))
    }
  })
}

; (async function () {
  const allSyllabi = await getAllCourseSyllabiInAccount(15)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => noSyllabus(x))

  // const instructorsWithNoSyllabus = flatten(await getInstructors(courseIdsWithNoSyllabi))

  const coursesWithSyllabi = allSyllabi
    .filter(x => !noSyllabus(x))

  // writeSyllabusToDisk(coursesWithSyllabi)
  downloadCanvasLinks(coursesWithSyllabi)
})()
