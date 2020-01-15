export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';
export default (state = [], action) => {
	switch (action.type) {
		case ADD_ERROR:
			return state.concat([action.error]);
		case REMOVE_ERROR:
			return state.filter((error, i) => i !== action.index);
		default:
			return state;
	}
};
