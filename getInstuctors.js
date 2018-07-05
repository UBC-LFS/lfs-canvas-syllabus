const {
  getAllCourseSyllabiInAccount,
  getOptions,
  getUsersInCourse
} = require('node-canvas-api')
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

;(async function () {
  const allSyllabi = await getAllCourseSyllabiInAccount(15)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => noSyllabus(x))

  const instructorsWithNoSyllabus = flatten(await getInstructors(courseIdsWithNoSyllabi))
  console.log(instructorsWithNoSyllabus)
})()
