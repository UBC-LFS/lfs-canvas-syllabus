const { Router } = require('express')
const path = require('path')
const readDirs = require('./util/readDirs')
const { flatten } = require('ramda')

const routes = Router()

routes.get('/lfssyllabi/courses/:term', async ({ params: { term } }, res) => {
  const coursesInTerm = await readDirs(term)
  res.send(coursesInTerm)
})

routes.get('/lfssyllabi/syllabi/:term/:course', ({ params: { term, course } }, res) => {
  console.log('hit here')
  res.sendFile(path.join(__dirname, `../../output/syllabi/${term}/${course}/index.html`))
})

routes.get('/availableSyllabi', async (req, res) => {
  const terms = await readDirs()
  const courses = flatten(
    await Promise.all(
      terms.map(term => {
        return readDirs(term)
          .then(courses => ({
            courses: courses.map(course => course.split('.')[0]),
            term
          }))
      })
    )
  )
  res.send(courses)
})

routes.get('*', (req, res) => {
  res.redirect('http://prod-lc01-pub.landfood.ubc.ca/lfscourses/')
})

module.exports = routes
