import {
	getUserBooking,
	bookAccommodation,
} from '../../lib/services/booking.service';
import actionFunc from '../../utils/actionFunc';
import { GET_BOOKING_SUCCESS, BUTTON_LOADING } from './types';
import Toast from '../../lib/toast';

export const book = bookingInfo => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	await bookAccommodation(bookingInfo);
	Toast('success', 'Accommodation booked successfully');
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export const getBooking = () => async dispatch => {
	const bookingData = await getUserBooking();
	dispatch(actionFunc(GET_BOOKING_SUCCESS, bookingData.data.data));
};
