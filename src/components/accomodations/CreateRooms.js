import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import InputForm from '../templates/InputForm';
import Button from '../templates/Button';
import TextArea from '../templates/TextArea';
import InputFile from '../templates/InputFile';
import SelectInput from '../templates/SelectInput';
import { validation } from '../../utils/validations';
import { roomFields, roomTextArea, typeSelect } from '../../utils/roomFields';
// eslint-disable-next-line max-len
import { createRoom } from '../../store/actions/accomodations/createAccomodationAction';

export class CreateRooms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			type: '',
			cost: '',
			description: '',
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
		const { id } = props.match.params;
		const { image, name, type, cost, description } = this.state;
		this.setState({
			checkError: 'was-validated',
		});
		if (event.target.checkValidity()) {
			const data = new FormData();
			data.append('image', image);
			data.append('name', name);
			data.append('type', type);
			data.append('cost', cost);
			data.append('description', description);
			props.createRoom(data, id);
		}
	}

	render() {
		const { state } = this;
		const { loading, status, match } = this.props;
		if (!loading && status === 'success') {
			const { id } = match.params;
			return <Redirect to={`/hotel/${id}`} />;
		}
		return (
			<div>
				<h1 className='text-center'>Create Rooms</h1>
				<form
					data-test='create-room-form'
					onSubmit={event => this.handleSubmit(event)}
					className={state.checkError}
					noValidate
				>
					<div className='grid-input'>
						{roomFields.map(
							({
								id,
								name,
								type,
								validationKey,
								placeholder,
								dataTestKey,
								label,
								min,
								step,
								dataNumberToFixed,
								dataNumberStepfactor,
							}) => (
								<InputForm
									label={label}
									key={id}
									data-test={dataTestKey}
									value={state[name]}
									name={name}
									type={type}
									min={min}
									step={step}
									dataNumberToFixed={dataNumberToFixed}
									dataNumberStepfactor={dataNumberStepfactor}
									classNames='form-control'
									onChange={event => this.handleChange(event)}
									error={validationKey && validation[validationKey].error}
									pattern={validationKey && validation[validationKey].pattern}
									placeholder={placeholder}
									required
								/>
							),
						)}
						<SelectInput
							name='type'
							value={state.type}
							label='Type'
							data-test='type'
							placeholder='type'
							option={typeSelect}
							onChange={event => this.handleChange(event)}
							classNames='form-control'
						/>
						<InputFile
							name='image'
							data-test='file'
							value={state.imageName}
							onChange={event => this.handleFile(event)}
							label='Choose image'
						/>
						{roomTextArea.map(({ id, name, placeholder, label }) => (
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
					</div>
					<div className='ml-5'>
						<Button
							buttonLoading={loading}
							classNames='btn btn-success'
							value='Save Room'
						/>
					</div>
				</form>
			</div>
		);
	}
}

export const mapStateToProps = state => ({
	loading: state.loadingState.buttonLoading,
	status: state.createRoomState.status,
});

CreateRooms.propTypes = {
	createRoom: PropTypes.func.isRequired,
	loading: PropTypes.bool,
	status: PropTypes.string,
	match: PropTypes.objectOf(PropTypes.any).isRequired,
};

CreateRooms.defaultProps = {
	loading: null,
	status: null,
};

export default connect(mapStateToProps, {
	createRoom,
})(withRouter(CreateRooms));
