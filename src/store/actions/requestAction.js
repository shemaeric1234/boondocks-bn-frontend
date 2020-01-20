/* eslint-disable
 no-shadow,
 import/prefer-default-export,
 no-unused-expressions
*/
import actionFunc from '../../utils/actionFunc';
import { LOADING, REQUEST_FETCH_FAILURE, REQUEST_FETCH_SUCCESS } from './types';
import apiCall from '../../utils/api';

/**
 * Get requests by type
 * @param status
 * @returns {function(...[*]=)}
 */
export const getRequests = status => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	const { role } = JSON.parse(localStorage.bn_user_data);
	const requestAPIPath = role === 'manager' ? '/requests/manager' : '/requests';

	try {
		const { data } = await apiCall.get(
			requestAPIPath + (status !== 'all' ? `?status=${status}` : ''),
		);

		dispatch(
			actionFunc(
				REQUEST_FETCH_SUCCESS,
				data.data
					.reverse()
					.map(({ id, status, type, updatedAt, user, trips }) => {
						let requestData = {
							status,
							type,
							reason: trips.map(trip => trip.reason)[0],
							updatedAt,
						};

						if (user) {
							requestData = {
								...{
									'': `${user.firstName.split('')[0]}${
										user.lastName.split('')[0]
									}`,
									names: `${user.firstName} ${user.lastName}`,
								},
								...requestData,
							};
						}
						return { id, ...requestData };
					}),
			),
		);
	} catch (error) {
		dispatch(actionFunc(REQUEST_FETCH_FAILURE, error.response.data));
	}
	dispatch(actionFunc(LOADING, false));
};
