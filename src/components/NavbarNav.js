/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import NavLinkItem from './templates/NavLinkItem';
import UserAccount from './UserAccount';

export const NavbarNav = ({ navItems, isAuthenticated, notifications }) => {
	const hasUserData = !!localStorage.bn_user_data;
	useEffect(() => {}, [isAuthenticated]);
	return (
		<nav
			data-testid='navbar-nav'
			className='navbar navbar-expand-md navbar-light'
		>
			<Link className='navbar-brand' to='/'>
				<img
					src='https://bn-pictures.s3.eu-north-1.amazonaws.com/bn_logo.svg'
					alt=''
				/>
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon' />
			</button>
			<div className='collapse navbar-collapse' id='navbarSupportedContent'>
				<ul className='navbar-nav ml-auto py-4 py-md-0'>
					{navItems.map(({ linkText, linkRoute }, idx) => (
						<NavLinkItem key={idx} linkText={linkText} linkRoute={linkRoute} />
					))}
				</ul>
				{(isAuthenticated || hasUserData) && (
					<ul
						data-testid='other-links'
						className='navbar-nav ml-auto py-4 py-md-0'
					>
						<NavLinkItem
							linkText='&nbsp;'
							icon='bell-o bell-icon small-icon'
							haspopup
							notifications={notifications}
						/>
						<UserAccount />
					</ul>
				)}
			</div>
		</nav>
	);
};

export default NavbarNav;
