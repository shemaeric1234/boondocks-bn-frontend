import singleRequestReducer from '../../store/reducers/singleRequestReducer';
import { FETCH_REQUEST_FAIL, FETCH_REQUEST_SUCCESS } from '../../store/actions/types';

describe('signupReducer Tests ', () => {
	it('Should handle fetch single request', () => {
		const requestFetchSuccessed = {
			type:  FETCH_REQUEST_SUCCESS,
			payload: {
        message: 'Successfully fetched request',
			}
		};
		const changedState = singleRequestReducer(undefined, requestFetchSuccessed);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: requestFetchSuccessed.payload
		})
	});
	it('Should handle fetch single request error', () => {
		const requestFetchFailed = {
			payload: {
				message: 'No request with such id',
			},
			type: FETCH_REQUEST_FAIL
		};
		const changedState = singleRequestReducer(undefined, requestFetchFailed);
		expect(changedState).toEqual({
			status: 'error',
			error: requestFetchFailed.payload,
			data: null
		})
	});
});
