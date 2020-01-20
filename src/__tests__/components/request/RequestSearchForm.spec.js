import {
  mapDispatchToProps,
  RequestSearchForm
} from "../../../components/request/RequestSearchForm";
import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/dom";

describe("\"RequestSearchForm\"", () => {
  afterEach(cleanup);
  const props = {
    requestSearch: jest.fn(),
    setRequests: jest.fn(),
    requests: [
      {
        "id": 2,
        "status": "open",
        "type": "return",
        "createdAt": "2020-01-23T11:36:11.365Z",
        "updatedAt": "2020-01-23T11:36:11.365Z"
      },
      {
        "id": 2,
        "status": "open",
        "type": "return",
        "createdAt": "2020-01-23T11:36:11.365Z",
        "updatedAt": "2020-01-23T11:36:11.365Z"
      },
      {
        "id": 2,
        "status": "open",
        "type": "return",
        "createdAt": "2020-01-23T11:36:11.365Z",
        "updatedAt": "2020-01-23T11:36:11.365Z"
      }],
    resetIsSearching: jest.fn(),
  };

  it("should render without error", async () => {
    const component = render(<RequestSearchForm {...props}/>);
    const { getByTestId, getByText } = component;

    const requestSearchForm = getByTestId("request_search_form");
    const searchStringField = getByTestId("search_string_field");
    const travelDateField = getByTestId("travel_date_field");
    const returnDateField = getByTestId("return_date_field");
    const submitButton = getByText("SEARCH");
    expect(requestSearchForm).toBeInTheDocument();

    const events = [
      { target: { id: "search_string", value: "Nairobi" } },
      { target: { id: "travel_date", value: "" } },
      { target: { id: "return_date", value: "" } },
      { preventDefault: jest.fn() }
    ];
    fireEvent.change(searchStringField, events[0]);
    fireEvent.change(travelDateField, events[1]);
    fireEvent.change(returnDateField, events[2]);
    fireEvent.click(submitButton);
    fireEvent.submit(requestSearchForm, events[3]);

  });

  it("should mapDispatchToProps", function() {
    mapDispatchToProps.setRequests();
    mapDispatchToProps.requestSearch({
      searchString:'',
      travelDate: '',
      returnDate: '',
    });
    mapDispatchToProps.resetIsSearching();
  });
});
