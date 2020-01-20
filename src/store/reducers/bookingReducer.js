import { GET_BOOKING_SUCCESS } from '../actions/types';

const initialState = {
	booking: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_BOOKING_SUCCESS:
			return {
				...state,
				booking: action.payload,
			};

		default:
			return state;
	}
};
