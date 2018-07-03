/* global fetch */

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import React from 'react'
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      terms: [],
      courses: []
    }
  }

  componentDidMount () {
    fetch('http://localhost:8080/terms')
      .then(terms => terms.json())
      .then(terms => this.setState({
        terms
      }))
  }

  handleSelect () {
    console.log('I was changed!')
  }

  render () {
    return (
      <div>
        <Dropdown options={this.state.terms} placeholder='Please select a term' onChange={this.handleSelect()} />
      </div>
    )
  }
}

export default App
