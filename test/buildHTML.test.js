/* global describe, it */

const buildHTML = require('../src/html/buildHTML')
const assert = require('assert')

describe('buildHTML', () => {
  it('takes in a string and returns a string in HTML format', () => {
    let input = '<p>hello</p>'
    let output = `
<!DOCTYPE html>
<html>
<head>
<title>Syllabus</title>
<link rel="stylesheet" type="text/css" href="../../_assets/global.css">
</head>
<body>
<p>hello</p>
</body>
</html>
`
    assert.deepEqual(buildHTML(input), output)
  })
})
