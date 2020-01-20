// eslint-disable-next-line import/named
import { SET_REQUEST_PAGE_LIMIT } from '../actions/types';

export default (state = { pageLimit: 5 }, { type, payload }) =>
	type === SET_REQUEST_PAGE_LIMIT ? { pageLimit: payload.pageLimit } : state;
