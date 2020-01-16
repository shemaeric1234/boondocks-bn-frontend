import api from '../../utils/api';
import axiosErrorHandler from './axiosErrorHandler';

// eslint-disable-next-line import/prefer-default-export
export const updateRequestStatus = async (requestId, status) => {
	const res = await api
		.patch(`request/${requestId}`, { status })
		.catch(axiosErrorHandler);
	return res.data;
};

export const getSingleRequest = async requestId => {
	return api.get(`requests/${requestId}`).catch(axiosErrorHandler);
};
