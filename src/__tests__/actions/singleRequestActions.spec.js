import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { FETCH_REQUEST_SUCCESS, FETCH_REQUEST_FAIL } from '../../store/actions/types';
import singleRequest from '../../store/actions/requests/singleRequestActions';
import apiCall from '../../utils/api';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Single RequetsTest Suite', () => {
  beforeEach(() => {
    moxios.install(apiCall);
  });

  afterEach(() => {
    moxios.uninstall(apiCall);
  });

  it('it Should dispatch singleRequest with no error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          message: 'Successfully fetched request',
      },
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: "LOADING",
      },
      {
      payload: {
        status: 'success',
        message: 'Successfully fetched request',
      },
      type: FETCH_REQUEST_SUCCESS
    },
    {
      payload: false,
      type: "LOADING",
    }
  ];
    store = mockStore({});
    await store.dispatch(singleRequest())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it should not dispatch singleRequest', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          status: 'error',
          message: 'No request with such id',
      },
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: "LOADING",
      },
      {
      payload: {
        status: 'error',
        message: 'No request with such id',
      },
      type: FETCH_REQUEST_FAIL
    },
    {
      payload: false,
      type: "LOADING",
    }];
    store = mockStore({});
    await store.dispatch(singleRequest())
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
