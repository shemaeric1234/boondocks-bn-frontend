import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { ERROR, RESET_PASSWORD, FORGOT_PASSWORD } from '../../store/actions/types';
import { forgotPassword, resetPassword } from '../../store/actions/resetPasswordAction';
import apiCall from '../../utils/api';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Reset password Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(apiCall);
  });

  afterEach(() => {
    moxios.uninstall(apiCall);
  });

  it('it Should dispatch error when provided invalid email', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 'error',
          message: 'User with such email does not exist',
      },
      });
    });

    const expectedActions = [
    {
      payload: true,
      type: "BUTTON_LOADING",
    },
    {
      payload: {
        status: 'error',
        message: 'User with such email does not exist',
      },
      type: ERROR
    },
    {
      payload: false,
      type: "BUTTON_LOADING",
    }];
    store = mockStore({});
    await store.dispatch(forgotPassword({}))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it Should dispatch Forgot password successfully', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'Successful reset password please check your email',
      },
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: "BUTTON_LOADING",
      },
      {
      payload: {
        status: 'success',
        message: 'Successful reset password please check your email',
      },
      type: FORGOT_PASSWORD
    },
    {
      payload: false,
      type: "BUTTON_LOADING",
    }
  ];
    store = mockStore({});
    const email = 'bonvic@gmail.com'
    await store.dispatch(forgotPassword({ email }))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it Should not dispatch Reset password with invalid password', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'Invalid password provided',
      },
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: "BUTTON_LOADING",
      },
    {
      payload: {
        status: 'error',
        message: 'Invalid password provided',
      },
      type: ERROR
    },
    {
      payload: false,
      type: "BUTTON_LOADING",
    },
  ];
    store = mockStore({});
    const data = {
      token: 'dougw7r634568frdgohuwe387h4dts8rfg3',
    }
    await store.dispatch(resetPassword(data))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it Should not dispatch Reset password with invalid password', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          message: 'Updated your password successful',
      },
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: "BUTTON_LOADING",
      },
      {
      payload: {
        status: 'success',
        message: 'Updated your password successful',
      },
      type: RESET_PASSWORD
    },
    {
      payload: false,
      type: "BUTTON_LOADING",
    },
  ];
    store = mockStore({});
    const data = {
      token: 'dougw7r634568frdgohuwe387h4dts8rfg3',
    }
    await store.dispatch(resetPassword(data))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

});
