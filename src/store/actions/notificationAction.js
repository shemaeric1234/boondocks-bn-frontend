import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ_SUCCESS } from './types';
import actionFunc from '../../utils/actionFunc';
import {
	notificationView,
	markAllAsRead,
} from '../../lib/services/notificationService';

export const notification = () => async dispatch => {
	const res = await notificationView();
	dispatch(actionFunc(FETCH_NOTIFICATIONS_SUCCESS, res.data));
};

export const markAllNotificationAsRead = () => async dispatch => {
	const res = await markAllAsRead();

	dispatch(actionFunc(MARK_AS_READ_SUCCESS, res.data));
};
