/* eslint-disable no-return-await */
import api from '../../utils/api';
import axiosErrorHandler from './axiosErrorHandler';

/**
 * Retrieve user profile
 * @param userId
 * @returns {Promise<T>}
 */
export const getUserProfile = async userId => {
	return await api.get(`user/${userId}`).catch(axiosErrorHandler);
};

/**
 * Update user profile
 * @param userProfile
 * @returns {Promise<T>}
 */
export const updateUserProfile = async userProfile => {
	return await api
		.patch(`user/update-profile`, userProfile)
		.catch(axiosErrorHandler);
};

/**
 * Get profile by role, returns all users when role is not given
 * @param role
 * @returns {Promise<T>}
 */
export const getUsers = async role => {
	return await api
		.get('auth/users', { params: { role } })
		.catch(axiosErrorHandler);
};

/**
 * Change user role
 * @param {Object} user info
 */
export const updateUserRole = async ({ email, role }) => {
	return await api
		.patch('auth/user/role', { email, role })
		.catch(axiosErrorHandler);
};
