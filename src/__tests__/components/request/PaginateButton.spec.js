import {findByTestAttr} from '../../../utils/testUtil';
import { shallow } from "enzyme";
import PaginateButton from "../../../components/request/PaginateButton";
import React from "react";

const setUp = (props = {}) => shallow(<PaginateButton {...props} />);
const props = { onClick: jest.fn(), arrow: '>>', text: 'Next' };

describe("'PaginateButton component'", () => {
  let wrapper;
  beforeEach(() => wrapper = setUp(props));

  it('should render without error', () =>{
    const component = findByTestAttr(wrapper, 'paginate-arrow-button');
    expect(component.length).toBe(1)
  })
});
