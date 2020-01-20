import apiCall from '../../utils/api';

export const getHotelById = async (hotelId) => {
	return apiCall.get(`/hotel/${hotelId}`);
};
