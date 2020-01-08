import {
	GET_MANAGER_REQUESTS_SUCCESS,
	GET_MANAGER_REQUESTS_FAIL,
	GET_ONE_MANAGER_REQUEST_SUCCESS,
	GET_ONE_MANAGER_REQUEST_FAIL,
} from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_MANAGER_REQUESTS_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case GET_MANAGER_REQUESTS_FAIL:
			return {
				...state,
				error: action.payload,
				status: 'error',
			};
		case GET_ONE_MANAGER_REQUEST_SUCCESS:
			return {
				...state,
				error: action.payload,
				status: 'error',
			};
		case GET_ONE_MANAGER_REQUEST_FAIL:
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
