import React, { useState } from 'react';
import RequestHeader from '../components/request/RequestHeader';
import RequestPagination from '../components/request/RequestPagination';
import RequestTable from '../components/request/RequestTable';

/**
 * Requests page view
 * @returns {*}
 * @constructor
 */
export const RequestPage = () => {
	const [requests, setRequests] = useState([]);
	return (
		<div data-testid='request-page' className='container pt-5'>
			<RequestHeader />
			<RequestTable
				requests={[
					...requests.map(item => ({
						...item,
						createdAt: item.createdAt && item.createdAt.split('T')[0],
						updatedAt: item.createdAt && item.updatedAt.split('T')[0],
					})),
				]}
			/>
			<RequestPagination setRequests={setRequests} />
		</div>
	);
};

export default RequestPage;
