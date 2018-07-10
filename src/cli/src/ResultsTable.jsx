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
					<tr>
						<td>FNH 200 001</td>
						<td>2017W1</td>
					</tr>
					<tr>
						<td>APBI 350 020</td>
						<td>2016S1-2</td>
					</tr>
				</tbody>
			</Table>
		)
	}
}

export default ResultsTable