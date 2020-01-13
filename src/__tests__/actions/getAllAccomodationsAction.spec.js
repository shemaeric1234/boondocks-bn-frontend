import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  FETCH_HOTEL_SUCCESS,
	FETCH_HOTEL_FAIL,
	FETCH_SINGLE_HOTEL_SUCCESS,
	FETCH_SINGLE_HOTEL_FAIL,
	LOADING,
} from '../../store/actions/types';
import { getAllHotels, getHotel } from '../../store/actions/accomodations/getAccomodationActions';
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
          "message": "unable to fetch"
        },
        status: 400
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: LOADING,
      },
      {
        payload: { message: "unable to fetch", status: 'error' },
        type: FETCH_HOTEL_FAIL
      },
      {
        payload: false,
        type: LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(getAllHotels())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success fetched', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "success",
          "message": "successfully fetched",
          data: {}
        },
        status: 200
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: LOADING,
      },
      {
        payload: { message: "successfully fetched", status: 'success', data: {} },
        type: FETCH_HOTEL_SUCCESS
      },
      {
        payload: false,
        type: LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(getAllHotels())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  // it('it Should dispatch login successfully', async () => {

  it('it Should dispatch error when provided wrong details', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          "status": "error",
          "message": "unable to fetch"
        },
        status: 400
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: LOADING,
      },
      {
        payload: { message: "unable to fetch", status: 'error' },
        type: FETCH_SINGLE_HOTEL_FAIL
      },
      {
        payload: false,
        type: LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(getHotel(1))
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
          "message": "successfully fetched"
        },
        status: 200
      });
    });

    const expectedActions = [
      {
        payload: true,
        type: LOADING,
      },
      {
        payload: { message: "successfully fetched", status: 'success' },
        type: FETCH_SINGLE_HOTEL_SUCCESS
      },
      {
        payload: false,
        type: LOADING,
      },
    ];
    store = mockStore({});
    await store.dispatch(getHotel())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

});
