import { combineReducers } from 'redux';
import profile from './profileReducer';
import signupReducer from './authReducers';
import loadingReducer from './loadingReducer';
import resetPassordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';
import isAuthenticatedReducer from './isAuthenticatedReducer';
import usersReducer from './usersReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	resetState: resetPassordReducer,
	forgotState: resetPassordReducer,
	loadingState: loadingReducer,
	loginState: loginReducer,
	profileState: profile,
	authState: isAuthenticatedReducer,
	usersState: usersReducer,
});

export default reducers;
