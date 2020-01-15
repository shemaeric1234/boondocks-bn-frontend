import PropTypes from 'prop-types';

const requestTypeManager = PropTypes.shape({
	id: PropTypes.number,
	'': PropTypes.string,
	names: PropTypes.string,
	status: PropTypes.string,
	type: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});

const requestTypeRequester = PropTypes.shape({
	id: PropTypes.number,
	status: PropTypes.string,
	type: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});

export { requestTypeManager, requestTypeRequester };
