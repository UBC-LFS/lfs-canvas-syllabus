/* global describe, it */

const { modifyLinks } = require('../src/util/html')
const assert = require('assert')

describe('findHref', () => {
  it('takes in HTML string and finds all instances of href', () => {
    let syllabus = `<a href="hello"></a><a href="hello"></a>`
    assert.deepEqual(modifyLinks(syllabus, 'hello', 'myPDF.pdf'), `<a href="./source/myPDF.pdf"></a><a href="hello"></a>`)
  })
})
