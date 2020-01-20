import React from "react";
import { cleanup, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import localStorage from "../../__mocks__/LocalStorage";
import render from "../../__mocks__/render";
import Cookies from "universal-cookie";
import { RequestPage } from "../../views/RequestPage";
import { BrowserRouter } from "react-router-dom";
import apiCall from "../../utils/api";
import { requestData } from "../../__mocks__/requestResponseData";

global.localStorage = localStorage;
jest.mock("universal-cookie", () => jest.fn());
jest.mock("../../utils/api");
apiCall.get.mockImplementation(() => Promise.resolve({
  data: requestData
}));
describe("\"RequestPage view\"", () => {

  Cookies.mockImplementation(
    () => ({ get: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc" }));

  beforeEach(() => {
    global.localStorage.setItem("bn_user_data", `{
			"email":"requestero@user.com",
			"name":"Requester",
			"userId":2,
			"verified":true,
			"role":"requester",
			"lineManagerId":7,
			"iat":1578472431,
			"exp":1578558831
		}`);
  });
  afterEach(() => {
    cleanup();
    global.localStorage.clear();
    localStorage.store = {};
  });

  it("should render", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <RequestPage/>
      </BrowserRouter>
    );

    await waitForElement(() => getByTestId("content"));
    const btn2 = getByTestId("page-button-1");
    const btn1 = getByTestId("page-button-0");

    fireEvent.click(btn2);
    await waitForElement(() => getByTestId("content"));

    fireEvent.click(btn1);
    await waitForElement(() => getByTestId("content"));
  });
});

describe("\"RequestPage view\"", () => {

  Cookies.mockImplementation(
    () => ({ get: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc" }));

  beforeEach(() => {
    global.localStorage.setItem("bn_user_data", `{
			"email":"requestero@user.com",
			"name":"Requester",
			"userId":2,
			"verified":true,
			"role":"requester",
			"lineManagerId":7,
			"iat":1578472431,
			"exp":1578558831
		}`);
  });
  afterEach(() => {
    cleanup();
    global.localStorage.clear();
    localStorage.store = {};
  });

  it("should render", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <RequestPage/>
      </BrowserRouter>
    );

    await waitForElement(() => getByTestId("content"));
    const btn2 = getByTestId("page-button-1");
    const btn1 = getByTestId("page-button-0");

    fireEvent.click(btn2);
    await waitForElement(() => getByTestId("content"));

    fireEvent.click(btn1);
    await waitForElement(() => getByTestId("content"));
  });
});
