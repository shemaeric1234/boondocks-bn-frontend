import React from 'react';
import RequestHeader from '../components/request/RequestHeader';
import RequestPagination from '../components/request/RequestPagination';
import RequestTable from '../components/request/RequestTable';

export default function RequestPage() {
	return (
		<div data-testid='request-page' className='py-5'>
			<hr />
			<h1>Headereeee</h1>
			<RequestHeader />
			<RequestTable requests={0} />
			<RequestPagination pages={0} />
		</div>
	);
}
