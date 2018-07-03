const express = require('express')
const path = require('path')
const routes = require('./routes')
const bodyParser = require('body-parser')

const app = express()

// app.use('/syllabi', express.static(path.join(__dirname, '../../output/')))
app.use('/', routes)

app.use('/', express.static(path.join(__dirname, '/static/')))
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    // .render('error', {
    //   message: err.message
    // });
})

module.exports = app
