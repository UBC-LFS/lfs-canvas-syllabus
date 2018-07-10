const { Router } = require('express')
const path = require('path')
// require('dotenv').config()
const readDirs = require('./util/readDirs')

const routes = Router()

routes.get('/terms', async (req, res) => {
  const dirs = await readDirs()
  res.send(dirs)
})

routes.get('/courses/:term', async (req, res) => {
  const { term } = req.params
  const dirs = await readDirs(term)
  res.send(dirs)
})

routes.get('/syllabi/:term/:course', (req, res) => {
  const { term, course } = req.params
  res.sendFile(path.join(__dirname, `../../output/syllabi/${term}/${course}/index.html`))
})

module.exports = routes
