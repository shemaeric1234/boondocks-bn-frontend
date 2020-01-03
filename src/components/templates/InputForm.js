import React from 'react';
import PropTypes from 'prop-types';

const InputForm = ({
	classNames,
	placeholder,
	onChange,
	onClick,
	onBlur,
	name,
	value,
	error,
	type,
	required,
	label,
	pattern,
}) => (
	<div data-test='input-form' className='form-group'>
		{label && <label htmlFor={name}>{label}</label>}
		<input
			data-testid='input-field'
			name={name}
			value={value}
			onChange={onChange}
			onClick={onClick}
			onBlur={onBlur}
			placeholder={placeholder}
			className={`${classNames}`}
			type={type}
			required={required}
			id={name}
			pattern={pattern}
		/>
		{error && error !== '' && (
			<span data-testid='error-text' className='invalid-feedback'>
				{error}
			</span>
		)}
	</div>
);

InputForm.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	classNames: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	required: PropTypes.bool,
	pattern: PropTypes.string,
};

InputForm.defaultProps = {
	type: 'text',
	error: null,
	label: null,
	classNames: null,
	placeholder: null,
	onChange: null,
	onClick: null,
	onBlur: null,
	required: false,
	pattern: null,
};

export default InputForm;
