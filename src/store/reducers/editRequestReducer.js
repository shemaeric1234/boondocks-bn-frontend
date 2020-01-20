import { UPDATE_TRIP_SUCCESS, UPDATE_TRIP_FAIL } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_TRIP_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case UPDATE_TRIP_FAIL:
			return {
				...state,
				error: action.payload,
				status: 'error',
			};
		default:
			return {
				...state,
			};
	}
};
