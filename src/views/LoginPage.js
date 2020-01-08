import React from 'react';
import Login from '../components/auth/Login';

export default function LoginPage() {
	return (
		<div className='container' data-testid='login-page'>
			<Login />
		</div>
	);
}
