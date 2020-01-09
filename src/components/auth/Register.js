import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import signupFields from '../../utils/signupFields';
import signup from '../../store/actions/authActions';
import InputForm from '../templates/InputForm';
import LayoutForms from '../templates/LayoutForms';
import { validation } from '../../utils/validations';
import Button from '../templates/Button';
import SocialAuthButtons from '../templates/SocialAuthButtons';
import { registerLinks } from '../../utils/AuthLinks';
import FormLinks from '../templates/FormLinks';
import { hasLoggedIn } from '../../store/actions/loginActions';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			checkError: '',
		};
	}

	componentDidMount() {
		const { props } = this;
		if (typeof props.hasLoggedIn == 'function') props.hasLoggedIn();
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
		this.setState({
			checkError: 'was-validated',
		});
		if (event.target.checkValidity()) {
			const { props } = this;
			const data = { firstName, lastName, email, password };
			props.signup(data);
		}
	}

	render() {
		const { state } = this;
		const { status, loading, loggedIn } = this.props;

		if (loggedIn === true) {
			return <Redirect to='/profile' />;
		}

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
				<Button
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
	signup: propTypes.func,
	status: propTypes.string,
	loading: propTypes.bool,
	hasLoggedIn: propTypes.func,
	loggedIn: propTypes.bool,
};

Register.defaultProps = {
	signup: null,
	status: '',
	loading: null,
	hasLoggedIn: null,
	loggedIn: null,
};

export const mapStateToProps = state => ({
	error: state.signupState.error,
	status: state.signupState.status,
	loading: state.loadingState.buttonLoading,
	loggedIn: state.loginState.loggedIn,
});

const mapDispatchToProps = {
	signup,
	hasLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);