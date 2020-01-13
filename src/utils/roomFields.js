export const roomFields = [
	{
		id: 1,
		name: 'name',
		type: 'text',
		validationKey: 'validRoomName',
		placeholder: 'name',
		dataTestKey: 'name',
		label: 'Name',
		classNames: 'form-control',
	},
	{
		id: 2,
		name: 'cost',
		type: 'number',
		placeholder: 'cost',
		validationKey: 'validCost',
		dataTestKey: 'cost',
		label: 'Cost',
		classNames: 'form-control currency',
	},
];

export const roomTextArea = [
	{
		id: 1,
		name: 'description',
		placeholder: 'enter a description...',
		label: 'Description',
	},
];

export const typeSelect = [
	{ id: 1, name: 'single bed', value: 'single bed' },
	{ id: 2, name: 'double bed', value: 'double bed' },
	{ id: 3, name: 'VIP', value: 'VIP' },
];
