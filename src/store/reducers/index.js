import { combineReducers } from 'redux';

// This will be removed
function sampleReducer(state = {}, action) {
	return state;
}
const reducers = combineReducers({
	// this will be removed
	sampleState: sampleReducer,
});

export default reducers;
