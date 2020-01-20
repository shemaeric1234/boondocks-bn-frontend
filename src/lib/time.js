import moment from 'moment';

export const formatIsoDate = date => {
	if (date) {
		return moment(date).format('dddd, MMMM Do YYYY');
	}
};

export const formatToTime = time => {
	if (time) {
		return moment(time).fromNow();
	}
};

export const formatdate = (days, date) => {
	return moment(date)
		.add(days, 'days')
		.format('YYYY-MM-DD');
};
