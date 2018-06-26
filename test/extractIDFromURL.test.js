/* global describe, it */

const { extractIDfromURL } = require('../src/util/html')
const assert = require('assert')

describe('extractIDfromURL', () => {
  it('takes in a url and returns ID', () => {
    let input = 'https://ubc.beta.instructure.com/courses/169/files/116607/download?verifier=abcedgs214tgsgdfbcv'
    assert.deepEqual(extractIDfromURL(input), 116607)
  })
})
