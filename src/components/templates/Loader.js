import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Loader = ({ loading }) => {
	const hide = loading ? '' : 'hide-loader';
	return (
		<div data-test='loading' className={`loader-wrapper ${hide}`}>
			<div className='loader-loading__container'>
				<div className='loader-first__layer' />
				<div className='loader-second__layer' />
				<div className='loader-third__layer' />
				<div className='loader-fourth__layer' />
				<div className='loader-last__layer' />
				<div className='loader-last__layer2' />
			</div>
		</div>
	);
};

Loader.propTypes = {
	loading: PropTypes.bool,
};

Loader.defaultProps = {
	loading: null,
};

export const mapStateToProps = state => ({
	loading: state.loadingState.loading,
});

export default connect(mapStateToProps)(Loader);
