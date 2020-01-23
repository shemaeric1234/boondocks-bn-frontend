import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TripCard from '../templates/TripCard';
import StatusConfirmModal from '../../views/requests/StatusConfirmModal';
import { changeRequestStatus } from '../../store/actions/requests/singleRequestActions';

const SingleRequest = ({ request, loading, changeStatus }) => {
	const [role, setRole] = useState('');
	const [popUpState, setPopUpState] = useState({
		approvePopupVisibility: false,
		rejectPopupVisibility: false,
	});

	useEffect(() => {
		setRole(JSON.parse(localStorage.bn_user_data).role);
	});

	const { trips, status, type } = request;

	const handleApprove = () => {
		setPopUpState({
			...popUpState,
			approvePopupVisibility: true,
		});
	};

	const cancel = () => {
		setPopUpState({
			approvePopupVisibility: false,
			rejectPopupVisibility: false,
		});
	};

	const handleReject = () => {
		setPopUpState({
			...popUpState,
			rejectPopupVisibility: true,
		});
	};

	const confirmApprove = async ({ id }) => {
		await changeStatus(id, 'approved');
		setPopUpState({
			...popUpState,
			approvePopupVisibility: false,
		});
	};

	const confirmReject = async ({ id }) => {
		await changeStatus(id, 'declined');
		setPopUpState({
			...popUpState,
			rejectPopupVisibility: false,
		});
	};

	const { approvePopupVisibility, rejectPopupVisibility } = popUpState;

	return (
		<div className='h-100'>
			<div className='request-details'>
				<h2>Request Details</h2>
				<p>
					<span className='key font-weight-bolder'>Status:</span>
					<span className='value text-capitalize'>{status}</span>
					<span className={`status-dot text-capitalize ${status}`} />
				</p>
				{role === 'manager' ? (
					<div className='btn-approve'>
						<button
							type='button'
							disabled={request.status === 'approved'}
							onClick={() => handleApprove()}
							className='btn btn-success btn-sm mr-4 ml-4'
						>
							Approve
						</button>

						<button
							disabled={request.status === 'declined'}
							type='button'
							className='btn btn-danger btn-sm mr-4'
							onClick={() => handleReject()}
						>
							Decline
						</button>
					</div>
				) : (
					''
				)}
				<p>
					<span className='key font-weight-bolder'>Request Type:</span>
					<span className='value text-capitalize'>{`${type}-city`}</span>
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

			<StatusConfirmModal
				request={request}
				visibility={approvePopupVisibility}
				title='Alert'
				prompt='Confirm that you want to approve this request'
				confirmAction={confirmApprove}
				cancelAction={cancel}
				btnLoadingState={loading}
			/>
			<StatusConfirmModal
				request={request}
				visibility={rejectPopupVisibility}
				title='Alert'
				prompt='Confirm that you want to reject this request'
				confirmAction={confirmReject}
				cancelAction={cancel}
				btnLoadingState={loading}
			/>
		</div>
	);
};

SingleRequest.propTypes = {
	request: PropTypes.objectOf(PropTypes.any).isRequired,
	changeStatus: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default connect(null, {
	changeStatus: changeRequestStatus,
})(SingleRequest);
