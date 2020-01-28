import {findByTestAttr} from '../../../utils/testUtil';
import { shallow } from "enzyme";
import PaginateButton from "../../../components/request/PaginateButton";
import React from "react";

const props = { onClick: jest.fn(), arrow: '>>', text: 'Next' };
const setUp = (props = {}) => shallow(<PaginateButton {...props} />);

describe("'PaginateButton component'", () => {
  let wrapper;
  beforeEach(() => wrapper = setUp(props));

  it('should render without error', () =>{
    const btn = findByTestAttr(wrapper, 'paginate-button-button');
    btn.simulate('click');
    expect(props.onClick).toBeCalled();
  })
});
