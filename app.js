const {
  getAllCourseSyllabiInTerm,
  getUsersInCourse,
  getOptions
} = require('node-canvas-api')
const { flatten } = require('ramda')
const removeNewline = require('./src/util/cleanHTML')
const buildHTML = require('./src/html/buildHTML')
const writeHTML = require('./src/html/writeHTML')

const year = 2017
const term = 'W2'

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
  coursesWithSyllabi.forEach(({ syllabus, courseCode }) => {
    const syllabusHTML = buildHTML(syllabus)
    writeHTML({
      html: syllabusHTML,
      year: year + term,
      course: courseCode
    })
  })
}

;(async function () {
  const allSyllabi = await getAllCourseSyllabiInTerm(15, year, term)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => noSyllabus(x))

  // const instructors = flatten(await getInstructors(courseIdsWithNoSyllabi))

  const coursesWithSyllabi = allSyllabi
    .filter(x => !noSyllabus(x))

  writeSyllabusToDisk(coursesWithSyllabi)
})()
