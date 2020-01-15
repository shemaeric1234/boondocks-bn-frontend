/*
eslint-disable
no-underscore-dangle,
react/no-array-index-key,
max-len
*/
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from '../../utils/react-redux-hooks';
import PaginateButton from './PaginateButton';
import { getAllPages } from '../../lib/getAllRequestPages';
import { LEFT_HAND, RIGHT_HAND } from '../../utils/constants';

/**
 * Go to Page
 * @param page
 * @param totalPages
 * @param pageLimit
 * @param totalRecords
 * @param setCurrentPage
 * @param onPageChanged
 */
export const gotoPage = (
	page,
	totalPages,
	pageLimit,
	totalRecords,
	setCurrentPage,
	onPageChanged,
) => {
	const _currentPage = Math.max(0, Math.min(page, totalPages));

	const paginationData = {
		currentPage: _currentPage,
		totalPages,
		pageLimit,
		totalRecords,
	};

	setCurrentPage(_currentPage);
	onPageChanged(paginationData);
};

/**
 * Handle Click
 * @param page
 * @param totalPages
 * @param pageLimit
 * @param totalRecords
 * @param setCurrentPage
 * @param onPageChanged
 * @param evt
 */
export const handleClick = (
	evt,
	page,
	totalPages,
	pageLimit,
	totalRecords,
	setCurrentPage,
	onPageChanged,
) => {
	evt.preventDefault();
	gotoPage(
		page,
		totalPages,
		pageLimit,
		totalRecords,
		setCurrentPage,
		onPageChanged,
	);
};

/**
 * Handle Move Left
 * @param evt
 * @param currentPage
 * @param pageNeighbours
 * @param totalPages
 * @param pageLimit
 * @param totalRecords
 * @param setCurrentPage
 * @param onPageChanged
 */
export const handleMoveLeft = (
	evt,
	currentPage,
	pageNeighbours,
	totalPages,
	pageLimit,
	totalRecords,
	setCurrentPage,
	onPageChanged,
) => {
	const page = currentPage - pageNeighbours * 2 - 1;
	evt.preventDefault();
	gotoPage(
		page,
		totalPages,
		pageLimit,
		totalRecords,
		setCurrentPage,
		onPageChanged,
	);
};

/**
 * Handle Move Right
 * @param evt
 * @param currentPage
 * @param pageNeighbours
 * @param totalPages
 * @param pageLimit
 * @param totalRecords
 * @param setCurrentPage
 * @param onPageChanged
 */
export const handleMoveRight = (
	evt,
	currentPage,
	pageNeighbours,
	totalPages,
	pageLimit,
	totalRecords,
	setCurrentPage,
	onPageChanged,
) => {
	const page = currentPage + pageNeighbours * 2 + 1;
	evt.preventDefault();
	gotoPage(
		page,
		totalPages,
		pageLimit,
		totalRecords,
		setCurrentPage,
		onPageChanged,
	);
};

/**
 * Pagination buttons
 * @param onPageChanged
 * @param allRequests
 * @param pageNeighbours
 * @returns {*}
 * @constructor
 */
const PaginationButtons = ({ onPageChanged, allRequests, pageNeighbours }) => {
	const { pageLimit } = useSelector(state => state.requestPageLimitState);
	const totalRecords = allRequests.length;
	pageNeighbours = Math.max(0, Math.min(pageNeighbours, 2));
	const [currentPage, setCurrentPage] = React.useState(1);
	const totalPages = Math.ceil(totalRecords / pageLimit);

	React.useEffect(() => {
		gotoPage(
			1,
			totalPages,
			pageLimit,
			totalRecords,
			setCurrentPage,
			onPageChanged,
		);
	}, [allRequests, pageLimit]);

	const allPages = getAllPages(pageNeighbours, totalPages, currentPage);

	return (
		<div data-test='paginate-buttons' aria-label='Requests PaginationButtons'>
			<ul className='pagination d-flex  justify-content-center justify-content-sm-end'>
				{allPages.map((page, index) => {
					if (page === LEFT_HAND) {
						return (
							<PaginateButton
								onClick={evt =>
									handleMoveLeft(
										evt,
										currentPage,
										pageNeighbours,
										totalPages,
										pageLimit,
										totalRecords,
										setCurrentPage,
										onPageChanged,
										// eslint-disable-next-line prettier/prettier
									)}
								arrow='&laquo;'
								key={index}
								text='Previous'
							/>
						);
					}

					if (page === RIGHT_HAND) {
						return (
							<PaginateButton
								onClick={evt =>
									handleMoveRight(
										evt,
										currentPage,
										pageNeighbours,
										totalPages,
										pageLimit,
										totalRecords,
										setCurrentPage,
										onPageChanged,
										// eslint-disable-next-line prettier/prettier
										)}
								arrow='&raquo;'
								key={index}
								text='Next'
							/>
						);
					}

					return (
						<li
							data-testid={`page-button-${index}`}
							key={index}
							className={`page-item${currentPage === page ? ' active' : ''}`}
						>
							<button
								type='button'
								className='page-link'
								onClick={evt =>
									handleClick(
										evt,
										page,
										totalPages,
										pageLimit,
										totalRecords,
										setCurrentPage,
										onPageChanged,
										// eslint-disable-next-line prettier/prettier
									)}
							>
								{page}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

PaginationButtons.propTypes = {
	pageNeighbours: PropTypes.number,
	allRequests: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			'': PropTypes.string,
			names: PropTypes.string,
			status: PropTypes.string,
			type: PropTypes.string,
			createdAt: PropTypes.string,
			updatedAt: PropTypes.string,
		}).isRequired,
	).isRequired,
	onPageChanged: PropTypes.func.isRequired,
};

PaginationButtons.defaultProps = {
	pageNeighbours: 1,
};

export default PaginationButtons;
