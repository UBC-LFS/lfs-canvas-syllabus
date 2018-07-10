/* global fetch */
import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './App.css'

import ResultsTable from './ResultsTable'

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
      <Grid>
        <Row>
          <Col>
            <h1>Syllabi Archive</h1>
          </Col>
        </Row>
        <Row>
          <div class="searchbar">
            <input type="text" placeholder="Search a course code.."></input>
          </div>
        </Row>
        <br />
        <Row>
          <ResultsTable />
        </Row>
      </Grid>
    )
  }
}

export default App
