import actionFunc from '../../utils/actionFunc';
import {
	BUTTON_LOADING,
	REQUEST_FETCH_FAILURE,
	REQUEST_FETCH_SUCCESS,
} from './types';
import apiCall from '../../utils/api';

const requests = (status = 'all') => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	const requestAPIPath = `/requests${
		status !== 'all' ? `?status=${status}` : ''
	}`;
	try {
		const res = await apiCall.get(requestAPIPath);
		dispatch(actionFunc(REQUEST_FETCH_SUCCESS, res.data));
	} catch (error) {
		dispatch(actionFunc(REQUEST_FETCH_FAILURE, error.response.data));
	}
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export default requests;
