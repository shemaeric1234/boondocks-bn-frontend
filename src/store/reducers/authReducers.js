import { REGISTER_FAIL, REGISTER_SUCCESS } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case REGISTER_FAIL:
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
