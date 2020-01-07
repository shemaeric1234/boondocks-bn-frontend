import { combineReducers } from 'redux';
import signupReducer from './authReducers';
import loadingReducer from './loadingReducer';
import resetPassordReducer from './resetPasswordReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	resetState: resetPassordReducer,
	forgotState: resetPassordReducer,
	loadingState: loadingReducer,
});

export default reducers;
