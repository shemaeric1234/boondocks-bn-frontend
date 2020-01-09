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
import setAuthenticate from '../store/actions/authenticateAction';

class ProfileContainer extends Component {
	componentDidMount() {
		const { props } = this;
		props.setAuthenticate(true);
		const user = JSON.parse(localStorage.getItem('bn_user_data'));

		if (props.match.params.userId || user) {
			const userId = props.match.params.userId || user.userId;
			props.fetchUserProfile(userId);
		}
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
	setAuthenticate,
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
	history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
	setAuthenticate: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			userId: PropTypes.string,
		}),
	}),
};

ProfileContainer.defaultProps = {
	editErrors: null,
	currentUserId: null,
	match: null,
};
