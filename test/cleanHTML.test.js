/* global describe, it */

const removeNewline = require('../src/util/cleanHTML')
const assert = require('assert')

describe('removeNewline', () => {
  it('takes in HTML string and removes `\n`', () => {
    let input = '<p>\n</p>'
    assert.deepEqual(removeNewline(input), '<p></p>')

    input = '<p>\nhello</p>'
    assert.deepEqual(removeNewline(input), '<p>hello</p>')

    input = '<p></p>'
    assert.deepEqual(removeNewline(input), '<p></p>')

    input = '<p>\n\n</p>\n'
    assert.deepEqual(removeNewline(input), '<p></p>')
  })
})