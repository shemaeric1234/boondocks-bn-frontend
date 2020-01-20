import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import loginFields from '../../utils/loginFields';
import { loginLinks } from '../../utils/AuthLinks';
import InputForm from '../templates/InputForm';
import LayoutForms from '../templates/LayoutForms';
import LoadingButton from '../templates/Button';
import FormLinks from '../templates/FormLinks';
import login from '../../store/actions/loginActions';
import { validation } from '../../utils/validations';
import SocialAuthButtons from '../templates/SocialAuthButtons';
import updateNavbar from '../../store/actions/navbar/navbarActions';

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
		const { props } = this;
		const { email, password } = this.state;
		this.setState({
			checkError: 'was-validated',
		});
		if (e.target.checkValidity()) {
			const data = { email, password };
			props.login(data);
		}
		props.updateNavbar();
	}

	render() {
		const { state } = this;
		const { checkError } = this.state;
		const { loadingData } = this.props;
		const { buttonLoading } = loadingData;
		if (localStorage.bn_user_data) {
			return <Redirect to='/profile' />;
		}
		return (
			<LayoutForms
				title='Log In'
				info='Login with your social media account or email address'
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
	login: PropTypes.func,
	loadingData: PropTypes.objectOf(PropTypes.any),
	updateNavbar: PropTypes.func.isRequired,
};

Login.defaultProps = {
	login: null,
	loadingData: null,
};

export const mapStateToProps = state => ({
	loadingData: state.loadingState,
});

const mapDispatchToProps = {
	login,
	updateNavbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
