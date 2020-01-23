import createTripReducer from '../../store/reducers/createTripReducer';
import { 
  CREATE_TRIP_SUCCESS,
	CREATE_TRIP_FAILURE,
	FETCH_CREATE_TRIP_DATA_SUCCESS,
	FETCH_CREATE_TRIP_DATA_FAILURE,
 } from '../../store/actions/types';

describe('Create trip Reducer Tests ', () => {
	it('Should change create trip success', () => {
		const create = {
			type: CREATE_TRIP_SUCCESS,
			payload: 'data'
		};
		const changedState = createTripReducer(undefined, create);
		expect(changedState).toEqual({
      allLocations: null,
	    locationsWithHotels: null,
			data: create.payload,
      error: null,
      status: 'success',
			tripCreated: true,
		})
	});

	it('Should create trip fail', () => {
		const createFail = {
			type: CREATE_TRIP_FAILURE,
			payload: 'error'
		};
		const changedState = createTripReducer(undefined, createFail);
		expect(changedState).toEqual({
        allLocations: null,
	      locationsWithHotels: null,
			  data: null,
				error: createFail.payload,
				status: 'error',
				tripCreated: false,
		})
	});

	it('Should fetch location', () => {
		const location = {
			type: FETCH_CREATE_TRIP_DATA_SUCCESS,
			payload: {allLocations:'success', locationsWithHotels: 'success'}
		};
		const changedState = createTripReducer(undefined, location);
		expect(changedState).toEqual({
			  allLocations: location.payload.allLocations,
				locationsWithHotels: location.payload.locationsWithHotels,
				error: null,
				status: 'success',
        tripCreated: false,
        data: null,
		})
	});

	it('Should change button loading to false', () => {
		const locationFail = {
			type: FETCH_CREATE_TRIP_DATA_FAILURE,
			payload: false
		};
		const changedState = createTripReducer(undefined, locationFail);
		expect(changedState).toEqual({
      allLocations: null,
      locationsWithHotels: null,
      data: null,
      error: locationFail.payload,
      status: 'error',
      tripCreated: false,
		})
	});

	it('Should return default state', () => {
		const defaultState = createTripReducer(undefined, {});
		expect(defaultState).toEqual({
      allLocations: null,
      locationsWithHotels: null,
      data: null,
      error: null,
      status: '',
      tripCreated: false,
    })
	});
});
