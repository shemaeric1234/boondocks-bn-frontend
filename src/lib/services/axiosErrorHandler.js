import Toast from '../toast';

const axiosErrorHandler = error => {
	if (error.response) {
		if (Array.isArray(error.response.data.message)) {
			error.response.data.message.map(message => {
				Toast('error', message);
			});
			return;
		}
		Toast('error', error.response.data.message);
	} else if (error.request) {
		Toast('error', 'Service Unreacheable, check you internet connection');
	} else {
		Toast('error', 'Something went wrong');
	}
	return Promise.reject(error);
};

export default axiosErrorHandler;
