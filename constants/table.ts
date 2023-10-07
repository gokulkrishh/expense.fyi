type Views = {
	[key: string]: {
		name: string;
		key: string;
	};
};

export const views: Views = {
	all: {
		name: 'All',
		key: 'all',
	},
	thisWeek: {
		name: 'This week',
		key: 'thisWeek',
	},
	thisMonth: {
		name: 'This month',
		key: 'thisMonth',
	},
	custom: {
		name: 'Custom',
		key: 'custom',
	},
};
