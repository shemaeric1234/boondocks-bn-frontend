import React from 'react';
import { shallow } from 'enzyme';
import LayoutForms from '../../components/templates/LayoutForms';

describe('<LayoutForms></LayoutForms> tests', () => {
	test('should render <LayoutForms /> without errors', () => {
		const mockChildren = () => {
			return <h1>mocked!</h1>
		};
		const props = {
			children: <mockChildren />,
			title: 'test layout',
			info: 'here is the test',
			onSubmit: jest.fn(),
			classNames: 'test-class',
			SocialLogin: <mockChildren />,

		};
		const wrapper = shallow(<LayoutForms {...props} />);
		expect(wrapper.find("[data-test='form-layout']")).toHaveLength(1);
	});
});
