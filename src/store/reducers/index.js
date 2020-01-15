import { combineReducers } from 'redux';
import profile from './profileReducer';
import signupReducer from './authReducers';
import loadingReducer from './loadingReducer';
import resetPassordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';
import isAuthenticatedReducer from './isAuthenticatedReducer';
import errorReducer from './errorHandlerReducer';
import requestPageLimitReducer from './requestPageLimitReducer';
import requestReducer from './requestReducer';
import singleRequestReducer from './singleRequestReducer';
import usersReducer from './usersReducer';
import navbarReducer from './navbarReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	resetState: resetPassordReducer,
	forgotState: resetPassordReducer,
	loadingState: loadingReducer,
	loginState: loginReducer,
	profileState: profile,
	authState: isAuthenticatedReducer,
	errorState: errorReducer,
	requestPageLimitState: requestPageLimitReducer,
	requestsState: requestReducer,
	singleRequestState: singleRequestReducer,
	authState: isAuthenticatedReducer,
	usersState: usersReducer,
	navbarState: navbarReducer,
});

export default reducers;
