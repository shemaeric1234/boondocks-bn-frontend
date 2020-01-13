import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  CREATE_HOTEL_FAIL,
	CREATE_HOTEL_SUCCESS,
	CREATE_ROOM_SUCCESS,
	CREATE_ROOM_FAIL,
	BUTTON_LOADING,
} from '../../store/actions/types';
import { createHotel, createRoom } from '../../store/actions/accomodations/createAccomodationAction';
import apiCall from '../../utils/api';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Create accomodations Actions Test Suite', () => {
  beforeEach(() => {
    moxios.install(apiCall);
  });

  afterEach(() => {
    moxios.uninstall(apiCall);
  });

  it('it Should dispatch error', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "error",
          "message": "wrong details"
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
        payload: { message: "wrong details", status: 'error' },
        type: CREATE_HOTEL_FAIL
      },
      {
        payload: false,
        type: BUTTON_LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(createHotel({}))
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success created', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "success",
          "message": "successfully created"
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
        payload: { message: "successfully created", status: 'success' },
        type: CREATE_HOTEL_SUCCESS
      },
      {
        payload: false,
        type: BUTTON_LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(createHotel({}))
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch error when provided wrong details', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "error",
          "message": "wrong details"
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
        payload: { message: "wrong details", status: 'error' },
        type: CREATE_ROOM_FAIL
      },
      {
        payload: false,
        type: BUTTON_LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(createRoom({}))
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success created', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "success",
          "message": "successfully created"
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
        payload: { message: "successfully created", status: 'success' },
        type: CREATE_ROOM_SUCCESS
      },
      {
        payload: false,
        type: BUTTON_LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(createRoom({}))
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

});
