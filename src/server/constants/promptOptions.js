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
      { title: 'All of them', value: 'all', selected: true },
      { title: 'S1', value: 'S1' },
      { title: 'SA', value: 'SA' },
      { title: 'S2', value: 'S2' },
      { title: 'S', value: 'S' },
      { title: 'S1-2', value: 'S1-2' },
      { title: 'W1', value: 'W1' },
      { title: 'WA', value: 'WA' },
      { title: 'W2', value: 'W2' },
      { title: 'WC', value: 'WC' },
      { title: 'W', value: 'W' },
      { title: 'W1-2', value: 'W1-2' }
    ],
    hint: `Please use the "space" key to select, and the "return" key to submit. Select as many as you'd like!`
  },
  {
    type: 'number',
    name: 'account',
    message: `What is your subaccount number? If you don't know, go to https://ubc.beta.instructure.com/accounts/ and click on your Faculty - in the URL, the number will show at the end. LFS is 15.`
  }
]

module.exports = prompt
