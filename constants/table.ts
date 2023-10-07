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
		name: 'This Week',
		key: 'thisWeek',
	},
	thisMonth: {
		name: 'This Month',
		key: 'thisMonth',
	},
	pastWeek: {
		name: 'Past Week',
		key: 'pastWeek',
	},
	pastMonth: {
		name: 'Past Month',
		key: 'pastMonth',
	},
};
