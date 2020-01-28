import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({
	classNames,
	value,
	buttonLoading,
	onClick,
	testId,
}) => {
	if (buttonLoading === true) {
		return (
			<button
				data-test='loading'
				data-testid={testId}
				className={`form-group ${classNames}`}
				type='submit'
				onClick={onClick}
				disabled={false}
			>
				<span className='spinner-border spinner-border-sm' />
			</button>
		);
	}
	return (
		<button
			data-test='button'
			data-testid={testId}
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
	testId: PropTypes.string,
};

LoadingButton.defaultProps = {
	classNames: 'form-group',
	buttonLoading: false,
	onClick: null,
	testId: null,
};

export default LoadingButton;
