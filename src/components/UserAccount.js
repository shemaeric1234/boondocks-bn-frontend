/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import React from 'react';
import { accountLinks } from '../utils/userAccountLinks';

const UserAccount = () => (
	<li
		data-testid='user-account'
		className='nav-item user-account mx-0 mx-md-3 active'
	>
		<div
			className='nav-link dropdown-toggle'
			data-toggle='dropdown'
			role='button'
			aria-haspopup='true'
			aria-expanded='false'
		>
			<span>Account</span>
			<div className='user-avatar'>JD</div>
		</div>
		<div className='dropdown-menu'>
			{accountLinks.map((item, idx) => (
				<Link key={idx} className='dropdown-item' to={item.linkRoute}>
					{item.linkText}
				</Link>
			))}
		</div>
	</li>
);

export default UserAccount;
