/* global describe, it */

const { findHref } = require('../src/util/html')
const assert = require('assert')

describe('findHref', () => {
  it('takes in HTML string and finds all instances of href', () => {
    let input = `<a href='hello'></a><a href="hello"></a>`
    assert.deepEqual(findHref(input), '<p></p>')
  })
})
