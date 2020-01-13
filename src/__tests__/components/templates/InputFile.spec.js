import React from 'react';
import { shallow } from 'enzyme';
import InputFile from '../../../components/templates/InputFile';

describe('<SelectInput />  tests', () => {
	test('should render <InputForm /> without errors', () => {
		const props = {
			onChange: jest.fn(),
      name: 'file-test',
      value: 'file-test',
      label: 'file-test',
		};
        const wrapper = shallow(<InputFile {...props} />);
        expect(wrapper.find("[data-test='input-form']")).toHaveLength(1);
	});
});
