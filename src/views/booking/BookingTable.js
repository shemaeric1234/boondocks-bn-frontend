/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { formatIsoDate, formatLeaving, getBookStatus } from '../../lib/time';

/**
 * bookingsTable component
 * @param history
 * @param bookings
 * @returns {*}
 * @constructor
 */
const BookingTable = ({ bookings }) => {
	const renderTableHeader = () => {
		return (
			<li className='table-header'>
				<div className='col col-6' data-testid='request-table-header' />
				<div className='col col-' data-testid='request-table-header'>
					NAMES
				</div>
				<div className='col col-' data-testid='request-table-header'>
					ROOM
				</div>
				<div className='col col-' data-testid='request-table-header'>
					ARRIVAL DATE
				</div>
				<div className='col col-' data-testid='request-table-header'>
					LEAVING DATE
				</div>
				<div className='col col-' data-testid='request-table-header'>
					REMAINING DAYS
				</div>
				<div className='col col-' data-testid='request-table-header'>
					BOOKING DATE
				</div>
				<div className='col col-' data-testid='request-table-header'>
					STATUS
				</div>
			</li>
		);
	};

	const renderTableData = () => {
		return bookings.map(booking => {
			return (
				<li className='table-row' aria-rowspan='30' key={booking.id}>
					<div
						data-label=''
						data-testid='request-list-row'
						className='col col-6'
						data-content='td-6-1'
					>
						{`${booking.firstName[0]}${booking.lastName[0]}`}
					</div>
					<div
						className='col col-'
						data-label='NAMES'
						data-testid='request-list-row'
					>
						{`${booking.firstName} ${booking.lastName}`}
					</div>

					<div
						className='col col-'
						data-label='ROOM'
						data-testid='request-list-row'
					>
						<span className='text-capitalize'>{`${booking.room}`}</span>
					</div>

					<div
						className='col col-'
						data-label='ARRIVAL DATE'
						data-testid='request-list-row'
					>
						{formatIsoDate(booking.arrivalDate)}
					</div>

					<div
						className='col col-'
						data-label='LEAVING DATE'
						data-testid='request-list-row'
					>
						{formatIsoDate(booking.leavingDate)}
					</div>

					<div
						className='col col-'
						data-label='REMAINING DAYS'
						data-testid='request-list-row'
					>
						{formatLeaving(booking.arrivalDate, booking.leavingDate)}
					</div>

					<div
						className='col col-'
						data-label='BOOKING DATE'
						data-testid='request-list-row'
					>
						{formatIsoDate(booking.createdAt)}
					</div>

					<div
						className='col col-'
						data-label='STATUS'
						data-testid='request-list-row'
					>
						{getBookStatus(booking.arrivalDate, booking.leavingDate)}
					</div>
				</li>
			);
		});
	};

	return (
		// <div data-test='request-table' className='table-responsive my-4'>
		// 	<table className='table thead-borderless booking-table'>
		// 		<thead className='header'>
		// 			<tr data-testid='request-list-container'>{renderTableHeader()}</tr>
		// 		</thead>
		// 		<tbody className='content' data-testid='content'>
		// 			{renderTableData()}
		// 		</tbody>
		// 	</table>
		// </div>
		<ul data-test='request-table' className='responsive-table'>
			{renderTableHeader()}
			{renderTableData()}
		</ul>
	);
};

BookingTable.propTypes = {
	bookings: PropTypes.array.isRequired,
};

export default BookingTable;
