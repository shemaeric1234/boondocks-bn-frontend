import { combineReducers } from 'redux';
import signupReducer from './authReducers';
import loadingReducer from './loadingReducer';

const reducers = combineReducers({
	signupState: signupReducer,
	loadingState: loadingReducer,
});

export default reducers;
