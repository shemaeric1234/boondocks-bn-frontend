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
import ProfileContainer from "../../components/ProfileContainer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { getUserProfile, getUsers } from "../../lib/services/user.service";
import localStorage from "../../__mocks__/LocalStorage";
import { createMemoryHistory } from "history";
import Cookies from "universal-cookie";

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
Cookies.mockImplementation(
	() => ({ get: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc" }));

const render = (ui, initialState = {}, options = {}) => {
	const store = createStore(reducers, initialState,
		composeWithDevTools(applyMiddleware(thunk)));
	const Providers = ({ children }) => (
		<Provider store={store}>{children}</Provider>
	);
	return reactRender(ui, { wrapper: Providers, ...options });
};

describe("User should be be able to view and edit profile", () => {
	let Component;
	const userProfile = {
		data: {
			data: {
				firstName: "Requester",
				lastName: "User",
				email: "requester@user.com",
				isVerified: true,
				birthDate: "2001-11-11T00:00:00.000Z",
				residenceAddress: null,
				preferredLanguage: "French USA",
				preferredCurrency: "usd",
				department: "marketing",
				gender: "male",
				lastLogin: "2020-01-04T08:19:43.909Z",
				role: "requester",
				phoneNumber: "0786466253",
				lineManager: {
					id: 7,
					firstName: "john",
					lastName: "doe",
				}
			}
		}
	};

	const managers = {
		data: {
			data: [
				{
					id: 1,
					firstName: "john",
					lastName: "doe",
					email: "john@barefoot.com",
					birthDate: '2001-11-11T00:00:00.000Z',
					residenceAddress: null,
					lineManagerId: null,
					preferredLanguage: null,
					preferredCurrency: null,
					department: null,
					gender: null,
					role: "manager",
					phoneNumber: null,
					createdAt: "2019-12-11T18:15:54.157Z",
					updatedAt: "2019-12-12T11:05:52.591Z"
				}
			]
		}
	};

	const initialState = {
		profileState: {
			userProfile: {},
			errors: {},
			managers: [],
			initialProfile: {},
			isFetching: false,
			fetchError: null,
			isEditing: false,
			currentUserId: null
		}
	};
	getUserProfile.mockImplementation(() => Promise.resolve(userProfile));
	getUsers.mockImplementation(() => Promise.resolve(managers));
	beforeEach(() => {
		const history = createMemoryHistory();
		Component = (
			<ProfileContainer history={history} match={{ params: { userId: 1 } }}/>
		);
	});

	afterEach(cleanup);
	test("User can view profile information", async () => {
		const { getByText, getByPlaceholderText } = render(Component, initialState);
		const profileTitle = await waitForElement(
			() => getByText("Profile Information")
		);
		expect(getByText("Contact Information")).toBeInTheDocument();
		expect(getByText("marketing")).toBeInTheDocument();
	});

	test("User can edit profile information", async () => {
		const { getByText, getByPlaceholderText, getByDisplayValue } = render(
			Component, initialState);
		const editButton = await waitForElement(
			() => getByText('Edit Profile').closest('button')
		);
		fireEvent.click(editButton);
		expect(getByDisplayValue('requester@user.com')).toBeInTheDocument();
		const [emailField, languageField, managerField] = await waitForElement(
			() => [
				getByPlaceholderText('Edit Email'),
				getByPlaceholderText('Edit Preferred Language'),
				getByPlaceholderText('Edit Line Manager'),
			]
		);
		fireEvent.change(emailField, { target: { value: 'user@'}});
		fireEvent.blur(emailField);
		expect(getByText('Email is not valid')).toBeInTheDocument();
		fireEvent.change(languageField, { target: { value: ''}});
		fireEvent.blur(languageField);
		fireEvent.change(managerField, { target: { value: 0}});
		fireEvent.blur(managerField);
		expect(getByDisplayValue('Choose Manager')).toBeInTheDocument();
		fireEvent.change(emailField, { target: { value: 'user@gmail.com'}});
		fireEvent.blur(emailField);
	});

	test('User can revert profile changes', async () => {
		const { getByText, getByPlaceholderText, getByDisplayValue } = render(Component, initialState);
		const editButton = await waitForElement(
			() => getByText('Edit Profile').closest('button')
		);
		fireEvent.click(editButton);
		const [emailField, cancelButton] = await waitForElement(
			() => [
				getByPlaceholderText('Edit Email'),
				getByText('Cancel')
			]
		);
		fireEvent.change(emailField, { target: { value: 'user@'}});
		fireEvent.blur(emailField);
		fireEvent.click(cancelButton);
		expect(getByText('requester@user.com')).toBeInTheDocument();
	});

	test('User can save profile changes', async () => {
		const { getByText, getByPlaceholderText } = render(Component, initialState);
		const editButton = await waitForElement(
			() => getByText('Edit Profile').closest('button')
		);
		fireEvent.click(editButton);
		const [phoneField, saveButton, dateField] = await waitForElement(
			() => [
				getByPlaceholderText('Edit Phone Number'),
				getByText('Save Changes'),
				getByPlaceholderText('Edit Birth Date')
			]
		);
		fireEvent.change(phoneField, { target: { value: '0786666666'}});
		fireEvent.blur(phoneField);
		fireEvent.click(saveButton);
		expect(getByText('0786666666')).toBeInTheDocument();
	});

	test('User can not save profile changes with errors', async () => {
		const { getByText, getByPlaceholderText } = render(Component, initialState);
		const editButton = await waitForElement(
			() => getByText('Edit Profile').closest('button')
		);
		fireEvent.click(editButton);
		const [emailField, saveButton] = await waitForElement(
			() => [
				getByPlaceholderText('Edit Email'),
				getByText('Save Changes')
			]
		);
		fireEvent.change(emailField, { target: { value: 'user@'}});
		fireEvent.blur(emailField);
		expect(getByText('Save Changes')).toBeInTheDocument();
		fireEvent.click(saveButton);
		fireEvent.change(emailField, { target: { value: 'user@gmail.com'}});
		fireEvent.blur(emailField);
		fireEvent.click(saveButton);
		expect(getByText('user@gmail.com')).toBeInTheDocument();
	});

});

