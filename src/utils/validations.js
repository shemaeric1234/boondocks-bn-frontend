export const validation = {
	validName: {
		pattern: '[a-zA-Z]{1,}',
		error: 'Please enter a valid name.',
	},
	validRoomName: {
		pattern: '^[a-zA-Z].*[\\s\\.]*$',
		error: 'Please enter a valid name.',
	},
	validPassword: {
		pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$',
		error: `Please enter a valid password.
		 eg: Test@123`,
	},
	validEmail: {
		pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
		error: 'Please enter a valid email. eg. "email@example.com"',
	},
	validState: {
		pattern:
			// eslint-disable-next-line max-len
			"^[a-zA-Z\\u0080-\\u024F]+(?:. |-| |')*([1-9a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$",
		error: 'Please enter valid Country name',
	},
	validCity: {
		pattern:
			// eslint-disable-next-line max-len
			"^[a-zA-Z\\u0080-\\u024F]+(?:. |-| |')*([1-9a-zA-Z\\u0080-\\u024F]+(?:. |-| |'))*[a-zA-Z\\u0080-\\u024F]*$",
		error: 'Please enter valid city name',
	},
	validAddress: {
		pattern: '^[#.0-9a-zA-Z\\s,-]+$',
		error:
			'Please enter a valid street address eg. "North Street, Chennai - 11"',
	},
	validCost: {
		pattern: '[0-9]{1,}',
		error: 'cost should be an integer',
	},
	isRequired: {
		error: 'Please enter some data in this field',
	},
};

export const isEmail = email => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidName = name => {
	return /^[a-zA-Z]+$/.test(name);
};

export const isValidDate = date => {
	const minDate = new Date('2010-12-31');
	date = new Date(date);
	return date.getTime() < minDate.getTime();
};

export const isNotEmpty = value => {
	return value.trim() !== '';
};

export const isValidId = value => {
	return /^[0-9]+$/.test(value) && value > 0;
};

export const isPhoneNumber = value => {
	return /^[().+\d -]{1,15}$/.test(value);
};
