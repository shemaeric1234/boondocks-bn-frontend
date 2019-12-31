import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../../components/Home';

describe('Home component', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<Home/>);
		expect(getByTestId('home')).toBeInTheDocument();
	});
});
