import { findByTestAttr } from "../../../utils/testUtil";
import { allRequestsManager } from "../../../__mocks__/PaginationButtons.mock";
import { shallow } from "enzyme";
import React from "react";
import PaginationButtons, { gotoPage, handleClick, handleMoveLeft, handleMoveRight } from "../../../components/request/PaginationButtons";
import * as ReactReduxHooks from "../../../utils/react-redux-hooks";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const setUp = (props = {}) => shallow(<PaginationButtons {...props} />);
const props = {
  onPageChanged: jest.fn(),
  allRequests: allRequestsManager,
  pageNeighbours: 1
};

describe("'PaginationButtons component'", () => {
  let wrapper;
  let useEffect;
  let store;

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };

  beforeEach(() => {
    store = configureStore([thunk])({
      requestPageLimitState: {
        pageLimit: 5
      }
    });

    useEffect = jest.spyOn(React, "useEffect");

    mockUseEffect();

    jest.spyOn(ReactReduxHooks, "useSelector").
      mockImplementation(state => store.getState());

    wrapper = setUp({ ...props, store: store });
  });

  it("should render without error", () => {
    const component = findByTestAttr(wrapper, "paginate-buttons");
    expect(component.length).toBe(1);
  });
  it('range', () =>{});
  it('gotoPage', () =>{});
  it('getAllPages', () =>{});
  it('handleClick', () =>{});
  it('handleMoveLeft', () =>{});
  it('handleMoveRight', () =>{});
});
