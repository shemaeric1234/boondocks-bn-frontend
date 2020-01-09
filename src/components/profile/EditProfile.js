import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import InputForm from '../templates/InputForm';
import { profileFields, profileSelect } from '../../utils/profileFields';
import SelectInput from '../templates/SelectInput';
import Toast from '../../lib/toast';
import LoadingButton from '../templates/Button';

class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleSave({ saveData, name, event }) {
		saveData({ [name]: event.target.value });
		this.setState({
			[name]: '',
		});
	}

	/**
	 * Save user input to the local state
	 * @param event
	 */
	handleInputChange(event) {
		let { value } = event.target;
		const { name } = event.target;

		if (value === '') {
			value = ' ';
		}

		this.setState({
			[name]: value,
		});
	}

	handleSaveChanges({ profile, saveProfile, errors, history, isEditing }) {
		let error;
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
	}

	render() {
		const {
			profile,
			saveData,
			managers,
			errors,
			saveProfile,
			loading,
			isEditing,
			revertChanges,
		} = this.props;
		const { state, handleSaveChanges } = this;
		if (Object.keys(profile).length < 1) {
			return <div>Please Wait....</div>;
		}
		if (!isEditing) {
			return <Redirect to='/profile' />;
		}
		return (
			<div className='justify-content-center update-profile'>
				<form
					onSubmit={e => {
						e.preventDefault();
						handleSaveChanges({
							profile,
							saveProfile,
							errors,
							isEditing,
						});
					}}
				>
					<div className='grid-input'>
						{profileFields.map(
							({ id, placeholder, name, type, label, error }) => (
								<InputForm
									key={id}
									placeholder={placeholder}
									name={name}
									type={type}
									value={state[name] || profile[name] || ''}
									label={label}
									onChange={event => this.handleInputChange(event)}
									error={errors[error]}
									onBlur={event => this.handleSave({ saveData, name, event })}
									classNames={`form-control form-control-sm ${errors[error] &&
										'is-invalid'}`}
								/>
							),
						)}
						<SelectInput
							name='gender'
							value={state.gender || profile.gender || ''}
							label='Gender'
							placeholder='Select Gender'
							option={profileSelect.gender}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({ saveData, name: 'gender', event })
							}
							classNames='form-control form-control-sm'
						/>

						<SelectInput
							name='lineManager'
							value={state.lineManager || profile.lineManager.id || ''}
							label='Line Manager'
							selected={state.gender || ''}
							placeholder='Line Manager'
							option={managers.map(manager => {
								const obj = {};
								obj.id = manager.id;
								obj.name = `${manager.firstName} ${manager.lastName}`;
								obj.value = manager.id;
								return obj;
							})}
							error={errors.lineManagerError}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({ saveData, name: 'lineManager', event })}
							classNames={`form-control form-control-sm 
              ${errors.lineManagerError && 'is-invalid'}`}
						/>

						<SelectInput
							name='preferredCurrency'
							value={state.preferredCurrency || profile.preferredCurrency || ''}
							label='Preferred Currency'
							placeholder='Preferred Currency'
							option={profileSelect.preferredCurrency}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({ saveData, name: 'preferredCurrency', event })}
							classNames='form-control form-control-sm'
						/>
						<SelectInput
							name='preferredLanguage'
							value={state.preferredLanguage || profile.preferredLanguage || ''}
							label='Preferred Language'
							placeholder='Preferred Language'
							option={profileSelect.language}
							onChange={event => this.handleInputChange(event)}
							onBlur={event =>
								this.handleSave({ saveData, name: 'preferredLanguage', event })}
							classNames='form-control form-control-sm'
						/>
					</div>
					<div className='row justify-content-center'>
						<LoadingButton
							value='Save Changes'
							buttonLoading={loading}
							classNames='btn save-btn  btn-success btn-rounded-border'
						/>
						<Link
							to='/profile'
							className='btn save-btn  btn-danger btn-rounded-border ml-2'
							onClick={() => revertChanges()}
						>
							Cancel
						</Link>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profileState.userProfile,
	currentUserId: state.profileState.currentUserId,
	loggedIn: state.loginState.loggedIn,
	loading: state.loadingState.buttonLoading,
});

EditProfile.propTypes = {
	profile: PropTypes.instanceOf(Object).isRequired,
	saveData: PropTypes.func.isRequired,
	managers: PropTypes.instanceOf(Array).isRequired,
	errors: PropTypes.instanceOf(Object).isRequired,
	saveProfile: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	revertChanges: PropTypes.func.isRequired,
	setIsEditing: PropTypes.func.isRequired,
	isEditing: PropTypes.bool.isRequired,
};

EditProfile.defaultProps = {
	loading: null,
};

export default connect(mapStateToProps, {})(EditProfile);
