/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import { Link } from 'react-router-dom';
import React from 'react';
import NavLinkItem from './templates/NavLinkItem';
import UserAccount from './UserAccount';

const NavbarNav = ({ navItems, isAuthenticated, notifications }) => (
	<nav
		data-testid='navbar-nav'
		className='navbar navbar-expand-md navbar-light'
	>
		<Link
			className='navbar-brand'
			href='https://themeforest.net/user/ig_design/portfolio'
			to='/'
		>
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
			{isAuthenticated && (
				<ul
					data-testid='other-links'
					className='navbar-nav ml-auto py-4 py-md-0'
				>
					<NavLinkItem linkText='Public chat' icon='comments' />
					<NavLinkItem
						linkText='&nbsp;'
						icon='bell'
						haspopup
						notifications={notifications}
					/>
					<UserAccount />
				</ul>
			)}
		</div>
	</nav>
);
export default NavbarNav;
