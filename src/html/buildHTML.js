const buildHTML = syllabus => (`
<!DOCTYPE html>
<html>
<head>
<title>Syllabus</title>
<link rel="stylesheet" type="text/css" href="./global.css">
</head>
<body>
${syllabus}
</body>
</html>
`)

module.exports = buildHTML
