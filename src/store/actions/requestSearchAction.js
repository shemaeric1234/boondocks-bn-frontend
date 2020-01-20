/* eslint-disable no-unused-expressions, import/prefer-default-export */
import actionFunc from '../../utils/actionFunc';
import { LOADING, REQUEST_SEARCH_ERROR, REQUEST_SEARCH_SUCCESS } from './types';
import apiCall from '../../utils/api';
import axiosErrorHandler from '../../lib/services/axiosErrorHandler';

export const flNames = (firstName, lastName) =>
	`${firstName && firstName} ${lastName && lastName}`;

export const flInitials = (firstName, lastName) =>
	`${firstName && firstName.split('')[0]}${lastName && lastName.split('')[0]}`;

export const requestSearch = ({
	searchString,
	travelDate,
	returnDate,
}) => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	let searchTerm = `searchString=${searchString}`;
	const { role } = JSON.parse(localStorage.getItem('bn_user_data'));
	if (travelDate) searchTerm = `${searchTerm}&travelDate=${travelDate}`;
	if (returnDate) searchTerm = `${searchTerm}&returnDate=${returnDate}`;
	const isManager = role === 'manager';
	if (isManager) searchTerm = `byLineManager=true&${searchTerm}`;

	try {
		const { data } = await apiCall
			.get(`/search/requests?${searchTerm}`)
			.catch(axiosErrorHandler);
		const finalData = [];

		if (isManager) {
			finalData.push(
				...data.data.map(
					({ id, status, type, updatedAt, firstName, lastName, reason }) => ({
						id,
						'': flInitials(firstName, lastName),
						names: flNames(firstName, lastName),
						status,
						type,
						updatedAt,
						reason,
					}),
				),
			);
		} else {
			finalData.push(
				...data.data.map(({ id, status, type, updatedAt }) => ({
					id,
					status,
					type,
					updatedAt,
				})),
			);
		}
		dispatch(actionFunc(REQUEST_SEARCH_SUCCESS, finalData));
		dispatch(actionFunc(LOADING, false));
	} catch (error) {
		dispatch(actionFunc(REQUEST_SEARCH_ERROR, error));
		dispatch(actionFunc(LOADING, false));
	}
};
