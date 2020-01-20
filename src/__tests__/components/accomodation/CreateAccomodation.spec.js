import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccomodation, mapStateToProps } from '../../../components/accomodations/CreateAccomodation';

describe('<CreateAccomodation /> Test suite', () => {
  let props, testStore, setUp;
  beforeEach(() => {
    props = {
      loading: false,
      data: {id: 1},
      status: '',
      createHotel: jest.fn(),
    }

    setUp = () => {
      const wrapper = shallow(
          <CreateAccomodation {...props} />
      );
        return wrapper;
    }
  })

  it('Should not submit invalid form', () => {
    const component = setUp();
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const createHotelSpy = jest.spyOn(component.instance().props, 'createHotel');

    component.find('[data-test="create-hotel-form"]').simulate('submit', {
          preventDefault() {},
          target: {checkValidity: () => false}
        });

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(createHotelSpy).not.toHaveBeenCalled();
  });

  it('Should submit the form successfully', () => {
    const component = setUp();
    const handleFileSpy = jest.spyOn(component.instance(), 'handleFile');
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const file = { target: { files: [{name: 'image1'}] } };
    const name = {target: { name: 'name', value: 'name'}};
    const country = {target: { name: 'country', value: 'country'}};
    const city = {target: { name: 'city', value: 'city'}};
    const street = {target: { name: 'street', value: 'street'}};
    const description = {target: { name: 'description', value: 'description'}};
    const services = {target: { name: 'services', value: 'services'}};
    const allStates = {
      name: 'name', 
      image: {name: 'image1'}, 
      imageName: 'image1',
      checkError: 'was-validated',
      description: 'description',
      street: 'street',
      country: 'country',
      services: 'services',
      city: 'city',
    }

    component.find('[data-test="file"]').simulate('change', file);
    component.find('[data-test="name"]').simulate('change', name);
    component.find('[data-test="country"]').simulate('change', country);
    component.find('[data-test="city"]').simulate('change', city);
    component.find('[data-test="street"]').simulate('change', street);
    component.find('[data-test="description"]').simulate('change', description);
    component.find('[data-test="services"]').simulate('change', services);
    component.find('[data-test="create-hotel-form"]').simulate('submit', {
          preventDefault() {},
          target: {checkValidity: () => true}
        });

    expect(handleFileSpy).toHaveBeenCalled();
    expect(handleChangeSpy).toHaveBeenCalled();
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(component.state()).toEqual(allStates);
  });

  it('Should Redirect successfully', () => {
    const component = setUp();
    component.setProps({loading: false, status: 'success'});
    component.setState({checkError: 'no-error'});
    expect(component.find('Redirect')).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      createHotelState: {
          data: null,
          status: '',
        },
      loadingState: { buttonLoading: null },
    };
    expect(mapStateToProps(initialState))
    .toEqual({ data: null, status: '', loading: null });
  });

});
