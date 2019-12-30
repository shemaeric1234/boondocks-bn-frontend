import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

describe('Navbar component', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<BrowserRouter><Navbar/></BrowserRouter>);
		expect(getByTestId('navbar')).toBeInTheDocument();
	});
});
