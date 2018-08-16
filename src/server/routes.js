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

module.exports = routes
