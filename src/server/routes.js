const { Router } = require('express')
const path = require('path')
// require('dotenv').config()
const readDirs = require('./util/readDirs')

const routes = Router()

routes.get('/terms', (req, res) => {
  console.log('hit here')
  readDirs.then(dirs => res.send(dirs))
})

module.exports = routes
