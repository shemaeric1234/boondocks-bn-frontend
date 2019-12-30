const signupFields = [
	{
		id: 1,
		name: 'firstName',
		type: 'text',
		validationKey: 'validName',
		placeholder: 'First Name',
		dataTestKey: 'first-name',
		isRequired: true,
	},
	{
		id: 2,
		name: 'lastName',
		type: 'text',
		validationKey: 'validName',
		placeholder: 'Last Name',
		dataTestKey: 'last-name',
		isRequired: true,
	},
	{
		id: 3,
		name: 'email',
		type: 'text',
		validationKey: 'validEmail',
		placeholder: 'Email',
		dataTestKey: 'email',
		isRequired: true,
	},
	{
		id: 4,
		name: 'password',
		type: 'password',
		validationKey: 'validPassword',
		placeholder: 'Password',
		dataTestKey: 'password',
		isRequired: true,
	},
];

export default signupFields;
