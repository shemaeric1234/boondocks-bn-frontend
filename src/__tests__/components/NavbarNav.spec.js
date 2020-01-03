// user-account
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import NavbarNav from "../../components/NavbarNav";
import {
  navItemObjects,
  notificationsItems
} from "../../components/NavbarData";

describe("NavbarNav component", () => {
  it("should render with additional links if user is authenticated", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <NavbarNav navItems={[navItemObjects[0]]}
                   isAuthenticated={true}
                   notifications={[...notificationsItems]}/>
      </BrowserRouter>
    );
    expect(getByTestId("other-links")).toBeInTheDocument();
  });
});
