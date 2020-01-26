import {
	FETCH_REQUEST_SUCCESS,
	REQUEST_STATUS_CHANGE_SUCCESS,
} from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
	request: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_REQUEST_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case REQUEST_STATUS_CHANGE_SUCCESS:
			return {
				...state,
				request: {
					...state.request,
					status: action.payload,
				},
			};
		default:
			return {
				...state,
			};
	}
};
