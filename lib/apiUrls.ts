export const apiUrls = {
	user: {
		upgrade: '/api/user/upgrade',
		modify: '/api/user',
		usage: 'api/user/usage',
	},
	auth: {
		signup: '/api/auth/signup',
		signin: '/api/auth/signin',
	},
	expenses: {
		add: '/api/expenses/add',
		modify: '/api/expenses',
		getExpenses: ({ from, to }: { from: string; to: string }) => `/api/expenses?from=${from}&to=${to}`,
	},
	investments: {
		add: '/api/investments/add',
		modify: '/api/investments',
		getInvestments: ({ from, to }: { from: string; to: string }) => `/api/investments?from=${from}&to=${to}`,
	},
	income: {
		add: '/api/income/add',
		modify: '/api/income',
		getIncome: ({ from, to }: { from: string; to: string }) => `/api/income?from=${from}&to=${to}`,
	},
	subscriptions: {
		add: '/api/subscriptions/add',
		modify: '/api/subscriptions',
		getSubscriptions: ({ from, to }: { from: string; to: string }) => `/api/subscriptions?from=${from}&to=${to}`,
	},
	feedback: {
		add: `/api/feedback`,
	},
};
