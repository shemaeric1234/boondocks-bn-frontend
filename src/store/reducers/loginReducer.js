import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../actions/types';

const initialState = {
	loggedIn: false,
	data: null,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				data: action.payload,
				error: null,
			};
		case LOGIN_FAILURE:
			return {
				...state,
				loggedIn: false,
				data: null,
				error: action.payload,
			};
		default:
			return state;
	}
};
