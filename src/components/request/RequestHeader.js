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
import { useDispatch, useSelector } from '../../utils/react-redux-hooks';
import { getRequests } from '../../store/actions/requestAction';
import { $ } from '../../jquery-loader';
import { SET_REQUEST_PAGE_LIMIT } from '../../store/actions/types';

/**
 * Set Page Limit
 * @param limit
 * @returns {{payload: {pageLimit: *}, type: string}}
 */
export const setPageLimit = limit => ({
	type: SET_REQUEST_PAGE_LIMIT,
	payload: {
		pageLimit: limit,
	},
});

/**
 * Request header
 * @returns {*}
 * @constructor
 */
const RequestHeader = () => {
	const [type, setType] = React.useState('all');
	const { role } = JSON.parse(localStorage.getItem('bn_user_data'));

	const { pageLimit } = useSelector(state => state.requestPageLimitState);
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getRequests(type));

		$('.dropdown-item.request-filter').click(function() {
			$('#dropdownMenuButton').text($(this).text());
		});
	}, [type, pageLimit]);

	return (
		<div data-test='request-header' className='card my-4 request-header'>
			<div className='card-body'>
				<div className='row'>
					<div className='col-12 col-md-6'>
						<div className='d-flex justify-content-none'>
							<div className='dropdown'>
								<button
									className='btn btn-secondary btn-sm-block dropdown-toggle requests-filter'
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
											key={index}
											className='dropdown-item'
											href='#'
											onClick={() => dispatch(setPageLimit(item))}
										>
											{item}
										</a>
									))}
								</div>
							</div>
						</div>
					</div>
					<div className='col-12 col-md-6'>
						<div className='d-flex justify-content-end'>
							<div className='dropdown'>
								<button
									className='btn btn-secondary btn-sm-block dropdown-toggle requests-filter'
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
									<a
										id='all'
										className='dropdown-item request-filter'
										href='#'
										onClick={({ target: { id } }) => setType(id)}
									>
										All
									</a>
									<a
										id='open'
										className='dropdown-item request-filter'
										href='#'
										onClick={({ target: { id } }) => setType(id)}
									>
										Open
									</a>
									<a
										id='approved'
										className='dropdown-item request-filter'
										href='#'
										onClick={({ target: { id } }) => setType(id)}
									>
										Approved
									</a>
									<a
										id='declined'
										className='dropdown-item request-filter'
										href='#'
										onClick={({ target: { id } }) => setType(id)}
									>
										Declined
									</a>
								</div>
							</div>

							{role === 'requester' && (
								<button
									type='button'
									className='btn btn-success requests-new ml-md-4 btn-sm-block'
								>
									NEW REQUEST
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RequestHeader;
