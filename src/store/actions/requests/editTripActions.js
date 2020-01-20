import toast from '../../../lib/toast';
import {
	UPDATE_TRIP_SUCCESS,
	UPDATE_TRIP_FAIL,
	BUTTON_LOADING,
	FETCH_REQUEST_SUCCESS,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import apiCall from '../../../utils/api';

// eslint-disable-next-line import/prefer-default-export
export const updateTrip = (data, id, requestId) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.patch(`/trips/${id}`, data);
		dispatch(actionFunc(UPDATE_TRIP_SUCCESS, res.data));
		const response = await apiCall.get(`/requests/${requestId}`);
		dispatch(actionFunc(FETCH_REQUEST_SUCCESS, response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, res.data.message);
	} catch (error) {
		dispatch(actionFunc(UPDATE_TRIP_FAIL, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(error.response.data.status, error.response.data.message);
	}
};
