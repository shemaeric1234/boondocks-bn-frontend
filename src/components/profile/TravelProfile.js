import React, { Component } from 'react';
import Accordion from '../templates/Accordion';
import InputForm from '../templates/InputForm';
import SelectInput from '../templates/SelectInput';
import { profileTravelFields, profileSelect } from '../../utils/profileFields';

export class TravelProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handleChange() {}

	render() {
		const { state } = this;
		return (
			<div>
				<Accordion>
					<div className='grid-form'>
						{profileTravelFields.map(
							({ id, placeholder, name, type, label, error }) => (
								<InputForm
									key={id}
									placeholder={placeholder}
									name={name}
									type={type}
									value={state[name]}
									label={label}
									onChange={event => this.handleInputChange(event)}
									// error={errors[error]}
									// onBlur={event => this.handleSave({ saveData, name, event })}
									classNames='form-control form-control-sm'
								/>
							),
						)}
						<SelectInput
							name='gender'
							value={state.gender}
							label='Gender'
							placeholder='Gender'
							option={profileSelect.gender}
							onChange={event => this.handleInputChange(event)}
							// onBlur={event =>
							// this.handleSave({ saveData, name: 'gender', event })}
							classNames='form-control form-control-sm'
						/>

						<SelectInput
							name='lineManager'
							value={state.lineManager}
							label='Line Manager'
							selected={state.gender || ''}
							placeholder='Line Manager'
							option={[]}
							// error={errors.lineManagerError}
							onChange={event => this.handleInputChange(event)}
							// onBlur={event =>
							// this.handleSave({ saveData, name: 'lineManager', event })}
							classNames='form-control form-control-sm'
						/>

						<SelectInput
							name='preferredCurrency'
							value={state.preferredCurrency}
							label='Preferred Currency'
							placeholder='Preferred Currency'
							option={profileSelect.preferredCurrency}
							onChange={event => this.handleInputChange(event)}
							// onBlur={event =>
							// 	this.handleSave({ saveData, name: 'preferredCurrency', event })
							// }
							classNames='form-control form-control-sm'
						/>
						<SelectInput
							name='preferredLanguage'
							value={state.preferredLanguage}
							label='Preferred Language'
							placeholder='Preferred Language'
							option={profileSelect.language}
							onChange={event => this.handleInputChange(event)}
							// onBlur={event =>
							// 	this.handleSave({ saveData, name: 'preferredLanguage', event })
							// }
							classNames='form-control form-control-sm'
						/>
						<div className='form-group'>
							<div className='custom-control custom-checkbox'>
								<input
									type='checkbox'
									className='custom-control-input'
									id='customCheck1'
								/>
								<label className='custom-control-label' htmlFor='customCheck1'>
									Remember Information
									<i
										className='fa fa-question-circle-o ml-2 text-primary'
										data-toggle='tooltip'
										title='Remember your edited information to all forms'
										aria-hidden='true'
									/>
								</label>
							</div>
						</div>
					</div>
				</Accordion>
			</div>
		);
	}
}

export default TravelProfile;
