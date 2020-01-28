/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Select from 'react-select';
import LoadingButton from '../templates/Button';
import TextArea from '../templates/TextArea';
import {
	fetchCreateTripData,
	createTrip,
} from '../../store/actions/requests/createTripActions';
import {
	renderPageLoadingSpinner,
	closePageLoadingSpinner,
} from '../../store/actions/loadingActions';
import toast from '../../lib/toast';

export class CreateRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allTrips: [
				{
					id: 1,
					tripType: 'return',
					'tripType-0': 'return',
					travelDate: '',
					returnDate: '',
					leavingFrom: null,
					goingTo: null,
					hotel: null,
					rooms: null,
					reason: '',
				},
			],
			checkSubmit: false,
		};
	}

	async componentDidMount() {
		const { props } = this;
		props.renderPageLoadingSpinner();
		await props.fetchCreateTripData();
		props.closePageLoadingSpinner();
	}

	createUI(allLocationOptions) {
		const { state } = this;
		const returnDateCheck = new Date();
		returnDateCheck.setDate(returnDateCheck.getDate() + 1);
		return state.allTrips.map((el, i) => (
			// eslint-disable-next-line react/no-array-index-key
			<div key={i} className='eachForm'>
				<div className='center-trip-radio-buttons'>
					<div className='form-check'>
						<label>
							<input
								type='radio'
								name={`tripType-${i}`}
								className='form-check-input'
								value='one way'
								checked={el[`tripType-${i}`] === 'one way'}
								onChange={event => this.handleChangeType(event, el)}
								data-testid='oneway'
							/>
							one way trip
						</label>
					</div>
					<div className='form-check'>
						<label>
							<input
								type='radio'
								name={`tripType-${i}`}
								className='form-check-input'
								value='return'
								checked={el[`tripType-${i}`] === 'return'}
								onChange={event => this.handleChangeType(event, el)}
								data-testid='return'
							/>
							return trip
						</label>
					</div>
				</div>

				<div className='form-group trips-date-divs'>
					<div className='dateDivs'>
						<input
							type='date'
							name='travelDate'
							defaultValue={el.travelDate}
							className='form-control createTripInputs'
							onChange={event => this.handleChange(event, el)}
							required
							min={new Date().toISOString().split('T')[0]}
							data-testid='travelDate'
						/>
						<label htmlFor='travelDate'>travel date</label>
					</div>
					<span />
					<div className='dateDivs'>
						<input
							type='date'
							name='returnDate'
							defaultValue={el.returnDate}
							className='form-control createTripInputs'
							onChange={event => this.handleChangeReturnDate(event, el)}
							disabled={el.dateDisable}
							min={returnDateCheck.toISOString().split('T')[0]}
							data-testid='returnDate'
						/>
						<label htmlFor='returnDate'>return date</label>
					</div>
				</div>

				<div className='form-group trips-date-divs'>
					<div className='dateDivs'>
						<label htmlFor='leavingFrom'>
							LEAVING FROM
							<select
								onChange={event => this.handleChange(event, el)}
								className='form-control createTripInputs'
								name='leavingFrom'
								required
								data-testid='leavingFrom'
							>
								<option value='' defaultValue>
									Choose
								</option>
								<optgroup>{allLocationOptions}</optgroup>
							</select>
						</label>
					</div>
					<span />
					<div className='dateDivs'>
						<label htmlFor='goingTo'>
							GOING TO
							<select
								onChange={event => this.handleChangeGoingTo(event, el)}
								className='form-control createTripInputs'
								name='goingTo'
								required
								data-testid='goingTo'
							>
								<option value='' defaultValue>
									Choose
								</option>
								<optgroup>{allLocationOptions}</optgroup>
							</select>
						</label>
					</div>
				</div>

				<div className='form-group accomodationDiv'>
					<div>
						<select
							onChange={event => this.handleChangeHotel(event, el)}
							className='form-control createTripInputs'
							name='hotel'
							data-testid='hotel'
						>
							<optgroup>
								<option key='sH' value=''>
									Select hotel
								</option>
								{el.hotels &&
									el.hotels.map(({ value, name, key }) => (
										<option key={key} value={value}>
											{name}
										</option>
									))}
							</optgroup>
						</select>
					</div>
					<span />
					<div>
						{el.availableRooms ? (
							<Select
								isMulti
								options={el.availableRooms}
								onChange={event => this.handleChangeRooms(event, el)}
								data-testid='room'
								placeholder='Select Room'
							/>
						) : (
							<Select
								isMulti
								options={[]}
								onChange={event => this.handleChangeRooms(event, el)}
								data-testid='room'
							/>
						)}
					</div>
				</div>

				<div className='tripReason'>
					<label htmlFor='reasonForTrip'>REASONS FOR THE TRIP</label>
					<TextArea
						placeholder='Type here'
						name='reason'
						defaultValue={el.reason}
						onChange={event => this.handleChange(event, el)}
						minLength='10'
						maxLength='200'
						required
						value={el.reason || ''}
						testId='reason'
					/>
				</div>
				<div className='deleteTripForm'>
					<button
						type='button'
						className='btn btn-default btn-sm'
						onClick={() => this.removeClick(i)}
						data-testid='delete'
					>
						<span className='oi oi-trash' />
						Remove trip
					</button>
				</div>
			</div>
		));
	}

	handleChange(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];
		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		currentFormFieldWrapper[name] = value;
		currentValuesInState.splice(element.id - 1, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeType(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];
		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);

		currentFormFieldWrapper[name] = value;
		currentFormFieldWrapper.tripType = value;
		currentFormFieldWrapper.type = value;

		if (value === 'one way') {
			currentFormFieldWrapper.dateDisable = true;
			currentFormFieldWrapper.returnDate = '';
		}
		if (value === 'return') {
			currentFormFieldWrapper.dateDisable = false;
		}
		currentValuesInState.splice(element.id - 1, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeReturnDate(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];
		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);

		const travelDateObj = new Date(element.travelDate);
		const returnDateObj = new Date(value);

		if (travelDateObj < returnDateObj) {
			event.target.setCustomValidity('');
			currentFormFieldWrapper[name] = value;
			currentValuesInState.splice(element.id - 1, 1, currentFormFieldWrapper);
			this.setState({ allTrips: currentValuesInState });
		} else {
			event.target.setCustomValidity(
				'Return date must be greater than travel date',
			);
		}
	}

	handleChangeGoingTo(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);

		currentFormFieldWrapper[name] = value;
		const { createTripData } = this.props;
		let hotelsArray, hotelOptions;

		if (currentFormFieldWrapper[name] !== null) {
			hotelsArray = createTripData.locationsWithHotels.find(
				({ id }) => id === Number(currentFormFieldWrapper[name]),
			);

			if (hotelsArray !== undefined) {
				if (Object.prototype.hasOwnProperty.call(hotelsArray, 'hotels')) {
					hotelsArray = hotelsArray.hotels;
					hotelOptions = hotelsArray.map(hotelOption => ({
						value: hotelOption.id,
						key: hotelOption.id,
						name: hotelOption.name.toUpperCase(),
					}));
				}
			} else {
				hotelOptions = null;
			}
			currentFormFieldWrapper.hotels = hotelOptions;
		}
		currentValuesInState.splice(element.id - 1, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeHotel(event, element) {
		const { name, value } = event.target;
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		currentFormFieldWrapper[name] = value;
		let roomOptions;

		if (currentFormFieldWrapper[name] !== null) {
			const { createTripData } = this.props;
			let roomsInHotel = [];

			if (element.goingTo) {
				roomsInHotel = createTripData.locationsWithHotels
					.find(({ id }) => id === Number(element.goingTo))
					.hotels.find(({ id }) => id === Number(element.hotel)).rooms;
			}

			if (roomsInHotel.length > 0) {
				roomOptions = roomsInHotel.map(roomOpt => ({
					value: roomOpt.id,
					key: roomOpt.id,
					label: roomOpt.name.toUpperCase(),
				}));
			} else {
				roomOptions = null;
			}
			currentFormFieldWrapper.availableRooms = roomOptions;
		}
		currentValuesInState.splice(element.id - 1, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	handleChangeRooms(event, element) {
		const selectedOption = event || [];
		const rooms = selectedOption.map(room => room.value);
		const { state } = this;
		const currentValuesInState = [...state.allTrips];

		const currentFormFieldWrapper = currentValuesInState.find(
			forms => forms.id === element.id,
		);
		currentFormFieldWrapper.rooms = rooms;
		currentValuesInState.splice(element.id - 1, 1, currentFormFieldWrapper);
		this.setState({ allTrips: currentValuesInState });
	}

	addClick() {
		this.setState(prevState => ({
			allTrips: [
				...prevState.allTrips,
				{
					id: prevState.allTrips[prevState.allTrips.length - 1].id + 1,
					tripType: 'return',
					[`tripType-${
						prevState.allTrips[prevState.allTrips.length - 1].id
					}`]: 'return',
					travelDate: '',
					returnDate: '',
					leavingFrom: null,
					goingTo: null,
					hotel: null,
					rooms: null,
					reason: null,
				},
			],
		}));
	}

	removeClick(i) {
		const { state } = this;
		const allTrips = [...state.allTrips];
		if (allTrips.length > 1) {
			allTrips.splice(i, 1);
			this.setState({ allTrips });
		}
	}

	handleFormSubmit(formSubmitEvent) {
		formSubmitEvent.preventDefault();
		const { state } = this;
		const formsArray = state.allTrips;

		if (formsArray.length === 1) {
			const thisFormState = formsArray[0];
			const {
				tripType,
				leavingFrom,
				goingTo,
				travelDate,
				returnDate,
				hotel,
				rooms,
				reason,
			} = thisFormState;

			const { props } = this;
			let endpoint;
			let userRequest = {
				type: tripType,
				leavingFrom: Number(leavingFrom),
				goingTo: Number(goingTo),
				travelDate,
				reason,
			};

			if (hotel !== null && rooms !== null) {
				userRequest = {
					...userRequest,
					hotelId: Number(hotel),
					rooms,
				};
			}

			if (tripType === 'return') {
				userRequest = {
					...userRequest,
					returnDate,
				};
				endpoint = '/trips/return';
				props.createTrip(userRequest, endpoint);
				this.setState({ checkSubmit: true });
			} else {
				endpoint = '/trips/oneway';
				props.createTrip(userRequest, endpoint);
				this.setState({ checkSubmit: true });
			}
		} else {
			let userRequest;
			const formRequestArray = [];
			formsArray.forEach(element => {
				const {
					tripType,
					leavingFrom,
					goingTo,
					travelDate,
					returnDate,
					hotel,
					rooms,
					reason,
				} = element;
				userRequest = {
					type: tripType,
					leavingFrom: Number(leavingFrom),
					goingTo: Number(goingTo),
					travelDate,
					reason,
				};

				if (hotel !== null && rooms !== null) {
					userRequest = {
						...userRequest,
						hotelId: Number(hotel),
						rooms,
					};
				}
				if (tripType === 'return') {
					userRequest = {
						...userRequest,
						returnDate,
					};
				}
				formRequestArray.push(userRequest);
			});
			const { props } = this;
			props.createTrip(formRequestArray, '/trips/multi-city');
			this.setState({ checkSubmit: true });
		}
	}

	render() {
		const userData = JSON.parse(localStorage.bn_user_data);
		if (userData.lineManagerId === null) {
			toast('error', 'You need to have a line manager to create trip requests');
			return <Redirect to='/profile' />;
		}
		const { createTripData } = this.props;
		const { tripCreated } = createTripData;
		const { state } = this;
		const { checkSubmit } = state;
		if (tripCreated === true && checkSubmit === true) {
			return <Redirect to='/requests' />;
		}

		let allLocationOptions, allLocationsWithHotels;

		if (createTripData.fetchStatus === 'success') {
			allLocationOptions = createTripData.allLocations.map(location => (
				<option value={location.id} key={location.id}>
					{location.city.toUpperCase()}
				</option>
			));
			allLocationsWithHotels = createTripData.locationsWithHotels;
		}

		const { loadingData } = this.props;
		const { buttonLoading } = loadingData;
		return (
			<div className='createTripContainer card mx-auto mb-2'>
				<form
					className='createTripForm card-body'
					onSubmit={event => this.handleFormSubmit(event)}
				>
					{this.createUI(allLocationOptions, allLocationsWithHotels)}
					<button
						type='button'
						className='btn btn-default btn-sm'
						onClick={() => this.addClick()}
						data-testid='addbutton'
					>
						<span className='oi oi-plus' />
						Add trip
					</button>
					<div className='form-group createTripBtn'>
						<LoadingButton
							data-test='submitInput'
							testId='submitInput'
							classNames='btn btn-success btn-trips'
							value='SUBMIT REQUEST'
							buttonLoading={buttonLoading}
						/>
					</div>
				</form>
			</div>
		);
	}
}

CreateRequest.propTypes = {
	fetchCreateTripData: propTypes.func,
	createTripData: propTypes.object,
	createTrip: propTypes.func,
	loadingData: propTypes.objectOf(propTypes.any),
	renderPageLoadingSpinner: propTypes.func,
	closePageLoadingSpinner: propTypes.func,
};

CreateRequest.defaultProps = {
	fetchCreateTripData: null,
	createTripData: null,
	createTrip: null,
	loadingData: null,
	renderPageLoadingSpinner: null,
	closePageLoadingSpinner: null,
};

export const mapStateToProps = state => ({
	loadingData: state.loadingState,
	createTripData: state.createTripState,
});

const mapDispatchToProps = {
	fetchCreateTripData,
	createTrip,
	renderPageLoadingSpinner,
	closePageLoadingSpinner,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);
