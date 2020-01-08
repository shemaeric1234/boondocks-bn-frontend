/* eslint-disable
jsx-a11y/anchor-is-valid,
react/no-array-index-key
*/
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navItemObjects, notificationsItems } from './NavbarData';
import NavbarNav from './NavbarNav';
import { $ } from '../jquery-loader';

/**
 * Navbar
 *
 * @param isAuthenticated
 * @returns {*}
 * @constructor
 */
const Navbar = ({ isAuthenticated }) => {
	const [navItems, setNavItems] = useState([]);
	const [notifications, setNotifications] = useState();

	useEffect(() => {
		$(() => {
			const header = $('.start-style');
			$(window).on('scroll', () => {
				const scroll = $(window).scrollTop();
				header.toggleClass('start-style', scroll < 10);
				header.toggleClass('scroll-on', scroll >= 10);
			});
		});

		$('body').on('mouseenter mouseleave', '.nav-item', e => {
			if ($(window).width() > 750) {
				const d = $(e.target).closest('.nav-item');
				d.addClass('show');
				setTimeout(
					() => d[d.is(':hover') ? 'addClass' : 'removeClass']('show'),
					0,
				);
			}
		});

		setNavItems(
			isAuthenticated
				? [
						navItemObjects[0],
						navItemObjects[1],
						navItemObjects[2],
						navItemObjects[3],
				  ]
				: [navItemObjects[0], navItemObjects[4], navItemObjects[5]],
		);
		if (isAuthenticated) setNotifications(notificationsItems);
	}, [isAuthenticated]);

	return (
		<div id='nav' className='navigation-wrap bg-light start-header start-style'>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<NavbarNav
							notifications={notifications}
							isAuthenticated={isAuthenticated}
							navItems={navItems}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

Navbar.defaultProps = {
	isAuthenticated: null,
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool,
};

export default connect(({ authState: { isAuthenticated } }) => ({
	isAuthenticated,
}))(Navbar);
