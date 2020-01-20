/* eslint-disable
 import/prefer-default-export,
 no-nested-ternary,
 no-underscore-dangle,
 */
export const nullToStr = object => {
	Object.keys(object).forEach(key => {
		object[key] = object[key] ? object[key] : '';
	});

	return object;
};

export const formatRequestTable = text => {
	return ['CREATEDAT', 'UPDATEDAT'].includes(text)
		? `${text.split('AT')[0]}ATED`
		: text;
};

/**
 * Range calculation
 * @param from
 * @param to
 * @param step
 * @returns {[]}
 */
export const range = (from, to, step = 1) => {
	let i = from;
	const _range = [];

	while (i <= to) {
		_range.push(i);
		i += step;
	}

	return _range;
};
