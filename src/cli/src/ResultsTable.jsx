import React from 'react'
import { Table } from 'react-bootstrap'

/* 
* Props: courses - list of courses to render
* Renders a table of courses with links to their syllabi
*/

class ResultsTable extends React.Component {
	render() {
		return (
			<Table bordered>
				<thead>
					<tr>
						<th>Course</th>
						<th>Term</th>
					</tr>
				</thead>
				<tbody>
					{this.props.courses.map(course => {
							return (
								<tr key={course['course'] + course['term']}>
									<th>{course['course']}</th>
									<th>{course['term']}</th>
								</tr>	
							)
						})}
				</tbody>
			</Table>
		)
	}
}

export default ResultsTable