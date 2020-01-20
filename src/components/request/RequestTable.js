/* eslint-disable
 react/no-array-index-key,
 no-unused-vars, no-shadow,
 react/no-array-index-key,
 jsx-a11y/control-has-associated-label,
 import/named,
 jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-noninteractive-element-interactions
*/
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { formatRequestTable } from '../../lib/helpers';

/**
 * RequestsTable component
 * @param history
 * @param requests
 * @returns {*}
 * @constructor
 */
const RequestTable = ({ history, requests }) => {
	const handleOpenRequest = id => history.push(`/request/${id}`);
	const renderTableHeader = () => {
		if (!requests[0]) {
			return <th data-testid='empty-header' />;
		}
		const header = Object.keys(requests[0]);
		return header
			.filter(item => item !== 'id')
			.map((key, index) => {
				return (
					<th
						className='header-item'
						data-testid='request-table-header'
						data-content={`th-${header.length - index}`}
						key={index}
					>
						{formatRequestTable(key.toUpperCase())}
					</th>
				);
			});
	};

	const renderTableData = () => {
		return requests.map((request, index1) => {
			const col = Object.keys(request);
			col.shift();
			return (
				<tr aria-rowspan='30' key={index1}>
					{col.map((val, index2) => {
						return (
							<td
								data-testid='request-list-row'
								key={index2}
								onClick={() => handleOpenRequest(request.id)}
							>
								<div
									data-content={`td-${col.length - index2}-${
										request[col[index2]]
									}`}
								>
									{formatRequestTable(request[col[index2]])}
								</div>
							</td>
						);
					})}
				</tr>
			);
		});
	};

	return (
		<div data-test='request-table' className='table-responsive my-4'>
			<table className='table thead-borderless request-table'>
				<thead className='header'>
					<tr data-testid='request-list-container'>{renderTableHeader()}</tr>
				</thead>
				<tbody className='content' data-testid='content'>
					{renderTableData()}
				</tbody>
			</table>
		</div>
	);
};

RequestTable.propTypes = {
	requests: PropTypes.array.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

export default withRouter(RequestTable);
