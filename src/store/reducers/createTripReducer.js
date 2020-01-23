import {
	CREATE_TRIP_SUCCESS,
	CREATE_TRIP_FAILURE,
	FETCH_CREATE_TRIP_DATA_SUCCESS,
	FETCH_CREATE_TRIP_DATA_FAILURE,
} from '../actions/types';

const initialState = {
	allLocations: null,
	locationsWithHotels: null,
	data: null,
	error: null,
	status: '',
	tripCreated: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_TRIP_SUCCESS:
			return {
				...state,
				data: action.payload,
				error: null,
				status: 'success',
				tripCreated: true,
			};
		case CREATE_TRIP_FAILURE:
			return {
				...state,
				data: null,
				error: action.payload,
				status: 'error',
				tripCreated: false,
			};
		case FETCH_CREATE_TRIP_DATA_SUCCESS:
			return {
				...state,
				allLocations: action.payload.allLocations,
				locationsWithHotels: action.payload.locationsWithHotels,
				error: null,
				status: 'success',
				tripCreated: false,
			};
		case FETCH_CREATE_TRIP_DATA_FAILURE:
			return {
				...state,
				data: null,
				error: action.payload,
				status: 'error',
				tripCreated: false,
			};
		default:
			return {
				...state,
			};
	}
};
