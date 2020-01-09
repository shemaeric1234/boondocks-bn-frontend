import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectDiv = ({ linkRoute, linkText, placeholder }) => (
	<div className='redirectDiv'>
		<p className='linkSpacedDiv'>{placeholder}</p>
		<span />
		<Link to={linkRoute}>{linkText}</Link>
	</div>
);

RedirectDiv.propTypes = {
	placeholder: PropTypes.string.isRequired,
	linkRoute: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired,
};

export default RedirectDiv;
