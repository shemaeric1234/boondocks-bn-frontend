import moxios from "moxios";
import {
  makeMockStore,
  mockError,
  mockSuccess
} from "../../utils/makeMockStore";
import {
  errorResponse,
  successResponseLinemanager,
  successResponseRequester
} from "../../__mocks__/requestSearchResponse";
import { requestSearch, flNames, flInitials } from "../../store/actions/requestSearchAction";
import actionFunc from "../../utils/actionFunc";
import {
  LOADING,
  REQUEST_SEARCH_ERROR,
  REQUEST_SEARCH_SUCCESS
} from "../../store/actions/types";
import apiCall from "../../utils/api";
import localStorage from "../../__mocks__/LocalStorage";

global.localStorage = localStorage;

describe("\"RequestSearchAction\" - Requester", () => {
  beforeEach(() => {
    moxios.install(apiCall);
    global.localStorage.setItem("bn_user_data", `{"role":"requester"}`);
  });
  afterEach(() => moxios.uninstall(apiCall));

  it("dispatches REQUEST_SEARCH_SUCCESS - String with server data on success",
    function() {
      const store = makeMockStore();

      moxios.wait(() => {
        moxios.requests.mostRecent().
          respondWith(mockSuccess(successResponseRequester));
      });
      return store.dispatch(requestSearch({ searchString: "Nairobi" })).
        then(() => {
          const actual = store.getActions();
          expect(actual).
            toEqual([
              { "payload": true, "type": "LOADING" },
              {
                "payload": [
                  {
                    createdAt: undefined,
                    id: 2,
                    status: 'open',
                    type: 'return',
                    updatedAt: '2020-01-23T11:36:11.365Z'
                  }], "type": "REQUEST_SEARCH_SUCCESS"
              },
              { "payload": false, "type": "LOADING" }]
            );
        });
    });
  it(
    "dispatches REQUEST_SEARCH_SUCCESS - StringTravel with server data on success;",
    function() {
      const store = makeMockStore();
      moxios.wait(() => {
        moxios.requests.mostRecent().
          respondWith(mockSuccess(successResponseRequester));
      });
      return store.dispatch(requestSearch({
        searchString: "Nairobi", travelDate: "2020-12-02"
      })).then(() => {
        const
          actual = store.getActions();
        expect(actual).toEqual([
          { "payload": true, "type": "LOADING" },
          {
            "payload": [
              {
                createdAt: undefined,
                id: 2,
                status: 'open',
                type: 'return',
                updatedAt: '2020-01-23T11:36:11.365Z'
              }], "type": "REQUEST_SEARCH_SUCCESS"
          },
          { "payload": false, "type": "LOADING" }]);
      });
    });
  it(
    "dispatches REQUEST_SEARCH_SUCCESS - StringReturn with server data; on;success;",
    function() {
      const store = makeMockStore();
      moxios.wait(() => {
        moxios.requests.mostRecent().
          respondWith(mockSuccess(successResponseRequester));
      });
      return store.dispatch(
        requestSearch({ searchString: "Nairobi", returnDate: "2020-12-03" })).
        then(() => {
          const actual = store.getActions();
          expect(actual).toEqual([
            { "payload": true, "type": "LOADING" },
            {
              "payload": [
                {
                  createdAt: undefined,
                  id: 2,
                  status: 'open',
                  type: 'return',
                  updatedAt: '2020-01-23T11:36:11.365Z'
                }], "type": "REQUEST_SEARCH_SUCCESS"
            },
            { "payload": false, "type": "LOADING" }]);
        });
    });
  it(
    "dispatches REQUEST_SEARCH_SUCCESS - StringTravelReturn with server data on success",
    function() {
      const store = makeMockStore();
      moxios.wait(() => {
        moxios.requests.mostRecent().
          respondWith(mockSuccess(successResponseRequester));
      });
      return store.dispatch(requestSearch({
        searchString: "Nairobi",
        travelDate: "2020-12-02",
        returnDate: "2020-12-03"
      })).then(() => {
        const actual = store.getActions();
        expect(actual).toEqual([
          { "payload": true, "type": "LOADING" },
          {
            "payload": [
              {
                createdAt: undefined,
                id: 2,
                status: 'open',
                type: 'return',
                updatedAt: '2020-01-23T11:36:11.365Z'
              }], "type": "REQUEST_SEARCH_SUCCESS"
          },
          { "payload": false, "type": "LOADING" }]);
      });
    });

  it("dispatches REQUEST_SEARCH_ERROR with server data on success", () => {
    const store = makeMockStore();
    moxios.wait(
      () => { moxios.requests.mostRecent().reject(mockError(errorResponse)); });
    const expected = [
      actionFunc(LOADING, true),
      actionFunc(REQUEST_SEARCH_ERROR, errorResponse),
      actionFunc(LOADING, false)];
    return store.dispatch(requestSearch({ searchString: "" })).
      then(() => {
        const actual = store.getActions();
        expect(actual).toEqual(expected);
      });
  });

  describe('Run internal Helpers', () => {
    expect(flNames('John', 'Doe')).toEqual('John Doe');
    expect(flNames(undefined, undefined)).toEqual('undefined undefined');
    expect(flInitials('John', 'Doe')).toEqual('JD');
    expect(flInitials(undefined, undefined)).toEqual('undefinedundefined');
  });

  describe("\"RequestSearchAction\" - Line Manager", ()=> {

    beforeEach(() => {
      moxios.install(apiCall);
      global.localStorage.setItem("bn_user_data", `{"role":"manager"}`);
    });
    afterEach(() => moxios.uninstall(apiCall));

    it(
      "dispatches REQUEST_SEARCH_SUCCESS_LINEMANAGER - String with server data on success",
      function() {
        const store = makeMockStore();
        moxios.wait(() => {
          moxios.requests.mostRecent().
            respondWith(mockSuccess(successResponseLinemanager));
        });
        return store.dispatch(
          requestSearch({ searchString: "Nairobi", byLineManager: "true" })).
          then(() => {
            const actual = store.getActions();
            expect(actual).toEqual([
              { "payload": true, "type": "LOADING" },
              {
                "payload": [
                  {
                    '': 'undefinedundefined',
                    id: 2,
                    names: 'undefined undefined',
                    reason: 'Branch visit in kigali',
                    status: 'open',
                    type: 'return',
                    updatedAt: '2020-01-23T12:15:46.723Z',
                  },
                  {
                    '': 'undefinedundefined',
                    id: 2,
                    names: 'undefined undefined',
                    reason: 'Branch visit in kigali',
                    status: 'open',
                    type: 'return',
                    updatedAt: '2020-01-23T12:15:46.723Z',
                  },
                  {
                    '': 'undefinedundefined',
                    id: 2,
                    names: 'undefined undefined',
                    reason: 'Branch visit in kigali',
                    status: 'open',
                    type: 'return',
                    updatedAt: '2020-01-23T12:15:46.723Z',
                  },
                ], "type": "REQUEST_SEARCH_SUCCESS"
              },
              { "payload": false, "type": "LOADING" }]);
          });
      });

  });
});
