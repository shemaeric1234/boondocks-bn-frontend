import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputForm from '../../components/templates/InputForm';

class UserInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
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

	handleSave({ saveData, name, event }) {
		saveData({ [name]: event.target.value });
		this.setState({
			[name]: '',
		});
	}

	render() {
		const { props, state } = this;
		const labelVal = props.label;
		const name = [
			labelVal.split(' ')[0].toLowerCase(), labelVal.split(' ')[1] || '',
		].join('');
		const { saveData } = props;
		if (!props.isEditing && props.value) {
			return (
				<div className='d-flex text-secondary'>
					<span className='p-2 text-dark'>{`${props.label}:`}</span>
					<span className='p-2'>{props.value}</span>
				</div>
			);
		}
		if (props.isEditing) {
			if (props.type === 'select') {
				return (
					<div className=''>
						<label htmlFor={name}>{props.label}</label>
						<select
							name={name}
							onChange={event => this.handleInputChange(event)}
							onBlur={event => this.handleSave({ saveData, name, event })}
							placeholder={`Edit ${props.label}`}
							className='form-control form-control-sm'
						>
							<option value='0' disabled>
								Choose Manager
							</option>
							{props.managers.map(manager => {
								return (
									<option value={manager.id} key={manager.id}>
										{`${manager.firstName} ${manager.lastName} 
												| ${manager.email}`}
									</option>
								);
							})}
						</select>
					</div>
				);
			}
			return (
				<InputForm
					label={`${props.label}:`}
					value={state[name] || props.value}
					name={name}
					onChange={event => this.handleInputChange(event)}
					onBlur={event => this.handleSave({ saveData, name, event })}
					type={props.type}
					placeholder={`Edit ${props.label}`}
					classNames={`form-control form-control-sm ${props.error &&
						'is-invalid'}`}
					error={props.error}
				/>
			);
		}
		return (
			<div className='d-flex d-flex text-secondary'>
				<span className='p-2 text-dark'>{`${props.label}:`}</span>
				<span className='p-2'>...</span>
			</div>
		);
	}
}

UserInfo.propTypes = {
	isEditing: PropTypes.bool.isRequired,
	saveData: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	managers: PropTypes.instanceOf(Array),
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	error: PropTypes.string,
};

UserInfo.defaultProps = {
	value: '',
	error: '',
	managers: null,
};

export default UserInfo;
