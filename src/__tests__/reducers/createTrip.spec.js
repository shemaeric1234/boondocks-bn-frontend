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
			data: create.payload,
      error: null,
      fetchStatus: null,
      createStatus: 'success',
      tripCreated: true,
      allLocations: null,
      locationsWithHotels: null,
		})
	});

	it('Should create trip fail', () => {
		const createFail = {
			type: CREATE_TRIP_FAILURE,
			payload: 'error'
		};
		const changedState = createTripReducer(undefined, createFail);
		expect(changedState).toEqual({
				error: createFail.payload,
        data: null,
				createStatus: null,
        tripCreated: false,
        fetchStatus: null,
        allLocations: null,
        locationsWithHotels: null,
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
        data: null,
				error: null,
				fetchStatus: 'success',
				createStatus: null,
				tripCreated: false,
		})
	});

	it('Should change button loading to false', () => {
		const locationFail = {
			type: FETCH_CREATE_TRIP_DATA_FAILURE,
			payload: false
		};
		const changedState = createTripReducer(undefined, locationFail);
		expect(changedState).toEqual({
      error: locationFail.payload,
      data: null,
      error: locationFail.payload,
      fetchStatus: 'error',
      createStatus: null,
      tripCreated: false,
      allLocations: null,
      locationsWithHotels: null,
		})
	});

	it('Should return default state', () => {
		const defaultState = createTripReducer(undefined, {});
		expect(defaultState).toEqual({
      data: null,
      error: null,
      fetchStatus: null,
      createStatus: null,
      tripCreated: false,
      allLocations: null,
      locationsWithHotels: null,
    })
	});
});
