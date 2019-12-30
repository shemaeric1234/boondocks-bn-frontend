import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '../../components/templates/Loader';

describe('<Loader /> tests', () => {
	test('should render <Loader /> without errors', () => {

    const wrapper = shallow(<Loader />);

    expect(wrapper.find('.hide-loader')).toHaveLength(1);
  });
  
  test('should not render <Loader /> ', () => {

    const wrapper = shallow(<Loader loading />);

    expect(wrapper.find('.hide-loader')).toHaveLength(0);
	});
});
