import { REQUEST_FETCH_FAILURE, REQUEST_FETCH_SUCCESS } from '../actions/types';

const initialState = {
	requestData: [],
	requestError: null,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case REQUEST_FETCH_SUCCESS:
			return {
				...state,
				requestData: payload,
				requestError: null,
			};
		case REQUEST_FETCH_FAILURE:
			return {
				...state,
				requestData: [],
				requestError: payload,
			};
		default:
			return state;
	}
};

export default reducer;
