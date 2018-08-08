const { Router } = require('express')
const path = require('path')
// require('dotenv').config()
const readDirs = require('./util/readDirs')

const routes = Router()

routes.get('/terms', async (req, res) => {
  const dirs = await readDirs()
  res.send(dirs)
})

routes.get('/courses/:term', async ({ params: { term } }, res) => {
  const dirs = await readDirs(term)
  res.send(dirs)
})

routes.get('/syllabi/:term/:course', ({ params: { term, course } }, res) => {
  res.sendFile(path.join(__dirname, `../../output/syllabi/${term}/${course}/index.html`))
})

module.exports = routes
