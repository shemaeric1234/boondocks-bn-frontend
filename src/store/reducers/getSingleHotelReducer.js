import {
	FETCH_SINGLE_HOTEL_SUCCESS,
	FETCH_SINGLE_HOTEL_FAIL,
} from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_SINGLE_HOTEL_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				status: 'success',
			};
		case FETCH_SINGLE_HOTEL_FAIL:
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
