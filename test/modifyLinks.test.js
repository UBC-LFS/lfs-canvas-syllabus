/* global describe, it */

const { modifyLinks } = require('../src/util/html')
const assert = require('assert')

describe('findHref', () => {
  it('takes in HTML string and finds all instances of href', () => {
    let syllabus = `<a href="hello"></a><a href="hello"></a>`
    assert.deepEqual(modifyLinks(syllabus, 'hello', 'myPDF.pdf'), `<a href="./source/myPDF.pdf"></a><a href="hello"></a>`)
  })

  it('works as expected when called twice', () => {
    let syllabus = `<a href="hello"></a><a href="hello"></a>`
    syllabus = modifyLinks(syllabus, 'hello', 'myPDF.pdf')
    syllabus = modifyLinks(syllabus, 'hello', 'myPDF.pdf')
    assert.deepEqual(syllabus, `<a href="./source/myPDF.pdf"></a><a href="./source/myPDF.pdf"></a>`)
  })

  it('works as expected when called multiple times', () => {
    let syllabus = `"<p>Course Outline: <a class="instructure_file_link instructure_scribd_file" title="APBI314 Course Outline ST1 2018.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1569951/download?verifier=hpsn0hE4DYyCslAjFtLpL70cYhE3OUfxNHnQ9WWF&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1569951" data-api-returntype="File">APBI314 Course Outline ST1 2018.docx</a></p><p>Course schedule (subject to change): <a class="instructure_file_link instructure_scribd_file" title="2018 Summer Term Schedule-2.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1722293/download?verifier=2194hdmKMgh4aHk7SOnc2DUyfmQ23mUb9Edm6hRs&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1722293" data-api-returntype="File">2018 Summer Term Schedule-2.docx</a></p><p>Current events presentation schedule: <a class="instructure_file_link instructure_scribd_file" title="314 Current Events Presentations 2018-4.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1845873/download?verifier=fooAK6dDVef9LmNe02NLzFN8puWsxyOpv1RHAm9i&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1845873" data-api-returntype="File">314 Current Events Presentations 2018-4.docx</a><a class="instructure_file_link instructure_scribd_file" title="314 Current Events Presentations 2018-2.docx" href="https://ubc.beta.instructure.com/courses/6362/files/1722331/download?verifier=zhcI9gqySZVGEpxMrVP07vJuH4hSHjK5cTPhIvXm&amp;wrap=1" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1722331" data-api-returntype="File"></a></p>"`
    syllabus = modifyLinks(syllabus, 'https://ubc.beta.instructure.com/courses/6362/files/1569951/download?verifier=hpsn0hE4DYyCslAjFtLpL70cYhE3OUfxNHnQ9WWF&amp;wrap=1', 'myPDF.pdf')
    syllabus = modifyLinks(syllabus, 'https://ubc.beta.instructure.com/courses/6362/files/1722293/download?verifier=2194hdmKMgh4aHk7SOnc2DUyfmQ23mUb9Edm6hRs&amp;wrap=1', 'myPDF.pdf')
    syllabus = modifyLinks(syllabus, 'https://ubc.beta.instructure.com/courses/6362/files/1845873/download?verifier=fooAK6dDVef9LmNe02NLzFN8puWsxyOpv1RHAm9i&amp;wrap=1', 'myPDF.pdf')
    syllabus = modifyLinks(syllabus, 'https://ubc.beta.instructure.com/courses/6362/files/1722331/download?verifier=zhcI9gqySZVGEpxMrVP07vJuH4hSHjK5cTPhIvXm&amp;wrap=1', 'myPDF.pdf')
    let output = `"<p>Course Outline: <a class="instructure_file_link instructure_scribd_file" title="APBI314 Course Outline ST1 2018.docx" href="./source/myPDF.pdf" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1569951" data-api-returntype="File">APBI314 Course Outline ST1 2018.docx</a></p><p>Course schedule (subject to change): <a class="instructure_file_link instructure_scribd_file" title="2018 Summer Term Schedule-2.docx" href="./source/myPDF.pdf" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1722293" data-api-returntype="File">2018 Summer Term Schedule-2.docx</a></p><p>Current events presentation schedule: <a class="instructure_file_link instructure_scribd_file" title="314 Current Events Presentations 2018-4.docx" href="./source/myPDF.pdf" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1845873" data-api-returntype="File">314 Current Events Presentations 2018-4.docx</a><a class="instructure_file_link instructure_scribd_file" title="314 Current Events Presentations 2018-2.docx" href="./source/myPDF.pdf" data-api-endpoint="https://ubc.beta.instructure.com/api/v1/courses/6362/files/1722331" data-api-returntype="File"></a></p>"`
    assert.deepEqual(syllabus, output)
  })
})
