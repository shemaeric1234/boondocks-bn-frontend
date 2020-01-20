import React from "react";

import {
	cleanup,
	fireEvent,
	render as reactRender,
	waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
	getUserProfile,
	getUsers,
	updateUserRole,
} from '../../lib/services/user.service';
import localStorage from "../../__mocks__/LocalStorage";
import render from '../../__mocks__/render';
import Cookies from "universal-cookie";
import UsersContainer from "../../components/UsersContainer";

global.localStorage = localStorage;

jest.mock("../../lib/services/user.service");
jest.mock("universal-cookie", () => jest.fn());
Cookies.mockImplementation(
	() => ({ get: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc" }));



describe("User should be be able to view and edit profile", () => {
	let Component;
	const initialState = {
    usersState: {
      users: [],
      selectedUser: {},
    }
  };

  const users = {
		data: {
      data: [{
        id: 13,
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        birthDate: null,
        residenceAddress: null,
        lineManagerId: null,
        preferredLanguage: null,
        preferredCurrency: null,
        department: null,
        role: "requester",
        phoneNumber: null,
        createdAt: "2020-01-08T07:41:26.602Z",
        updatedAt: "2020-01-14T17:34:46.560Z",
      },
				{
					id: 2,
					firstName: "John",
					lastName: "Doe",
					email: "john@doe.com",
					birthDate: null,
					residenceAddress: null,
					lineManagerId: null,
					preferredLanguage: null,
					preferredCurrency: null,
					department: null,
					role: "requester",
					phoneNumber: null,
					createdAt: "2020-01-08T07:41:26.602Z",
					updatedAt: "2020-01-14T17:34:46.560Z",
				}]
    }
  };

  const changeRoleResponse = {
  	data: {
  		data: {
				firstName: "John",
				lastName: "Doe",
				role: "travel_administrator",
			}
		}
	};

	getUsers.mockImplementation(() => Promise.resolve(users));
	updateUserRole.mockImplementation(() => Promise.resolve(changeRoleResponse));
	beforeEach(() => {
		Component = (
			<UsersContainer/>
		);

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

	test("User can view all users", async () => {
    const { getByText, getByPlaceholderText } = render(Component, initialState);

    const profileTitle = await waitForElement(
			() => getByText("John Doe")
    );

		expect(getByText('Users (1)')).toBeInTheDocument();
	});

	test("Super admin can click on user to open popup", async () => {
		const { getByText, getAllByText, getByPlaceholderText } = render(Component, initialState);

		const user = await waitForElement(
			() => getByText("John Doe").closest('a')
		);
		expect(getByText('Users (1)')).toBeInTheDocument();

		fireEvent.click(user);

		expect(getByText('Change role for'));
		expect(getAllByText('John Doe'));
	});

	test("Super admin can assign role to the user", async () => {
		const { getByText, getAllByText, getByPlaceholderText } = render(Component, initialState);

		const user = await waitForElement(
			() => getByText("John Doe").closest('a')
		);
		expect(getByText('Users (1)')).toBeInTheDocument();

		fireEvent.click(user);

		const roleSelectInput = getByPlaceholderText('Select User Role')
			.closest('select');
		const assignRoleButton = getByText('Assign New Role').closest('button');

		fireEvent.change(roleSelectInput, { target: { value: 'travel_administrator'}});
		fireEvent.click(assignRoleButton);

	});

	test("Super admin can cancel assigning role to the user", async () => {
		const { getByText, getAllByText, getByPlaceholderText } = render(Component, initialState);
		const user = await waitForElement(
			() => getByText("John Doe").closest('a')
		);
		fireEvent.click(user);
		const roleSelectInput = getByPlaceholderText('Select User Role')
			.closest('select');
		const cancelButton = getByText('Cancel').closest('button');
		fireEvent.change(roleSelectInput, { target: { value: 'travel_administrator'}});
		fireEvent.click(cancelButton);

	});

});

