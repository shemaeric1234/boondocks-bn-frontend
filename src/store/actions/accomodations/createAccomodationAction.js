import toast from '../../../lib/toast';
import {
	CREATE_HOTEL_FAIL,
	CREATE_HOTEL_SUCCESS,
	CREATE_ROOM_SUCCESS,
	CREATE_ROOM_FAIL,
	BUTTON_LOADING,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import apiCall from '../../../utils/api';

export const createHotel = data => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.post(`/hotels`, data, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
		dispatch(actionFunc(CREATE_HOTEL_SUCCESS, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, res.data.message);
	} catch (error) {
		dispatch(actionFunc(CREATE_HOTEL_FAIL, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast('error', 'something went wrong, please try again ');
	}
};

export const createRoom = (data, id) => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	try {
		const res = await apiCall.post(`/hotels/${id}/rooms`, data, {
			headers: {
				'content-type': 'multipart/form-data',
			},
		});
		dispatch(actionFunc(CREATE_ROOM_SUCCESS, res.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast(res.data.status, res.data.message);
	} catch (error) {
		dispatch(actionFunc(CREATE_ROOM_FAIL, error.response.data));
		dispatch(actionFunc(BUTTON_LOADING, false));
		toast('error', 'something went wrong, please try again');
	}
};
