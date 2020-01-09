const loginLinks = [
	{
		key: 1,
		paragraphText: 'Forgot password?',
		link: '/auth/forgot-password',
		linkLabel: 'Reset password',
	},
	{
		key: 2,
		paragraphText: "Don't have an account?",
		link: '/register',
		linkLabel: 'Register here',
	},
];

const registerLinks = [
	{
		key: 1,
		paragraphText: 'Already have account?',
		link: '/login',
		linkLabel: 'Login here',
	},
];

export { loginLinks, registerLinks };
