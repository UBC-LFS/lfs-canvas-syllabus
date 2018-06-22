const {
  getAllCourseSyllabiInAccount,
  getUsersInCourse,
  getOptions
} = require('node-canvas-api')
const { flatten } = require('ramda')
const removeNewline = require('./src/util/cleanHTML')
const buildHTML = require('./src/html/buildHTML')
const writeHTML = require('./src/html/writeHTML')

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

;(async function () {
  const allSyllabi = await getAllCourseSyllabiInAccount(15)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => noSyllabus(x))

  // const instructors = flatten(await getInstructors(courseIdsWithNoSyllabi))

  const coursesWithSyllabi = allSyllabi
    .filter(x => !noSyllabus(x))

  writeSyllabusToDisk(coursesWithSyllabi)
})()
