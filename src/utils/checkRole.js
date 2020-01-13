const checkRole = role => {
	if (
		!!localStorage.bn_user_data &&
		JSON.parse(localStorage.bn_user_data).role === role
	) {
		return true;
	}
	return false;
};

export default checkRole;
