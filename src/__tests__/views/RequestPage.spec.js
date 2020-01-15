// import { findByTestAttr } from "../../utils/testUtil";
// import { shallow } from "enzyme";
// import { RequestPage } from "../../views/RequestPage";
// import React from "react";
//
// const setUp = (props = {}) => shallow(<RequestPage {...props} />);
//
// describe("'RequestPage page'", () => {
//   let wrapper;
//   beforeEach(() => wrapper = setUp());
//
//   it("should render without error", () => {
//     const component = findByTestAttr(wrapper, "request-page");
//     expect(component.length).toBe(1);
//   });
// });
//
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
import PaginationButtons from '../../components/request/PaginationButtons';


global.localStorage = localStorage;
jest.mock("universal-cookie", () => jest.fn());
jest.mock("../../utils/api");
apiCall.get.mockImplementation(() => Promise.resolve({
  data: requestData
}));
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


const requests = [{
  id: 2,
  status: "approved",
  userId: 2,
  type: "single",
  createdAt: "2019-12-12T11:00:44.246Z",
  names: "John Doe1"
},
  {
    id: 2,
    status: "approved",
    userId: 2,
    type: "single",
    createdAt: "2019-12-12T11:00:44.246Z",
    names: "John Doe2"
  },
  {
    id: 2,
    status: "approved",
    userId: 2,
    type: "single",
    createdAt: "2019-12-12T11:00:44.246Z",
    names: "John Doe3"
  }
  ,{
    id: 2,
    status: "approved",
    userId: 2,
    type: "Multi",
    createdAt: "2019-12-12T11:00:44.246Z",
    names: "John Doe4"
  }
  ,{
    id: 2,
    status: "approved",
    userId: 2,
    type: "single",
    createdAt: "2019-12-12T11:00:44.246Z",
    names: "John Doe5"
  },
  {
    id: 2,
    status: "approved",
    userId: 2,
    type: "single",
    createdAt: "2019-12-12T11:00:44.246Z",
    names: "John Doe6"
  },
  {
    id: 2,
    status: "approved",
    userId: 2,
    type: "single",
    createdAt: "2019-12-12T11:00:44.246Z",
    names: "John Doe7"
  }];
describe("\"RequestPage view\"", () => {
  it("should render", async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <RequestPage/>
      </BrowserRouter>
    );

    const data = await waitForElement(() => getByTestId('content'));
    const btn2 = getByTestId('page-button-1');
    const btn1 = getByTestId('page-button-0');

    fireEvent.click(btn2);
    await waitForElement(() => getByTestId('content'))

    fireEvent.click(btn1);
    await waitForElement(() => getByTestId('content'))
  });

  // it("should render", async () => {
  //   const props = {
  //     onPageChanged: jest.fn(),
  //     allRequests: [
  //       {
  //         "id": 10,
  //         "status": "open",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:10:07.618Z",
  //         "updatedAt": "2020-01-12T19:10:07.618Z"
  //       },
  //       {
  //         "id": 2,
  //         "status": "open",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:09.078Z",
  //         "updatedAt": "2020-01-12T19:09:09.078Z"
  //       },
  //       {
  //         "id": 5,
  //         "status": "open",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:41.152Z",
  //         "updatedAt": "2020-01-12T19:09:41.152Z"
  //       },
  //       {
  //         "id": 8,
  //         "status": "declined",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:55.967Z",
  //         "updatedAt": "2020-01-12T19:09:55.967Z"
  //       },
  //       {
  //         "id": 6,
  //         "status": "open",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:48.022Z",
  //         "updatedAt": "2020-01-12T19:09:48.022Z"
  //       },
  //       {
  //         "id": 4,
  //         "status": "approved",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:31.388Z",
  //         "updatedAt": "2020-01-12T19:09:31.388Z"
  //       },
  //       {
  //         "id": 1,
  //         "status": "open",
  //         "type": "single",
  //         "createdAt": "2020-01-12T14:00:10.221Z",
  //         "updatedAt": "2020-01-12T14:00:10.221Z"
  //       },
  //       {
  //         "id": 3,
  //         "status": "approved",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:18.297Z",
  //         "updatedAt": "2020-01-12T19:09:18.297Z"
  //       },
  //       {
  //         "id": 9,
  //         "status": "open",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:10:02.359Z",
  //         "updatedAt": "2020-01-12T19:10:02.359Z"
  //       },
  //       {
  //         "id": 7,
  //         "status": "declined",
  //         "type": "single",
  //         "createdAt": "2020-01-12T19:09:51.642Z",
  //         "updatedAt": "2020-01-12T19:09:51.642Z"
  //       }],
  //     pageNeighbours: 1
  //   };
  //   const { getByTestId } = render(
  //     <PaginationButtons {...props}/>
  //   );
  //
  //   const [pg1, pg2] = await waitForElement(() => [
  //     getByTestId("page-button-0"),
  //     getByTestId("page-button-1"),
  //   ]);
  //
  //   fireEvent.click(pg1);
  //   fireEvent.click(pg2);
  // });
});
