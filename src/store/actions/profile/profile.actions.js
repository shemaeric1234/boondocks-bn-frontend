import ACTION_TYPES from './types';
import {
	getUserProfile,
	getUsers,
	updateUserProfile,
} from '../../../lib/services/user.service';
import nullToStr from '../../../lib/helpers';
import {
	isEmail,
	isNotEmpty,
	isPhoneNumber,
	isValidDate,
	isValidId,
	isValidName,
} from '../../../utils/validations';
import actionFunc from '../../../utils/actionFunc';
import { BUTTON_LOADING, LOADING } from '../types';

/**
 * Fetch user profile and dispatch action on success
 * @param {Number} userId
 * @returns {function(...[*]=)}
 */
const fetchUserProfile = userId => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	const profileData = await getUserProfile(userId);

	const profile = profileData.data.data;
	const managersData = await getUsers('manager');
	const managers = managersData.data.data;

	dispatch(
		actionFunc(ACTION_TYPES.GET_USER_PROFILE_SUCCESS, {
			profile: nullToStr(profile),
			managers,
			userId,
		}),
	);
	dispatch(actionFunc(LOADING, false));
};

/**
 * Clean profile changes and return previous state
 * @returns {function(...[*]=)}
 */
const revertChanges = () => async dispatch => {
	dispatch(actionFunc(ACTION_TYPES.REVERT_CHANGES, false));
};

/**
 * Set profile edit mode
 * @param {Boolean} value
 * @returns {function(...[*]=)}
 */
const setIsEditing = value => async dispatch => {
	dispatch(actionFunc(ACTION_TYPES.SET_EDIT_MODE, value));
};

/**
 * stores temporary user changes in application store
 * @param input
 * @returns {function(...[*]=)}
 */
const updateProfile = input => async dispatch => {
	const schema = {
		firstName: {
			validate: isValidName,
			errorMessage: 'First Name is not valid',
		},
		lastName: {
			validate: isValidName,
			errorMessage: 'Last Name is not valid',
		},
		email: {
			validate: isEmail,
			errorMessage: 'Email is not valid',
		},
		birthDate: {
			validate: isValidDate,
			errorMessage: 'Allowed date must be less than 2010',
		},
		department: {
			validate: isNotEmpty,
			errorMessage: 'Department can not be empty',
		},
		gender: {
			validate: isNotEmpty,
			errorMessage: 'Gender can not be empty',
		},
		phoneNumber: {
			validate: isPhoneNumber,
			errorMessage: 'Invalid phone number',
		},
		residenceAddress: {
			validate: isNotEmpty,
			errorMessage: 'Residence Address can not be empty',
		},
		preferredCurrency: {
			validate: isNotEmpty,
			errorMessage: 'Preferred Currency can not be empty',
		},
		preferredLanguage: {
			validate: isNotEmpty,
			errorMessage: 'Preferred language can not be empty',
		},
		lineManager: {
			validate: isValidId,
			errorMessage: 'Line Manager must be a number',
		},
	};
	const name = Object.keys(input)[0];
	let errorMessage = null;
	const error = {};
	if (!schema[name].validate(input[name])) {
		errorMessage = schema[name].errorMessage;
	}
	input[name] = input[name].trim();
	const errorKey = `${name}Error`;
	error[errorKey] = errorMessage;
	dispatch(actionFunc(ACTION_TYPES.UPDATE_PROFILE, { input, error }));
};

/**
 * Update Profile and dispatch success action on success
 * @returns {function(...[*]=)}
 */
const saveProfile = userProfile => async dispatch => {
	userProfile.lineManagerId =
		userProfile.lineManager.id || userProfile.lineManager;
	delete userProfile.isVerified;
	delete userProfile.role;
	delete userProfile.lastLogin;
	delete userProfile.id;
	delete userProfile.createdAt;
	delete userProfile.updatedAt;
	delete userProfile.receiveNotification;

	const { lineManager, ...profile } = userProfile;

	dispatch(actionFunc(BUTTON_LOADING, true));
	await updateUserProfile(profile);

	const { userId } = JSON.parse(localStorage.getItem('bn_user_data'));
	const profileData = await getUserProfile(userId);

	const updatedProfile = profileData.data.data;
	dispatch(
		actionFunc(ACTION_TYPES.SAVE_PROFILE_SUCCESS, {
			updatedProfile,
			userId,
		}),
	);
};

export {
	fetchUserProfile,
	setIsEditing,
	updateProfile,
	saveProfile,
	revertChanges,
};
