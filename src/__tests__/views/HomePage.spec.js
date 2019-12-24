import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from '../../views/HomePage';

describe('HomePage view', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<HomePage/>);
		expect(getByTestId('home-page')).toBeInTheDocument();
	});
});
