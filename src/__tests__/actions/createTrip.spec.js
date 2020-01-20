import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCreateTripData, createTrip } from '../../store/actions/createTripActions';
import apiCall from '../../utils/api';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../utils/api');

describe('Create trips Test Suite', () => {

  it('it Should dispatch error', async () => {
    apiCall.get.mockImplementationOnce(() =>
    Promise.reject({
      response: { data: { message: 'success', status: 'error'} }
    })
  );

    const expectedActions = [
      {
         "payload": "success",
         "type": "FETCH_CREATE_TRIP_DATA_FAILURE",
       },
      ];
    store = mockStore({});
    await store.dispatch(fetchCreateTripData())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success fetched', async () => {
    apiCall.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: 'success', data: 'success' }
      
    })
  );
  apiCall.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: { results: 'success' }
    
  })
);


    const expectedActions = [
      {
        "payload": {
          "allLocations": "success",
          "locationsWithHotels": undefined,
        },
        "type": "FETCH_CREATE_TRIP_DATA_SUCCESS",
      },
    ];
    store = mockStore({});
    await store.dispatch(fetchCreateTripData())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success fetched', async () => {
    apiCall.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: { message: 'success' }
    })
  );

    const expectedActions = [
      {
        "payload": true,
        "type": "BUTTON_LOADING",
      },
      {
        "payload": "success",
        "type": "CREATE_TRIP_SUCCESS",
      },
      {
        "payload": false,
        "type": "BUTTON_LOADING",
      },
    ];
    store = mockStore({});
    await store.dispatch(createTrip())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success fetched', async () => {
    apiCall.post.mockImplementationOnce(() =>
    Promise.reject({
      response: { data: {message: 'success'} }
    })
  );

    const expectedActions = [
      {
        "payload": true,
        "type": "BUTTON_LOADING",
      },
      {
        "payload": "success",
        "type": "CREATE_TRIP_FAILURE",
      },
      {
        "payload": false,
        "type": "BUTTON_LOADING",
      },
    ];
    store = mockStore({});
    await store.dispatch(createTrip())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

});
