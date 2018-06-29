const { Router } = require('express')
// require('dotenv').config()
const readDirs = require('./util/readDirs')

const routes = Router()

routes.get('/', (req, res) => {
  readDirs.then(x => console.log(x))
})

module.exports = routes
