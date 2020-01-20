import NAVBAR_TYPES from '../actions/navbar/navbarTypes';

const initialState = {
	navItems: [],
	notifications: [],
};

const navbarReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case NAVBAR_TYPES.UPDATE_NAVBAR:
			return {
				...state,
				navItems: payload.navItems,
				notifications: payload.notificationsItems,
			};
		default:
			return state;
	}
};

export default navbarReducer;
