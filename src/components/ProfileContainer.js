import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	fetchUserProfile,
	setIsEditing,
	updateProfile,
	saveProfile,
	revertChanges,
} from '../store/actions/profile/profile.actions';
import Profile from '../views/profile/Profile';

class ProfileContainer extends Component {
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
			<div className='container mb-4'>
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
});

export default connect(mapStateToProps, {
	fetchUserProfile,
	setIsEditing,
	updateProfile,
	saveProfile,
	revertChanges,
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
};

ProfileContainer.defaultProps = {
	editErrors: null,
	currentUserId: null,
};
