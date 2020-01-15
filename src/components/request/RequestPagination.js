/* eslint-disable
no-unused-vars,
react/require-default-props,
max-len
*/
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from '../../utils/react-redux-hooks';
import PaginationButtons from './PaginationButtons';

/**
 * On Page Changed
 * @param data
 * @param paginateObject
 * @param setPaginateObject
 * @param setRequests
 */
const onPageChanged = (
	data,
	paginateObject,
	setPaginateObject,
	setRequests,
) => {
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
 * @returns {null|*}
 * @constructor
 */
const RequestPagination = ({ setRequests }) => {
	const [paginateObject, setPaginateObject] = React.useState({
		allRequests: [],
		currentRequests: [],
		currentPage: null,
		totalPages: null,
	});
	const { requestsData } = useSelector(state => state.requestsState);
	React.useEffect(() => {
		setPaginateObject({
			...paginateObject,
			...{ allRequests: requestsData },
		});
	}, [requestsData]);
	const { allRequests } = paginateObject;
	const totalRequests = allRequests.length;
	return (
		<div
			data-test='request-pagination'
			data-testid='request-pagination'
			className='my-4 ml-auto'
		>
			<PaginationButtons
				setRequests={setRequests}
				allRequests={allRequests}
				onPageChanged={data =>
					onPageChanged(data, paginateObject, setPaginateObject, setRequests)
				}
			/>
		</div>
	);
};

RequestPagination.propTypes = {
	setRequests: PropTypes.func.isRequired,
};

export default RequestPagination;
