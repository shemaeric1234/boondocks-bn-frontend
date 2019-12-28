import toast from '../../lib/toast';
import {
	ERROR,
	RESET_PASSWORD,
	FORGOT_PASSWORD,
	BUTTON_LOADING,
} from './types';
import actionFunc from '../../utils/actionFunc';
import apiCall from '../../utils/api';

const host = window.location.origin;

export const forgotPassword = ({ email }) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.post(`/auth/forgotPassword?host=${host}`, {
			email,
		});
		dispatch(actionFunc(FORGOT_PASSWORD, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, res.data.message);
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(error.response.data.status, error.response.data.message);
	}
};

export const resetPassword = ({ password, token }) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.patch(
			'/auth/resetPassword',
			{
				password,
			},
			{ params: { token } },
		);
		dispatch(actionFunc(RESET_PASSWORD, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, 'Password successfully updated please login');
	} catch (error) {
		dispatch(actionFunc(ERROR, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(error.response.data.status, error.response.data.message);
	}
};
