import React from 'react';
import { shallow } from 'enzyme';
import InputForm from '../../components/templates/InputForm';

describe('<InputForm />  tests', () => {
	test('should render <InputForm /> without errors', () => {
		const props = {
			onChange: jest.fn(),
      classnames: 'test-class',
      name: 'text',
      value: 'input',
      error: 'error-test',
      type: 'text',
      label: 'name',
      placeholder: 'name',
      required: true,
      pattern: 'regex'
		}
        const wrapper = shallow(<InputForm {...props} />);
        expect(wrapper.find("[data-test='input-form']")).toHaveLength(1);
	});
});
