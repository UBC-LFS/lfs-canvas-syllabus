const { Router } = require('express')
// require('dotenv').config()

const routes = Router()

routes.get('/', (req, res) => {
  console.log('hit root')
})

module.exports = routes
