import React from 'react';
import {
	act,
	cleanup,
	fireEvent,
	render as reactRender,
	waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Cookies from 'universal-cookie';
import postComment from '../../lib/services/commentService';
import localStorage from '../../__mocks__/LocalStorage';
import render from '../../__mocks__/render';
import SingleRequestPage from '../../views/SingleRequestPage';
import apiCall from '../../utils/api';

import {
	getSingleRequest,
	updateRequestStatus,
} from '../../lib/services/requests.service';

global.localStorage = localStorage;
jest.mock('../../utils/api');
jest.mock('../../lib/services/commentService')
jest.mock('../../lib/services/requests.service');
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
				 id: 1,
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
		   comments: [{
			id: 1,
			requestId: 1,
			userId: 2,
			comment: "nnnn",
			isVisible: true,
			createdAt: "2020-01-20T08:51:31.090Z",
			updatedAt: "2020-01-20T08:51:31.090Z",
			author: {
				"firstName": "Requester",
				"lastName": "User"
			}
		   },
		   {
			id: 2,
			requestId: 1,
			userId: 3,
			comment: "ppp",
			isVisible: true,
			createdAt: "2020-01-20T08:51:31.090Z",
			updatedAt: "2020-01-20T08:51:31.090Z",
			author: {
				"firstName": "Line",
				"lastName": "Manager"
			}
		   }],
		   user: {
			   lastName: "User",
			   firstName: "Requester"
		   }  
	   	
		}
	}
}

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

apiCall.get.mockImplementation(() => Promise.resolve(request))
postComment.mockImplementation(() => Promise.resolve({}))
const approvedRequest = {
	data: {
		data: {
			id: 1,
			status: 'approved',
			userId: 2,
			type: 'single',
			createdAt: '2020-01-18T14:17:05.952Z',
			updatedAt: '2020-01-18T16:53:42.465Z',
			trips: [],
			comments: [],
			user: {
				lastName: 'User',
				firstName: 'Requester',
			},
		},
	}
};

const declinedRequest = {
	data: {
		data: {
			id: 1,
			status: 'declined',
			userId: 2,
			type: 'single',
			createdAt: '2020-01-18T14:17:05.952Z',
			updatedAt: '2020-01-18T16:53:42.465Z',
			trips: [],
			comments: [],
			user: {
				lastName: 'User',
				firstName: 'Requester',
			},
		},
	}
};

describe('Single request view', () => {
	getSingleRequest.mockImplementation(() => Promise.resolve(request));
	const initialState = {
		requestState: {
			data: null,
			error: null,
			status: '',
			request: {},
		}
	};
	test('Users should be able to able to view single request', async() => {
		const { getByText }  = render(<SingleRequestPage match={{params : {id:1}}}/>);

		await waitForElement(()=> getByText('Approve'));
		expect(getByText('Approve')).toBeInTheDocument();
		expect(getByText('Request Details')).toBeInTheDocument();
	});
	test('Users should be able to post comment', async() => {
		const { getByText, getByPlaceholderText }  = render(<SingleRequestPage match={{params : {id:1}}}/>);

		const [commentButton, commemntBox] = 
		await waitForElement(()=> [getByText('Add comment'), getByPlaceholderText('Enter your comment here')]);
		fireEvent.change(commemntBox, {target : {value: 'comment'}})
		fireEvent.click(commentButton)
    });
	test("Manager can ", async () => {

		getSingleRequest.mockImplementation(() => Promise.resolve(approvedRequest));
		updateRequestStatus.mockImplementation(() => Promise.resolve(approvedRequest));

		const { getByText, getAllByText } = render(<SingleRequestPage match={{params : {id:1}}}/>);

		const declineBtn = await waitForElement(
			() => getByText('Decline').closest('button')
		);

		await act( async () => {
			fireEvent.click(declineBtn);
		});

		const confirmBtn = await waitForElement(
			() => getAllByText('Confirm')
		);

		await act(async () => {
			fireEvent.click(confirmBtn[0]);
		});

	});

	test("Manager can approve request", async () => {

		getSingleRequest.mockImplementation(() => Promise.resolve(declinedRequest));
		updateRequestStatus.mockImplementation(() => Promise.resolve(declinedRequest));

		const { getByText, getAllByText } = render(<SingleRequestPage match={{params : {id:1}}}/>);

		const approveBtn = await waitForElement(
			() => getByText('Approve').closest('button')
		);

		await act( async () => {
			fireEvent.click(approveBtn);
		});

		const confirmBtn = await waitForElement(
			() => getAllByText('Confirm')
		);

		await act( async () => {
			fireEvent.click(confirmBtn[1]);
		});

	});

	test("Manager cancel request reject/approve", async () => {

		getSingleRequest.mockImplementation(() => Promise.resolve(declinedRequest));
		updateRequestStatus.mockImplementation(() => Promise.resolve(declinedRequest));

		const { getByText, getAllByText } = render(<SingleRequestPage match={{params : {id:1}}}/>);

		const cancelBtn = await waitForElement(
			() => getAllByText('Cancel')
		);

		await act( async () => {
			fireEvent.click(cancelBtn[1]);
		});

	});
});
