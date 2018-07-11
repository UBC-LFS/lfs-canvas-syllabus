/* global fetch */
import React from 'react'
import { Grid, Row, Col, FormControl } from 'react-bootstrap';
import 'react-dropdown/style.css'
import './App.css'

import ResultsTable from './ResultsTable'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      allCourses: [],
      individualCourses: [],
      courseResults: []
    }
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

    var individualCourses = [] // create an array of JSON object with course key and term key
    for (var i = 0; i < courses.length; ++i) {
      var item = courses[i]
      var term = item["term"]
      var courseList = item["courses"]
      for (var j = 0; j < courseList.length; ++j) {
        var courseObj = {
          'term': term,
          'course': courseList[j]
        }        
        individualCourses.push(courseObj)
      }
    }

    this.setState({
      individualCourses: individualCourses,
      courseResults: individualCourses
    })
  }

  handleSearchInputUpdate = () => {
    var text = this.searchbar.value.toUpperCase()
    var filteredCourses = this.state.individualCourses.filter(function(item) {
      var courseName = item['course']
      return courseName.includes(text)
    })

    this.setState({
      courseResults: filteredCourses
    })
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col>
            <h2>Syllabi Archive</h2>
          </Col>
        </Row>
        <Row>
          <FormControl type="text" inputRef={el => this.searchbar = el} onChange={this.handleSearchInputUpdate} 
            placeholder="Search a course code... (ex: FNH200)">
          </FormControl>
        </Row>
        <br />
        <Row>
          <ResultsTable courses={this.state.courseResults}/>
        </Row>
      </Grid>
    )
  }
}

export default App
