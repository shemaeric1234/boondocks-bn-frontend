import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { shallow } from 'enzyme';
import Signup from '../../views/Signup';
import React from 'react';

describe('Register view', () => {
	test('should render without error', () => {
		const wrapper = shallow(<Signup/>);
		expect(wrapper.find("[data-testid='signup-page']")).toHaveLength(1);
	});
});
