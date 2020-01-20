import { LOADING, BUTTON_LOADING } from '../types';
import { getUsers, updateUserRole } from '../../../lib/services/user.service';
import actionFunc from '../../../utils/actionFunc';
import ACTION_TYPES from './usersTypes';
import compareUsers from '../../../utils/sortUsers';
import Toast from '../../../lib/toast';

const fetchUsers = () => async dispatch => {
	dispatch(actionFunc(LOADING, true));
	const usersData = await getUsers();
	const users = usersData.data.data.sort(compareUsers);
	dispatch(
		actionFunc(ACTION_TYPES.GET_USERS_SUCCESS, {
			users,
		}),
	);
	dispatch(actionFunc(LOADING, false));
};

const setSelectedUser = user => async dispatch => {
	dispatch(
		actionFunc(ACTION_TYPES.USER_SELECTION_SUCCESS, {
			...user,
		}),
	);
};

const changeRole = user => async dispatch => {
	dispatch(actionFunc(BUTTON_LOADING, true));
	const res = await updateUserRole(user);
	dispatch(actionFunc(ACTION_TYPES.CHANGE_USER_ROLE_SUCCESS, {}));

	const usersData = await getUsers();
	const users = usersData.data.data.sort(compareUsers);

	dispatch(
		actionFunc(ACTION_TYPES.GET_USERS_SUCCESS, {
			users,
		}),
	);
	dispatch(actionFunc(BUTTON_LOADING, false));
	Toast('success', res.data.message);
};

const saveNewRole = role => async dispatch => {
	dispatch(actionFunc(ACTION_TYPES.NEW_ROLE_SELECTION_SUCCESS, role));
};

const cancelRoleAssign = () => async dispatch => {
	dispatch(actionFunc(ACTION_TYPES.ROLE_ASSIGN_CANCELED, {}));
};

export {
	fetchUsers,
	setSelectedUser,
	changeRole,
	cancelRoleAssign,
	saveNewRole,
};
