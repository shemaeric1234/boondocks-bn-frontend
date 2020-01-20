/* eslint-disable import/no-extraneous-dependencies */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const startState = {};
const mockStore = configureMockStore([thunk]);

export const makeMockStore = (state = {}) => {
	return mockStore({
		...startState,
		...state,
	});
};

export const mockSuccess = data => ({ status: 200, response: data });
export const mockError = error => ({ status: 404, response: error.response });
