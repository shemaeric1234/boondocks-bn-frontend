import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../../components/Navbar';

describe('Navbar component', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<Navbar/>);
		expect(getByTestId('navbar')).toBeInTheDocument();
	});
});
