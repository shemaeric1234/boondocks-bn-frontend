import {
	CREATE_TRIP_SUCCESS,
	CREATE_TRIP_FAILURE,
	FETCH_CREATE_TRIP_DATA_SUCCESS,
	FETCH_CREATE_TRIP_DATA_FAILURE,
} from '../actions/types';

const initialState = {
	data: null,
	error: null,
	fetchStatus: null,
	createStatus: null,
	tripCreated: false,
	allLocations: null,
	locationsWithHotels: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TRIP_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
				fetchStatus: null,
				createStatus: 'success',
				tripCreated: true,
			};
		case CREATE_TRIP_FAILURE:
			return {
				...state,
				data: null,
				error: action.payload,
				createStatus: null,
				tripCreated: false,
			};
		case FETCH_CREATE_TRIP_DATA_SUCCESS:
			return {
				...state,
				data: null,
				error: null,
				fetchStatus: 'success',
				createStatus: null,
				tripCreated: false,
				allLocations: action.payload.allLocations,
				locationsWithHotels: action.payload.locationsWithHotels,
			};
		case FETCH_CREATE_TRIP_DATA_FAILURE:
			return {
				...state,
				data: null,
				error: action.payload,
				fetchStatus: 'error',
				createStatus: null,
				tripCreated: false,
				allLocations: null,
				locationsWithHotels: null,
			};
		default:
			return {
				...state,
			};
	}
};
