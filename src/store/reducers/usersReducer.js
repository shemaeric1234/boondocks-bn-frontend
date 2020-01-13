import ACTION_TYPES from '../actions/users/usersTypes';

const initialState = {
	users: [],
	selectedUser: {},
};

const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPES.GET_USERS_SUCCESS:
			return {
				...state,
				users: payload.users,
			};

		case ACTION_TYPES.USER_SELECTION_SUCCESS:
			return {
				...state,
				selectedUser: payload,
			};

		case ACTION_TYPES.CHANGE_USER_ROLE_SUCCESS:
			return {
				...state,
				selectedUser: {},
			};

		case ACTION_TYPES.ROLE_ASSIGN_CANCELED:
			return {
				...state,
				selectedUser: {},
			};
		case ACTION_TYPES.NEW_ROLE_SELECTION_SUCCESS:
			return {
				...state,
				selectedUser: {
					...state.selectedUser,
					role: payload,
				},
			};
		default:
			return state;
	}
};

export default usersReducer;
