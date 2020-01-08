import React, { Component } from 'react';
import data from '../utils/requestFields';

export default class RequestTable extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	renderTableHeader() {
		const header = Object.keys(data[0]);
		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>;
		});
	}

	renderTableData() {
		return data.map((request, index) => {
			const col = Object.keys(request);
			return (
				<tr key={request.id}>
					{col.map((val, index) => {
						return <td key={index}>{request[col[index]]}</td>;
					})}
				</tr>
			);
		});
	}

	render() {
		return (
			<table className='table table-responsive thead-borderless'>
				<thead className='header'>
					<tr>{this.renderTableHeader()}</tr>
				</thead>
				<tbody className='content'>{this.renderTableData()}</tbody>
			</table>
		);
	}
}
