const {
  getAllCourseSyllabiInAccount,
  getOptions,
  getUsersInCourse
} = require('node-canvas-api')
const { flatten } = require('ramda')
const path = require('path')
const { writeHeader, append } = require('write-to-csv')
const prompts = require('prompts')
const prompt = require('./src/server/constants/promptOptions')

const noSyllabus = x => x.syllabus === null || x.syllabus === ''

const getInstructors = courses => Promise.all(
  courses.map(({ courseId, courseCode, term }) =>
    getUsersInCourse(courseId, getOptions.users.enrollmentType.teacher)
      .then(instructors =>
        instructors.map(instructor =>
          Object.assign({}, instructor, {
            courseId,
            courseCode,
            term: term.name
          })
        )
      )
  )
);
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

  const courseIdsWithNoSyllabi = allCourses
    .filter(({ term }) => selectedTerms.includes(term.name))
    .filter(x => noSyllabus(x))

  const instructorsWithNoSyllabus = flatten(await getInstructors(courseIdsWithNoSyllabi))
  const nameAndCourse = instructorsWithNoSyllabus.map(({ name, courseCode, term }) => ([ name, courseCode, term ]))

  await writeHeader(path.join(__dirname, 'output/instructorsWithNoSyllabus/instructorsWithNoSyllabus.csv'), ['name', 'courseCode', 'term'])
  for (const instructor of nameAndCourse) {
    await append(path.join(__dirname, 'output/instructorsWithNoSyllabus/instructorsWithNoSyllabus.csv'), instructor)
  }
})()
