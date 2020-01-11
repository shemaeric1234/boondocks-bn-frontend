import moment from 'moment';

export const formatIsoDate = date => {
	if (date) {
		return moment(date).format('dddd, MMMM Do YYYY');
	}
};
