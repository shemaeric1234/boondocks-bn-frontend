import React from 'react';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import HotelCard from '../../../components/accomodations/HotelCard';

describe('<HotelCard /> Test suite', () => {
  let props;
  beforeEach(() => {
    props = {
      data: {
        id: 1,
        name: 'hotel',
        average_rating: '1',
        description: 'new hotel here',
        likesCount: '1',
        unLikesCount: '2',
        location: {
          country: 'Kenya',
          city: 'Nairobi'
        },
        street: 'upperhill, 23rd av',
      }
    }
  })

  it('Should render without errors', () => {
    const { getByTestId } = render(
      <BrowserRouter><HotelCard {...props} /></BrowserRouter>
  );

  expect(getByTestId('hotels')).toBeInTheDocument();
  });

});
