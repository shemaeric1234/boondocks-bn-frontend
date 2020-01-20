import React from 'react';
import PropTypes from 'prop-types';

const UsersListItem = ({ user, handleItemClick }) => {
	const role = user.role.split('_').join(' ');
	return (
		<div className='card mt-1 drop-shadow border-light item-user'>
			<div className='card-body'>
				<a
					href='#/'
					className='stretched-link'
					onClick={() => handleItemClick(user)}
				>
					<div className='float-left'>
						<h5 className='card-title text-capitalize text-dark'>
							{`${user.firstName} ${user.lastName}`}
						</h5>
						<p className='card-text text-capitalize text-black-50'>
							{`${role}`}
						</p>
					</div>
				</a>
			</div>
		</div>
	);
};

UsersListItem.propTypes = {
	user: PropTypes.instanceOf(Object).isRequired,
	handleItemClick: PropTypes.func.isRequired,
};

export default UsersListItem;
