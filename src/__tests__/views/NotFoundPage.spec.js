import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFoundPage from '../../views/NotFoundPage';
import React from 'react';

describe('NotFoundPage view', () => {
	it('should render without error', () => {
		const { getByTestId } = render(<NotFoundPage/>);
		expect(getByTestId('not-found-page')).toBeInTheDocument();
	});
});
