import React from 'react'
import { Table } from 'react-bootstrap'

/* 
* Props: courses - list of courses to render
* Renders a table of courses with links to their syllabi
*/

class ResultsTable extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Table bordered>
				<thead>
					<tr>
						<th>#</th>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Username</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Mark</td>
						<td>Otto</td>
						<td>@mdo</td>
					</tr>
					<tr>
						<td>2</td>
						<td>Jacob</td>
						<td>Thornton</td>
						<td>@fat</td>
					</tr>
					<tr>
						<td>3</td>
						<td colSpan="2">Larry the Bird</td>
						<td>@twitter</td>
					</tr>
				</tbody>
			</Table>
		)
	}
}

export default ResultsTable