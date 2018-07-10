const prompt = [
  {
    type: 'number',
    name: 'year',
    message: 'What year are you interested in?'
  },
  {
    type: 'multiselect',
    name: 'terms',
    message: 'What term are you interested in?',
    choices: [
      { title: 'S1', value: 'S1' },
      { title: 'SA', value: 'SA' },
      { title: 'S2', value: 'S2' },
      { title: 'S', value: 'S' },
      { title: 'W1', value: 'W1' },
      { title: 'WA', value: 'WA' },
      { title: 'W2', value: 'W2' },
      { title: 'WC', value: 'WC' },
      { title: 'W', value: 'W' }
    ],
    hint: `Please use the "space" key to select, and the "return" key to submit. Select as many as you'd like!`
  }
]

module.exports = prompt
