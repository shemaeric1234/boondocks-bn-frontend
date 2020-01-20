import { CREATE_ROOM_FAIL, CREATE_ROOM_SUCCESS } from '../actions/types';

const initialState = {
	data: null,
	error: null,
	status: '',
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_ROOM_SUCCESS:
			return {
				...state,
				data: action.payload,
				status: 'success',
			};
		case CREATE_ROOM_FAIL:
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
