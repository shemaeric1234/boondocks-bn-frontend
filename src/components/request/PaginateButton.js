import React from 'react';
import PropTypes from 'prop-types';

/**
 * Paginate button
 * @param onClick
 * @param arrow
 * @param text
 * @returns {*}
 * @constructor
 */
const PaginateButton = ({ onClick, arrow, text }) => {
	return (
		<li data-test='paginate-arrow-button' className='page-item'>
			<button
				type='button'
				className='page-link'
				aria-label={text}
				onClick={onClick}
			>
				<span aria-hidden='true'>{arrow}</span>
				<span className='sr-only'>{text}</span>
			</button>
		</li>
	);
};

PaginateButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	arrow: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
};

export default PaginateButton;
