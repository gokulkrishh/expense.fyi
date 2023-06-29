export const expensesCategory = {
	'': { name: 'Select', emoji: ' ' },
	education: { name: 'Education', emoji: '📚' },
	entertainment: { name: 'Entertainment', emoji: '🍿' },
	bills: { name: 'Bills', emoji: '🧾' },
	food: { name: 'Food', emoji: '🍔' },
	grocery: { name: 'Grocery', emoji: '🛒' },
	order: { name: 'Online Order', emoji: '📦' },
	other: { name: 'Others', emoji: '🤷🏻‍♂️' },
	emi: { name: 'EMI', emoji: '🤑' },
	sports: { name: 'Sports', emoji: '⚽️' },
	savings: { name: 'Savings', emoji: '💰' },
	debt: { name: 'Debt', emoji: '💸' },
	loan: { name: 'Loan', emoji: '🤫' },
	medical: { name: 'Medical', emoji: '🏥' },
	rent: { name: 'Rent', emoji: '🏠' },
	shopping: { name: 'Shopping', emoji: '🛍️' },
	travel: { name: 'Travel', emoji: '✈️' },
};

export const expensesPay = {
	cash: { name: 'Cash', emoji: '💵' },
	creditcard: { name: 'Credit Card', emoji: '💳' },
	debitcard: { name: 'Debit Card', emoji: '💳' },
	ewallet: { name: 'E-Wallet', emoji: '🪪' },
	netbanking: { name: 'NetBanking', emoji: '🏦' },
	upi: { name: 'UPI', emoji: '📲' },
};

export const groupedExpenses = {
	dailyessentials: {
		name: 'Essentials',
		list: {
			food: expensesCategory.food,
			grocery: expensesCategory.grocery,
			medical: expensesCategory.medical,
		},
	},
	expenses: {
		name: 'Expenses',
		list: {
			bills: expensesCategory.bills,
			education: expensesCategory.education,
			order: expensesCategory.order,
			rent: expensesCategory.rent,
		},
	},
	leisure: {
		name: 'Leisure',
		list: {
			entertainment: expensesCategory.entertainment,
			shopping: expensesCategory.shopping,
			travel: expensesCategory.travel,
			sports: expensesCategory.sports,
		},
	},
	payments: {
		name: 'Payments',
		list: {
			emi: expensesCategory.emi,
			savings: expensesCategory.savings,
			debt: expensesCategory.debt,
			loan: expensesCategory.loan,
		},
	},
};

export const incomeCategory = {
	'': 'Select',
	ads: 'Ads',
	other: 'Other',
	passiveincome: 'Passive Income',
	salary: 'Salary',
	youtube: 'Youtube',
};

export const investmentCategory = {
	'': 'Select',
	crypto: 'Crypto Currency',
	indianstock: 'Indian Stock',
	mutualfunds: 'Mutual Funds',
	other: 'Other',
	usstock: 'US Stock',
};
