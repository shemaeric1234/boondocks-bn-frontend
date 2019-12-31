export default {
	validName: {
		pattern: '[a-zA-Z]{1,}',
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
	isRequired: {
		error: 'Please enter some data in this field',
	},
};
