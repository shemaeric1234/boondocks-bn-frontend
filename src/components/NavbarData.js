const navItemObjects = {
	general: [
		{
			linkText: 'Home',
			linkRoute: '/home',
		},
		{
			linkText: 'Request a trip',
			linkRoute: '/trip-request',
		},
	],
	super_administrator: [
		{
			linkText: 'Manage Users',
			linkRoute: '/users',
		},
	],
	travel_administrator: [
		{
			linkText: 'Booking',
			linkRoute: '/booking',
		},
	],
	travel_team_member: [],
	manager: [
		{
			linkText: 'Requests',
			linkRoute: '/requests',
		},
	],
	requester: [
		{
			linkText: 'Requests',
			linkRoute: '/requests',
		},
		{
			linkText: 'Booking',
			linkRoute: '/booking',
		},
	],
	suppliers: [
		{
			linkText: 'Booking',
			linkRoute: '/booking',
		},
	],
	un_authenticated: [
		{
			linkText: 'Home',
			linkRoute: '/home',
		},
		{
			linkText: 'Login',
			linkRoute: '/login',
		},
		{
			linkText: 'Register',
			linkRoute: '/register',
		},
	],
};

const notificationsItems = [
	{
		title: 'Request from John Doe',
		body: 'Lorem ipsum dolor sit amet, consectetur',
		dateTime: '27.11.2019, 15:00',
		link: '111',
	},
	{
		title: 'Request from John Doe',
		body: 'Lorem ipsum dolor sit amet, consectetur',
		dateTime: '27.11.2019, 15:00',
		link: '222',
	},
	{
		title: 'Request from John Doe',
		body: 'Lorem ipsum dolor sit amet, consectetur',
		dateTime: '27.11.2019, 15:00',
		link: '333',
	},
];

export { navItemObjects, notificationsItems };
