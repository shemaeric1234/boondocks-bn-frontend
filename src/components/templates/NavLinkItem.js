/* eslint-disable
react/jsx-props-no-spreading,
react/jsx-one-expression-per-line,
react/no-array-index-key,
jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions,
max-len
 */
import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import markAllNotificationsAsReadAction from '../../store/actions/notifications/markAllNotificationsAsReadAction';

export const evenNotificationClass = idx => (idx % 2 === 1 ? ' bg-gray' : '');

export const NavLinkItem = ({
	linkText,
	linkRoute,
	icon,
	haspopup,
	notifications,
	markAllAsRead,
	allAsReadState,
}) => {
	const notificationNumber = 0;
	useEffect(() => {}, [allAsReadState, notificationNumber]);
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
						<div data-testid='fa-icon' className={`fa fa-${icon}`}>
							<span
								className={`notification-number${
									notificationNumber ? '' : ' zero'
								}`}
							>
								{notificationNumber}
							</span>
						</div>
						<span className='pl-2'>{linkText}</span>
					</>
				) : (
					linkText
				)}
			</NavLink>
			{haspopup && (
				<ul className='dropdown-menu notification'>
					<li className='notification-header'>
						<div className='row'>
							<div className='text-light col-lg-12 col-sm-12 col-12'>
								<span>Notifications ({notifications.length})</span>
								<a
									href='#!'
									onClick={markAllAsRead}
									className='float-right text-light'
								>
									Mark all as read
								</a>
							</div>
						</div>
					</li>
					{notifications.map(({ title, body, dateTime, link }, idx) => (
						<li
							data-testid='notification'
							className={`notification-box${evenNotificationClass(idx)}`}
							key={idx}
						>
							<div className='row'>
								<div className='col-lg-12 col-sm-12 col-12'>
									<Link to={link}>
										<strong className='text-primary'>{title}</strong>
									</Link>
									<div>{body}</div>
									<small className='text-warning'>{dateTime}</small>
								</div>
							</div>
						</li>
					))}
					<li className='notification-footer text-center'>
						<a href='/' className='text-light'>
							View All
						</a>
					</li>
				</ul>
			)}
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
	markAllAsRead: PropTypes.func.isRequired,
	allAsReadState: PropTypes.any.isRequired,
};

NavLinkItem.defaultProps = {
	linkRoute: '#',
	haspopup: false,
	icon: ';)',
	notifications: [],
};

const mapStateToProps = ({ markAllNotificationsAsReadState }) => ({
	allAsReadState: markAllNotificationsAsReadState,
});

const mapDispatchToProps = {
	markAllAsRead: markAllNotificationsAsReadAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavLinkItem);

