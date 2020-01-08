import {
	GET_MANAGER_REQUESTS_SUCCESS,
	GET_MANAGER_REQUESTS_FAIL,
	GET_ONE_MANAGER_REQUEST_SUCCESS,
	GET_ONE_MANAGER_REQUEST_FAIL,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import apiCall from '../../../utils/api';

const host = window.location.origin;

const getManagerRequests = () => async dispatch => {
	try {
		const res = await apiCall.post(`/requests/manager?host=${host}`, {});
		dispatch(actionFunc(GET_MANAGER_REQUESTS_SUCCESS, res.data));
	} catch (error) {
		dispatch(actionFunc(GET_MANAGER_REQUESTS_FAIL, error.response.data));
	}
};

const getOneManagerRequests = requestId => async dispatch => {
	try {
		const res = await apiCall.post(``, {
			requestId,
		});
		dispatch(actionFunc(GET_ONE_MANAGER_REQUEST_SUCCESS, res.data));
	} catch (error) {
		dispatch(actionFunc(GET_ONE_MANAGER_REQUEST_FAIL, error.response.data));
	}
};

export default { getManagerRequests, getOneManagerRequests };
