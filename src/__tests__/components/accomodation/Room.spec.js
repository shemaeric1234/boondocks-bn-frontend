import React from 'react';
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import { render } from "@testing-library/react";
import Room from '../../../components/accomodations/Room';

describe('<Room /> Test suite', () => {
  let props;
  beforeEach(() => {
    props = {
      data: {
        name: 'room1',
        description: 'nice room we got',
        type: 'single bed',
        cost: '2000'
      }
    }
  })

  it('Should render without errors', () => {
    const { getByTestId } = render(
      <BrowserRouter><Room {...props} /></BrowserRouter>
  );

  expect(getByTestId('hotels')).toBeInTheDocument();
  });

});
