import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '../../../components/templates/SelectInput';

describe('<SelectInput />  tests', () => {
	test('should render <InputForm /> without errors', () => {
		const props = {
			onChange: jest.fn(),
      classNames: 'test-class',
      name: 'text',
      value: 'input',
      error: 'error-test',
      type: 'text',
      label: 'name',
      placeholder: 'name',
      required: true,
      onBlur: jest.fn(),
      option: [{id:1, value:'test', name: 'test'}]
		};
        const wrapper = shallow(<SelectInput {...props} />);
        expect(wrapper.find("[data-test='input-form']")).toHaveLength(1);
	});
});
