import React from 'react';
import PropTypes from 'prop-types';

const FormInfo = ({ infoText }) => <p className='formInfo'>{infoText}</p>;

FormInfo.propTypes = {
	infoText: PropTypes.string.isRequired,
};

export default FormInfo;
