import React from "react";
import { shallow } from "enzyme";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../../store/reducers";
import { Login, mapStateToProps } from "../../components/auth/Login";

describe('<Login /> Test Suite', () => {
  let loadingState, props, testStore, setUp;
  beforeEach(() => {
    const middlewares = [thunk];
    loadingState = {
      loadingState: {
        buttonLoading: false
      }
    };

    props = {
      loadingData: {
        buttonLoading: false
      },
      login: jest.fn(),
    };

    testStore = (state) => {
      const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
      return createStoreWithMiddleware(reducers, state);
    };

    setUp = (initialState =  {}) => {
      const store = testStore(initialState);
      return shallow(
        <Login {...props} store={store}/>
      );
    }
  });

  it('Should not submit invalid login form', () => {
    const component = setUp(loadingState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const loginSpy = jest.spyOn(component.instance().props, 'login');
    const email = { target: { name: 'email', value: 'example@email.com' } };
    const password = { target: { name: 'password', value: 'example@pass' } };

    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="password"]').simulate('change', password);
    component.find('[data-test="submitInput"]').simulate('click');
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => false}
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(loginSpy).not.toHaveBeenCalled();
  });

  it('Should log user in Successfully', () => {
    const component = setUp(loadingState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const loginSpy = jest.spyOn(component.instance().props, 'login');
    const email = { target: { name: 'email', value: 'example@email.com' } };
    const password = { target: { name: 'password', value: 'example@pass' } };

    component.find('[data-test="email"]').simulate('change', email);
    component.find('[data-test="password"]').simulate('change', password);
    component.find('[data-test="submitInput"]').simulate('click');
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => true}
    });
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(component.state()).toEqual({
      checkError: 'was-validated',
      email: 'example@email.com',
      password: 'example@pass'
    });
    expect(loginSpy).toHaveBeenCalled();
  });

  it('Should simulate successful login', () => {
    const component = setUp(loadingState);
    component.setProps({loadingData: {lbuttonLoading: false}});
    expect(component.find('Redirect'));
  });

  it('Should return initial data', () => {
    const initialState = {
      loadingState: {
          buttonLoading: false
      },
    };
    expect(mapStateToProps(initialState)).toEqual({
      loadingData: {
        buttonLoading: false
      },
    });
  });
});
