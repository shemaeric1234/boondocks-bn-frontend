import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import signupFields from '../../utils/signupFields';
import signup from '../../store/actions/authActions';
import InputForm from '../templates/InputForm';
import LayoutForms from '../templates/LayoutForms';
import validation from '../../utils/validations';
import Button from '../templates/Button';

export class Signup extends Component {
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
		const { status, loading } = this.props;
		if (!loading && status === 'success') {
			return <Redirect to='/login' />;
		}
		return (
			<LayoutForms
				title='Create your Account'
				info='Signup with your social media account or email address'
				classNames={state.checkError}
				onSubmit={e => this.handleSubmit(e)}
			>
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
							classnames='form-control'
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
					classnames='btn btn-success btn-block btn-rounded-border mt-5'
					value='Signup'
					buttonLoading={loading}
				/>
				<div>
					<p>
						Already have account?
						<Link to='/login'>login here</Link>
					</p>
				</div>
			</LayoutForms>
		);
	}
}

Signup.propTypes = {
	signup: propTypes.func.isRequired,
	status: propTypes.string,
	loading: propTypes.bool,
};

Signup.defaultProps = {
	status: propTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
