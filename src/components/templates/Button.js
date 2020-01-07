import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({ classnames, value, buttonLoading }) => {
	if (buttonLoading === true) {
		return (
			<button
				data-test='loading'
				className={`form-group ${classnames}`}
				type='submit'
			>
				<span className='spinner-border spinner-border-sm' />
			</button>
		);
	}
	return (
		<button
			data-test='button'
			className={`form-group ${classnames}`}
			type='submit'
		>
			{value}
		</button>
	);
};

LoadingButton.propTypes = {
	value: PropTypes.string.isRequired,
	classnames: PropTypes.string,
	buttonLoading: PropTypes.bool,
};

LoadingButton.defaultProps = {
	classnames: 'form-group',
	buttonLoading: false,
};

export default LoadingButton;
