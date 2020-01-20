import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	fetchUsers,
	setSelectedUser,
	cancelRoleAssign,
	saveNewRole,
	changeRole,
} from '../store/actions/users/usersActions';
import UsersListItem from '../views/users/UsersListItem';
import Modal from './Modal';
import AssignRole from '../views/users/AssignRole';

class UsersContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			popupVisibility: false,
		};
		this.handleItemClick = this.handleItemClick.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleChangeRole = this.handleChangeRole.bind(this);
	}

	async componentDidMount() {
		const { props } = this;
		props.fetchUsers();
	}

	handleItemClick(user) {
		const { props } = this;

		this.setState({
			popupVisibility: true,
		});

		props.setSelectedUser(user);
	}

	handleCancel() {
		const { props } = this;
		this.setState({
			popupVisibility: false,
		});

		props.cancelRoleAssign();
	}

	handleChangeRole() {
		const { props } = this;
		props.changeRole(props.selectedUser);
		this.setState({
			popupVisibility: false,
		});
	}

	render() {
		const { props, state } = this;
		if (!Object.keys(props.users).length) {
			return <div />;
		}
		const loggedInUser = JSON.parse(localStorage.getItem('bn_user_data'));
		return (
			<>
				<div className='users-list main-content container'>
					<div className='card drop-shadow border-light mb-2 bg-light'>
						<div className='card-body'>
							<h1 className='text-dark'>
								{`Users (${props.users.length - 1})`}
							</h1>
						</div>
					</div>
					<ul>
						{props.users
							.filter(user => user.id !== loggedInUser.userId)
							.map(user => (
								<UsersListItem
									key={user.id}
									user={user}
									handleItemClick={this.handleItemClick}
								/>
							))}
					</ul>
				</div>
				<Modal visible={state.popupVisibility}>
					<AssignRole
						handleCancel={this.handleCancel}
						user={props.selectedUser}
						handleChangeRole={this.handleChangeRole}
						handleSelectRole={props.saveNewRole}
						loading={props.loading}
					/>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = state => ({
	users: state.usersState.users,
	selectedUser: state.usersState.selectedUser,
	loading: state.loadingState.buttonLoading,
});

export default connect(mapStateToProps, {
	fetchUsers,
	setSelectedUser,
	cancelRoleAssign,
	saveNewRole,
	changeRole,
})(UsersContainer);

UsersContainer.propTypes = {
	users: PropTypes.instanceOf(Array).isRequired,
	selectedUser: PropTypes.instanceOf(Object).isRequired,
	fetchUsers: PropTypes.func.isRequired,
	setSelectedUser: PropTypes.func.isRequired,
	cancelRoleAssign: PropTypes.func.isRequired,
	saveNewRole: PropTypes.func.isRequired,
	changeRole: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};

UsersContainer.defaultProps = {
	loading: null,
};
