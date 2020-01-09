import React from "react";
import RegisterPage from "../../views/RegisterPage";
import { shallow } from "enzyme";

describe("RegisterPage view", () => {
	it("should render without error", () => {
		const wrapper = shallow(<RegisterPage/>);
		expect(wrapper.find("[data-testid='register-page']")).toHaveLength(1);
	});
});
