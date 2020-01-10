import { COMMENT_SUCCESS, COMMENT_FAIL, BUTTON_LOADING } from './types';
import actionFunc from '../../utils/actionFunc';
import toast from '../../lib/toast';
import apiCall from '../../utils/api';

const comment = (userComment, id) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.post(`/requests/${id}/comment`, {
			...userComment,
		});
		dispatch(actionFunc(COMMENT_SUCCESS, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
	} catch (error) {
		dispatch(actionFunc(COMMENT_FAIL, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast('error', error.response.data.message);
	}
};

export default comment;
