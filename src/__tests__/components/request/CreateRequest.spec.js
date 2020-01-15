import React from "react";
import {
	cleanup,
	fireEvent,
	render as reactRender,
	waitForElement,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { applyMiddleware, createStore } from "redux";
import reducers from "../../../store/reducers";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import localStorage from "../../../__mocks__/LocalStorage";
import Cookies from "universal-cookie";
import CreateRequestPage from '../../../views/requests/CreateRequestPage';
import { BrowserRouter } from "react-router-dom";
import { getLocationsWithHotels, getLocations, createATrip } from "../../../lib/services/createRequest.service";

global.localStorage = localStorage;


jest.mock("universal-cookie", () => jest.fn());
jest.mock("../../../lib/services/createRequest.service");
jest.mock("react-select", () => ({ options, value, onChange }) => {
  function handleChange(event) {
    const option = options.find(
      option => option.value === event.currentTarget.value
    );
    onChange(option);
  }
  return (
    <select data-testid="room" value={value} onChange={handleChange}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdpbGRuaXkwNUBnbWFpbC5jb20iLCJuYW1lIjoiR2lsZGFzIiwidXNlcklkIjoxLCJ2ZXJpZmllZCI6dHJ1ZSwicm9sZSI6InJlcXVlc3RlciIsImxpbmVNYW5hZ2VySWQiOm51bGwsImlhdCI6MTU3ODU3MTM0OSwiZXhwIjoxNTc4NjU3NzQ5fQ.SmBRYQ-zYgEl08jObfqrtFjrJTCU33-DsMGCRC2RZuc";
Cookies.mockImplementation(
	() => ({
    get: () =>  token,
    remove: () => true,

  })
);

const locations = {
  data: {
	status: 'success',
	message: 'Locations fetched successfully',
	data: [
		{
			id: 1,
			country: 'Kenya',
			city: 'Nairobi',
			long: null,
			lat: null,
			createdAt: '2020-01-22T16:14:30.382Z',
			updatedAt: '2020-01-22T16:14:30.382Z',
		},
		{
			id: 7,
			country: 'Rwanda',
			city: 'Kigali',
			long: null,
			lat: null,
			createdAt: '2020-01-22T16:14:30.382Z',
			updatedAt: '2020-01-22T16:14:30.382Z',
		},
	],
}};

const locationWithNoHotels = {
  data: {
    status: 'success',
    message: 'Locations fetched successfully',
    data: [
      {
        id: 7,
        country: 'Rwanda',
        city: 'Kigali',
        long: null,
        lat: null,
        createdAt: '2020-01-22T16:14:30.382Z',
        updatedAt: '2020-01-22T16:14:30.382Z',
      }
    ]
  }
};


const hotelsWithNoRooms = {
  data: {
	status: 'success',
	message: 'Locations fetched successfully',
	data: [
		{
			id: 7,
			country: 'Rwanda',
			city: 'Kigali',
			long: null,
			lat: null,
			createdAt: '2020-01-22T16:14:30.382Z',
			updatedAt: '2020-01-22T16:14:30.382Z',
			hotels: [
				{
					id: 1,
					locationId: 7,
					name: 'Marriot Hotel',
					image:
						'https://boondocks-bn-images.s3.us-east-2.amazonaws.com/hotels/1579710026813-longHotel.jpg',
					street: 'kk 15 Rd',
					description: 'Best hotel in kigali',
					services: 'Free wifi',
					userId: 4,
					average_rating: '0.00',
					createdAt: '2020-01-22T16:20:32.401Z',
					updatedAt: '2020-01-22T16:20:32.401Z',
          rooms: null,
        }
      ]
    }
  ]}};

const locationWithHotels = {
  data: {
	status: 'success',
	message: 'Locations fetched successfully',
	data: [
		{
			id: 7,
			country: 'Rwanda',
			city: 'Kigali',
			long: null,
			lat: null,
			createdAt: '2020-01-22T16:14:30.382Z',
			updatedAt: '2020-01-22T16:14:30.382Z',
			hotels: [
				{
					id: 1,
					locationId: 7,
					name: 'Marriot Hotel',
					image:
						'https://boondocks-bn-images.s3.us-east-2.amazonaws.com/hotels/1579710026813-longHotel.jpg',
					street: 'kk 15 Rd',
					description: 'Best hotel in kigali',
					services: 'Free wifi',
					userId: 4,
					average_rating: '0.00',
					createdAt: '2020-01-22T16:20:32.401Z',
					updatedAt: '2020-01-22T16:20:32.401Z',
					rooms: [
						{
							id: 9,
							hotelId: 1,
							name: 'Longonot 11',
							type: 'VIP',
							description: 'Wide room for a couple',
							image: '',
							cost: 5000,
							status: 'available',
							createdAt: '2020-01-22T22:38:32.153Z',
							updatedAt: '2020-01-22T22:38:32.153Z',
						},
						{
							id: 10,
							hotelId: 1,
							name: 'Aberdare 11',
							type: 'VIP',
							description: 'Wide room for a couple',
							image: '',
							cost: 5000,
							status: 'available',
							createdAt: '2020-01-22T22:38:37.067Z',
							updatedAt: '2020-01-22T22:38:37.067Z',
						},
					],
				},
			],
		},
	],
}};

const responseData = {
	data: {
		status: 'success',
		message: 'created',
		data: {
			id: 12,
			status: 'open',
			userId: 2,
			type: 'single',
			createdAt: '2020-01-23T12:53:10.588Z',
			updatedAt: '2020-01-23T12:53:10.588Z',
		},
	},
};

  const render = (ui, initialState = {}, options = {}) => {
	const store = createStore(reducers, initialState,
		composeWithDevTools(applyMiddleware(thunk)));
	const Providers = ({ children }) => (
		<Provider store={store}>{children}</Provider>
	);
	return reactRender(ui, { wrapper: Providers, ...options });
};

describe(' ', () => {
  beforeAll(() => {
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
  })

  afterEach(cleanup);
  afterAll(() => {

    global.localStorage.clear();
    localStorage.store = {};
   });

  test('User can create a one way trip', async () => {
    getLocations.mockImplementation(() => Promise.resolve(locations));
    getLocationsWithHotels.mockImplementation(() => Promise.resolve(locationWithHotels));
    createATrip.mockImplementation(() => Promise.resolve(responseData));
  
    const initialState = {
      authState: {
        isAuthenticated: true
      }
    };
    const { getByTestId } = render(<BrowserRouter><CreateRequestPage /></BrowserRouter>, initialState);
  
    const [
      oneWayTypeField,
      travelDateField,
      leavingFromField,
      goingToField,
      selectHotelField,
      selectRoomField,
      reasonField,
      submitButton
    ] = await waitForElement(() => [
      getByTestId('oneway'),
      getByTestId('travelDate'),
      getByTestId('leavingFrom'),
      getByTestId('goingTo'),
      getByTestId('hotel'),
      getByTestId('room'),
      getByTestId('reason'),
      getByTestId('submitInput'),
    ]);
  
    fireEvent.click(oneWayTypeField);
    fireEvent.change(travelDateField, {target:{value: '2021-01-31'}});
    fireEvent.change(leavingFromField, {target:{value: 1}});
    fireEvent.change(goingToField, {target:{value: 7}});
    fireEvent.change(selectHotelField, {target:{value: 1}});
    fireEvent.change(selectRoomField, {target:{value: 9}});
    fireEvent.change(reasonField, {target:{value: 'Reason for the trip goes here'}});
    fireEvent.click(submitButton);
  
  });
  
  test('User can create a return trip', async () => {
    getLocations.mockImplementation(() => Promise.resolve(locations));
    getLocationsWithHotels.mockImplementation(() => Promise.resolve(locationWithHotels));
    createATrip.mockImplementation(() => Promise.resolve(responseData));
  
    const initialState = {
      authState: {
        isAuthenticated: true
      }
    };
    const { getByTestId } = render(<BrowserRouter><CreateRequestPage /></BrowserRouter>, initialState);
  
    const [
      returnTypeField,
      travelDateField,
      returnDateField,
      leavingFromField,
      goingToField,
      selectHotelField,
      selectRoomField,
      reasonField,
      submitButton
    ] = await waitForElement(() => [
      getByTestId('return'),
      getByTestId('travelDate'),
      getByTestId('returnDate'),
      getByTestId('leavingFrom'),
      getByTestId('goingTo'),
      getByTestId('hotel'),
      getByTestId('room'),
      getByTestId('reason'),
      getByTestId('submitInput'),
    ]);
  
    fireEvent.click(returnTypeField);
    fireEvent.change(returnDateField, {target:{value: '2021-03-31'}});
    fireEvent.change(travelDateField, {target:{value: '2021-01-31'}});
    fireEvent.change(leavingFromField, {target:{value: 1}});
    fireEvent.change(goingToField, {target:{value: 7}});
    fireEvent.change(selectHotelField, {target:{value: 1}});
    fireEvent.change(selectRoomField, {target:{value: 9}});
    fireEvent.change(reasonField, {target:{value: 'Reason for the trip goes here'}});
    fireEvent.click(submitButton);
  
  });
  
  
  test('User can create a multi-city trip', async () => {
    getLocations.mockImplementation(() => Promise.resolve(locations));
    getLocationsWithHotels.mockImplementation(() => Promise.resolve(locationWithHotels));
    createATrip.mockImplementation(() => Promise.resolve(responseData));
  
    const initialState = {
      authState: {
        isAuthenticated: true
      }
    };
    const { getByTestId ,getAllByTestId } = render(<BrowserRouter><CreateRequestPage /></BrowserRouter>, initialState);
  
    const [
      returnTypeField,
      travelDateField,
      returnDateField,
      leavingFromField,
      goingToField,
      selectHotelField,
      selectRoomField,
      reasonField,
      submitButton,
      addTripButton,
      removeBtn,
    ] = await waitForElement(() => [
      getAllByTestId('return'),
      getAllByTestId('travelDate'),
      getAllByTestId('returnDate'),
      getAllByTestId('leavingFrom'),
      getAllByTestId('goingTo'),
      getAllByTestId('hotel'),
      getAllByTestId('room'),
      getAllByTestId('reason'),
      getByTestId('submitInput'),
      getByTestId('addbutton'),
    ]);
  
    
    fireEvent.click(addTripButton);
    fireEvent.click(addTripButton);
  
    const [
      returnTypeField1,
      travelDateField1,
      returnDateField1,
      leavingFromField1,
      goingToField1,
      selectHotelField1,
      selectRoomField1,
      reasonField1,
      addTripButton1,
      oneWayTypeField1,
    ] = await waitForElement(() => [
      getAllByTestId('return'),
      getAllByTestId('travelDate'),
      getAllByTestId('returnDate'),
      getAllByTestId('leavingFrom'),
      getAllByTestId('goingTo'),
      getAllByTestId('hotel'),
      getAllByTestId('room'),
      getAllByTestId('reason'),
      getByTestId('addbutton'),
      getAllByTestId('oneway'),
    ]);
  
    
    fireEvent.click(returnTypeField[0]);
    fireEvent.change(returnDateField[0], {target:{value: '2021-03-31'}});
    fireEvent.change(travelDateField[0], {target:{value: '2021-01-31'}});
    fireEvent.change(leavingFromField[0], {target:{value: 1}});
    fireEvent.change(goingToField[0], {target:{value: 7}});
    fireEvent.change(selectHotelField[0], {target:{value: 1}});
    fireEvent.change(selectRoomField[0], {target:{value: 9}});
    fireEvent.change(reasonField[0], {target:{value: 'Reason for the trip goes here'}});
  
    fireEvent.click(oneWayTypeField1[1]);
    fireEvent.change(travelDateField1[1], {target:{value: '2021-01-31'}});
    fireEvent.change(leavingFromField1[1], {target:{value: 1}});
    fireEvent.change(goingToField1[1], {target:{value: 7}});
    fireEvent.change(reasonField1[1], {target:{value: 'Reason for the trip goes here'}});
  
    fireEvent.click(submitButton);
  
  });
  
  
  test('User can delete a multi-city trip form', async () => {
    getLocations.mockImplementation(() => Promise.resolve(locations));
    getLocationsWithHotels.mockImplementation(() => Promise.resolve(locationWithHotels));
    createATrip.mockImplementation(() => Promise.resolve(responseData));
  
    const initialState = {
      authState: {
        isAuthenticated: true
      }
    };
    const { getByTestId ,getAllByTestId } = render(<BrowserRouter><CreateRequestPage /></BrowserRouter>, initialState);
  
    const [
      addTripButton,
  
    ] = await waitForElement(() => [
      getByTestId('addbutton'),
    ]);
  
    
    fireEvent.click(addTripButton);
  
    const [
      removeButton
    ] = await waitForElement(() => [
  getAllByTestId('delete')
    ]);
  
    fireEvent.click(removeButton[1])
  
  });
})

describe(' ', () => {
  beforeAll(() => {
    global.localStorage.setItem("bn_user_data", `{
      "email":"requestero@user.com",
      "name":"Requester",
      "userId":2,
      "verified":true,
      "role":"requester",
      "lineManagerId": null,
      "iat":1578472431,
      "exp":1578558831
    }`);
  })

  afterEach(() => {
    cleanup();
    global.localStorage.clear();
    localStorage.store = {};
   });


   test('User can create a one way trip', async () => {
    getLocations.mockImplementation(() => Promise.resolve(locations));
    getLocationsWithHotels.mockImplementation(() => Promise.resolve(locationWithHotels));
    createATrip.mockImplementation(() => Promise.resolve(responseData));
  
    const initialState = {
      authState: {
        isAuthenticated: true
      }
    };
    const { getByTestId } = render(<BrowserRouter><CreateRequestPage /></BrowserRouter>, initialState);
  
  });
  });
  