// eslint-disable-next-line import/named
import { IS_AUTHENTICATED, NOT_AUTHENTICATED } from '../actions/types';

export default (state = { isAuthenticated: false }, action) => {
	switch (action.type) {
		case IS_AUTHENTICATED:
			return { ...state, isAuthenticated: true };
		case NOT_AUTHENTICATED:
			return { ...state, isAuthenticated: false };
		default:
			return state;
	}
};
