import compareUsers from '../../utils/sortUsers';

describe('sortUsers a helper for sorting users', () => {
	it('compareUsers() should return -1 if user1 is first alphabetically', () => {
		const user1 = { firstName: 'a' };
		const user2 = { firstName: 'b' };

		expect(compareUsers(user1, user2)).toEqual(-1);
	});

	it('compareUsers() should return 1 if user2 is first alphabetically', () => {
		const user1 = { firstName: 'b' };
		const user2 = { firstName: 'a' };

		expect(compareUsers(user1, user2)).toEqual(1);
	});

	it('compareUsers() should return 0 if both user1 and user2 are equal alphabetically', () => {
		const user1 = { firstName: 'a' };
		const user2 = { firstName: 'a' };

		expect(compareUsers(user1, user2)).toEqual(0);
	});
});

