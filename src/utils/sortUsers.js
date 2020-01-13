const compareUsers = (a, b) => {
	const userA = a.firstName.toUpperCase();
	const userB = b.firstName.toUpperCase();

	let comparison = 0;
	if (userA > userB) {
		comparison = 1;
	} else if (userA < userB) {
		comparison = -1;
	}
	return comparison;
};

export default compareUsers;
