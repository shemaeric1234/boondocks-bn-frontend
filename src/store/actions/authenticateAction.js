import Cookies from 'universal-cookie';
import actionFunc from '../../utils/actionFunc';
import { IS_AUTHENTICATED, NOT_AUTHENTICATED } from './types';
import { decodeToken } from '../../helpers/authHelper';

const setAuthenticate = isAuthenticated => dispatch => {
	const cookies = new Cookies();
	const authCookie = cookies.get('bn_auth_token');

	if (authCookie) {
		if (isAuthenticated) {
			decodeToken(authCookie);
			dispatch(actionFunc(IS_AUTHENTICATED));
		} else {
			cookies.remove('bn_auth_token');
			localStorage.removeItem('bn_user_data');
			dispatch(actionFunc(NOT_AUTHENTICATED));
		}
	}
};

export default setAuthenticate;
