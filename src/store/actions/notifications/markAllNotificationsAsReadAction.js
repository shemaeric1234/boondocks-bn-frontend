/* eslint-disable import/named */
import actionFunc from '../../../utils/actionFunc';
import {
	ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE,
	ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS,
	BUTTON_LOADING,
} from '../types';
import apiCall from '../../../utils/api';
import toast from '../../../lib/toast';

const markAllNotificationsAsRead = () => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.patch(`/markAsRead`);
		dispatch(actionFunc(ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, res.data.message);
	} catch (error) {
		dispatch(
			actionFunc(ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE, error.response.data),
		);
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(error.response.data.status, error.response.data.message);
	}
};

export default markAllNotificationsAsRead;
