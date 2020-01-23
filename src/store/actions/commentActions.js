import {
	COMMENT_SUCCESS,
	FETCH_REQUEST_SUCCESS,
	BUTTON_LOADING,
} from './types';
import actionFunc from '../../utils/actionFunc';
import axiosErrorHandler from '../../lib/services/axiosErrorHandler';
import postComment from '../../lib/services/commentService';
import apiCall from '../../utils/api';

const comment = (userComment, id) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	const res = await postComment(userComment, id);
	dispatch(actionFunc(COMMENT_SUCCESS, res.data));

	const response = await apiCall
		.get(`/requests/${id}`)
		.catch(axiosErrorHandler);
	dispatch(actionFunc(FETCH_REQUEST_SUCCESS, response.data));
	dispatch(actionFunc(BUTTON_LOADING, false));
};

export default comment;
