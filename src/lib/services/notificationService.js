import apiCall from '../../utils/api';
import axiosErrorHandler from './axiosErrorHandler';

export const notificationView = () => {
	return apiCall.get(`/notification`, {}).catch(axiosErrorHandler);
};

export const markAllAsRead = () => {
	return apiCall.patch(`/markAsRead`, {}).catch(axiosErrorHandler);
};
