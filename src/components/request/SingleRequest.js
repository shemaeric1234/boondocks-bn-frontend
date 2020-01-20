import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TripCard from '../templates/TripCard';

const SingleRequest = ({ request }) => {
	const [role, setRole] = useState('');
	useEffect(() => {
		setRole(JSON.parse(localStorage.bn_user_data).role);
	});
	const { trips, status, type } = request;
	return (
		<div className='h-100'>
			<div className='request-details'>
				<h2>Request Details</h2>
				<p>
					<span className='key'>Status:</span>
					<span className='value'>{status}</span>
					<span className={`status-dot ${status}`} />
				</p>
				{role === 'manager' ? (
					<div className='btn-approve'>
						<button type='button' className='btn btn-success btn-sm'>
							Approve
						</button>
						<button type='button' className='btn btn-danger btn-sm m-2'>
							Decline
						</button>
					</div>
				) : (
					''
				)}
				<p>
					<span className='key'>Request Type:</span>
					<span className='value'>{`${type}-city`}</span>
				</p>
			</div>
			<hr className='hr-text' data-content='Trips' />
			<div className='card-trip-group'>
				{trips.map(trip => (
					<TripCard
						key={trip.id.toString()}
						trip={trip}
						status={status}
						role={role}
					/>
				))}
			</div>
		</div>
	);
};

SingleRequest.propTypes = {
	request: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SingleRequest;
