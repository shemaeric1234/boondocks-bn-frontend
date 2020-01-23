// eslint-disable-next-line import/named
import { REQUEST_FETCH_SUCCESS } from '../actions/types';

const initialState = {
	requestsData: [],
	requestsError: null,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case REQUEST_FETCH_SUCCESS:
			return {
				...state,
				requestsData: payload,
				requestsError: null,
			};
		default:
			return state;
	}
};

export default reducer;
