import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	fetchUserProfile,
	updateProfile,
	saveProfile,
	setIsEditing,
	revertChanges,
} from '../store/actions/profile/profileActions';
import setAuthenticate from '../store/actions/authenticateAction';
import Profile from '../views/profile/ProfileView';
import updateNavbar from '../store/actions/navbar/navbarActions';

class ViewProfileContainer extends Component {
	componentDidMount() {
		const { props } = this;
		props.setAuthenticate(true);
		props.updateNavbar();
		const user = JSON.parse(localStorage.getItem('bn_user_data'));
		if (props.match.params.userId || user) {
			const userId = props.match.params.userId || user.userId;
			props.fetchUserProfile(userId);
		}
	}

	render() {
		const { props } = this;
		return (
			<div className='container profile-container p-3'>
				<Profile
					profile={props.profile}
					currentUser={props.currentUserId}
					setIsEditing={props.setIsEditing}
				/>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	profile: state.profileState.userProfile,
	currentUserId: state.profileState.currentUserId,
	loggedIn: state.loginState.loggedIn,
	managers: state.profileState.managers,
	editErrors: state.profileState.errors,
	loading: state.loadingState.buttonLoading,
	isEditing: state.profileState.isEditing,
});
export default connect(mapStateToProps, {
	fetchUserProfile,
	updateProfile,
	saveProfile,
	setIsEditing,
	revertChanges,
	setAuthenticate,
	updateNavbar,
})(ViewProfileContainer);

ViewProfileContainer.propTypes = {
	fetchUserProfile: PropTypes.func.isRequired,
	currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
	setAuthenticate: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		}),
	}),
	profile: PropTypes.instanceOf(Object).isRequired,
	setIsEditing: PropTypes.func.isRequired,
};

ViewProfileContainer.defaultProps = {
	currentUserId: null,
	match: null,
};
