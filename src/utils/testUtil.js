/* eslint-disable
no-unused-vars,
import/no-extraneous-dependencies,
react/jsx-props-no-spreading,
import/named
*/
import React from 'react';
import { mount } from 'enzyme';

// eslint-disable-next-line import/prefer-default-export
export const findByTestAttr = (component, attr) =>
	component.find(`[data-test='${attr}']`);
