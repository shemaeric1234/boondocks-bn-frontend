// eslint-disable-next-line import/named
import { range } from './helpers';
import { LEFT_HAND, RIGHT_HAND } from '../utils/constants';

/**
 * Get All Pages
 * @param pageNeighbours
 * @param totalPages
 * @param currentPage
 * @returns {*[]}
 */
export const getAllPages = (pageNeighbours, totalPages, currentPage) => {
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

		const leftSpillPage = LEFT_HAND;
		const rightSpillPage = RIGHT_HAND;

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
