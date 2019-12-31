import loginReducer from '../../store/reducers/loginReducer';
import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../store/actions/types';

describe('Login Reducer Tests ', () => {
	it('Should change loggedIn state to true', () => {
		const loginSuccessful = {
			type: LOGIN_SUCCESS,
			payload: 'success'
		}
		const changedState = loginReducer(undefined, loginSuccessful);
		expect(changedState).toEqual({
      loggedIn: true,
      data: loginSuccessful.payload,
      error: null,
		})
	});

	it('Should return a login error', () => {
		const loginFailed = {
			type: LOGIN_FAILURE,
			payload: 'invalid credentials'
		}
		const changedState = loginReducer(undefined, loginFailed);
		expect(changedState).toEqual({
      loggedIn: false,
      data: null,
      error: loginFailed.payload,
		})
	});

	it('Should return default state', () => {
		const defaultState = loginReducer(undefined, {});
		expect(defaultState).toEqual({
      loggedIn: false,
      data: null,
      error: null,
		})
	});
});
