/* eslint-disable import/named */
import {
	ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE,
	ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS,
} from '../actions/types';

const initialState = { data: null, error: null };

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS:
			return { ...state, data: payload, error: null };

		case ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE:
			return { ...state, data: null, error: payload };

		default:
			return state;
	}
};
