/* eslint-disable
jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions,
jsx-a11y/anchor-is-valid
*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setAuthenticate from '../../store/actions/authenticateAction';
import updateNavbar from '../../store/actions/navbar/navbarActions';

/**
 * Logout
 * @param history
 * @param setAuthState
 * @returns {*}
 * @constructor
 */
export const Logout = ({ history, setAuthState, updateNavbar }) => (
	<button
		type='button'
		className='dropdown-item'
		onClick={() => {
			setAuthState(false);
			updateNavbar();
			history.push('/home');
		}}
	>
		Logout
	</button>
);

Logout.defaultProps = {
	setAuthState: null,
	history: null,
};

Logout.propTypes = {
	setAuthState: PropTypes.func,
	history: PropTypes.shape({
		push: PropTypes.func,
	}),
};

export default withRouter(
	connect(null, {
		setAuthState: setAuthenticate,
		updateNavbar,
	})(Logout),
);
