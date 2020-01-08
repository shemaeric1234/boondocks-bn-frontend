import React from 'react';
import RequestTable from '../components/RequestTable';

export default function RequestPage() {
	return (
		<div className='container' data-testid='requests-page'>
			<RequestTable />
		</div>
	);
}
