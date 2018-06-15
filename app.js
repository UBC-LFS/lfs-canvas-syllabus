const {
  getAllCourseSyllabiInTerm
} = require('node-canvas-api')

const options = 

const year = 2017
const term = 'W1'

;(async function () {
  const allSyllabi = await getAllCourseSyllabiInTerm(15, year, term)

  const courseIdsWithNoSyllabi = allSyllabi
    .filter(x => x.syllabus === null)
    .map(({ courseId }) => courseId)

  console.log(courseIdsWithNoSyllabi)
})()
