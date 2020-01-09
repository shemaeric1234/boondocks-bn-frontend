/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import { Redirect, Route } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isValidElementType } from 'react-is';
import toast from '../lib/toast';
import setAuthenticate from '../store/actions/authenticateAction';

export const ProtectedRoute = ({
	setAuthState,
	component: Component,
	...rest
}) => {
	setAuthState(true);
	const isAuthenticated = !!localStorage.bn_user_data;
	!isAuthenticated && toast('error', 'You need to be logged in');

	return (
		<Route
			render={props =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { from: props.location } }}
					/>
				)}
			{...rest}
		/>
	);
};

ProtectedRoute.propTypes = {
	component: (props, propName) => {
		if (props[propName] && !isValidElementType(props[propName])) {
			return new Error(
				`Invalid prop 'component' supplied to 'Route':
				 the prop is not a valid React component`,
			);
		}
	},
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}),
	setAuthState: PropTypes.func.isRequired,
};

ProtectedRoute.defaultProps = {
	location: null,
	component: null,
};

export default connect(null, {
	setAuthState: setAuthenticate,
})(ProtectedRoute);
