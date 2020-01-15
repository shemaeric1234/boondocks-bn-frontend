/* eslint-disable
 import/prefer-default-export,
 no-nested-ternary
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
