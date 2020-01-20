import React from 'react';
import PropTypes from 'prop-types';

const LoadingButton = ({
	classNames,
	value,
	buttonLoading,
	onClick,
	hidden,
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
				hidden={hidden}
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
			data-testid={testId}
			hidden={hidden}
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
	hidden: PropTypes.bool,
};

LoadingButton.defaultProps = {
	classNames: 'form-group',
	buttonLoading: false,
	onClick: null,
	testId: null,
	hidden: null,
};

export default LoadingButton;
