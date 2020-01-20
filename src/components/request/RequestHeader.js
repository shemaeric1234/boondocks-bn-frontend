/* eslint-disable
import/named,
no-shadow,
jsx-a11y/label-has-associated-control,
jsx-a11y/anchor-is-valid,
max-len,
jsx-a11y/anchor-has-content,
jsx-a11y/control-has-associated-label,
jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions,
react/no-array-index-key
*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequests } from '../../store/actions/requestAction';
import { $ } from '../../jquery-loader';
import {
	IS_REQUEST_SEARCHING,
	SET_REQUEST_PAGE_LIMIT,
} from '../../store/actions/types';
import RequestSearchForm from './RequestSearchForm';
import setRequestsList from '../../store/actions/requestListAction';

/**
 * Request Header
 * @param pageLimit
 * @param setPageLimit
 * @param setRequests
 * @param getAllRequests
 * @param resetIsSearching
 * @returns {*}
 * @constructor
 */
export const RequestHeader = ({
	requestPageLimitState: { pageLimit },
	setPageLimit,
	setRequests,
	getAllRequests,
	resetIsSearching,
}) => {
	const [type, setType] = React.useState('all');

	React.useEffect(() => {
		$('.dropdown-item.request-filter').click(function() {
			$('#dropdownMenuButton').text($(this).text());
		});
		getAllRequests(type).then(req => setRequests(req));
		resetIsSearching();
	}, [type]);

	return (
		<div className='row my-4' data-test='request-header'>
			<div className='col-12 col-md-8'>
				<div className='card request-header'>
					<div className='card-body'>
						<RequestSearchForm />
					</div>
				</div>
			</div>
			<div className='col-12 col-md-4'>
				<div className='card request-header'>
					<div className='card-body'>
						<div className='row'>
							<div className='dropdown col-md-6 my-2 my-md-4'>
								<button
									className='btn btn-secondary dropdown-toggle requests-filter col-md-12'
									type='button'
									id='dropdownMenuButton2'
									data-toggle='dropdown'
									aria-haspopup='true'
									aria-expanded='false'
								>
									{`Viewing ${pageLimit}`}
								</button>
								<div
									className='dropdown-menu'
									aria-labelledby='dropdownMenuButton2'
								>
									{[5, 10, 50, 100].map((item, index) => (
										<a
											data-test={`item-${item}`}
											key={index}
											className='dropdown-item'
											href='#'
											onClick={() => setPageLimit(item)}
										>
											{item}
										</a>
									))}
								</div>
							</div>
							<div className='dropdown col-md-6 my-2 my-md-4'>
								<button
									className='btn btn-secondary dropdown-toggle col-md-12'
									type='button'
									id='dropdownMenuButton'
									data-toggle='dropdown'
									aria-haspopup='true'
									aria-expanded='false'
								>
									All
								</button>
								<div
									className='dropdown-menu'
									aria-labelledby='dropdownMenuButton'
								>
									{['all', 'open', 'approved', 'declined'].map(
										(item, index) => (
											<a
												key={index}
												id={item}
												className='dropdown-item request-filter'
												href='#'
												onClick={({ target: { id } }) => setType(id)}
												data-test={item}
											>
												{item.charAt(0).toUpperCase() + item.slice(1)}
											</a>
										),
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

RequestHeader.propTypes = {
	requestPageLimitState: PropTypes.any.isRequired,
	setPageLimit: PropTypes.func.isRequired,
	setRequests: PropTypes.func.isRequired,
	getAllRequests: PropTypes.func.isRequired,
	resetIsSearching: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ requestPageLimitState }) => ({
	requestPageLimitState,
});
export const mapDispatchToProps = {
	getAllRequests: getRequests,
	setRequests: setRequestsList,
	setPageLimit: limit => ({
		type: SET_REQUEST_PAGE_LIMIT,
		payload: { pageLimit: limit },
	}),
	resetIsSearching: () => ({ type: IS_REQUEST_SEARCHING, payload: false }),
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestHeader);
