import apiCall from '../../utils/api';
import axiosErrorHandler from './axiosErrorHandler';

export const postComment = (userComment, id) => {
	return apiCall
		.post(`/requests/${id}/comment`, {
			...userComment,
		})
		.catch(axiosErrorHandler);
};

export const deleteComment = id => {
	return apiCall.patch(`/comments/${id}/delete`).catch(axiosErrorHandler);
};
