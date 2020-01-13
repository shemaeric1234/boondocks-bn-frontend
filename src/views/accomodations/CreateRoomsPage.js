import React from 'react';
import CreateRooms from '../../components/accomodations/CreateRooms';

export default function CreateRoomsPage() {
	return (
		<div className='container mt-7 bg-white p-5' data-test='create-room'>
			<CreateRooms />
		</div>
	);
}
