import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';
import InputForm from '../templates/InputForm';
import SelectInput from '../templates/SelectInput';
import TextArea from '../templates/TextArea';
import { updateTrip } from '../../store/actions/requests/editTripActions';
// eslint-disable-next-line max-len
import { fetchCreateTripData } from '../../store/actions/requests/createTripActions';
import Button from '../templates/Button';
import { formatdate } from '../../lib/time';

export class EditRequest extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: '',
			returnDate: '',
			travelDate: '',
			goingTo: '',
			leavingFrom: '',
			reason: '',
			hotel: '',
			room: [],
			hotelOptions: [],
			checkError: '',
			roomOptions: [],
			dateDisable: null,
		};
		this.handleRoom = this.handleRoom.bind(this);
	}

	componentDidMount() {
		const { data, fetchTripData } = this.props;
		const { type, returnDate, travelDate, going, leaving, reason } = data;
		this.setState({
			type,
			returnDate: (returnDate && formatdate(0, returnDate)) || '',
			travelDate: formatdate(0, travelDate),
			goingTo: going.id,
			leavingFrom: leaving.id,
			reason,
			dateDisable: type === 'one way' ? true : null,
		});
		fetchTripData();
	}

	handleChange(event) {
		const { value } = event.target;
		const { name } = event.target;

		this.setState({
			[name]: value,
		});
	}

	handleType(event) {
		const { value } = event.target;
		if (value === 'one way') {
			this.setState({
				dateDisable: true,
				returnDate: '',
			});
		}
		if (value === 'return') {
			this.setState({
				dateDisable: false,
			});
		}
		this.setState({
			type: value,
		});
	}

	handleLocation(event) {
		const { locationsWithHotels } = this.props;
		const locationHotels = locationsWithHotels.find(
			location => location.id === Number(event.target.value),
		);
		const hotels =
			(locationHotels &&
				locationHotels.hotels.map(hotel => ({
					id: hotel.id,
					value: hotel.id,
					name: hotel.name,
				}))) ||
			[];
		this.setState({
			goingTo: event.target.value,
			hotelOptions: hotels,
		});
	}

	handleHotel(event) {
		const { locationsWithHotels } = this.props;
		const { goingTo } = this.state;
		const { value } = event.target;
		const locationHotels = locationsWithHotels.find(
			location => location.id === Number(goingTo),
		);

		const rooms =
			(locationHotels &&
				locationHotels.hotels
					.find(hotel => hotel.id === Number(value))
					.rooms.filter(room => room.status === 'available')
					.map(room => ({
						value: room.id,
						label: room.name,
					}))) ||
			[];

		this.setState({
			hotel: value,
			roomOptions: rooms,
		});
	}

	handleRoom(selectedOptions) {
		const selectedOption = selectedOptions || [];
		const rooms = selectedOption.map(room => room.value);
		this.setState({
			room: rooms,
		});
	}

	handleSubmit(event) {
		const { props, state } = this;
		event.preventDefault();
		this.setState({
			checkError: 'was-validated',
		});

		if (event.target.checkValidity()) {
			props.updateTrip(
				{
					type: state.type,
					returnDate: state.returnDate || null,
					travelDate: state.travelDate,
					goingTo: Number(state.goingTo),
					leavingFrom: Number(state.leavingFrom),
					reason: state.reason,
					rooms: state.room,
					hotelId: state.hotel || null,
				},
				props.id,
				props.request.data.id,
			);
			window.$(`#ModalCenter-${props.id}`).modal('hide');
			this.forceUpdate();
		}
	}

	render() {
		const { state, props } = this;
		const allLocations = props.locations || [];
		return (
			<div className='float-right mt-1 mr-2'>
				<p
					data-toggle='modal'
					className='text-primary pointer'
					data-target={`#ModalCenter-${props.id}`}
				>
					<u className='mr-2'>edit</u>
					<i className='fa fa-pencil-square-o' aria-hidden='true' />
				</p>
				<div
					className='modal fade'
					id={`ModalCenter-${props.id}`}
					tabIndex='-1'
					role='dialog'
					data-test='modal'
					aria-labelledby='ModalCenterTitle'
					data-backdrop='static'
					aria-hidden='true'
				>
					<div className='modal-dialog modal-dialog-centered' role='document'>
						<div className='modal-content'>
							<form
								data-test='edit-request-form'
								onSubmit={event => this.handleSubmit(event)}
								className={state.checkError}
								noValidate
							>
								<div className='modal-header'>
									<h5 className='modal-title' id='exampleModalCenterTitle'>
										update Trip
									</h5>
									<button
										type='button'
										className='close'
										data-dismiss='modal'
										aria-label='Close'
									>
										<span aria-hidden='true'>&times;</span>
									</button>
								</div>
								<div className='modal-body'>
									<SelectInput
										name='type'
										data-test='type'
										classNames='form-control'
										label='Type'
										value={state.type}
										onChange={event => this.handleType(event)}
										placeholder='trip type'
										error='this field is required'
										required
										option={[
											{ id: 1, value: 'return', name: 'return' },
											{ id: 2, value: 'one way', name: 'one way' },
										]}
									/>
									<InputForm
										name='travelDate'
										data-test='travel-date'
										label='Travel Date'
										classNames='form-control'
										error='Please input validate dates for your travel date'
										onChange={event => this.handleChange(event)}
										value={state.travelDate}
										type='date'
										required
										min={formatdate(1, '')}
									/>
									<InputForm
										name='returnDate'
										data-test='return-date'
										label='Return Date'
										classNames='form-control'
										value={state.returnDate}
										onChange={event => this.handleChange(event)}
										error='Please input validate dates for your return date'
										disabled={state.dateDisable}
										type='date'
										required
										min={formatdate(1, state.travelDate)}
									/>
									<SelectInput
										classNames='form-control'
										data-test='leaving'
										value={state.leavingFrom}
										onChange={event => this.handleChange(event)}
										name='leavingFrom'
										label='Leaving From'
										placeholder='choose city'
										required
										option={allLocations.map(location => ({
											id: location.id,
											value: location.id,
											name: location.city,
										}))}
									/>
									<SelectInput
										name='goingTo'
										data-test='going'
										value={state.goingTo}
										onChange={event => this.handleLocation(event)}
										placeholder='choose city'
										classNames='form-control'
										label='Going To'
										required
										option={allLocations.map(location => ({
											id: location.id,
											value: location.id,
											name: location.city,
										}))}
									/>
									<SelectInput
										name='hotel'
										data-test='hotel'
										classNames='form-control'
										label='Hotel'
										value={state.hotel}
										onChange={event => this.handleHotel(event)}
										placeholder='hotel'
										error='this field is required'
										option={state.hotelOptions}
									/>
									<div className='form-group select'>
										<label>Room</label>
										<Select
											data-test='room'
											isMulti
											options={state.roomOptions}
											onChange={this.handleRoom}
										/>
									</div>
									<TextArea
										name='reason'
										data-test='reason'
										label='Reason'
										required
										placeholder='type your reason here...'
										onChange={event => this.handleChange(event)}
										value={state.reason}
									/>
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-secondary'
										data-dismiss='modal'
									>
										Close
									</button>
									<Button
										classNames='btn btn-primary'
										value='submit'
										buttonLoading={props.loading}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

EditRequest.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	fetchTripData: PropTypes.func.isRequired,
	updateTrip: PropTypes.func.isRequired,
	locations: PropTypes.arrayOf(PropTypes.any),
	id: PropTypes.number.isRequired,
	locationsWithHotels: PropTypes.arrayOf(PropTypes.any),
	loading: PropTypes.bool,
	request: PropTypes.objectOf(PropTypes.any),
};

EditRequest.defaultProps = {
	locations: null,
	locationsWithHotels: null,
	loading: null,
	request: null,
};

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
	locations: state.createTripState.allLocations,
	locationsWithHotels: state.createTripState.locationsWithHotels,
	request: state.singleRequestState.data,
});

export default connect(mapStateToProps, {
	updateTrip,
	fetchTripData: fetchCreateTripData,
})(EditRequest);
