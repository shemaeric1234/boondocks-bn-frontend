import api from './api';

const apiExtend = { ...api };
apiExtend.interceptors.response.use(
	response => {
		return response.data;
	},
	error => {
		if (error.response) {
			return Promise.resolve({ data: { error: error.response } });
		}
		if (error.request) {
			return Promise.resolve({
				data: {
					error: { data: { message: 'Service unreachable' }, status: 503 },
				},
			});
		}
		return Promise.resolve({
			data: {
				error: { message: 'Something went wrong' },
			},
		});
	},
);

export default apiExtend;
