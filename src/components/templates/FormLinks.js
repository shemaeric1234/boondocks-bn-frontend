import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FormLinks = ({ paragraphText, link, linkLabel }) => {
	return (
		<div data-test='form-links'>
			<p>{paragraphText}</p>
			<span />
			<Link to={link}>{linkLabel}</Link>
		</div>
	);
};

FormLinks.propTypes = {
	paragraphText: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	linkLabel: PropTypes.string.isRequired,
};

export default FormLinks;
