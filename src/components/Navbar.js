import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div data-testid='navbar'>
			<Router>
				<Link to='/'>Home page</Link>
				<Link to='/LoginPage'>login</Link>
			</Router>
		</div>
	);
}
