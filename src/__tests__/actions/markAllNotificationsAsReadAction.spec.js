import moxios from "moxios";
import apiCall from "../../utils/api";
import {
  ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE,
  ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS,
  BUTTON_LOADING
} from "../../store/actions/types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import actionFunc from "../../utils/actionFunc";
import markAllNotificationsAsRead
  from "../../store/actions/notifications/markAllNotificationsAsReadAction";
import localStorage from "../../__mocks__/LocalStorage";

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("\"markAllNotificationsAsReadAction\" - WITHOUT ANY TOKEN", () => {
  beforeEach(() => moxios.install(apiCall));

  afterEach(() => moxios.uninstall(apiCall));

  it("should dispatch error when no token is present", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          status: "error",
          message: "unable to fetch"
        },
        status: 400
      });
    });

    const expectedActions = [
      actionFunc(BUTTON_LOADING, true),
      actionFunc(ALL_NOTIFICATIONS_MARKED_AS_READ_FAILURE, {
        message: "unable to fetch",
        status: "error"
      }),
      actionFunc(BUTTON_LOADING, false)
    ];

    store = mockStore({});
    await store.dispatch(markAllNotificationsAsRead()).then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

describe("\"markAllNotificationsAsReadAction\" - WITH TOKEN", () => {
  global.localStorage = localStorage;
  global.localStorage.setItem("bn_user_data", `{
    "email":"requestero@user.com",
    "name":"Requester",
    "userId":2,
    "verified":true,
    "role":"requester",
    "lineManagerId":7,
    "iat":1578472431,
    "exp":1578558831
  }`);

  beforeEach(() => moxios.install(apiCall));

  afterEach(() => moxios.uninstall(apiCall));

  it("should dispatch success when token is present", async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        response: {
          status: "success",
          message: "All notifications marked as read",
          data: {}
        },
        status: 200
      });
    });

    const expectedActions = [
      actionFunc(BUTTON_LOADING, true),
      actionFunc(ALL_NOTIFICATIONS_MARKED_AS_READ_SUCCESS, {
        status: "success",
        message: "All notifications marked as read",
        data: {}
      }),
      actionFunc(BUTTON_LOADING, false)
    ];

    store = mockStore({});
    await store.dispatch(markAllNotificationsAsRead()).then(async () => {
      const calledActions = store.getActions();
      expect(calledActions).toEqual(expectedActions);
    });
  });
});

