import { findByTestAttr } from "../../../utils/testUtil";
import {
  mapStateToProps,
  onPageChanged,
  RequestPagination
} from "../../../components/request/RequestPagination";
import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as ReactReduxHooks from "../../../utils/react-redux-hooks";
import { requestsManager1 } from "../../../__mocks__/RequestTable.mock";

const requestsData = [
  {
    "id": 1,
    "status": "open",
    "type": "single",
    "createdAt": "2020-01-22T10:40:35.925Z",
    "updatedAt": "2020-01-22T10:40:35.925Z"
  },
  {
    "id": 2,
    "status": "open",
    "type": "single",
    "createdAt": "2020-01-22T10:40:57.430Z",
    "updatedAt": "2020-01-22T10:40:57.430Z"
  },
  {
    "id": 3,
    "status": "open",
    "type": "single",
    "createdAt": "2020-01-22T10:41:06.372Z",
    "updatedAt": "2020-01-22T10:41:06.372Z"
  },
  {
    "id": 4,
    "status": "open",
    "type": "single",
    "createdAt": "2020-01-22T13:01:28.211Z",
    "updatedAt": "2020-01-22T13:01:28.211Z"
  },
  {
    "id": 5,
    "status": "open",
    "type": "single",
    "createdAt": "2020-01-22T13:02:46.125Z",
    "updatedAt": "2020-01-22T13:02:46.125Z"
  }];
const props = {
  setRequests: jest.fn(),
  requestsData
};
const setUp = (props = {}) => shallow(<RequestPagination {...props} />);

describe("'RequestPagination component'", () => {
  let wrapper;
  let useEffect;
  let store;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    store = configureStore([thunk])({requestsData: requestsManager1});

    useEffect = jest.spyOn(React, "useEffect");

    mockUseEffect();

    jest.spyOn(ReactReduxHooks, "useSelector").
      mockImplementation(state => store.getState());

    wrapper = setUp({ ...props, store: store });
  });

  it("should render without error", () => {
    const component = findByTestAttr(wrapper, "request-pagination");
    expect(component.length).toBe(1);
  });

  it("should mapStatesToProps", function() {
    expect(mapStateToProps({
      requestsState: { requestsData: [] },
      requestSearchState: { requests: [] },
      isSearchingState: false
    })).toEqual({ requests: [], requestsData: [], searching: false });
  });

  it("should \"pagination-buttons\" be clickable", function() {
    onPageChanged({
      data: {
        "currentPage": 1,
        "totalPages": 3,
        "pageLimit": 5,
        "totalRecords": 14
      },
      paginateObject: {
        "allRequests": [
          {
            "id": 1,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:36:41.579Z",
            "updatedAt": "2020-01-23T11:36:41.579Z"
          },
          {
            "id": 2,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:36:44.585Z",
            "updatedAt": "2020-01-23T11:36:44.585Z"
          },
          {
            "id": 4,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:36:51.074Z",
            "updatedAt": "2020-01-23T11:36:51.074Z"
          },
          {
            "id": 6,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:36:56.573Z",
            "updatedAt": "2020-01-23T11:36:56.573Z"
          },
          {
            "id": 8,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:37:01.757Z",
            "updatedAt": "2020-01-23T11:37:01.757Z"
          },
          {
            "id": 10,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:37:09.198Z",
            "updatedAt": "2020-01-23T11:37:09.198Z"
          },
          {
            "id": 11,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:37:13.895Z",
            "updatedAt": "2020-01-23T11:37:13.895Z"
          },
          {
            "id": 12,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:37:17.424Z",
            "updatedAt": "2020-01-23T11:37:17.424Z"
          },
          {
            "id": 13,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-23T11:37:20.517Z",
            "updatedAt": "2020-01-23T11:37:20.517Z"
          },
          {
            "id": 5,
            "status": "open",
            "type": "multi",
            "createdAt": "2020-01-23T11:36:54.065Z",
            "updatedAt": "2020-01-23T11:36:54.065Z"
          },
          {
            "id": 3,
            "status": "open",
            "type": "multi",
            "createdAt": "2020-01-23T11:36:48.026Z",
            "updatedAt": "2020-01-23T11:36:48.026Z"
          },
          {
            "id": 14,
            "status": "open",
            "type": "multi",
            "createdAt": "2020-01-23T11:37:28.153Z",
            "updatedAt": "2020-01-23T11:37:28.153Z"
          },
          {
            "id": 9,
            "status": "open",
            "type": "multi",
            "createdAt": "2020-01-23T11:37:04.707Z",
            "updatedAt": "2020-01-23T11:37:04.707Z"
          },
          {
            "id": 7,
            "status": "open",
            "type": "multi",
            "createdAt": "2020-01-23T11:36:59.090Z",
            "updatedAt": "2020-01-23T11:36:59.090Z"
          }], "currentPage": 0, "currentRequests": [], "totalPages": 0
      },
      setPaginateObject: jest.fn(),
      setRequests:  jest.fn()
    });
  });

  it("should onPageView", function() {
    const props = {
      data: {
        "currentPage": 1,
        "totalPages": 1,
        "pageLimit": 5,
        "totalRecords": 5
      },
      paginateObject: {
        "allRequests": [
          {
            "id": 1,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-22T10:40:35.925Z",
            "updatedAt": "2020-01-22T10:40:35.925Z"
          },
          {
            "id": 2,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-22T10:40:57.430Z",
            "updatedAt": "2020-01-22T10:40:57.430Z"
          },
          {
            "id": 3,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-22T10:41:06.372Z",
            "updatedAt": "2020-01-22T10:41:06.372Z"
          },
          {
            "id": 4,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-22T13:01:28.211Z",
            "updatedAt": "2020-01-22T13:01:28.211Z"
          },
          {
            "id": 5,
            "status": "open",
            "type": "single",
            "createdAt": "2020-01-22T13:02:46.125Z",
            "updatedAt": "2020-01-22T13:02:46.125Z"
          }], "currentPage": 0, "currentRequests": [], "totalPages": 0
      },
      setPaginateObject: jest.fn(),
      setRequests: jest.fn()
    };

    onPageChanged(props);
  });
});
