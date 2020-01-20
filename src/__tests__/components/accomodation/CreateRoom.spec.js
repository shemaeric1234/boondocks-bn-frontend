import React from 'react';
import { shallow } from 'enzyme';
import { CreateRooms, mapStateToProps } from '../../../components/accomodations/CreateRooms';

describe('<CreateRooms /> Test suite', () => {
  let props, testStore, setUp;
  beforeEach(() => {
    props = {
      loading: false,
      match: {
        params: {id: 1}
      },
      data: {id: 1},
      status: '',
      createRoom: jest.fn(),
    }

    setUp = () => {
      const wrapper = shallow(
          <CreateRooms {...props} />
      );
        return wrapper;
    }
  })

  it('Should not submit invalid form', () => {
    const component = setUp();
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const createRoomSpy = jest.spyOn(component.instance().props, 'createRoom');

    component.find('[data-test="create-room-form"]').simulate('submit', {
          preventDefault() {},
          target: {checkValidity: () => false}
        });

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(createRoomSpy).not.toHaveBeenCalled();
  });

  it('Should submit the form successfully', () => {
    const component = setUp();
    const handleFileSpy = jest.spyOn(component.instance(), 'handleFile');
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const file = { target: { files: [{name: 'image1'}] } };
    const name = {target: { name: 'name', value: 'name'}};
    const type = {target: { name: 'type', value: 'type'}};
    const cost = {target: { name: 'cost', value: 'cost'}};
    const description = {target: { name: 'description', value: 'description'}};
    const allStates = {
      name: 'name', 
      image: {name: 'image1'}, 
      imageName: 'image1',
      checkError: 'was-validated',
      description: 'description',
      type: 'type',
      cost: 'cost',
    }

    component.find('[data-test="file"]').simulate('change', file);
    component.find('[data-test="name"]').simulate('change', name);
    component.find('[data-test="type"]').simulate('change', type);
    component.find('[data-test="cost"]').simulate('change', cost);
    component.find('[data-test="description"]').simulate('change', description);
    component.find('[data-test="create-room-form"]').simulate('submit', {
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
    expect(component.find('Redirect')).toHaveLength(1);
  });

  it('Should return initial data', () => {
    const initialState = {
      createRoomState: {
          status: '',
        },
      loadingState: { buttonLoading: null },
    };
    expect(mapStateToProps(initialState))
    .toEqual({ status: '', loading: null });
  });

});
