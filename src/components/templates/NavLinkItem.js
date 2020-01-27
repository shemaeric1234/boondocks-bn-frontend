/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Notifications from '../Notifications';

export const evenNotificationClass = idx => (idx % 2 === 1 ? ' bg-gray' : '');

const NavLinkItem = ({
	linkText,
	linkRoute,
	icon,
	haspopup,
	notifications,
}) => {
	return (
		<li className='nav-item mx-0 mx-md-3'>
			<NavLink
				{...{
					className: `nav-link${haspopup ? ' text-light' : ''}`,
					to: linkRoute,
					...(haspopup && {
						id: 'navbarDropdown',
						role: 'button',
						'data-toggle': 'dropdown',
						'aria-haspopup': 'true',
						'aria-expanded': 'false',
					}),
				}}
			>
				{icon && icon !== ';)' ? (
					<>
						<i data-testid='fa-icon' className={`fa fa-${icon}`} />
						<span className='pl-2'>{linkText}</span>
					</>
				) : (
					linkText
				)}
			</NavLink>
			{haspopup && <Notifications />}
		</li>
	);
};

NavLinkItem.propTypes = {
	linkText: PropTypes.string.isRequired,
	linkRoute: PropTypes.string,
	icon: PropTypes.string,
	haspopup: PropTypes.bool,
	notifications: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			body: PropTypes.string.isRequired,
			dateTime: PropTypes.string.isRequired,
		}),
	),
};

NavLinkItem.defaultProps = {
	linkRoute: '#',
	haspopup: false,
	icon: ';)',
	notifications: [],
};

export default NavLinkItem;
