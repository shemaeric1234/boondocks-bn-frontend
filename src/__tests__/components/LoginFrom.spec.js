import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from '../../components/LoginForm';

describe('LoginForm component', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<LoginForm/>);
		expect(getByTestId('login-form')).toBeInTheDocument();
	});
});
