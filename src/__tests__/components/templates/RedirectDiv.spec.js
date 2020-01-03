import { shallow } from "enzyme";
import React from "react";
import RedirectDiv from "../../../components/templates/RedirectDiv";

describe("RedirectDiv", () => {
  it("should render without error", () => {
    const wrapper = shallow(<RedirectDiv linkRoute=''
                                         linkText=''
                                         placeholder=''/>);
    expect(wrapper.find(".redirectDiv")).toHaveLength(1);
  });
});
