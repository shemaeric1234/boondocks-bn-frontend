import React from 'react';
import PropTypes from 'prop-types';
import { formatIsoDate } from '../../lib/time';
import EditRequest from '../request/EditRequest';

const TripField = ({ keyTrip, value }) => {
	return (
		<p>
			<span className='key'>{`${keyTrip}:`}</span>
			<span className='value'>{value}</span>
		</p>
	);
};

const TripCard = ({ trip, status, role }) => {
	const {
		type,
		reason,
		travelDate,
		hotel,
		going,
		leaving,
		returnDate,
		id,
	} = trip;
	const tripData = {
		Type: type,
		Reason: reason,
		'Travel Date': formatIsoDate(travelDate),
		Hotel: (hotel && hotel.name) || '',
		'Going To': `${going.city}, ${going.country}`,
		'Leaving From': `${leaving.city}, ${leaving.country}`,
		'Return Date': formatIsoDate(returnDate),
	};

	return (
		<div className='card-trip' data-test='trip-card'>
			{status === 'open' && role !== 'manager' ? (
				<EditRequest id={id} data={trip} />
			) : (
				''
			)}
			<div className='card-details'>
				{Object.keys(tripData).map(key => {
					if (tripData[key]) {
						return <TripField key={key} keyTrip={key} value={tripData[key]} />;
					}
				})}
			</div>
		</div>
	);
};

TripCard.propTypes = {
	trip: PropTypes.objectOf(PropTypes.any).isRequired,
	status: PropTypes.any.isRequired,
	role: PropTypes.any.isRequired,
};

TripField.propTypes = {
	keyTrip: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default TripCard;
