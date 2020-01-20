import { findByTestAttr } from "../../../utils/testUtil";
import RequestPagination from "../../../components/request/RequestPagination";
import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as ReactReduxHooks from "../../../utils/react-redux-hooks";
import { requestsManager1 } from "../../../__mocks__/RequestTable.mock";

const setUp = (props={}) =>  shallow(<RequestPagination {...props} />);
const props = {
  setRequests: jest.fn(),
};

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

  it('should render without error', () =>{
    const component = findByTestAttr(wrapper, 'request-pagination');
    expect(component.length).toBe(1)
  })
});
