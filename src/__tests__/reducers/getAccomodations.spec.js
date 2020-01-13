import getAccomodationReducer from '../../store/reducers/getAccomodationReducers';
import getSingleAccomodationReducer from '../../store/reducers/getSingleHotelReducer';
import {
  FETCH_HOTEL_SUCCESS, FETCH_HOTEL_FAIL,
  FETCH_SINGLE_HOTEL_SUCCESS,
	FETCH_SINGLE_HOTEL_FAIL,
} from '../../store/actions/types';

describe('Reset Password Reducer Tests ', () => {
  it('Should handle create room error state', () => {
		const failhotel = {
			type: FETCH_HOTEL_FAIL,
			payload: {
        message: 'unable to fetch',
			}
		}
		const changedState = getAccomodationReducer(undefined, failhotel );
		expect(changedState).toEqual({
			status: 'error',
			error: failhotel.payload,
			data: null
		})
	});

	it('Should handle create hotel state', () => {
		const successhotel = {
			type: FETCH_HOTEL_SUCCESS,
			payload: {
        message: 'fetched hotels successful',
        data: {}
			}
		}
		const changedState = getAccomodationReducer(undefined, successhotel);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: successhotel.payload.data
		})
	});

	it('Should handle create room state', () => {
		const successRoom = {
			type: FETCH_SINGLE_HOTEL_SUCCESS,
			payload: {
        message: 'fetched hotel successful',
        data: {}
			}
		}
		const changedState = getSingleAccomodationReducer(undefined, successRoom);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: successRoom.payload.data
		})
	});

	it('Should handle create hotel error state', () => {
		const failhotel = {
			type: FETCH_SINGLE_HOTEL_FAIL,
			payload: {
        message: 'unable to fetch',
        data: {}
			}
		}
		const changedState = getSingleAccomodationReducer(undefined, failhotel );
		expect(changedState).toEqual({
			status: 'error',
			error: failhotel.payload,
			data: null
		})
	});

	it('Should return default state', () => {
		const defaultState = getSingleAccomodationReducer(undefined, {});
		expect(defaultState).toEqual({
			data: null,
	    error: null,
	    status: '',
		})
	});
});
