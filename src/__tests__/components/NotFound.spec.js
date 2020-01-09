import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../../components/NotFound';

describe('NotFound component', () => {
	it('should render without error', () => {
		const { getByTestId } = render(<NotFound/>);
		expect(getByTestId('not-found')).toBeInTheDocument();
	});
});
