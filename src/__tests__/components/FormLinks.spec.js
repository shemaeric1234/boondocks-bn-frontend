import React from 'react';
import { shallow } from 'enzyme';
import FormLinks from '../../components/templates/FormLinks';

describe('<FormLinks></FormLinks> tests', () => {
	test('should render <FormLinks /> without errors', () => {
		const props = {
			paragraphText: 'A paragraph',
			link: 'A link',
			linkLabel: 'A label',
		};
		const wrapper = shallow(<FormLinks {...props} />);
		expect(wrapper.find("[data-test='form-links']")).toHaveLength(1);
	});
});
