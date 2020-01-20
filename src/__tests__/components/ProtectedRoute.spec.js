import React from "react";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { shallow } from "enzyme";

const setUp = (props = {}) => shallow(<ProtectedRoute {...props} />);
describe("\"ProtectedRoute\"", () => {
  let wrapper;
  const user_data = `{
      "email":"requestero@user.com",
      "name":"Requester",
      "userId":2,
      "verified":true,
      "role":"requester",
      "lineManagerId":7,
      "iat":1578472431,
      "exp":1578558831
    }`;
  it("should render without error", function() {
    global.localStorage = { bn_user_data: user_data };
    const props = { setAuthState: jest.fn() };
    wrapper = setUp(props);
    const component = wrapper.find(`[data-test='protected-route']`);
    expect(component.length).toBe(1);
  });
});
