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
import createHotelReducer from './createHotelReducer';
import getAccomodationReducers from './getAccomodationReducers';
import getSingleHotelReducer from './getSingleHotelReducer';
import createRoomsReducer from './createRoomsReducer';
import commentReducer from './commentReducer';

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
	usersState: usersReducer,
	navbarState: navbarReducer,
	createHotelState: createHotelReducer,
	createRoomState: createRoomsReducer,
	hotelState: getAccomodationReducers,
	singleHotelState: getSingleHotelReducer,
	commentState: commentReducer,
});

export default reducers;
