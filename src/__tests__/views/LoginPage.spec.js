import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from '../../views/LoginPage';

describe('Login page view', () => {
	test('should render login page without error', () => {
		const wrapper = shallow(<LoginPage />);
		expect(wrapper.find("[data-testid='login-page']")).toHaveLength(1);
  });
});
