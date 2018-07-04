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
const { writeHTML, makeDirectory } = require('./src/html/writeHTML')
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
    }
  })
};
(async function () {
  // const allSyllabi = await getAllCourseSyllabiInAccount(15)

  // const courseIdsWithNoSyllabi = allSyllabi
  //   .filter(x => noSyllabus(x))

  // const instructorsWithNoSyllabus = flatten(await getInstructors(courseIdsWithNoSyllabi))

  // const coursesWithSyllabi = allSyllabi
  //   .filter(x => !noSyllabus(x))
  const coursesWithSyllabi = [
    {
      courseCode: "APBI 314 941", courseId: 6362, syllabus: `"<p>Course Outline: <a class="instructure_file_link instructure_scribd_file" title="APBI314 Course Outline ST1 2018.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1569951/download?verifier=hpsn0hE4DYyCslAjFtLpL70cYhE3OUfxNHnQ9WWF&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1569951" data-api-returntype="File">APBI314 Course Outline ST1 2018.docx</a></p>
    <p>Course schedule (subject to change): <a class="instructure_file_link instructure_scribd_file" title="2018 Summer Term Schedule-2.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1722293/download?verifier=2194hdmKMgh4aHk7SOnc2DUyfmQ23mUb9Edm6hRs&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1722293" data-api-returntype="File">2018 Summer Term Schedule-2.docx</a></p>
    <p>Current events presentation schedule: <a class="instructure_file_link instructure_scribd_file" title="314 Current Events Presentations 2018-4.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1845873/download?verifier=fooAK6dDVef9LmNe02NLzFN8puWsxyOpv1RHAm9i&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1845873" data-api-returntype="File">314 Current Events Presentations 2018-4.docx</a><a class="instructure_file_link instructure_scribd_file" title="314 Current Events Presentations 2018-2.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1722331/download?verifier=zhcI9gqySZVGEpxMrVP07vJuH4hSHjK5cTPhIvXm&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1722331" data-api-returntype="File"></a></p>"`, term: { name: '2018S1' }
    }
  ]
  Promise.all(downloadCanvasLinks(coursesWithSyllabi))
    .then(syllabi => syllabi.filter(syllabus => !!syllabus))
    .then(syllabi => writeSyllabusToDisk(syllabi))
})()
