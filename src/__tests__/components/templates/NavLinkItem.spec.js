import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import NavLinkItem, { evenNotificationClass } from "../../../components/templates/NavLinkItem";
import { BrowserRouter } from "react-router-dom";

describe("NavLinkItem template component", () => {
  it("should display notification", () => {
    const navLinkItem = render(
      <BrowserRouter>
        <NavLinkItem
          linkText=''
          linkRoute={""}
          icon={""}
          haspopup
          notifications={[{
            title: '',
            body: '',
            dateTime: '',
            link: '',
          }]}
        />
      </BrowserRouter>
    );
      expect(navLinkItem.getByTestId("notification")).toBeTruthy();
    });

  it('evenNotificationClass', () => {
    expect(evenNotificationClass(1)).toBe(' bg-gray');
    expect(evenNotificationClass(0)).toBe('');
  });

  it('has an icon', () => {
    const navLinkItem = render(
      <BrowserRouter>
        <NavLinkItem
          linkText=''
          linkRoute={""}
          icon={"home"}
          haspopup
          notifications={[]}
        />
      </BrowserRouter>
    );
    expect(navLinkItem.getByTestId("fa-icon")).toBeTruthy();
  });

  it('doesn\'t have an icon', () => {
    const navLinkItem = render(
      <BrowserRouter>
        <NavLinkItem
          linkText=''
          linkRoute={''}
          icon={''}
          haspopup
          notifications={[]}
        />
      </BrowserRouter>
    );
    expect(navLinkItem.queryByTestId("fa-icon")).toBeNull();
  })
});
