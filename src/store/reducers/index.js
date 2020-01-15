import { combineReducers } from 'redux';
import profile from './profile.reducer';
import signupReducer from './authReducers';
import loadingReducer from './loadingReducer';
import resetPassordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';
import isAuthenticatedReducer from './isAuthenticatedReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	resetState: resetPassordReducer,
	forgotState: resetPassordReducer,
	loadingState: loadingReducer,
	loginState: loginReducer,
	profileState: profile,
	authState: isAuthenticatedReducer,
});

export default reducers;
