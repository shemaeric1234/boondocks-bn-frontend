import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestSearch } from '../../store/actions/requestSearchAction';
// eslint-disable-next-line no-unused-vars
import setRequestList from '../../store/actions/requestListAction';
import { IS_REQUEST_SEARCHING } from '../../store/actions/types';

/**
 * RequestSearchForm Component
 * @param requestSearch
 * @param setRequests
 * @param requests
 * @param resetIsSearching
 * @returns {*}
 * @constructor
 */
export const RequestSearchForm = ({
	// eslint-disable-next-line no-shadow
	requestSearch,
	setRequests,
	requests,
	resetIsSearching,
}) => {
	const defaultSearchTerm = {
		travelDate: '',
		returnDate: '',
		searchString: '',
	};

	const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

	useEffect(() => {
		setRequests(requests);
	}, [requests]);

	const handleChange = ({ target: { id, value } }) =>
		setSearchTerm({ ...searchTerm, [id]: value });

	const handleSubmit = event => {
		event.preventDefault();
		requestSearch(searchTerm);
		resetIsSearching();
	};

	const { travelDate, returnDate, searchString } = searchTerm;

	return (
		<form data-testid='request_search_form' onSubmit={handleSubmit}>
			<div className='form-row'>
				<div className='form-group col-md-6'>
					{/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
					<label htmlFor='travel_date'>travel date</label>
					<input
						data-testid='travel_date_field'
						className='form-control'
						id='travelDate'
						value={travelDate}
						onChange={handleChange}
						type='date'
						placeholder='Travel Date'
					/>
				</div>
				<div className='form-group col-md-6'>
					<label htmlFor='return_date'>return date</label>
					<input
						data-testid='return_date_field'
						className='form-control'
						id='returnDate'
						value={returnDate}
						onChange={handleChange}
						type='date'
						placeholder='Return Date'
					/>
				</div>
			</div>
			<div className='form-row'>
				<div className='col-lg-12'>
					<label htmlFor='inputSearchTerm'>search term</label>
					<div className='row'>
						<div className='form-group col-md-9'>
							<input
								data-testid='search_string_field'
								className='form-control'
								id='searchString'
								value={searchString}
								onChange={handleChange}
								type='text'
								placeholder='Type request owner, destination, origin or status'
							/>
						</div>
						<div className='form-group col-md-3'>
							<input
								type='submit'
								className='btn btn-success col-12 btn-request-search'
								value='SEARCH'
							/>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

RequestSearchForm.propTypes = {
	setRequests: PropTypes.func.isRequired,
	requestSearch: PropTypes.func,
	requests: PropTypes.array,
	resetIsSearching: PropTypes.func.isRequired,
};

RequestSearchForm.defaultProps = {
	requestSearch: null,
	requests: null,
};

export const mapDispatchToProps = {
	requestSearch,
	setRequests: setRequestList,
	resetIsSearching: () => ({ type: IS_REQUEST_SEARCHING, payload: true }),
};

export default connect(
	({ requestSearchState: { requests } }) => ({ requests }),
	mapDispatchToProps,
)(RequestSearchForm);
