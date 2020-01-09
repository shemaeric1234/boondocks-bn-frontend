import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({ classNames, value, buttonLoading, onClick }) => {
	if (buttonLoading === true) {
		return (
			<button
				data-test='loading'
				className={`form-group ${classNames}`}
				type='submit'
				onClick={onClick}
			>
				<span className='spinner-border spinner-border-sm' />
			</button>
		);
	}
	return (
		<button
			data-test='button'
			className={`form-group ${classNames}`}
			type='submit'
			onClick={onClick}
		>
			{value}
		</button>
	);
};

LoadingButton.propTypes = {
	value: PropTypes.string.isRequired,
	classNames: PropTypes.string,
	buttonLoading: PropTypes.bool,
	onClick: PropTypes.func,
};

LoadingButton.defaultProps = {
	classNames: 'form-group',
	buttonLoading: false,
	onClick: null,
};

export default LoadingButton;
