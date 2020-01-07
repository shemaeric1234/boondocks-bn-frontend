import React from 'react';
import Signup from '../components/auth/Signup';

export default function HomePage() {
	return (
		<div className='container' data-testid='signup-page'>
			<Signup />
		</div>
	);
}
