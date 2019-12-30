import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../components/templates/Button';

describe('<Loader /> tests', () => {
	test('should render <Loader /> without errors', () => {
    const props = {
      classnames: 'btn',
      value: 'button',
      buttonLoading: false
    }
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('[data-test="button"]')).toHaveLength(1);
  });
  
  test('should not render <Loader /> ', () => {
    const props = {
      classnames: 'btn',
      value: 'button',
      buttonLoading: true
    }
    const wrapper = shallow(<Button {...props} />);

    expect(wrapper.find('[data-test="loading"]')).toHaveLength(1);
	});
});
