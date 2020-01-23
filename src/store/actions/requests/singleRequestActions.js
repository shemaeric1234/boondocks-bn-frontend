import {
	BUTTON_LOADING,
	FETCH_REQUEST_SUCCESS,
	LOADING,
	REQUEST_STATUS_CHANGE_SUCCESS,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import toast from '../../../lib/toast';
import {
	getSingleRequest,
	updateRequestStatus,
} from '../../../lib/services/requests.service';

const singleRequest = id => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	const res = await getSingleRequest(id);
	dispatch(actionFunc(FETCH_REQUEST_SUCCESS, res.data));
	dispatch(actionFunc(LOADING, false));
};

export const changeRequestStatus = (requestId, status) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	const request = await updateRequestStatus(requestId, status);
	dispatch(actionFunc(REQUEST_STATUS_CHANGE_SUCCESS, request.data.status));
	toast('success', request.message);

	const updatedRequest = await getSingleRequest(requestId);
	dispatch(actionFunc(FETCH_REQUEST_SUCCESS, updatedRequest.data));
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export default singleRequest;
