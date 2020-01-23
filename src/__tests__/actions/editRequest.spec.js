import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { updateTrip } from '../../store/actions/requests/editTripActions';
import apiCall from '../../utils/api';
jest.mock('../../utils/api');

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Update trips Test Suite', () => {

  it('it Should dispatch error', async () => {
    apiCall.patch.mockImplementationOnce(() =>
    Promise.reject({
      response: { data: { message: 'success', status: 'error'} }
    })
  );

    const expectedActions = [
      {
         "payload": true,
         "type": "BUTTON_LOADING",
       },
      {
         "payload": {
           "message": "success",
           "status": "error",
         },
         "type": "UPDATE_TRIP_FAIL",
       },
      {
         "payload": false,
         "type": "BUTTON_LOADING",
       },
      ];
    store = mockStore({});
    await store.dispatch(updateTrip())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

  it('it Should dispatch success fetched', async () => {
    apiCall.patch.mockImplementationOnce(() =>
    Promise.resolve({
      data: { results: 'success' }
      
    })
  );
  apiCall.get.mockImplementationOnce(() =>
  Promise.resolve({
    data: { results: 'success' }
    
  })
);


    const expectedActions = [
      {
        "payload": true,
        "type": "BUTTON_LOADING",
      },
      {
      "payload": {
        "results": "success",
      },
      "type": "UPDATE_TRIP_SUCCESS",
      },
      {
      "payload": {
        "results": "success",
      },
      "type": "FETCH_REQUEST_SUCCESS",
      },
      {
      "payload": false,
      "type": "BUTTON_LOADING",
      },
      ];
    store = mockStore({});
    await store.dispatch(updateTrip())
    .then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });

});
