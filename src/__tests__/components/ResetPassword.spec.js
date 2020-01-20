import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword, mapStateToProps } from '../../components/auth/ResetPassword';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../store/reducers';

describe('<ResetPassword /> Test suite', () => {
  let mainState, props, testStore, setUp;
  beforeEach(() => {
    const middlewares = [thunk];
    global.URLSearchParams = jest.fn(x => ({
      get: jest.fn(y => x.includes(y) ? 'token provided' : null),
    }));
    mainState = {
      resetState: {
        error: null,
        status: 'status'
      }
    };

    props = {
      forgot: null,
      dataError: null,
      status: '',
      resetPassword: jest.fn(),
      history: {

      },
      location: {
        search:'token_reset'
      }
    };

    testStore = (state) => {
      const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
      return createStoreWithMiddleware(rootReducer, state);
    };

    setUp = (initialState =  {}) => {
      const store = testStore(initialState);
      const wrapper = shallow(
          <ResetPassword {...props} store={store} />
      );
        return wrapper;
    }
  });

  it('Should should throw error to the UI if password do not match', () => {
    const component = setUp(mainState);
    const handleMatchSpy = jest.spyOn(component.instance(), 'handleMatch');
    const password = { target: { name: 'password', value: 'Boondocks11232' } };
    const confirmPassword = {
      target: {
        name: 'confirmPassword',
        value: 'Boondocks1123',
        setCustomValidity: jest.fn((x) => x)
    }
    };

    component.find('[data-test="password-reset"]').simulate('change', password);
    component.find('[data-test="confirm-password"]').simulate('change', confirmPassword);

    expect(handleMatchSpy).toHaveBeenCalled();
    expect(handleMatchSpy.mock.calls[0][0].target.setCustomValidity.mock.results[0].value)
    .toEqual('Passwords do not match');
  });

  it('Should handle password match Successfully', () => {
    const component = setUp(mainState);
    const handleMatchSpy = jest.spyOn(component.instance(), 'handleMatch');
    const password = { target: { name: 'password', value: 'Boondocks1123' } };
    const confirmPassword = {
      target: {
        name: 'confirmPassword',
        value: 'Boondocks1123',
        setCustomValidity: jest.fn((x) => x)
    }
    };

    component.find('[data-test="password-reset"]').simulate('change', password);
    component.find('[data-test="confirm-password"]').simulate('change', confirmPassword);

    expect(handleMatchSpy).toHaveBeenCalled();
    expect(handleMatchSpy.mock.calls[0][0].target.setCustomValidity.mock.results[0].value)
    .toEqual('');
  });

  it('Should not submit invalid fields', () => {
    const component = setUp(mainState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const resetPasswordSpy = jest.spyOn(component.instance().props, 'resetPassword');
    const password = { target: { name: 'password', value: 'Boondocks1123' } };
    const confirmPassword = {
      target: {
        name: 'confirmPassword',
        value: 'Boondocks1123',
        setCustomValidity: jest.fn((x) => x)
      }
    };

    component.find('[data-test="password-reset"]').simulate('change', password);
    component.find('[data-test="confirm-password"]').simulate('change', confirmPassword);
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => false}
    });

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(resetPasswordSpy).not.toHaveBeenCalled();
  });

  it('Should submit the form successfully', () => {
    const component = setUp(mainState);
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const resetPasswordSpy = jest.spyOn(component.instance().props, 'resetPassword');
    const password = { target: { name: 'password', value: 'Boondocks1123' } };
    const confirmPassword = {
      target: {
        name: 'confirmPassword',
        value: 'Boondocks1123',
        setCustomValidity: jest.fn((x) => x)
      }
    };

    component.find('[data-test="password-reset"]').simulate('change', password);
    component.find('[data-test="confirm-password"]').simulate('change', confirmPassword);
    component.find('LayoutForms').simulate('submit', {
      preventDefault() {},
      target: {checkValidity: () => true}
    });

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(resetPasswordSpy).toHaveBeenCalled();
  });

  it('Should Simulate Successfull Register', () => {
    const component = setUp(mainState);
    component.setProps({loading: false, status: 'success'});

    expect(component.find('Redirect')).toHaveLength(1);
  });

  it('Should Simulate Failed Forgot password alert', () => {
    const component = setUp(mainState);
    component.setProps({ loading: false, error: { message: 'Failed' }, status: 'error' });

    expect(component.instance().props.status).toEqual('error');
  });

  it('Should Simulate Failed Forgot password alert', () => {
    const component = setUp(mainState);
    component.setProps({ dataError: null, status: '' });
    expect(component.instance().props.status).toEqual('');
  });

  it('Should return initial data', () => {
    const initialState = {
        resetState: {
          data: null,
          status: '',
        },
      loadingState: { buttonLoading: null },
    };
    expect(mapStateToProps(initialState))
    .toEqual({ reset: null, status: '', loading: null });
  });

});
