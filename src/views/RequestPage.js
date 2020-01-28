import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestHeader from '../components/request/RequestHeader';
import RequestPagination from '../components/request/RequestPagination';
import RequestTable from '../components/request/RequestTable';
import { formatIsoDate } from '../lib/time';

/**
 * Requests page view
 * @param requests
 * @returns {*}
 * @constructor
 */
export const RequestPage = ({ requests }) => (
	<div data-testid='request-page' className='container pt-5'>
		<RequestHeader />
		{requests && (
			<RequestTable
				requests={[
					...requests.map(item => ({
						...item,
						updatedAt: item.updatedAt && formatIsoDate(item.updatedAt),
					})),
				]}
			/>
		)}
		<RequestPagination />
	</div>
);

RequestPage.propTypes = { requests: PropTypes.array };
RequestPage.defaultProps = { requests: null };

export const mapStateToProps = ({ requestListState: { requests } }) => ({
	requests,
});

export default connect(mapStateToProps)(RequestPage);
