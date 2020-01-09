/**
 * actionFunc
 * @param type
 * @param payload
 * @returns {*}
 */
const actionFunc = (type, payload = null) => {
	return payload ? { type, payload } : { type };
};

export default actionFunc;
