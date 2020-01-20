import axiosErrorHandler from './axiosErrorHandler';
import api from '../../utils/api';

export const bookAccommodation = async bookingInfo => {
	return api.post('booking', bookingInfo).catch(axiosErrorHandler);
};

export const getUserBooking = async () => {
	return api.get('booking').catch(axiosErrorHandler);
};
