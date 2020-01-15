import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../utils/testUtil";
import RequestHeader from "../../../components/request/RequestHeader";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as ReactReduxHooks from "../../../utils/react-redux-hooks";

const setUp = (props = {}) => shallow(<RequestHeader {...props} />);

describe("'RequestHeader component'", () => {
  let wrapper;
  let useEffect;
  let store;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    localStorage.setItem('bn_user_data', JSON.stringify({role: 'manager'}))
    store = configureStore([thunk])({
      requestPageLimitState: {
        pageLimit: 3
      }
    });

    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect();

    jest.spyOn(ReactReduxHooks, "useSelector").
      mockImplementation(state => store.getState());

    jest.spyOn(ReactReduxHooks, "useDispatch").
      mockImplementation(() => store.dispatch);

    wrapper = setUp({ store: store });
  });

  afterEach(() => localStorage.removeItem('bn_user_data'));

  it("should render without error", () => {
    const component = findByTestAttr(wrapper, "request-header");
    expect(component.length).toBe(1);
  });

  it("should setPageLimit", () => {});
});
