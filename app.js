const {
  getAllCourseSyllabiInTerm,
  getUsersInCourse,
  getOptions
} = require('node-canvas-api')
const { flatten } = require('ramda')

const year = 2017
const term = 'W2'

const noSyllabus = x => x.syllabus === null || x.syllabus === ''
const getCourseId = x => x.courseId

const getInstructors = courses => Promise.all(
  courses.map(course => getUsersInCourse(course.courseId, getOptions.users.enrollmentType.teacher))
)

;(async function () {
  const allSyllabi = await getAllCourseSyllabiInTerm(15, year, term)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => noSyllabus(x))

  const instructors = flatten(await getInstructors(courseIdsWithNoSyllabi))

  const coursesWithSyllabi = allSyllabi
    .filter(x => !noSyllabus(x))

  console.log(instructors)
})()
