import React from 'react';
import CreateAccomodation from '../../components/accomodations/CreateAccomodation';

export default function CreateAccomodationPage() {
	return (
		<div className='container bg-white mt-7 p-5' data-test='create-hotel'>
			<CreateAccomodation />
		</div>
	);
}
