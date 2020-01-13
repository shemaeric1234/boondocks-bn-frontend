import React from 'react';
import {
	cleanup,
	render,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import localStorage from "../../__mocks__/LocalStorage";
import  { HomePage } from '../../views/HomePage';

describe('<HomePage />', () => {
	let props;
	beforeEach(() => {
		global.localStorage = localStorage;
		global.localStorage.setItem("bn_user_data", `{
			"email":"requestero@user.com",
			"name":"travel_administrator",
			"userId":2,
			"verified":true,
			"role":"travel_administrator",
			"lineManagerId":7,
			"iat":1578472431,
			"exp":1578558831
		}`);

    props = {
      loading: false,
      data: [{
				id: 1,
				location: {
					city: 'Nairobi',
					country: 'Kenya',
				},
				average_rating: '1'
			}],
      status: 'success',
			getHotels: jest.fn(),
			setAuth: jest.fn(),
			updateNav: jest.fn(),
      }
	})
	afterEach(cleanup);
	it('should render without error', () => {
		const { getByTestId } = render(<BrowserRouter><HomePage {...props} /></BrowserRouter>);
		expect(getByTestId('home-page')).toBeInTheDocument();
	});
});
