import { nullToStr } from '../../lib/helpers';
import {
	isEmail,
	isNotEmpty,
	isPhoneNumber,
	isValidDate,
	isValidId,
	isValidName,
} from '../../utils/validations';

describe('Validation logic', () => {
	it('isEmail() should return false on invalid email', () => {
		expect(isEmail('request@')).toEqual(false);
	});

	it('isValidName() should return false on invalid name', () => {
		expect(isValidName('111111sh')).toEqual(false);
	});

	it('isValidDate() should return false on date greater than 2010-12-31', () => {
		expect(isValidDate('2020-02-12')).toEqual(false);
	});

	it('isEmpty() should return true on empty value', () => {
		expect(isNotEmpty('')).toEqual(false);
	});

	it('isValidId() should return false on invalid database ID', () => {
		expect(isValidId('request')).toEqual(false);
	});

	it('isValidId() should return false on when ID is less than 1', () => {
		expect(isValidId(0)).toEqual(false);
	});

	it('isPhoneNumber() should return false on invalid phone number', () => {
		expect(isPhoneNumber('request@')).toEqual(false);
	});
});
