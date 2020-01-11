import React from 'react';
import PropTypes from 'prop-types';
import { formatIsoDate } from '../../lib/time';

const TripField = ({ keyTrip, value }) => {
	return (
		<p>
			<span className='key'>{`${keyTrip}:`}</span>
			<span className='value'>{value}</span>
		</p>
	);
};

const TripCard = ({ trip }) => {
	const { type, reason, travelDate, hotel, going, leaving, returnDate } = trip;
	const tripData = {
		Type: type,
		Reason: reason,
		'Travel Date': formatIsoDate(travelDate),
		Hotel: hotel.name,
		'Going To': `${going.city}, ${going.country}`,
		'Leaving From': `${leaving.city}, ${leaving.country}`,
		'Return Date': formatIsoDate(returnDate),
	};

	return (
		<div className='card-trip' data-test='trip-card'>
			{Object.keys(tripData).map(key => {
				if (tripData[key]) {
					return <TripField key={key} keyTrip={key} value={tripData[key]} />;
				}
			})}
		</div>
	);
};

TripCard.propTypes = {
	trip: PropTypes.objectOf(PropTypes.any).isRequired,
};

TripField.propTypes = {
	keyTrip: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
};

export default TripCard;
