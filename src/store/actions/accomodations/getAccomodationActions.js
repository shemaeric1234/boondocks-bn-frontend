import toast from '../../../lib/toast';
import {
	FETCH_HOTEL_SUCCESS,
	FETCH_HOTEL_FAIL,
	FETCH_SINGLE_HOTEL_SUCCESS,
	FETCH_SINGLE_HOTEL_FAIL,
	LOADING,
} from '../types';
import actionFunc from '../../../utils/actionFunc';
import apiCall from '../../../utils/api';
import { getHotelById } from '../../../lib/services/accommodation.service';

export const getAllHotels = () => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	try {
		const res = await apiCall.get(`/hotels`);
		dispatch(actionFunc(FETCH_HOTEL_SUCCESS, res.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(FETCH_HOTEL_FAIL, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', error.response.data.message);
	}
};

export const getHotel = id => async dispatch => {
	dispatch(actionFunc(LOADING, true));

	try {
		const res = await getHotelById(id);
		dispatch(actionFunc(FETCH_SINGLE_HOTEL_SUCCESS, res.data));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(FETCH_SINGLE_HOTEL_FAIL, error.response.data));
		dispatch(actionFunc(LOADING, false));
		toast('error', error.response.data.message);
	}
};
