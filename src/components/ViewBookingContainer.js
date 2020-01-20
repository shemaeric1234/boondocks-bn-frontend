import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BookingTable from '../views/booking/BookingTable';
import { getBooking } from '../store/actions/bookingActions';
/**
 * Booking page view
 * @returns {*}
 * @constructor
 */
class ViewBooking extends Component {
	componentDidMount() {
		const { props } = this;
		props.getBookings();
	}

	render() {
		const { booking } = this.props;
		if (!booking.length) {
			return (
				<div data-testid='request-page' className='container pt-5'>
					<div className='card'>
						<div className='card-body text-center'>
							<strong className='text-muted mr-2'>
								Seems there is nothing here, Not yet booked!
							</strong>
							<Link to='/home'>Get Started</Link>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div data-testid='request-page' className='container pt-5'>
				{booking && (
					<BookingTable
						bookings={[
							...booking.map(item => ({
								...item,
								createdAt: item.createdAt && item.createdAt.split('T')[0],
							})),
						]}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	booking: state.bookingState.booking,
});

export default connect(mapStateToProps, {
	getBookings: getBooking,
})(ViewBooking);

ViewBooking.propTypes = {
	getBookings: PropTypes.func.isRequired,
	booking: PropTypes.instanceOf(Object),
};

ViewBooking.defaultProps = {
	booking: null,
};
