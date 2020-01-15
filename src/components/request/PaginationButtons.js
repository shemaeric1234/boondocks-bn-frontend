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

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

/**
 * Range calculation
 * @param from
 * @param to
 * @param step
 * @returns {[]}
 */
export const range = (from, to, step = 1) => {
	console.group('range - starts');
	console.log('==========================');
	console.log('', JSON.stringify({ from, to, step }));
	console.log('==========================');
	console.groupEnd();
	let i = from;
	const _range = [];

	while (i <= to) {
		_range.push(i);
		i += step;
	}
	console.group('range - ends');
	console.log('==========================');
	console.log('', JSON.stringify({ _range }));
	console.log('==========================');
	console.groupEnd();

	return _range;
};

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
 * Get All Pages
 * @param pageNeighbours
 * @param totalPages
 * @param currentPage
 * @returns {*[]}
 */
export const getAllPages = (pageNeighbours, totalPages, currentPage) => {
	console.group('getAllPages - starts');
	console.log('==========================');
	console.log(
		'',
		JSON.stringify({
			pageNeighbours,
			totalPages,
			currentPage,
		}),
	);
	console.log('==========================');
	console.groupEnd();
	const totalNumbers = pageNeighbours * 2 + 3;
	const totalBlocks = totalNumbers + 2;

	if (totalPages > totalBlocks) {
		let pages = [];

		const leftBound = currentPage - pageNeighbours;
		const rightBound = currentPage + pageNeighbours;
		const beforeLastPage = totalPages - 1;

		const startPage = leftBound > 2 ? leftBound : 2;
		const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

		pages = range(startPage, endPage);

		const pagesCount = pages.length;
		const singleSpillOffset = totalNumbers - pagesCount - 1;

		const leftSpill = startPage > 2;
		const rightSpill = endPage < beforeLastPage;

		const leftSpillPage = LEFT_PAGE;
		const rightSpillPage = RIGHT_PAGE;

		if (leftSpill && !rightSpill) {
			const extraPages = range(startPage - singleSpillOffset, startPage - 1);
			pages = [leftSpillPage, ...extraPages, ...pages];
		} else if (!leftSpill && rightSpill) {
			const extraPages = range(endPage + 1, endPage + singleSpillOffset);
			pages = [...pages, ...extraPages, rightSpillPage];
		} else if (leftSpill && rightSpill) {
			pages = [leftSpillPage, ...pages, rightSpillPage];
		}

		return [1, ...pages, totalPages];
	}

	return range(1, totalPages);
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
	console.log('CLICKED');
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
 */
export const handleMoveRight = (evt, currentPage, pageNeighbours) => {
	evt.preventDefault();
	gotoPage(currentPage + pageNeighbours * 2 + 1);
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
	// eslint-disable-next-line no-unused-vars
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
					if (page === LEFT_PAGE) {
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
									)
								}
								arrow='&laquo;'
								key={index}
								text='Previous'
							/>
						);
					}

					if (page === RIGHT_PAGE) {
						return (
							<PaginateButton
								onClick={evt =>
									handleMoveRight(evt, currentPage, pageNeighbours)
								}
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
									)
								}
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
