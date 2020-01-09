import React from 'react';
import PropTypes from 'prop-types';

const RequestTable = ({ requests }) => {
	return <div>{requests}</div>;
};

RequestTable.propTypes = {
	requests: PropTypes.number.isRequired,
};

export default RequestTable;
