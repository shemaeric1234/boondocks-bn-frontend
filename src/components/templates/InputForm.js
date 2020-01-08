import React from 'react';
import PropTypes from 'prop-types';

const InputForm = ({
	classnames,
	placeholder,
	onChange,
	onBlur,
	name,
	value,
	error,
	type,
	required,
	label,
	pattern,
}) => (
	<div className='form-group'>
		{label && <label htmlFor={name}>{label}</label>}
		<input
			data-test='input-form'
			name={name}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			placeholder={placeholder}
			className={`${classnames}`}
			type={type}
			required={required}
			id={name}
			pattern={pattern}
		/>
		{error && <span className='invalid-feedback'>{error}</span>}
	</div>
);

InputForm.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	classnames: PropTypes.string,
	placeholder: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	required: PropTypes.bool,
	pattern: PropTypes.string,
};

InputForm.defaultProps = {
	type: 'text',
	error: null,
	label: null,
	classnames: null,
	placeholder: null,
	onChange: null,
	onBlur: null,
	required: false,
	pattern: null,
};

export default InputForm;
