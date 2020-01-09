import signupReducer from '../../store/reducers/authReducers';
import { REGISTER_FAIL, REGISTER_SUCCESS } from '../../store/actions/types';

describe('signupReducer Tests ', () => {
	it('Should handle signup', () => {
		const signupSuccessed = {
			type:  REGISTER_SUCCESS,
			payload: {
        message: 'Successfully signed up into Barefoot nomad',
			}
		};
		const changedState = signupReducer(undefined, signupSuccessed);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: signupSuccessed.payload
		})
	});
	it('Should handle signup error', () => {
		const signupFail = {
			payload: {
				message: 'Invalid inputs',
			},
			type: REGISTER_FAIL
		};
		const changedState = signupReducer(undefined, signupFail);
		expect(changedState).toEqual({
			status: 'error',
			error: signupFail.payload,
			data: null
		})
	});
});
