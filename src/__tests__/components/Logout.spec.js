import React from "react";
import {
	cleanup,
	fireEvent,
	render as reactRender,
	waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { applyMiddleware, createStore } from "redux";
import reducers from "../../store/reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import localStorage from "../../__mocks__/LocalStorage";
import Cookies from "universal-cookie";
import Navbar from '../../components/Navbar';
import { BrowserRouter } from "react-router-dom";

global.localStorage = localStorage;
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
jest.mock("../../lib/services/user.service");
jest.mock("universal-cookie", () => jest.fn());
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc";
Cookies.mockImplementation(
	() => ({
    get: () =>  token,
    remove: () => true,

  })
);

  const render = (ui, initialState = {}, options = {}) => {
	const store = createStore(reducers, initialState,
		composeWithDevTools(applyMiddleware(thunk)));
	const Providers = ({ children }) => (
		<Provider store={store}>{children}</Provider>
	);
	return reactRender(ui, { wrapper: Providers, ...options });
};
afterEach(cleanup);
test('should logout user successfully', async () => {

  const initialState = {
    authState: {
      isAuthenticated: true
    }
  };
  const { getByText } = render(<BrowserRouter><Navbar /></BrowserRouter>, initialState);

  const logoutLink = await waitForElement(
    () => getByText('Logout').closest('button')
  );

  fireEvent.click(logoutLink);
  expect(getByText('Login')).toBeInTheDocument();
});
