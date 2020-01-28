import { LOADING } from './types';
import actionFunc from '../../utils/actionFunc';

const renderPageLoadingSpinner = () => async dispatch => {
	dispatch(actionFunc(LOADING, true));
};

const closePageLoadingSpinner = () => async dispatch => {
	dispatch(actionFunc(LOADING, false));
};

export { renderPageLoadingSpinner, closePageLoadingSpinner };
