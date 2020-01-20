import React from 'react';
import {
	cleanup,
	fireEvent,
	render as reactRender,
	waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Cookies from 'universal-cookie';
import localStorage from '../../__mocks__/LocalStorage';
import render from '../../__mocks__/render';
import SingleRequestPage from '../../views/SingleRequestPage';
import apiCall from '../../utils/api';

global.localStorage = localStorage;
jest.mock('../../utils/api');
jest.mock('universal-cookie', () => jest.fn());
Cookies.mockImplementation(() => ({
	get: () =>
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc',
}));
const request = {
	data: {
		data: {
			id: 6,
		   status: "open",
		   userId: 2,
		   type: "multi",
		   createdAt: "2020-01-14T18:03:40.430Z",
		   updatedAt: "2020-01-14T18:03:40.430Z",
		   trips: [{
			   type: "return",
			   reason: "visit our agents in that city",
			   travelDate: "2019-11-18T00:00:00.000Z",
			   returnDate: null,
			   createdAt: "2020-01-14T18:03:40.451Z",
			   updatedAt: "2020-01-14T18:03:40.451Z",
			   hotel:{
				   name: "Marriot Hotel"
			   },
			   going: {
				   country: "Uganda",
				   city: "Kampala"
			   },
			   leaving: {
				   country: "Kenya",
				   city: "Narobi"
			   }
		   }],
		   comments: [],
		   user: {
			   lastName: "User",
			   firstName: "Requester"
		   }

		}
	}
};

beforeEach(() => {
	global.localStorage.setItem("bn_user_data", `{
		"email":"requestero@user.com",
		"name":"Requester",
		"userId":2,
		"verified":true,
		"role":"manager",
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

apiCall.get.mockImplementation(() => Promise.resolve(request));

describe('Single request view', () => {
	test('Users should be able to able to view single request', async() => {
		const { getByText }  = render(<SingleRequestPage match={{params : {id:1}}}/>);

	    await waitForElement(()=> getByText('Approve'));
		expect(getByText('Approve')).toBeInTheDocument();
		expect(getByText('Request Details')).toBeInTheDocument();
	});
});
