import App from '../App';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App component', () => {
	it('should render without error', () => {
		const { getByTestId } = render(<App/>);
		expect(getByTestId('app')).toBeInTheDocument();
	});
});
