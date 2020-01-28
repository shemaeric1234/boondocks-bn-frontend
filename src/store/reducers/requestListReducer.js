// eslint-disable-next-line import/named
import { SET_REQUESTS_LIST } from '../actions/types';

export default (state = [], { type, payload }) =>
	(type === SET_REQUESTS_LIST && payload) || state;
