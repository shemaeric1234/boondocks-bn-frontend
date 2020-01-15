/* eslint-disable react/prop-types */
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render as reactRender } from '@testing-library/react';
import React from 'react';
import reducers from '../store/reducers';

const render = (ui, initialState = {}, options = {}) => {
	const store = createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(thunk)),
	);
	// eslint-disable-next-line react/prop-types
	const Providers = ({ children }) => (
		<Provider store={store}>{children}</Provider>
	);
	return reactRender(ui, { wrapper: Providers, ...options });
};

export default render;
