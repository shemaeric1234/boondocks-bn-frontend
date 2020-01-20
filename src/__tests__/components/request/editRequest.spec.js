import React from 'react';
import { shallow } from 'enzyme';
import { EditRequest, mapStateToProps } from '../../../components/request/EditRequest';

describe('<EditRequest /> Test suite', () => {
  let props, setUp;
  beforeEach(() => {
    global.$ = jest.fn((cb) => ({
      modal: jest.fn(cb => {jest.fn();}),
    }));
    props = {
      loading: false,
      id: 3,
      data:  {
        "type": "return",
        "reason": "I need to go",
        "travelDate": "2020-01-22T00:00:00.000Z",
        "returnDate": "2020-01-23T00:00:00.000Z",
        "createdAt": "2020-01-20T04:26:25.668Z",
        "updatedAt": "2020-01-21T22:09:31.751Z",
        "id": 3,
        "hotel": null,
        "going": {
            "country": "Kenya",
            "city": "Nairobi",
            "id": 1
        },
        "leaving": {
            "country": "Nigeria",
            "city": "Lagos",
            "id": 3
        }
    },
    locations: [{
      "id": 1,
      "country": "Kenya",
      "city": "Narobi",
  }],
  locationsWithHotels: [
    {
        "id": 1,
        "country": "Kenya",
        "city": "Nairobi",
        "long": null,
        "lat": null,
        "createdAt": "2020-01-18T12:34:10.994Z",
        "updatedAt": "2020-01-18T12:34:10.994Z",
        "hotels": [
            {
                "id": 1,
                "locationId": 8,
                "name": "new hotel",
                "image": "",
                "street": "kk 16 Rd",
                "description": "Best hotel in kigali",
                "services": "Free wifi",
                "userId": 4,
                "average_rating": "0.00",
                "createdAt": "2020-01-18T12:34:11.347Z",
                "updatedAt": "2020-01-18T12:34:11.347Z",
                "rooms": [
                    {
                        "id": 7,
                        "hotelId": 1,
                        "name": "Virunga",
                        "type": "VIP",
                        "description": "Wide room for a couple",
                        "image": "",
                        "cost": 4000,
                        "status": "available",
                        "createdAt": "2020-01-18T12:34:29.862Z",
                        "updatedAt": "2020-01-18T12:34:29.862Z"
                    }
                ]
            }
        ]
    }
],
    fetchTripData: jest.fn(),
    updateTrip: jest.fn(),
    request: {data:{id: 1}},
    }

    setUp = () => {
      const wrapper = shallow(
          <EditRequest {...props} />
      );
        return wrapper;
    }
  })

  it('Should not submit invalid form', () => {
    const component = setUp();
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const updateTripSpy = jest.spyOn(component.instance().props, 'updateTrip');

    component.find('[data-test="edit-request-form"]').simulate('submit', {
          preventDefault() {},
          target: {checkValidity: () => false}
        });

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(updateTripSpy).not.toHaveBeenCalled();
  });

  it('Should handle null data from state', () => {
    const component = setUp();
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const updateTripSpy = jest.spyOn(component.instance().props, 'updateTrip');
    component.setState({
      type: 'type',
      returnDate: '',
      travelDate: '2020-03-18',
      reason: '',
      hotel: '',
    });
    component.find('[data-test="edit-request-form"]').simulate('submit', {
          preventDefault() {},
          target: {checkValidity: () => true}
        });

    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(updateTripSpy).toHaveBeenCalled();
  });

  it('Should submit the form successfully', () => {
    const component = setUp();
    const handleTypeSpy = jest.spyOn(component.instance(), 'handleType');
    const handleLocationSpy = jest.spyOn(component.instance(), 'handleLocation');
    const handleHotelSpy = jest.spyOn(component.instance(), 'handleHotel');
    const handleRoomSpy = jest.spyOn(component.instance(), 'handleRoom');
    const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
    const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
    const type = { target: { value: 'return' } };
    const type1 = { target: { value: 'one way' } };
    const travelDate = {target: { name: 'travelDate', value: '2020-03-18'}};
    const returnDate = {target: { name: 'returnDate', value: '2020-04-18'}};
    const leavingFrom = {target: { name: 'country', value: 2 }};
    const goingTo = {target: { name: 'country', value: '1' }};
    const hotel = {target: { name: 'hotel', value: '1'}};
    const reason = {target: { name: 'reason', value: 'this is my reason'}};
    const room = [{ name: 'hotel', value: '1'}];
    const allStates = {
        type: 'one way',
        returnDate: '2020-04-18',
        travelDate: '2020-03-18',
        goingTo: '1',
        leavingFrom: 3,
        reason: 'I need to go',
        hotel: '1',
        room: [ '1' ],
        hotelOptions: [ { id: 1, value: 1, name: 'new hotel' } ],
        checkError: 'was-validated',
        roomOptions: [ { value: 7, label: 'Virunga' } ],
        dateDisable: true,
        country: 2,
        reason: 'this is my reason',
      }

    component.find('[data-test="type"]').simulate('change', type);
    component.find('[data-test="type"]').simulate('change', type1);
    component.find('[data-test="travel-date"]').simulate('change', travelDate);
    component.find('[data-test="return-date"]').simulate('change', returnDate);
    component.find('[data-test="leaving"]').simulate('change', leavingFrom);
    component.find('[data-test="going"]').simulate('change', goingTo);
    component.find('[data-test="hotel"]').simulate('change', hotel);
    component.find('[data-test="room"]').simulate('change', room);
    component.find('[data-test="reason"]').simulate('change', reason);
    component.find('[data-test="edit-request-form"]').simulate('submit', {
          preventDefault() {},
          target: { checkValidity: () => true }
        });
    
    expect(handleTypeSpy).toHaveBeenCalled();
    expect(handleLocationSpy).toHaveBeenCalled();
    expect(handleHotelSpy).toHaveBeenCalled();
    expect(handleRoomSpy).toHaveBeenCalled();
    expect(handleChangeSpy).toHaveBeenCalled();
    expect(handleSubmitSpy).toHaveBeenCalled();
    expect(component.state()).toEqual(allStates);
  });

  it('Should close modal successfully', () => {
    const component = setUp();
    const handleLocationSpy = jest.spyOn(component.instance(), 'handleLocation');
    const handleHotelSpy = jest.spyOn(component.instance(), 'handleHotel');
    const handleRoomSpy = jest.spyOn(component.instance(), 'handleRoom');

    const goingTo = {target: { name: 'country', value: '6' }};
    const hotel = {target: { name: 'hotel', value: '3'}};
    const room = null;
    
    component.find('[data-test="going"]').simulate('change', goingTo);
    component.setState({goingTo: 3});
    component.find('[data-test="hotel"]').simulate('change', hotel);
    component.find('[data-test="room"]').simulate('change', room);

    expect(handleLocationSpy).toHaveBeenCalled();
    expect(handleHotelSpy).toHaveBeenCalled();
    expect(handleRoomSpy).toHaveBeenCalled();
  });

  it('Should return initial data', () => {
    const initialState = {
      loadingState: { buttonLoading: null },
      createTripState: {
        allLocations: null,
        locationsWithHotels: null,
      },
      singleRequestState: {data: null}
    };
    expect(mapStateToProps(initialState))
    .toEqual({ loading: null, locations: null, locationsWithHotels: null, request: null });
  });

});
