/* eslint-disable
 react/no-array-index-key,
 no-unused-vars, no-shadow,
 react/no-array-index-key,
 jsx-a11y/control-has-associated-label,
 import/named,
 jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-noninteractive-element-interactions,
 jsx-a11y/no-static-element-interactions
*/
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatRequestTable } from '../../lib/helpers';

/**
 * RequestsTable component
 * @param history
 * @param requests
 * @param pageLimit
 * @returns {*}
 * @constructor
 */
const RequestTable = ({ history, requests, pageLimit }) => {
	useEffect(() => {}, [pageLimit]);
	const handleOpenRequest = id => history.push(`/request/${id}`);
	const renderTableHeader = () => {
		if (requests.length === 0) {
			return <h2 data-testid='empty-header'>No results found.</h2>;
		}
		const header = Object.keys(requests[0]);
		return (
			<li data-testid='request-list-container' className='table-header'>
				{header
					.filter(item => item !== 'id')
					.map((key, index) => {
						return (
							<div
								className={`col col-${header.length - index - 1}`}
								data-testid='request-table-header'
								key={index}
							>
								{formatRequestTable(key.toUpperCase())}
							</div>
						);
					})}
			</li>
		);
	};

	const renderTableData = () =>
		requests.map((request, index1) => {
			const col = Object.keys(request);
			col.shift();
			return (
				<li className='table-row' key={index1} data-testid='request-list-row'>
					{col.map((val, index2) => (
						<div
							className={`col col-${col.length - index2}`}
							data-label={`${formatRequestTable(col[index2].toUpperCase())}`}
							data-content={`td-${col.length - index2}-${request[col[index2]]}`}
							key={index2}
							onClick={() => handleOpenRequest(request.id)}
						>
							{formatRequestTable(request[col[index2]])}
						</div>
					))}
				</li>
			);
		});

	return (
		<ul data-test='request-table' className='responsive-table'>
			{renderTableHeader()}
			{renderTableData()}
		</ul>
	);
};

RequestTable.propTypes = {
	pageLimit: PropTypes.number.isRequired,
	requests: PropTypes.array.isRequired,
	history: PropTypes.shape({
		push: PropTypes.func.isRequired,
	}).isRequired,
};

export default withRouter(
	connect(({ requestPageLimitState: { pageLimit } }) => ({
		pageLimit,
	}))(RequestTable),
);
