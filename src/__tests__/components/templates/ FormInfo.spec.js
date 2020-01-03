import { shallow } from "enzyme";
import React from "react";
import FormInfo from "../../../components/templates/FormInfo";

describe("formInfo", () => {
  it("should render without error", () => {
    const wrapper = shallow(<FormInfo infoText='' />);
    expect(wrapper.find(".formInfo")).toHaveLength(1);
  });
});
