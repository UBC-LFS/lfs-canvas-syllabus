/* global fetch */

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import React from 'react'
import './App.css'
import { flatten } from 'ramda'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      terms: [],
      courses: [],
      selectedCourse: '',
      selectedTerm: '',
      linkURL: '#',
      allCourses: []
    }
  }

  getAllCourses = async terms => {
    const courses = await Promise.all(
      terms.map(term => fetch(`http://localhost:8080/courses/${term}`)
        .then(courses => courses.json())
        .then(courses => ({
          courses,
          term
        }))
    ))
    this.setState({
      allCourses: courses
    })
  }

  componentDidMount () {
    fetch('http://localhost:8080/terms')
      .then(terms => terms.json())
      .then(terms => {
        this.getAllCourses(terms)
        this.setState({
          terms
        })
      })
  }

  handleTermSelect = event => {
    fetch(`http://localhost:8080/courses/${event.value}`)
      .then(courses => courses.json())
      .then(courses => this.setState({
        courses,
        selectedTerm: event.value
      }))
  }

  handleCourseSelect = event => {
    this.setState({
      selectedCourse: event.value,
      linkURL: `syllabi/${this.state.selectedTerm}/${event.value}`
    })
  }

  openSyllabi = () => {
    const win = window.open(`http:localhost.com/8080/syllabi/${this.state.selectedTerm}/${this.state.selectedCourse}`, '_blank')
    win.focus()
  }

  render () {
    return (
      <div>
        <Dropdown options={this.state.terms} value={this.state.selectedTerm} placeholder='Please select a term' onChange={this.handleTermSelect} />
        <Dropdown options={this.state.courses} value={this.state.selectedCourse} placeholder='Please select a course' onChange={this.handleCourseSelect}/>
        <a href={this.state.linkURL}>
          Go to syllabus
        </a>
      </div>
    )
  }
}

export default App
