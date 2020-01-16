import ACTION_TYPES from '../actions/profile/types';

const initialState = {
	userProfile: {},
	currentUserId: null,
	errors: {},
	managers: [],
	initialProfile: {},
	isFetching: false,
	fetchError: null,
	isEditing: false,
};

export const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPES.GET_USER_PROFILE_SUCCESS:
			return {
				...state,
				userProfile: payload.profile,
				currentUserId: payload.userId,
				managers: payload.managers,
				isFetching: false,
				fetchError: null,
			};

		case ACTION_TYPES.REVERT_CHANGES:
			return {
				...state,
				isEditing: payload,
				userProfile: state.initialProfile,
				errors: {},
			};

		case ACTION_TYPES.SET_EDIT_MODE:
			return {
				...state,
				isEditing: payload,
				initialProfile: state.userProfile,
			};
		case ACTION_TYPES.UPDATE_PROFILE:
			return {
				...state,
				userProfile: {
					...state.userProfile,
					...payload.input,
				},
				errors: {
					...state.errors,
					...payload.error,
				},
			};

		case ACTION_TYPES.SAVE_PROFILE_SUCCESS:
			return {
				...state,
				userProfile: payload.updatedProfile,
				currentUserId: payload.userId,
				isFetching: false,
				fetchError: null,
			};
		default:
			return state;
	}
};

export default reducer;
