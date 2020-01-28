import apiCall from '../../utils/api';

export const getLocations = async () => {
	return apiCall.get('/location');
};

export const getLocationsWithHotels = async () => {
	return apiCall.get('/location/?with_hotels=true');
};

export const createATrip = async (userRequest, endpoint) => {
	return apiCall.post(endpoint, userRequest);
};
