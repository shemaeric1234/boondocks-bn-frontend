import { ERROR, RESET_PASSWORD, FORGOT_PASSWORD } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default function(state = initialState, action) {
	switch (action.type) {
		case RESET_PASSWORD:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case FORGOT_PASSWORD:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
				status: 'error',
			};
		default:
			return state;
	}
}
