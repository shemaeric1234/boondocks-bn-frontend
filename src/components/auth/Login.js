import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import loginFields from '../../utils/loginFields';
import { loginLinks } from '../../utils/AuthLinks';
import InputForm from '../templates/InputForm';
import LayoutForms from '../templates/LayoutForms';
import LoadingButton from '../templates/Button';
import FormLinks from '../templates/FormLinks';
import { login } from '../../store/actions/loginActions';
import { validation } from '../../utils/validations';
import SocialAuthButtons from '../templates/SocialAuthButtons';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			checkError: '',
		};
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;
		this.setState({
			checkError: 'was-validated',
		});
		if (e.target.checkValidity()) {
			const { props } = this;
			const data = { email, password };
			props.login(data);
		}
	}

	render() {
		const { state } = this;
		const { checkError } = this.state;
		const { loginData } = this.props;
		const { loggedIn } = loginData;
		const { loadingData } = this.props;
		const { buttonLoading } = loadingData;
		if (loggedIn === true) {
			return <Redirect to='/profile' />;
		}
		return (
			<LayoutForms
				title='Log In'
				info='Register with your social media account or email address'
				classNames={checkError}
				onSubmit={e => this.handleSubmit(e)}
			>
				<SocialAuthButtons />
				{loginFields.map(
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
					data-test='submitInput'
					classNames='btn btn-success btn-block btn-round-login'
					value='Login'
					buttonLoading={buttonLoading}
				/>
				<div className='redirectDiv'>
					{loginLinks.map(({ key, paragraphText, link, linkLabel }) => (
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

Login.propTypes = {
	login: propTypes.func,
	loginData: propTypes.objectOf(propTypes.any),
	loadingData: propTypes.objectOf(propTypes.any),
};

Login.defaultProps = {
	login: null,
	loginData: null,
	loadingData: null,
};

export const mapStateToProps = state => ({
	loginData: state.loginState,
	loadingData: state.loadingState,
});

const mapDispatchToProps = {
	login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
