import { DELETE_COMMENT_SUCCESS } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case DELETE_COMMENT_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		default:
			return {
				...state,
			};
	}
};
