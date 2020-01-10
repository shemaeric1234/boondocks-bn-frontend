import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	fetchUserProfile,
	revertChanges,
	saveProfile,
	setIsEditing,
	updateProfile,
} from '../store/actions/profile/profile.actions';
import Profile from '../views/profile/Profile';
import { hasLoggedIn } from '../store/actions/loginActions';

class ProfileContainer extends Component {
	async componentDidMount() {
		const { props } = this;

		props.hasLoggedIn();
		const user = JSON.parse(localStorage.getItem('bn_user_data'));
		// eslint-disable-next-line react/prop-types
		const userId = props.match.params.userId || user.userId;
		props.fetchUserProfile(userId);
	}

	render() {
		const { props } = this;

		if (!props.loggedIn) {
			props.history.push('/login');
		}
		return (
			<div className='container profile-container'>
				<Profile
					saveData={props.updateProfile}
					profile={props.profile}
					isEditing={props.isEditing}
					setIsEditing={props.setIsEditing}
					saveProfile={props.saveProfile}
					errors={props.editErrors}
					revertChanges={props.revertChanges}
					managers={props.managers}
					loading={props.loading}
					currentUser={props.currentUserId}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profileState.userProfile,
	managers: state.profileState.managers,
	editErrors: state.profileState.errors,
	isLoading: state.profileState.isFetching,
	isEditing: state.profileState.isEditing,
	loading: state.loadingState.buttonLoading,
	currentUserId: state.profileState.currentUserId,
	loggedIn: state.loginState.loggedIn,
});

export default connect(mapStateToProps, {
	fetchUserProfile,
	setIsEditing,
	updateProfile,
	saveProfile,
	revertChanges,
	hasLoggedIn,
})(ProfileContainer);

ProfileContainer.propTypes = {
	fetchUserProfile: PropTypes.func.isRequired,
	updateProfile: PropTypes.func.isRequired,
	saveProfile: PropTypes.func.isRequired,
	profile: PropTypes.instanceOf(Object).isRequired,
	managers: PropTypes.instanceOf(Array).isRequired,
	editErrors: PropTypes.instanceOf(Object),
	isEditing: PropTypes.bool.isRequired,
	setIsEditing: PropTypes.func.isRequired,
	revertChanges: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	loggedIn: PropTypes.bool.isRequired,
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
	hasLoggedIn: PropTypes.func.isRequired,
};

ProfileContainer.defaultProps = {
	editErrors: null,
	currentUserId: null,
};
