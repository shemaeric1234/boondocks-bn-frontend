import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps } from '../../components/auth/Login';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../store/reducers';

describe('<Login /> Test Suite', () => {
  let loginState, props, testStore, setUp;
  beforeEach(() => {
    const middlewares = [thunk];
    loginState = {
      loginState: {
        loggedIn: false,
        data: null,
        error: null,
      }
    }

    props = {
      loginData: {
        loggedIn: false,
        error: null
      },
      loadingData: {
        buttonLoading: false
      },
      data: null,
      login: jest.fn(),
    }

    testStore = (state) => {
      const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
      return createStoreWithMiddleware(reducers, state);
    };

    setUp = (initialState =  {}) => {
      const store = testStore(initialState);
      const wrapper = shallow(
          <Login {...props} store={store} />
      );
        return wrapper;
    } 
  });

  it('Should not submit invalid login form', () => {
    const component = setUp(loginState);
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
    const component = setUp(loginState);
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
    const component = setUp(loginState);
    component.setProps({loginData: {loggedIn: true}});
    expect(component.find('Redirect')).toHaveLength(1);
  }); 

  it('Should return initial data', () => {
    const initialState = {
      loginState: {
        loggedIn: false,
        data: null,
        error: null,
      },
    };
    expect(mapStateToProps(initialState)).toEqual({
      loginData: {
        loggedIn: false,
        data: null,
        error: null
      },
    });
  });
});
