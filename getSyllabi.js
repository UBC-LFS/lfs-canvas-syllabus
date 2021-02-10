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

const noSyllabus = x => x.syllabus === null || x.syllabus === '';

(async function () {
  let { year, terms, account } = await prompts(prompt)
  if (!account) {
    account = 15
  }

  if (terms.length === 1 && terms[0] === 'all') {
    terms = ['S1', 'SA', 'S2', 'S', 'S1-2', 'W1', 'WA', 'W2', 'WC', 'W', 'W1-2']
  }

  const selectedTerms = terms.map(term => year + term)
  console.log('\nSelected:', year, terms, account, selectedTerms);
  console.log('\nPlease wait... Trying to get the information via Canvas API. This might take several minutes.');

  const allCourses = await getAllCourseSyllabiInAccount(account)
  console.log('\nGot all the course information successfully...');

  const filteredCourses = allCourses.filter(obj => selectedTerms.includes(obj.term.name) && !noSyllabus(obj));
  console.log('Number of filtered courses:', filteredCourses.length + ' out of ' + allCourses.length);

  if (filteredCourses.length > 0) console.log('\nStart downloading...\n')

  // Sort by name
  filteredCourses.sort((a, b) => (a.name > b.name) ? 1 : -1)

  for (let obj of filteredCourses) {

    // Make a directory
    makeDirectory(obj.term.name, obj.courseCode)

    const links = findCanvasLinks( findHref(obj.syllabus) )
    const filterdLinks = links.filter(link => link.includes('files') && link.includes('verifier'))
    const uniqueLinks = filterdLinks.filter((link, i) => filterdLinks.indexOf(link) === i)

    if (uniqueLinks.length > 0) {
      for (let link of uniqueLinks) {
        const id = extractIDfromURL(link)

        if (typeof id === 'number' && id > -1) {
          downloadFile(id, `./output/syllabi/${obj.term.name}/${obj.courseCode.replace(/[^a-zA-Z0-9 ]/g, " ")}/source/`)
            .then(filename => {
              if (filename) {
                modifiedSyllabus = modifyLinks(obj.syllabus, link, filename);
                writeHTML({ html: buildHTML(modifiedSyllabus), course: obj.courseCode, name: obj.name, term: obj.term.name })
                console.log(obj.courseCode + ' - File: ' + filename + ' downloaded.')
              }
            }).catch(err => console.log(obj.courseCode + ' Error:', err.message))
        } else {
          console.log(obj.courseCode + ' Error: ID is invalid.', id)
        }
      }
    } else {
      writeHTML({ html: buildHTML(obj.syllabus), course: obj.courseCode, name: obj.name, term: obj.term.name })
      console.log(obj.courseCode + ' - No available links found.')
    }
  }

})();
