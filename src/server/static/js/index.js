/* global fetch */

document.addEventListener('DOMContentLoaded', async function () {
  const terms = await fetch('http://localhost:8080/terms').then(res => res.json())
  console.log(terms)
}, false)
