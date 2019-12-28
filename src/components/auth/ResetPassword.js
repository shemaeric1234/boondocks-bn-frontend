import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { resetPassword } from '../../store/actions/resetPasswordAction';
import LayoutForms from '../templates/LayoutForms';
import InputForm from '../templates/InputForm';
import validation from '../../utils/validations';
import Button from '../templates/Button';

export class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: '',
			confirmPassword: '',
			checkError: '',
		};
	}

	handleChange(event) {
		const { value } = event.target;
		this.setState({
			password: value,
		});
	}

	handleMatch(event) {
		const { value } = event.target;
		this.setState({
			confirmPassword: value,
		});
		const { password } = this.state;
		if (password === value) {
			event.target.setCustomValidity('');
		} else {
			event.target.setCustomValidity('Passwords do not match');
		}
	}

	handleSubmit(event) {
		const { password } = this.state;
		const { props } = this;
		event.preventDefault();
		this.setState({
			checkError: 'was-validated',
		});

		if (event.target.checkValidity()) {
			const param = new URLSearchParams(props.location.search);
			const data = {
				password,
				token: param.get('token_reset'),
			};

			props.resetPassword(data);
		}
	}

	render() {
		const { state } = this;
		const { status, loading } = this.props;

		if (!loading && status === 'success') {
			return <Redirect to='/login' />;
		}

		return (
			<LayoutForms
				title='Reset Password'
				info={`Reset your password? Enter your new password and
				confirm it below, to reset it.`}
				classNames={state.checkError}
				onSubmit={event => this.handleSubmit(event)}
			>
				<InputForm
					name='password'
					value={state.password}
					onChange={event => this.handleChange(event)}
					data-test='password-reset'
					classnames='form-control'
					type='password'
					placeholder='password'
					error={validation.validPassword.error}
					pattern={validation.validPassword.pattern}
					required
				/>
				<InputForm
					name='confirmPassword'
					value={state.confirmPassword}
					classnames='form-control'
					data-test='confirm-password'
					type='password'
					placeholder='confirm password'
					onChange={event => this.handleMatch(event)}
					error='confirm password should match with password'
					required
				/>
				<Button
					classnames='btn btn-success btn-block btn-rounded-border mt-5'
					value='Update Password'
					buttonLoading={loading}
				/>
				<p className='col text-muted mt-5'>
					Please contact us if you have any trouble updating your password.
				</p>
			</LayoutForms>
		);
	}
}

ResetPassword.propTypes = {
	resetPassword: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	status: PropTypes.string,
	loading: PropTypes.bool,
};

ResetPassword.defaultProps = {
	status: '',
	loading: null,
};

export const mapStateToProps = state => ({
	status: state.resetState.status,
	reset: state.resetState.data,
	loading: state.loadingState.buttonLoading,
});

export default withRouter(
	connect(mapStateToProps, {
		resetPassword,
	})(ResetPassword),
);
