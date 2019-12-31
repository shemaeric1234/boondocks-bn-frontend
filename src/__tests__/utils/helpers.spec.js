import { nullToStr } from '../../lib/helpers';

describe('Helpers', () => {
	it('nullToStr() should convert null values into empty string', () => {
		const inObj = {
			firstName: null,
			lastName: 'John'
		};

		const outObj = {
			firstName: '',
			lastName: 'John'
		};

		expect(nullToStr(inObj)).toEqual(outObj);
	})
});
