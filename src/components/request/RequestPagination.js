/* eslint-disable
no-unused-vars,
react/require-default-props,
max-len
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PaginationButtons from './PaginationButtons';
import setRequestsList from '../../store/actions/requestListAction';

/**
 * On Page Changed
 * @param data
 * @param paginateObject
 * @param setPaginateObject
 * @param setRequests
 */
export const onPageChanged = ({
	data,
	paginateObject,
	setPaginateObject,
	setRequests
}) => {
	const { allRequests } = paginateObject;
	const { currentPage, totalPages, pageLimit } = data;
	const offset = (currentPage - 1) * pageLimit;
	const currentRequests = allRequests.slice(offset, offset + pageLimit);

	setPaginateObject({
		allRequests,
		currentPage,
		currentRequests,
		totalPages,
	});

	setRequests(currentRequests);
};

/**
 * RequestPagination component
 * @param setRequests
 * @param requestsData
 * @param requests
 * @param searching
 * @returns {*}
 * @constructor
 */
export const RequestPagination = ({
	setRequests,
	requestsData,
	requests,
	searching
}) => {
	const [paginateObject, setPaginateObject] = React.useState({
		allRequests: [],
		currentRequests: [],
		currentPage: null,
		totalPages: null
	});

	React.useEffect(() => {
		setPaginateObject({
			...paginateObject,
			...{ allRequests: searching ? requests : requestsData }
		});
	}, [requestsData, searching]);
	const { allRequests } = paginateObject;
	return (
		<div
			data-test='request-pagination'
			data-testid='request-pagination'
			className='my-4 ml-auto'
		>
			<PaginationButtons
				allRequests={allRequests}
				onPageChanged={data => {
					onPageChanged({
						data,
						paginateObject,
						setPaginateObject,
						setRequests
					});
				}}
			/>
		</div>
	);
};

RequestPagination.propTypes = {
	setRequests: PropTypes.func.isRequired,
	requestsData: PropTypes.any.isRequired,
	requests: PropTypes.any,
	searching: PropTypes.bool
};

RequestPagination.defaultProps = {
	requests: null,
	searching: false
};

export const mapStateToProps = ({
	requestsState: { requestsData },
	requestSearchState: { requests },
	isSearchingState
}) => ({
	requestsData,
	requests,
	searching: isSearchingState
});

export default connect(mapStateToProps, { setRequests: setRequestsList })(
	RequestPagination
);
