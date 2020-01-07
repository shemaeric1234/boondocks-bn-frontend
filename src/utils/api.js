import axios from 'axios';

const apiCall = axios.create({
	baseURL: `${process.env.API_URL}/api/v1`,
	timeout: '8000ms',
});

apiCall.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
	return config;
});

export default apiCall;
