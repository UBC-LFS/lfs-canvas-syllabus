import React from 'react'
import logo from './logo.svg'
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
    console.log('in here')
    fetch('http://localhost:8080/terms')
      .then(terms => terms.json())
      .then(terms => this.setState({
        terms
      }))
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
