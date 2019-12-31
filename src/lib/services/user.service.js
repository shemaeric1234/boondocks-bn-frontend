import api from '../../utils/api';

/**
 * Retrieve user profile
 * @param userId
 * @returns {Promise<T>}
 */
export const getUserProfile = async userId => {
	return await api.get(`user/${userId}`);
};

/**
 * Update user profile
 * @param userProfile
 * @returns {Promise<T>}
 */
export const updateUserProfile = async userProfile => {
	return await api.patch(`user/update-profile`, userProfile);
};

/**
 * Get profile by role
 * @param role
 * @returns {Promise<T>}
 */
export const getUsers = async role => {
	return await api.get(`auth/users?role=${role}`);
};
