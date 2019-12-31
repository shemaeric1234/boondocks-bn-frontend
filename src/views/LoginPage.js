import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
	return (
		<div data-testid='login-page' className='container'>
			<LoginForm />
		</div>
	);
}
