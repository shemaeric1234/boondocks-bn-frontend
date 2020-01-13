import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import InputForm from '../templates/InputForm';
import Button from '../templates/Button';
import TextArea from '../templates/TextArea';
import InputFile from '../templates/InputFile';
// eslint-disable-next-line max-len
import { createHotel } from '../../store/actions/accomodations/createAccomodationAction';
import { validation } from '../../utils/validations';
import { hotelFields, hotelTextArea } from '../../utils/hotelFields';

export class CreateAccomodation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			country: '',
			city: '',
			street: '',
			description: '',
			services: '',
			image: null,
			imageName: '',
			checkError: '',
		};
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	}

	handleFile(event) {
		this.setState({
			image: event.target.files[0],
			imageName: event.target.files[0].name,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { props } = this;
		const {
			image,
			name,
			country,
			city,
			street,
			description,
			services,
		} = this.state;
		this.setState({
			checkError: 'was-validated',
		});
		if (event.target.checkValidity()) {
			const data = new FormData();
			data.append('image', image);
			data.append('name', name);
			data.append('country', country);
			data.append('city', city);
			data.append('street', street);
			data.append('description', description);
			data.append('services', services);
			props.createHotel(data);
		}
	}

	render() {
		const { state } = this;
		const { loading, status, data } = this.props;
		if (!loading && status === 'success' && state.checkError) {
			return <Redirect to={`/hotel/${data.id}`} />;
		}

		return (
			<div>
				<h1 className='text-center mt-2'>Create Hotel</h1>
				<form
					onSubmit={event => this.handleSubmit(event)}
					className={state.checkError}
					data-test='create-hotel-form'
					noValidate
				>
					<div className='grid-input'>
						{hotelFields.map(
							({
								id,
								name,
								type,
								validationKey,
								placeholder,
								dataTestKey,
								label,
							}) => (
								<InputForm
									label={label}
									key={id}
									data-test={dataTestKey}
									value={state[name]}
									name={name}
									type={type}
									classNames='form-control'
									onChange={event => this.handleChange(event)}
									error={validation[validationKey].error}
									pattern={validation[validationKey].pattern}
									placeholder={placeholder}
									required
								/>
							),
						)}
						{hotelTextArea.map(({ id, name, placeholder, label }) => (
							<TextArea
								label={label}
								key={id}
								data-test={name}
								value={state[name]}
								name={name}
								onChange={event => this.handleChange(event)}
								placeholder={placeholder}
								required
							/>
						))}
						<InputFile
							name='image'
							data-test='file'
							value={state.imageName}
							onChange={event => this.handleFile(event)}
							label='Choose image'
						/>
					</div>
					<div className='ml-5'>
						<Button
							buttonLoading={loading}
							classNames='btn btn-success'
							value='Save Hotel'
						/>
					</div>
				</form>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
	status: state.createHotelState.status,
	data: state.createHotelState.data,
});

CreateAccomodation.propTypes = {
	createHotel: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	status: PropTypes.string,
	data: PropTypes.objectOf(PropTypes.any),
};

CreateAccomodation.defaultProps = {
	loading: null,
	status: null,
	data: null,
};

export default connect(mapStateToProps, {
	createHotel,
})(CreateAccomodation);
