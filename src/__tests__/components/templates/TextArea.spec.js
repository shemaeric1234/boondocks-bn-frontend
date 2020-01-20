import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../../../components/templates/TextArea';

describe('<SelectInput />  tests', () => {
	test('should render <InputForm /> without errors', () => {
		const props = {
			onChange: jest.fn(),
      name: 'test',
      value: 'test',
      label: 'test',
      required: true,
		};
        const wrapper = shallow(<TextArea {...props} />);
        expect(wrapper.find("[data-test='input-form']")).toHaveLength(1);
	});
});
