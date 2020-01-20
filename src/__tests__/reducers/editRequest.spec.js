import editRquestReducer from '../../store/reducers/editRequestReducer';
import { UPDATE_TRIP_SUCCESS, UPDATE_TRIP_FAIL } from '../../store/actions/types';

describe('Edit request Tests ', () => {
	it('Should handle Edit request', () => {
		const signupSuccessed = {
			type:  UPDATE_TRIP_SUCCESS,
			payload: {
        message: 'Successfully signed up into Barefoot nomad',
			}
		};
		const changedState = editRquestReducer(undefined, signupSuccessed);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: signupSuccessed.payload
		})
	});
	it('Should handle Edit request error', () => {
		const signupFail = {
			payload: {
				message: 'Invalid inputs',
			},
			type: UPDATE_TRIP_FAIL
		};
		const changedState = editRquestReducer(undefined, signupFail);
		expect(changedState).toEqual({
			status: 'error',
			error: signupFail.payload,
			data: null
		})
	});
});
