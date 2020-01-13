import React from 'react';
import { shallow } from 'enzyme';
import CreateAccomodationPage from '../../views/accomodations/CreateAccomodationPage';
import CreateRoomsPage from '../../views/accomodations/CreateRoomsPage';

describe('<CreateAccomodationPage /> test suite', () => {
	test('should create hotel page render without error', () => {
		const wrapper = shallow(<CreateAccomodationPage />);
		expect(wrapper.find("[data-test='create-hotel']")).toHaveLength(1);
  });
  
  test('should create rooms page render without error', () => {
		const wrapper = shallow(<CreateRoomsPage />);
		expect(wrapper.find("[data-test='create-room']")).toHaveLength(1);
	});
});