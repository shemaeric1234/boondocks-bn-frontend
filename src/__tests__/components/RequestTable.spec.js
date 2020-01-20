import React from "react";
import { cleanup, fireEvent, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import localStorage from "../../__mocks__/LocalStorage";
import render from "../../__mocks__/render";
import Cookies from "universal-cookie";
import { BrowserRouter } from "react-router-dom";
import apiCall from "../../utils/api";
import RequestTable from '../../components/request/RequestTable';
import { requests } from '../../utils/requestTableData.js'

global.localStorage = localStorage;
jest.mock("universal-cookie", () => jest.fn());
jest.mock("../../utils/api");
apiCall.get.mockImplementation(() => Promise.resolve({
  data: requests
}));
Cookies.mockImplementation(
  () => ({ get: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc" }));

const emptyRequests = [];
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

describe("\"RequestPage view\"", () => {
	it("User can view all the requests", async () => {
		const { getAllByTestId, getByText } = render(<BrowserRouter><RequestTable requests={requests} /> </BrowserRouter> );
		const row = getAllByTestId('request-list-row');

		expect(getByText('John Doe2')).toBeInTheDocument();
		expect(getByText('Multi')).toBeInTheDocument();
		fireEvent.click(row[0]);
	});

	it("Component will render the table when requests are available", async () => {
		const { getByTestId, getByText } = render(<BrowserRouter><RequestTable requests={emptyRequests} /> </BrowserRouter> );
		const emptyHeader = getByTestId('empty-header');
		expect(emptyHeader).toBeInTheDocument();
	});

});

