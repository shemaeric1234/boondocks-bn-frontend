import React from "react";
import { shallow } from "enzyme";
import {
  mapDispatchToProps,
  mapStateToProps,
  RequestHeader
} from "../../../components/request/RequestHeader";
import localStorage from "../../../__mocks__/LocalStorage";
import $ from "jquery";

jest.mock("jquery", () => {
  const m$ = {
    click: jest.fn(cb => {jest.fn();}),
    text: jest.fn(cb => ({ text: jest.fn() }))
  };
  return jest.fn(() => m$);
});

describe("set Test suite", () => {
  let props, setUp;
  const setType = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");
  useStateSpy.mockImplementation((init) => [init, setType]);
  const requests = [{ id: 1, title: "a post", body: "the body" }];

  beforeEach(() => {
    global.localStorage = localStorage;
    global.localStorage.setItem("bn_user_data", `{
			"email":"requestero@user.com",
			"name":"travel_administrator",
			"userId":2,
			"verified":true,
			"role":"requester",
			"lineManagerId":7,
			"iat":1578472431,
			"exp":1578558831
    }`);

    props = {
      forgot: null,
      dataError: null,
      status: "",
      setPageLimit: jest.fn(),
      setRequests: jest.fn(),
      requestPageLimitState: jest.fn(),
      getAllRequests: jest.fn().mockResolvedValue(requests),
      resetIsSearching: jest.fn(),
    };
    const eventHandlerMap = {};
    ($(".dropdown-item.request-filter").click).mockImplementation((handler) => {
      $("#dropdownMenuButton").text($(this).text());
    });
    const useEffect = jest.spyOn(React, "useEffect").
      mockImplementation(f => f());
    setUp = (initialState = {}) => {
      return shallow(<RequestHeader {...props} />);
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should should 'all' be clickable as filter", () => {
    const component = setUp();
    component.find("[data-test=\"all\"]").
      simulate("click", { target: { id: 1 } });
    expect($).toBeCalledWith(".dropdown-item.request-filter");
    expect($).toBeCalledWith("#dropdownMenuButton");
    expect($).toBeCalledWith(this);
    expect(setType).toHaveBeenCalledWith(1);
  });

  it("Should should 'open' be clickable as filter", () => {
    const component = setUp();
    component.find("[data-test=\"open\"]").
      simulate("click", { target: { id: 1 } });
    expect(setType).toHaveBeenCalledWith(1);
  });

  it("Should should 'approved' be clickable as filter", () => {
    const component = setUp();
    component.find("[data-test=\"approved\"]").
      simulate("click", { target: { id: 1 } });
    expect(setType).toHaveBeenCalledWith(1);
  });

  it("Should should 'declined' be clickable as filter", () => {
    const component = setUp();
    component.find("[data-test=\"declined\"]").
      simulate("click", { target: { id: 1 } });
    expect(setType).toHaveBeenCalledWith(1);
  });

  it("Should should call 'setPageLimit' be clickable as filter", () => {
    const component = setUp();
    component.find("[data-test=\"item-5\"]").simulate("click");
    expect(props.setPageLimit).toHaveBeenCalledWith(5);
  });

  it("Should should dispatch 'setPageLimit'", () => {
    expect(mapDispatchToProps.setPageLimit(1)).
      toEqual({ type: "SET_REQUEST_PAGE_LIMIT", payload: { pageLimit: 1 } });
  });

  it("Should should dispatch 'resetIsSearching'", () => {
    mapDispatchToProps.resetIsSearching();
    expect(mapDispatchToProps.resetIsSearching()).
      toEqual({ type: "IS_REQUEST_SEARCHING", payload: false });
  });


  it("Should should get as a state 'requestPageLimitState' ", () => {
    expect(mapStateToProps({ requestPageLimitState: null })).
      toEqual({ requestPageLimitState: null });
  });

});
