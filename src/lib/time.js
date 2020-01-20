import moment from 'moment';

export const formatIsoDate = date => {
	if (date) {
		return moment(date).format('ddd, MMMM Do YYYY');
	}
};

export const formatdate = (days, date) => {
	return moment(date)
		.add(days, 'days')
		.format('YYYY-MM-DD');
};

export const formatToTime = time => {
	if (time) {
		return moment(time).fromNow();
	}
};

export const formatLeaving = (arrivalTime, leaving) => {
	const now = moment();
	now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
	const leave = moment(leaving).set({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	});
	const remaining = leave.diff(now, 'days');
	if (remaining === 0) {
		return 'Few Hours';
	}

	if (remaining < 0) {
		return 'Ended';
	}

	if (remaining > 0) {
		return `${remaining} day${remaining > 1 ? 's' : ''}`;
	}
};

export const getBookStatus = (arrivalDate, leaving) => {
	const now = moment();
	now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

	const arrival = moment(arrivalDate).set({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	});
	const leave = moment(leaving).set({
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
	});

	if (now.isBefore(arrival)) {
		return 'Not Yet Started';
	}

	if (leave.isBefore(now)) {
		return 'Ended';
	}

	return 'Active';
};
