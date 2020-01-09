import { combineReducers } from 'redux';
import profile from './profile.reducer';
import signupReducer from './authReducers';
import loadingReducer from './loadingReducer';
import resetPasswordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';
import requestReducer from './requestReducer';
import isAuthenticatedReducer from './isAuthedReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	resetState: resetPasswordReducer,
	forgotState: resetPasswordReducer,
	loadingState: loadingReducer,
	loginState: loginReducer,
	profileState: profile,
	requestState: requestReducer,
	authState: isAuthenticatedReducer,
});

export default reducers;
