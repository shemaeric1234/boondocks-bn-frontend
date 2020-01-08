import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { 
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  BUTTON_LOADING
 } from '../../store/actions/types';
import login from '../../store/actions/loginActions';
import apiCall from '../../utils/api';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Login Actions Test Suite', () => {
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
        response: {
          "status": "error",
          "message": "invalid credentials"
        },
        status: 400
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: BUTTON_LOADING,
      },
      {
        payload: "invalid credentials",
        type: LOGIN_FAILURE
      },
      {
        payload: false,
        type: BUTTON_LOADING,
      },
    ];
    store = mockStore({});
    const email = 'wrong_email@google.com';
    const password = '12345678';
    await store.dispatch(login({ email, password }))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });

  it('it Should dispatch login successfully', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "success",
          "message": "success",
          "data": {
            "firstName": "Super",
            "lastName": "Administrator",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQGFkbWluaXN0cmF0b3IuY29tIiwibmFtZSI6IlN1cGVyIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InN1cGVyX2FkbWluaXN0cmF0b3IiLCJsaW5lTWFuYWdlcklkIjpudWxsLCJpYXQiOjE1NzgzMDkxNzQsImV4cCI6MTU3ODM5NTU3NH0.Pgo92TcGMaild8Kw4bv29IUjtq_u59tQuNV891Hm5ig"
          }
        },
        status: 200
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: BUTTON_LOADING,
      },
      {
        payload: 'success',
        type: LOGIN_SUCCESS
      },
      {
        payload: false,
        type: BUTTON_LOADING,
      },
    ];
    store = mockStore({});
    const email = 'valid_user@google.com';
    const password = '12345678';
    await store.dispatch(login({ email, password }))
      .then(async () => {
        const calledActions = store.getActions();
        expect(calledActions).toEqual(expectedActions);
      });
  });
});
