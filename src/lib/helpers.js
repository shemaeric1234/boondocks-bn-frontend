const nullToStr = object => {
	Object.keys(object).forEach(key => {
		object[key] = object[key] ? object[key] : '';
	});

	return object;
};

export default nullToStr;
