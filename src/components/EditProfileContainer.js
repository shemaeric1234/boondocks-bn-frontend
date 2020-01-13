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
import EditProfile from './profile/EditProfile';

class EditProfileContainer extends Component {
	async componentDidMount() {
		const { props } = this;

		const user = JSON.parse(localStorage.getItem('bn_user_data'));
		// eslint-disable-next-line react/prop-types
		const userId = props.match.params.userId || user.userId;

		props.fetchUserProfile(userId);
	}

	render() {
		const { props } = this;

		return (
			<div className='container profile-container p-3'>
				<>
					<h1 className='text-center text-secondary'>Update Profile</h1>
					<EditProfile
						profile={props.profile}
						managers={props.managers}
						saveData={props.updateProfile}
						errors={props.editErrors}
						saveProfile={props.saveProfile}
						setIsEditing={props.setIsEditing}
						revertChanges={props.revertChanges}
						loading={props.loading}
						history={props.history}
						isEditing={props.isEditing}
					/>
				</>
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
})(EditProfileContainer);

EditProfileContainer.propTypes = {
	fetchUserProfile: PropTypes.func.isRequired,
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
	profile: PropTypes.instanceOf(Object).isRequired,
	updateProfile: PropTypes.func.isRequired,
	saveProfile: PropTypes.func.isRequired,
	setIsEditing: PropTypes.func.isRequired,
	revertChanges: PropTypes.func.isRequired,
	editErrors: PropTypes.instanceOf(Object).isRequired,
	managers: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	isEditing: PropTypes.bool.isRequired,
};
