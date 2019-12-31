import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from '../../views/LoginPage';
import React from 'react';

describe('LoginPage view', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<LoginPage/>);
		expect(getByTestId('login-page')).toBeInTheDocument();
	});
});
