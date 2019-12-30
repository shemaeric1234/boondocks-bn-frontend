import { REGISTER_FAIL, REGISTER_SUCCESS, BUTTON_LOADING } from './types';
import actionFunc from '../../utils/actionFunc';
import toast from '../../lib/toast';
import apiCall from '../../utils/api';

const host = window.location.origin;

const signup = userData => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.post(`/auth/signup?host=${host}`, {
			...userData,
		});
		dispatch(actionFunc(REGISTER_SUCCESS, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, 'Account successfully created');
	} catch (error) {
		dispatch(actionFunc(REGISTER_FAIL, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(error.response.data.status, error.response.data.message);
	}
};

export default signup;
