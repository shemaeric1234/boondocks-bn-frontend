import resetPasswordReducer from '../../store/reducers/resetPasswordReducer';
import { ERROR, RESET_PASSWORD, FORGOT_PASSWORD } from '../../store/actions/types';

describe('Reset Password Reducer Tests ', () => {
	it('Should handle forgot password', () => {
		const successForgotPassword = {
			type: FORGOT_PASSWORD,
			payload: {
        message: 'Updated your password successful',
			}
		};
		const changedState = resetPasswordReducer(undefined, successForgotPassword);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: successForgotPassword.payload
		})
	});

	it('Should handle reset password', () => {
		const successresetPassword = {
			payload: {
				message: 'successful reset password',
			},
			type: RESET_PASSWORD
		};
		const changedState = resetPasswordReducer(undefined, successresetPassword);
		expect(changedState).toEqual({
			status: 'success',
			error: null,
			data: successresetPassword.payload
		})
	});

	it('Should handle error reset password', () => {
		const errorResetPassword = {
			payload: {
				message: 'invalid password',
			},
			type: ERROR
		};
		const changedState = resetPasswordReducer(undefined, errorResetPassword);
		expect(changedState).toEqual({
			status: 'error',
			error: errorResetPassword.payload,
			data: null
		})
	});

	it('Should handle error forgot password', () => {
		const errorforgotPassword = {
			payload: {
				message: 'invalid password',
			},
			type: ERROR
		};
		const changedState = resetPasswordReducer(undefined, errorforgotPassword);
		expect(changedState).toEqual({
			status: 'error',
			error: errorforgotPassword.payload,
			data: null
		})
	});

	it('Should return default state', () => {
		const defaultState = resetPasswordReducer(undefined, {});
		expect(defaultState).toEqual({
			status: '',
			error: null,
			data: null
		})
	});
});
