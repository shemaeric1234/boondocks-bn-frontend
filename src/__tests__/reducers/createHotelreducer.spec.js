import createHotelReducer from '../../store/reducers/createHotelReducer';
import createRoomReducer from '../../store/reducers/createRoomsReducer'
import {
  CREATE_HOTEL_FAIL,
	CREATE_HOTEL_SUCCESS,
	CREATE_ROOM_FAIL,
  CREATE_ROOM_SUCCESS, 
} from '../../store/actions/types';

describe('Reset Password Reducer Tests ', () => {
  it('Should handle create room error state', () => {
		const failRoom = {
			type: CREATE_ROOM_FAIL,
			payload: {
        message: 'unable to create',
			}
		}
		const changedState = createRoomReducer(undefined, failRoom );
		expect(changedState).toEqual({
			status: 'error',
			error: failRoom.payload,
			data: null
		})
	});

	it('Should handle create hotel state', () => {
		const successhotel = {
			type: CREATE_HOTEL_SUCCESS,
			payload: {
        message: 'created hotel successful',
        data: {}
			}
		}
		const changedState = createHotelReducer(undefined, successhotel);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: successhotel.payload.data
		})
	});

	it('Should handle create room state', () => {
		const successRoom = {
			type: CREATE_ROOM_SUCCESS,
			payload: {
        message: 'created hotel successful',
        data: {}
			}
		}
		const changedState = createRoomReducer(undefined, successRoom);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: successRoom.payload
		})
	});

	it('Should handle create hotel error state', () => {
		const failhotel = {
			type: CREATE_HOTEL_FAIL,
			payload: {
        message: 'unable to create',
        data: {}
			}
		}
		const changedState = createHotelReducer(undefined, failhotel );
		expect(changedState).toEqual({
			status: 'error',
			error: failhotel.payload,
			data: null
		})
	});

	it('Should return default state', () => {
		const defaultState = createHotelReducer(undefined, {});
		expect(defaultState).toEqual({
			data: null,
	    error: null,
	    status: '',
		})
	});
});
