import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
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
