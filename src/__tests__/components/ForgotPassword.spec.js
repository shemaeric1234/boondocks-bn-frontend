import React from 'react';
import { shallow } from 'enzyme';
import { ForgotPassword, mapStateToProps } from '../../components/auth/ForgotPassword';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../store/reducers';

describe('<ForgotPassword /> Test Suite', () => {
  let mainState, props, testStore, setUp;
  beforeEach(() => {
    const middlewares = [thunk];
    mainState = {
      forgotState: {
        dataError: null,
        status: 'status'
      }
    };

    props = {
      forgot: null,
      dataError: null,
      status: '',
      forgotPassword: jest.fn()
    };

    testStore = (state) => {
      const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
      return createStoreWithMiddleware(rootReducer, state);
    };

    setUp = (initialState =  {}) => {
      const store = testStore(initialState);
      const wrapper = shallow(
          <ForgotPassword {...props} store={store} />
      );
        return wrapper;
    }
  });

  it('Should not submit invalid forgot password form Successfully', () => {
    const component = setUp(mainState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const forgotPasswordSpy = jest.spyOn(component.instance().props, 'forgotPassword');
    const email = { target: { name: 'email', value: 'example@email.com' } };

    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="submitInput"]').simulate('click');
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => false}
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(forgotPasswordSpy).not.toHaveBeenCalled();
  });

  it('Should submit valid forgot password form Successfully', () => {
    const component = setUp(mainState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const forgotPasswordSpy = jest.spyOn(component.instance().props, 'forgotPassword');
    const email = { target: { name: 'email', value: 'example@email.com' } };

    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="submitInput"]').simulate('click');
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => true}
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(component.state()).toEqual({ checkError: 'was-validated', email: 'example@email.com' });
    expect(forgotPasswordSpy).toHaveBeenCalled();
  });

  it('Should Simulate success Forgot password alert', () => {
    const component = setUp(mainState);
    component.setProps({ status: 'success', loading: false });
    expect(component.instance().props.status).toEqual('success');
  });

  it('Should Simulate Failed Forgot password alert', () => {
    const component = setUp(mainState);
    component.setProps({ dataError: { data: { message: 'Failed' } }, status: 'error', loading: false });
    expect(component.instance().props.status).toEqual('error');
  });

  it('Should not Simulate any alert', () => {
    const component = setUp(mainState);
    component.setProps({ dataError: null, status: '', loading: true });
    expect(component.instance().props.status).toEqual('');
  });

  it('Should return initial data', () => {
    const initialState = {
      loadingState: { buttonLoading: null },
    };
    expect(mapStateToProps(initialState))
    .toEqual({ loading: null });
  });

});
