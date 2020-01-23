import apiCall from '../../utils/api';
import axiosErrorHandler from './axiosErrorHandler';

const postComment = (userComment, id) => {
	return apiCall
		.post(`/requests/${id}/comment`, {
			...userComment,
		})
		.catch(axiosErrorHandler);
};

export default postComment;
