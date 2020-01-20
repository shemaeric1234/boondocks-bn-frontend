import React from 'react';
import PropTypes from 'prop-types';

function InputFile({ label, name, value, onChange }) {
	return (
		<div className='d-flex flex-column' data-test='input-form'>
			<label htmlFor={name}>{label}</label>
			<div className='custom-file'>
				<input
					id={name}
					type='file'
					className='custom-file-input'
					onChange={onChange}
					required
				/>
				<label className='custom-file-label' htmlFor={name}>
					{value}
				</label>
				<span data-testid='error-text' className='invalid-feedback'>
					Please select a file
				</span>
			</div>
		</div>
	);
}

InputFile.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	label: PropTypes.string,
	onChange: PropTypes.func,
};

InputFile.defaultProps = {
	label: null,
	onChange: null,
};

export default InputFile;
