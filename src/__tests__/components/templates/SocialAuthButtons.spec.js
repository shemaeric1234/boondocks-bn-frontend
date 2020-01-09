import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { mount } from 'enzyme';
import SocialAuthButtons, { socialAuthRedirect } from "../../../components/templates/SocialAuthButtons";

describe("SocialAuthButtons template component", () => {
  const { location } = window;
  const wrapper = mount(<SocialAuthButtons />);
  beforeAll(() => {
    delete window.location;
    window.location = { replace: jest.fn() };
  });
  afterAll(() => {
    window.location = location;
  });

  it("should render without error", () => {
    const socialAuthBtnsComp = render(<SocialAuthButtons/>);
    expect(socialAuthBtnsComp.getByTestId("social-auth-btns")).
      toBeInTheDocument();
  });

  it("should redirect upon socialAuthRedirect", () => {
    socialAuthRedirect("facebook");
    expect(window.location.replace).toHaveBeenCalled();
  });

  it("should redirect upon socialAuthRedirect", () => {
    socialAuthRedirect("google");
    expect(window.location.replace).toHaveBeenCalled();
  });

  it("should get Facebook value", () => {
    wrapper.find('input').first().simulate("click");
    expect(wrapper.find("InputForm").first().props().value).toEqual('Facebook')
  });

  it("should get Google value", () => {
    wrapper.find('input').last().simulate("click");
    expect(wrapper.find("InputForm").last().props().value).toEqual('Google')
  });
});
