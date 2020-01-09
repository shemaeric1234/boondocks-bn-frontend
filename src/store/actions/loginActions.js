import Cookies from 'universal-cookie';
import toast from '../../lib/toast';
import { LOGIN_FAILURE, LOGIN_SUCCESS, BUTTON_LOADING } from './types';
import actionFunc from '../../utils/actionFunc';
import apiCall from '../../utils/api';
import { storeToken, decodeToken } from '../../helpers/authHelper';

const login = userRequest => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.post('/auth/signin', userRequest);
		storeToken(res.data.data.token);
		decodeToken(res.data.data.token);
		dispatch(actionFunc(LOGIN_SUCCESS, res.data.message));
	} catch (error) {
		dispatch(actionFunc(LOGIN_FAILURE, error.response.data.message));
		toast(error.response.data.status, error.response.data.message);
	}
	dispatch(actionFunc(BUTTON_LOADING, false));
};

const hasLoggedIn = () => async dispatch => {
	const cookies = new Cookies();

	const token = cookies.get('bn_auth_token');
	decodeToken(token);
	if (token) {
		dispatch(actionFunc(LOGIN_SUCCESS, 'success'));
	}
};

export { login, hasLoggedIn };
