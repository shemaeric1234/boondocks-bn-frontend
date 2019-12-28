import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordPage from '../../views/ResetPasswordPage';
import ForgotPasswordPage from '../../views/ForgotPasswordPage';

describe('Reset password and forgot password view', () => {
	test('should reset page render without error', () => {
		const wrapper = shallow(<ResetPasswordPage />);
		expect(wrapper.find("[data-testid='reset-page']")).toHaveLength(1);
  });
  
  test('should forgot page render without error', () => {
		const wrapper = shallow(<ForgotPasswordPage />);
		expect(wrapper.find("[data-testid='forgot-page']")).toHaveLength(1);
	});
});
