import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div data-testid='navbar'>
			<Link to='/'>Home</Link>
			<Link to='/login'>login</Link>
			<Link to='/register'>register</Link>
			<Link to='/profile'>profile</Link>
		</div>
	);
}
