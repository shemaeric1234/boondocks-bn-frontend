import { FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAIL } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REQUEST_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case FETCH_REQUEST_FAIL:
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
