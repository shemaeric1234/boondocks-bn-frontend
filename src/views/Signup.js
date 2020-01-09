import React from 'react';
import Signup from '../components/auth/Register';

export default function HomePage() {
	return (
		<div className='container' data-testid='signup-page'>
			<Signup />
		</div>
	);
}
