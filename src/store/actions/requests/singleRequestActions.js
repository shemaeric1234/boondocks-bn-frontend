import { FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAIL, LOADING } from '../types';
import actionFunc from '../../../utils/actionFunc';
import apiCall from '../../../utils/api';
import toast from '../../../lib/toast';
import axiosErrorHandler from '../../../lib/services/axiosErrorHandler';

const singleRequest = id => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.get(`/requests/${id}`).catch(axiosErrorHandler);
		dispatch(actionFunc(FETCH_REQUEST_SUCCESS, res.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(FETCH_REQUEST_FAIL, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', error.response.data.message);
	}
};

export default singleRequest;
