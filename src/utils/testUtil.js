/* eslint-disable
no-unused-vars,
import/no-extraneous-dependencies,
react/jsx-props-no-spreading,
import/named
*/
import React from 'react';
import { mount } from 'enzyme';

export const findByTestAttr = (component, attr) =>
	component.find(`[data-test='${attr}']`);

export const makeMountRender = (Component, defaultProps = {}) => {
	return (customProps = {}) => {
		const props = {
			...defaultProps,
			...customProps,
		};
		return mount(<Component {...props} />);
	};
};
