import {
	REQUEST_SEARCH_ERROR,
	REQUEST_SEARCH_SUCCESS,
	// eslint-disable-next-line import/named
	IS_REQUEST_SEARCHING,
} from '../actions/types';

const initialState = { requests: [], error: null };

export default (state = initialState, { type, payload } = {}) => {
	switch (type) {
		case REQUEST_SEARCH_SUCCESS:
			return { ...state, requests: payload };
		case REQUEST_SEARCH_ERROR:
			return { ...state, error: payload };
		default:
			return state;
	}
};

export const isSearching = (state = false, { type, payload }) =>
	type === IS_REQUEST_SEARCHING ? payload : state;
