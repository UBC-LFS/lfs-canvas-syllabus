const a = require('node-canvas-api')

const year = 2017
const term = 'W1'

;(async function () {
  a.getSyllabusOfCourse(270).then(x => console.log(x))
})()
