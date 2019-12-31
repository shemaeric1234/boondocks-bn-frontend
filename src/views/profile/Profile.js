import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './UserInfo';
import Toast from '../../lib/toast';
import InfoCard from './InfoCard';
import LoadingButton from '../../components/templates/Button';

const handleSave = ({ profile, saveProfile, setIsEditing, errors }) => {
	let error = 0;
	Object.keys(errors).forEach(key => {
		if (errors[key] !== null) {
			error = 1;
		}
	});
	if (error === 1) {
		Toast('error', 'Errors found, please review information');
		return;
	}

	saveProfile(profile);
	Toast('success', 'Profile updated successfully');
	setIsEditing(false);
};

const Profile = ({
	profile,
	errors,
	isEditing,
	setIsEditing,
	saveData,
	saveProfile,
	revertChanges,
	managers,
	loading,
	currentUser,
}) => {
	if (Object.keys(profile).length < 1) {
		return <div>Please Wait....</div>;
	}
	const { userId } = JSON.parse(localStorage.getItem('bn_user_data'));
	const isLoggedInUser = currentUser == userId;
	return (
		<div className='card profile border-light rounded'>
			<div className='card-body'>
				<h4 className='font-weight-normal border-bottom border-gray pb-4'>
					Profile Information
					{!isEditing && isLoggedInUser && (
						<button
							className='btn btn-primary float-right'
							type='submit'
							onClick={() => {
								setIsEditing(true);
							}}
						>
							Edit Profile
						</button>
					)}
				</h4>
				<div className='row'>
					<div className='col-md-6'>
						<h5 className='border-bottom border-gray pt-4 pb-2 mb-0 text-dark'>
							Personal Information
						</h5>
						<UserInfo
							label='First Name'
							saveData={saveData}
							value={profile.firstName}
							type='text'
							isEditing={isEditing}
							error={errors.firstNameError}
						/>
						<UserInfo
							label='Last Name'
							saveData={saveData}
							value={profile.lastName}
							type='text'
							isEditing={isEditing}
							error={errors.lastNameError}
						/>
						<UserInfo
							label='Birth Date'
							saveData={saveData}
							value={profile.birthDate.split('T')[0]}
							type='date'
							isEditing={isEditing}
							error={errors.birthDateError}
						/>
						<UserInfo
							label='Department'
							saveData={saveData}
							value={profile.department}
							isEditing={isEditing}
							type='text'
							error={errors.departmentError}
						/>

						<UserInfo
							label='Gender'
							saveData={saveData}
							value={profile.gender}
							isEditing={isEditing}
							type='text'
							error={errors.genderError}
						/>
					</div>
					<div className='col-md-6'>
						<h5
							className='
									border-bottom border-gray pt-4 pb-2 mb-0 text-dark'
						>
							Contact Information
						</h5>
						<UserInfo
							label='Email'
							saveData={saveData}
							value={profile.email}
							isEditing={isEditing}
							type='email'
							error={errors.emailError}
						/>
						<UserInfo
							label='Phone Number'
							saveData={saveData}
							value={profile.phoneNumber}
							isEditing={isEditing}
							type='text'
							error={errors.phoneNumberError}
						/>
						<UserInfo
							label='Residence Address'
							saveData={saveData}
							value={profile.residenceAddress}
							isEditing={isEditing}
							type='text'
							error={errors.residenceAddressError}
						/>
					</div>
				</div>

				<div className='row'>
					<div className='col-md-6'>
						<h5 className='border-bottom border-gray pt-4 pb-2 mb-0 text-dark'>
							General Information
						</h5>
						<UserInfo
							label='Preferred Currency'
							saveData={saveData}
							value={profile.preferredCurrency}
							isEditing={isEditing}
							type='text'
							error={errors.preferredCurrencyError}
						/>
						<UserInfo
							label='Preferred Language'
							saveData={saveData}
							value={profile.preferredLanguage}
							isEditing={isEditing}
							type='text'
							error={errors.preferredLanguageError}
						/>
						<UserInfo
							label='Line Manager'
							saveData={saveData}
							select-value={profile.lineManager.id}
							value={
								isEditing
									? profile.lineManager.id
									: `${profile.lineManager.firstName || '...'} 
											${profile.lineManager.lastName || ''}`
							}
							isEditing={isEditing}
							type='select'
							managers={managers}
							error={errors.lineManagerError}
						/>
					</div>
					<div className='col-md-6'>
						{isLoggedInUser && (
							<>
								<div className='row mt-4 pt-4 pb-2'>
									<div className='col-md-6'>
										<InfoCard
											label='Trips Requested'
											icon='fa-plane'
											number={20}
										/>
									</div>
									<div className='col-md-6'>
										<InfoCard
											label='Trips Requested'
											icon='fa-plane'
											number={20}
										/>
									</div>
								</div>
								<div className='row mt-4'>
									<div className='col-md-6'>
										<InfoCard
											label='Denied requests'
											icon='fa-times'
											number={2}
										/>
									</div>
									<div className='col-md-6'>
										<InfoCard
											label='Approved Requests'
											icon='fa-plane'
											number={4}
										/>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{isEditing && (
				<div className='mb-4 mr-4'>
					<LoadingButton
						value='Save Changes'
						onClick={() => {
							handleSave({
								profile,
								saveProfile,
								setIsEditing,
								errors,
							});
						}}
						buttonLoading={loading}
						classnames='btn btn-success save-btn float-right'
					/>
					<button
						className='btn btn-primary float-right mr-2'
						type='submit'
						onClick={() => revertChanges()}
					>
						Cancel
					</button>
				</div>
			)}
		</div>
	);
};
Profile.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	saveData: PropTypes.func.isRequired,
	saveProfile: PropTypes.func.isRequired,
	errors: PropTypes.instanceOf(Object).isRequired,
	profile: PropTypes.instanceOf(Object).isRequired,
	managers: PropTypes.instanceOf(Array).isRequired,
	setIsEditing: PropTypes.func,
	revertChanges: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	currentUser: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Profile.defaultProps = {
	setIsEditing: null,
	loading: false,
	currentUser: null,
};
export default Profile;
