import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiCall = axios.create({
	baseURL: `${process.env.API_URL}/api/v1`,
	timeout: '8000ms',
});

apiCall.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${cookies.get('bn_auth_token')}`;
	return config;
});

export default apiCall;
