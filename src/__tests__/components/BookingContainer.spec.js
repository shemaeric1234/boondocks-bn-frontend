import React from 'react';
import {
	act,
	cleanup,
	fireEvent,
	waitForElement,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Cookies from 'universal-cookie';
import localStorage from '../../__mocks__/LocalStorage';
import render from '../../__mocks__/render';
import token from '../../__mocks__/token';
import BookingContainer from '../../components/BookingContainer';
import { getHotelById } from '../../lib/services/accommodation.service';
import { BrowserRouter } from 'react-router-dom';
import moment from 'moment';
import { bookAccommodation } from '../../lib/services/booking.service';
import { createMemoryHistory } from 'history';
import MockDate from 'mockdate';

global.localStorage = localStorage;
jest.mock('universal-cookie', () => jest.fn());
jest.mock('../../lib/services/accommodation.service');
jest.mock('../../lib/services/booking.service');

Cookies.mockImplementation(() => ({ get: () => token }));

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
	MockDate.set(1580043600000);
});

afterEach(() => {
	cleanup();
	global.localStorage.clear();
	localStorage.store = {};
	MockDate.reset();

});

const hotel = {
	data: {
		status: 'success',
		message: 'hotel retrieved successfully',
		data: {
			id: 2,
			name: 'Marriott',
			image:
				'https://boondocks-bn-images.s3.us-east-2.amazonaws.com/hotels/1579605498404-worldwide.png',
			description: 'hello',
			street: 'KK15',
			average_rating: '0.00',
			services: 'world',
			createdAt: '2020-01-21T11:18:21.724Z',
			likesCount: '0',
			unLikesCount: '0',
			likes: [],
			location: {
				id: 7,
				country: 'Rwanda',
				city: 'Kigali',
				long: null,
				lat: null,
				createdAt: '2020-01-18T14:08:30.367Z',
				updatedAt: '2020-01-18T14:08:30.367Z',
			},
			rooms: [
				{
					id: 1,
					hotelId: 2,
					name: 'virunga',
					type: 'VIP',
					description: 'hello',
					image: '',
					cost: 1000,
					status: 'available',
					createdAt: '2020-12-11T22:00:00.000Z',
					updatedAt: '2020-01-26T08:15:05.886Z',
				},
				{
					id: 2,
					hotelId: 2,
					name: 'hellop',
					type: 'single bed',
					description: 'hello',
					image:
						'https://boondocks-bn-images.s3.us-east-2.amazonaws.com/rooms/1579605648238-teaching%20%281%29.png',
					cost: 1300,
					status: 'reserved',
					createdAt: '2020-01-21T11:20:50.521Z',
					updatedAt: '2020-01-26T08:16:50.945Z',
				},
			],
			ratings: [],
		},
	}
};

const bookResponse = {
	status: 'success',
	message: 'Accommodation successfully booked',
	data: {
		userId: 6,
		hotelId: '2',
		arrivalDate: '2020-01-26T00:00:00.000Z',
		leavingDate: '2020-01-27T00:00:00.000Z',
		bookedRooms: [
			{
				bookingId: 31,
				room: {
					id: 1,
					hotelId: 2,
					name: 'Virunga',
					type: 'VIP',
					description: 'hello',
					image: '',
					cost: 1000,
					status: 'reserved',
					createdAt: '2020-12-11T22:00:00.000Z',
					updatedAt: '2020-01-26T10:31:50.139Z',
				},
			},
		],
	},
};

describe('Booking page', () => {

	test("User can view booking page ", async () => {
		getHotelById.mockImplementation(() => Promise.resolve(hotel));
		const { getByText, getAllByText } = render(
			<BrowserRouter>
				<BookingContainer match={{params : {hotelId:2}}}/>
			</BrowserRouter>
		);

		const [hotelName] = await waitForElement(() => [
			getByText('Marriott'),
		]);
		expect(hotelName).toBeInTheDocument();
	});

	test("User can book an accommodation", async () => {
		getHotelById.mockImplementation(() => Promise.resolve(hotel));
		bookAccommodation.mockImplementation(() => Promise.resolve(bookResponse));

		const history = createMemoryHistory();
		const { getByTestId, getByPlaceholderText, getAllByTestId, getByText, queryByText } = render(
			<BrowserRouter>
				<BookingContainer history={history} match={{params : {hotelId:2}}}/>
			</BrowserRouter>
		);

		const [ arrival, leaving, roomLink, submitBtn] = await waitForElement(() => [
			getByPlaceholderText('Arrival Date'),
			getByPlaceholderText('Leaving Date'),
			getAllByTestId('room-link'),
			getByTestId('submit-btn'),
		]);

		expect(arrival).toBeInTheDocument();
		expect(leaving).toBeInTheDocument();

		const arrival_date = moment().add(5, 'days').format("YYYY-MM-DD");
		const leaving_date = moment().add(8, 'days').format("YYYY-MM-DD");

		const arrival_date_invalid = moment().subtract(5, 'days').format("DD-MM-YYYY");
		const leaving_date_invalid = moment().subtract(5, 'days').format("DD-MM-YYYY");

		fireEvent.change(arrival, { target: { value: arrival_date_invalid }});
		fireEvent.blur(arrival);
		expect(getByText('Check In date must be today or a day in the future')).toBeInTheDocument();

		fireEvent.change(leaving, { target: { value: leaving_date_invalid }});
		fireEvent.blur(leaving);
		expect(getByText('Check Out date must not be before or be the same as arrival date')).toBeInTheDocument();

		fireEvent.change(arrival, { target: { value: arrival_date }});
		fireEvent.blur(arrival);
		expect(queryByText('Check In date must be today or a day in the future')).not.toBeInTheDocument();

		fireEvent.change(leaving, { target: { value: leaving_date }});
		fireEvent.blur(leaving);
		expect(queryByText('Check Out date must not be before or be the same as arrival date')).not.toBeInTheDocument();

		fireEvent.click(roomLink[0]);
		expect(getByText('Book (1 rooms)')).toBeInTheDocument();

		fireEvent.click(roomLink[0]);
		expect(queryByText('Book (1 rooms)')).not.toBeInTheDocument();

		fireEvent.click(roomLink[1]);

		fireEvent.click(submitBtn);

	});

});
