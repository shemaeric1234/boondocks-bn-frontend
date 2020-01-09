import React from 'react';
import PropTypes from 'prop-types';

const RequestPagination = ({ pages }) => {
	return <div>{pages}</div>;
};

RequestPagination.propTypes = {
	pages: PropTypes.number.isRequired,
};

export default RequestPagination;
