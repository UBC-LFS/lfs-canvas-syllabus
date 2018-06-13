const { recipes } = require('node-canvas-api')

const year = 2017
const term = 'W1'

;(async function () {
  const syllabi = await recipes.getAllCourseSyllabiInTerm(15, year, term)
  console.log(syllabi)
})()
