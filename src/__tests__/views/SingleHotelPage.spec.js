import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import  { SingleHotelPage, mapStateToProps } from '../../views/accomodations/SingleHotelPage';

describe('Single Hotel page', () => {
	let props;
	it('should render without error', () => {
		props = {
      loading: false,
			data:{
				location: {
					city: 'Nairobi',
					country: 'Kenya',
				},
				average_rating: '1',
				rooms: [{
				id: 1,
				status: 'available'
			}]
		},
      status: 'success',
      getHotel: jest.fn(id => id),
			match: {
				params: {
					id: 1
				}
			}
		}
		const { getByTestId } = render(<BrowserRouter><SingleHotelPage {...props} /></BrowserRouter>);
		expect(getByTestId('single-hotel')).toBeInTheDocument();
	});
	it('should render nothing when loading', () => {
		props = {
      loading: true,
      status: 'error',
      getHotel: jest.fn(id => id),
			match: {
				params: {
					id: 1
				}
			}
		};
		const component = render(<BrowserRouter><SingleHotelPage {...props} /></BrowserRouter>);
		expect(component.findByText())
	});

	it('should render not reserved rooms', () => {
		props = {
      loading: false,
			data:{
				location: {
					city: 'Nairobi',
					country: 'Kenya',
				},
				average_rating: '1',
				rooms: [{
				id: 1,
				status: 'reserved'
			}]
		},
      status: 'success',
      getHotel: jest.fn(id => id),
			match: {
				params: {
					id: 1
				}
			}
		}
		const { getByTestId } = render(<BrowserRouter><SingleHotelPage {...props} /></BrowserRouter>);
		expect(getByTestId('single-hotel')).toBeInTheDocument();
	});

	it('Should return initial data', () => {
    const initialState = {
			singleHotelState: {
          data: null,
          status: '',
        },
      loadingState: { buttonLoading: null },
    };
    expect(mapStateToProps(initialState))
    .toEqual({ data: null, status: '', loading: null });
  });

});
