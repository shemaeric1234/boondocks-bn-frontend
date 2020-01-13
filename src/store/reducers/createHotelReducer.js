import { CREATE_HOTEL_FAIL, CREATE_HOTEL_SUCCESS } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_HOTEL_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				status: 'success',
			};
		case CREATE_HOTEL_FAIL:
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
