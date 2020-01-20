import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { forgotPassword } from '../../store/actions/resetPasswordAction';
import InputForm from '../templates/InputForm';
import LayoutForms from '../templates/LayoutForms';
import { validation } from '../../utils/validations';
import Button from '../templates/Button';

export class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			checkError: '',
		};
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		const { props, state } = this;
		event.preventDefault();
		this.setState({
			checkError: 'was-validated',
		});

		if (event.target.checkValidity()) {
			props.forgotPassword({ email: state.email });
		}
	}

	render() {
		if (localStorage.bn_user_data) {
			return <Redirect to='/home' />;
		}
		const { email, checkError } = this.state;
		const { loading } = this.props;

		if (localStorage.bn_user_data) {
			return <Redirect to='/profile' />;
		}

		return (
			<LayoutForms
				onSubmit={event => this.handleSubmit(event)}
				info={`Forgot your password? Enter your e-mail address below, and
							 we'll send you an e-mail allowing you to reset it.`}
				classNames={checkError}
				title='Forgot password'
			>
				<InputForm
					onChange={event => this.handleChange(event)}
					data-test='email'
					value={email}
					placeholder='email'
					pattern={validation.validEmail.pattern}
					classNames='form-control'
					error={validation.validEmail.error}
					type='email'
					name='email'
					required
				/>
				<Button
					data-test='submitInput'
					classNames='btn btn-success btn-block btn-rounded-border mt-5'
					value='Reset Password'
					buttonLoading={loading}
				/>
				<p className='col text-muted mt-5'>
					Please contact us if you have any trouble resetting your password.
				</p>
			</LayoutForms>
		);
	}
}

ForgotPassword.propTypes = {
	forgotPassword: PropTypes.func.isRequired,
	loading: PropTypes.bool,
};

ForgotPassword.defaultProps = {
	loading: null,
};

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
});

export default connect(mapStateToProps, {
	forgotPassword,
})(ForgotPassword);
