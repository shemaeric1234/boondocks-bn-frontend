import { COMMENT_SUCCESS, COMMENT_FAIL } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case COMMENT_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case COMMENT_FAIL:
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
