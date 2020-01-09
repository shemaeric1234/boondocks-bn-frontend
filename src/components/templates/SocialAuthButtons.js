import React from 'react';
import InputForm from './InputForm';
import config from '../../config';

export const socialAuthRedirect = type =>
	window.location.replace(`${config.baseUrl}/api/v1/auth/${type}`);

const SocialAuthButtons = () => (
	<>
		<div
			data-testid='social-auth-btns'
			className='social-btns d-md-flex justify-content-around'
		>
			<InputForm
				value='Facebook'
				name='facebook'
				onClick={() => socialAuthRedirect('facebook')}
				type='button'
				classNames='btn btn-block btn-round-login btn-facebook'
			/>
			<InputForm
				value='Google'
				name='google'
				onClick={() => socialAuthRedirect('google')}
				type='button'
				classNames='btn btn-block btn-round-login btn-google'
			/>
		</div>
		<div className='orLoginDiv'>
			<span className='orSpan'>
				<p>or</p>
			</span>
		</div>
	</>
);

export default SocialAuthButtons;
