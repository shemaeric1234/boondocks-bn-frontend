import Cookies from 'universal-cookie';
import JWTDecode from 'jwt-decode';

const cookies = new Cookies();

const storeToken = token => {
	cookies.set('bn_auth_token', token, {
		path: '/',
		maxAge: 86400,
	});
};

const decodeToken = token => {
	const userData = JWTDecode(token);
	localStorage.setItem('bn_user_data', JSON.stringify(userData));
};

export { storeToken, decodeToken };
