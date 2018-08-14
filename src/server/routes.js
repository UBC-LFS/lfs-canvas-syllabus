const { Router } = require('express')
const path = require('path')
const readDirs = require('./util/readDirs')
const { flatten } = require('ramda')

const routes = Router()

routes.get('/courses/:term', async ({ params: { term } }, res) => {
  const coursesInTerm = await readDirs(term)
  res.send(coursesInTerm)
})

routes.get('/syllabi/:term/:course', ({ params: { term, course } }, res) => {
  res.sendFile(path.join(__dirname, `../../output/syllabi/${term}/${course}/index.html`))
})

routes.get('/courses', async (req, res) => {
  const terms = await readDirs()
  const courses = flatten(
    await Promise.all(
      terms.map(term => {
        return readDirs(term)
          .then(courses => ({
            courses,
            term
          }))
      })
    )
  )
  res.send(courses)
})

module.exports = routes
