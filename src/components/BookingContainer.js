import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getHotel } from '../store/actions/accomodations/getAccomodationActions';
import Hotel from './accomodations/Hotel';
import Room from './accomodations/Room';
import InputForm from './templates/InputForm';
import { book } from '../store/actions/bookingActions';
import LoadingButton from './templates/Button';

class BookingContainer extends Component {
	constructor(props) {
		super(props);
		const { hotelId } = props.match.params;
		this.state = {
			rooms: [],
			arrivalDate: '',
			leavingDate: '',
			// eslint-disable-next-line react/no-unused-state
			hotelId,
			errors: {
				arrivalDateError: '',
				leavingDateError: '',
			},
		};
	}

	async componentDidMount() {
		const { props } = this;

		// eslint-disable-next-line react/prop-types
		const { hotelId } = props.match.params;

		props.getHotel(hotelId);
	}

	validate({ name, event }) {
		const { state } = this;
		const validationSchema = {
			arrivalDate: {
				validate: date =>
					new Date(date).getTime() >= new Date().setHours(0, 0, 0, 0),
				errorMessage: 'Check In date must be today or a day in the future',
			},
			leavingDate: {
				validate: (date, arrivalDate) =>
					new Date(date).getTime() > new Date(arrivalDate),
				errorMessage:
					'Check Out date must not be before or be the same as arrival date',
			},
		};

		let validInput = false;
		let errorMessage = '';
		const error = {};
		// eslint-disable-next-line default-case
		switch (name) {
			case 'arrivalDate':
				validInput = validationSchema.arrivalDate.validate(event.target.value);
				if (!validInput) {
					errorMessage = validationSchema.arrivalDate.errorMessage;
				}
				break;
			case 'leavingDate':
				validInput = validationSchema.leavingDate.validate(
					event.target.value,
					state.arrivalDate,
				);

				if (!validInput) {
					errorMessage = validationSchema.leavingDate.errorMessage;
				}
				break;
		}

		const errorKey = `${name}Error`;

		error[errorKey] = errorMessage;

		this.setState(previousState => ({
			errors: { ...previousState.errors, ...error },
		}));
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	}

	async handleSubmit(e) {
		e.preventDefault();
		const { props } = this;
		const { errors, ...bookingInfo } = this.state;
		await props.book(bookingInfo);
		props.history.push('/booking');
	}

	handleChooseRoom(room) {
		if (room.status !== 'available') {
			return;
		}
		const { state } = this;
		if (!state.rooms.includes(room.id)) {
			this.setState(previousState => {
				return {
					rooms: [...new Set([...previousState.rooms, room.id])],
				};
			});
		} else {
			this.setState(previousState => {
				return {
					rooms: [...previousState.rooms.filter(r => r !== room.id)],
				};
			});
		}
	}

	render() {
		const { props } = this;
		const { state } = this;
		if (!props.loading && props.status === 'success') {
			return (
				<div className='container booking p-3'>
					<Hotel data={props.data} />
					<div className='card profile border-light mt-1 rounded pb-4'>
						<div className='card-body pb-4'>
							<h2 className='mb-4 ml-4'> Booking </h2>
							<form onSubmit={e => this.handleSubmit(e)}>
								<div className='d-flex ml-4'>
									<div className='numberCircle'>1</div>
									<h4 className='ml-3'> Select Travel Dates</h4>
								</div>

								<div className='grid-input my-2'>
									<InputForm
										name='arrivalDate'
										label='Check In'
										classNames={`form-control ${state.errors.arrivalDateError &&
											'is-invalid'}`}
										error={state.errors.arrivalDateError}
										onChange={event => this.handleChange(event)}
										value={state.arrivalDate}
										type='date'
										required
										placeholder='Arrival Date'
										onBlur={event =>
											this.validate({ name: 'arrivalDate', event })}
									/>
									<InputForm
										name='leavingDate'
										label='Check Out'
										classNames={`form-control ${state.errors.leavingDateError &&
											'is-invalid'}`}
										value={state.leavingDate}
										onChange={event => this.handleChange(event)}
										error={state.errors.leavingDateError}
										type='date'
										required
										placeholder='Leaving Date'
										onBlur={event =>
											this.validate({ name: 'leavingDate', event })
										}
									/>
								</div>
								<div className='d-flex ml-4 mt-2'>
									<div className='numberCircle'>2</div>
									<h4 className='ml-3'>
										{`Choose Rooms(${props.data.rooms.length})`}
									</h4>
								</div>
								<div className='ml-4 px-4 card-deck'>
									{props.data.rooms.map(room => {
										return (
											<Fragment key={room.id}>
												<div className={`room-item ${room.status}`}>
													<a
														href={`#rooms-${room.id}`}
														className='room-link'
														data-testid='room-link'
														onClick={() => this.handleChooseRoom(room)}
													>
														<span
															hidden={room.status !== 'available'}
															className={`fa fa-check fa-4x room-check ${state.rooms.includes(
																room.id,
															) && 'room-chosen'}`}
														/>
														<div className='room'>
															<Room key={room.id} data={room} />
														</div>
													</a>
												</div>
											</Fragment>
										);
									})}
								</div>
								<div className='float-container'>
									<LoadingButton
										type='submit'
										hidden={state.rooms.length < 1}
										testId='submit-btn'
										value={`Book (${state.rooms.length} rooms)`}
										classNames='float-content dr btn-rounded-border book-btn btn btn-lg  btn-primary'
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			);
		}
		return <></>;
	}
}

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
	status: state.singleHotelState.status,
	data: state.singleHotelState.data,
});

export default connect(mapStateToProps, {
	getHotel,
	book,
})(BookingContainer);

BookingContainer.propTypes = {
	match: PropTypes.instanceOf(Object).isRequired,
	getHotel: PropTypes.func.isRequired,
	book: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	data: PropTypes.instanceOf(Object),
};

BookingContainer.defaultProps = {
	data: null,
};
