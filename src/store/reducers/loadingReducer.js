import { LOADING, BUTTON_LOADING } from '../actions/types';

const initialState = {
	loading: false,
	buttonLoading: false,
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: action.payload,
			};
		case BUTTON_LOADING:
			return {
				...state,
				buttonLoading: action.payload,
			};
		default:
			return state;
	}
}
