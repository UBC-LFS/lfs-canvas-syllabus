const { Router } = require('express')
const path = require('path')
const readDirs = require('./util/readDirs')
const { flatten } = require('ramda')

const routes = Router()

routes.get('/lfssyllabi/courses/:term', async ({ params: { term } }, res) => {
  const coursesInTerm = await readDirs(term)
  res.send(coursesInTerm)
})

routes.get('/lfssyllabi/syllabi/:term/:course/source/:file$', ({ params: { term, course, file } }, res) => {
  const staticFile = path.join(__dirname, `../../output/syllabi/${term}/${course}/source/${file}`)
  res.sendFile(staticFile)
})

routes.get('/lfssyllabi/syllabi/:term/:course/:file$', ({ params: { term, course, file } }, res) => {
  const staticFile = path.join(__dirname, `../../output/syllabi/${term}/${course}/${file}`)
  res.sendFile(staticFile)
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

module.exports = routes
