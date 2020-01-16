import actionFunc from '../../../utils/actionFunc';
import NAVBAR_TYPES from './navbarTypes';
import ROLE_TYPES from '../roles/rolesTypes';
import {
	navItemObjects,
	notificationsItems,
} from '../../../components/NavbarData';

const updateNavbar = () => dispatch => {
	let navItems = [];
	const user = JSON.parse(localStorage.getItem('bn_user_data')) || {};

	if (ROLE_TYPES.includes(user.role)) {
		navItems = [...navItemObjects.general, ...navItemObjects[user.role]];
	} else {
		navItems = [...navItemObjects.un_authenticated];
	}

	dispatch(
		actionFunc(NAVBAR_TYPES.UPDATE_NAVBAR, {
			navItems,
			notificationsItems,
		}),
	);
};

export default updateNavbar;
