import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div data-testid='navbar'>
			<Link to='/'>Home page</Link>
			<Link to='/login'>Login</Link>
			<Link to='/Signup'>signup</Link>
		</div>
	);
}
