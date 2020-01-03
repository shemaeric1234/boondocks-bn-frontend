import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../../store/actions/types';
import signup from '../../store/actions/authActions';
import apiCall from '../../utils/api';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Register Test Suite', () => {
  beforeEach(() => {
    moxios.install(apiCall);
  });

  afterEach(() => {
    moxios.uninstall(apiCall);
  });

  it('it Should dispatch signup with no error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          message: 'Successfully signed up into Barefoot nomad',
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
        message: 'Successfully signed up into Barefoot nomad',
      },
      type: REGISTER_SUCCESS
    },
    {
      payload: false,
      type: "BUTTON_LOADING",
    }
  ];
    store = mockStore({});
    const data = {
        firstName: 'Maste',
        lastName: 'Mahoro',
        email: 'pmastel@gmail.com',
        password: 'Test@1234'
    };
    await store.dispatch(signup(data))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it should not dispatch signup when there are validation errors', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          status: 'error',
          message: 'Please provide a valid a first name',
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
        message: 'Please provide a valid a first name',
      },
      type: REGISTER_FAIL
    },
    {
      payload: false,
      type: "BUTTON_LOADING",
    }];
    store = mockStore({});
    const data = {
        firstName: 'Maste$$',
        lastName: 'Mahoro',
        email: 'pmaste@gmail.com',
        password: 'Test@1234'
    };
    await store.dispatch(signup(data))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
