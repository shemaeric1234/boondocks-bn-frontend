import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../../components/templates/Footer';

describe('Footer component', () => {
	test('should render without error', () => {
		const { getByTestId } = render(<Footer/>);
		expect(getByTestId('footer')).toBeInTheDocument();
	});
});
