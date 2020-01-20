import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import signupFields from '../../utils/signupFields';
import { registerLinks } from '../../utils/AuthLinks';
import InputForm from '../templates/InputForm';
import LayoutForms from '../templates/LayoutForms';
import LoadingButton from '../templates/Button';
import FormLinks from '../templates/FormLinks';
import signup from '../../store/actions/authActions';
import { validation } from '../../utils/validations';
import SocialAuthButtons from '../templates/SocialAuthButtons';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		};
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { firstName, lastName, email, password } = this.state;
		const { props } = this;


			const data = { firstName, lastName, email, password };
			props.signup(data);

	}

	render() {
		if (localStorage.bn_user_data) {
			return <Redirect to='/profile' />;
		}

		const { state } = this;
		const { status, loading } = this.props;

		if (!loading && status === 'success') {
			return <Redirect to='/login' />;
		}

		return (
			<LayoutForms
				title='Create your Account'
				info='Register with your social media account or email address'
				classNames={state.checkError}
				onSubmit={e => this.handleSubmit(e)}
			>
				<SocialAuthButtons />
				{signupFields.map(
					({
						id,
						name,
						type,
						validationKey,
						placeholder,
						dataTestKey,
						isRequired,
					}) => (
						<InputForm
							key={id}
							data-test={dataTestKey}
							value={state[name]}
							name={name}
							type={type}
							classNames='form-control'
							onChange={event => this.handleChange(event)}
							error={validation[validationKey].error}
							pattern={validation[validationKey].pattern}
							placeholder={placeholder}
							required={isRequired}
						/>
					),
				)}
				<LoadingButton
					data-test='submit'
					classNames='btn btn-success btn-block btn-rounded-border mt-5'
					value='Register'
					buttonLoading={loading}
				/>
				<div className='redirectDiv'>
					{registerLinks.map(({ key, paragraphText, link, linkLabel }) => (
						<FormLinks
							key={key}
							paragraphText={paragraphText}
							link={link}
							linkLabel={linkLabel}
						/>
					))}
				</div>
			</LayoutForms>
		);
	}
}

Register.propTypes = {
	signup: propTypes.func.isRequired,
	status: propTypes.string,
	loading: propTypes.bool,
};

Register.defaultProps = {
	status: '',
	loading: null,
};

export const mapStateToProps = state => ({
	error: state.signupState.error,
	status: state.signupState.status,
	loading: state.loadingState.buttonLoading,
});

const mapDispatchToProps = {
	signup,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
