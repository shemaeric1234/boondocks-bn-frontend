import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserAccount from "../../components/UserAccount";
import { BrowserRouter } from "react-router-dom";

describe("UserAccount component", () => {
  it("should render without error", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <UserAccount/>
      </BrowserRouter>
    );
    expect(getByTestId("user-account")).toBeInTheDocument();
  });
});
