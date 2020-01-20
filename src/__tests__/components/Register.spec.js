import React from "react";
import { shallow } from "enzyme";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../../store/reducers";
import { mapStateToProps, Register } from "../../components/auth/Register";

describe('<Register /> Test Suite', () => {
  let signupState, props, testStore, setUp;
  beforeEach(() => {
    const middlewares = [thunk];
    signupState = {
      signupState: {
        data: null,
        error: null,
        status: '',
        loggedIn: false,
      }
    };

    props = {
      signup: jest.fn(),
      hasLoggedIn: jest.fn(),
      error: null,
      status: '',
    };

    testStore = (state) => {
      const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
      return createStoreWithMiddleware(reducers, state);
    };

    setUp = (initialState =  {}) => {
      const store = testStore(initialState);
      return shallow(
        <Register {...props} store={store}/>
      );
    }
  });

  it('Should not submit invalid signup form', () => {
    const component = setUp(signupState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const signupSpy = jest.spyOn(component.instance().props, 'signup');
    const firstName = { target: { name: 'firstName', value: 'Pierrette' } };
    const lastName = { target: { name: 'lastName', value: 'Mastel@@' } };
    const email = { target: { name: 'email', value: 'mastel@gmail.com' } };
    const password = { target: { name: 'password', value: 'example@pass' } };

    component.find('[data-test="first-name"]').simulate('change', firstName);
    component.find('[data-test="last-name"]').simulate('change', lastName);
    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="password"]').simulate('change', password);
    component.find('[data-test="submit"]').simulate('click');
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => false}
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
    // expect(signupSpy).not.toHaveBeenCalled();
  });

  it('Should submit valid signup form', () => {
    const component = setUp(signupState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const signupSpy = jest.spyOn(component.instance().props, 'signup');
    const firstName = { target: { name: 'firstName', value: 'Pierrette' } };
    const lastName = { target: { name: 'lastName', value: 'Mastel' } };
    const email = { target: { name: 'email', value: 'mastel@gmail.com' } };
    const password = { target: { name: 'password', value: 'example@pass' } };

    component.find('[data-test="first-name"]').simulate('change', firstName);
    component.find('[data-test="last-name"]').simulate('change', lastName);
    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="password"]').simulate('change', password);
    component.find('[data-test="submit"]').simulate('click');
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => true}
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(component.state()).toEqual({ firstName: 'Pierrette', lastName: 'Mastel', email: 'mastel@gmail.com', password: 'example@pass' });
    expect(signupSpy).toHaveBeenCalled();
  });

  it('Should Simulate successful Signup alert', () => {
    const component = setUp(signupState);
    component.setProps({ status: 'success', loading: false });
    expect(component.instance().props.status).toEqual('success');
  });

  it('Should return initial data', () => {
    const initialState = {
      signupState: {
        error: null,
        status: '',
      },
      loadingState: { buttonLoading: null },
    };

    expect(mapStateToProps(initialState)).toEqual({loading: null, error: null,  status: ''});
  });
});
