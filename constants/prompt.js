const prompt = [
  {
    type: 'multiselect',
    name: 'depts',
    message: 'What departments are you interested in?',
    choices: [
      { title: 'All of them', value: 'all', selected: true },
      { title: 'APBI', value: 'APBI' },
      { title: 'FNH', value: 'FNH' },
      { title: 'FOOD', value: 'FOOD' },
      { title: 'FRE', value: 'FRE' },
      { title: 'GRS', value: 'GRS' },
      { title: 'HUNU', value: 'HUNU' },
      { title: 'LFS', value: 'LFS' },
      { title: 'LWS', value: 'LWS' },
      { title: 'PLNT', value: 'PLNT' },
      { title: 'SOIL', value: 'SOIL' }
    ],
    hint: `Please use the "space" key to select, and the "return" key to submit. Select as many as you'd like!`
  },
  {
    type: 'number',
    name: 'year',
    message: 'What year are you interested in?'
  },
  {
    type: 'select',
    name: 'term',
    message: 'What term are you interested in?',
    choices: [
      { title: 'W1', value: 'W1' },
      { title: 'W2', value: 'W2' },
      { title: 'S1', value: 'S1' },
      { title: 'S2', value: 'S2' },
    ]
  }
]

module.exports = prompt
