/* global describe, it */

const { findHref } = require('../src/util/html')
const assert = require('assert')

describe('findHref', () => {
  it('takes in HTML string and finds all instances of href', () => {
    let input = `<a href="hello"></a><a href="hello"></a>`
    assert.deepEqual(findHref(input), ['hello', 'hello'])

    input = '<a href="https://www.ubc.ca">ubc.ca</a>'
    assert.deepEqual(findHref(input), ['https://www.ubc.ca'])

    input = '<a href="">ubc.ca</a>'
    assert.deepEqual(findHref(input), [''])
  })
})
