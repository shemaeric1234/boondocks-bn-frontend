import { combineReducers } from 'redux';
import profile from './profile.reducer';
import signupReducer from './authReducers';
import requestReducer from './requestReducer';
import loadingReducer from './loadingReducer';
import resetPassordReducer from './resetPasswordReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	resetState: resetPassordReducer,
	forgotState: resetPassordReducer,
	loadingState: loadingReducer,
	loginState: loginReducer,
	profileState: profile,
	requestState: requestReducer,
});

export default reducers;
