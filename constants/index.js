export const expensesCategory = {
	'': { name: 'Select', emoji: ' ' },
	education: { name: 'Education', emoji: '📚' },
	entertainment: { name: 'Entertainment', emoji: '🍿' },
	food: { name: 'Food', emoji: '🍔' },
	grocery: { name: 'Grocery', emoji: '🛒' },
	order: { name: 'Order', emoji: '📦' },
	other: { name: 'Other', emoji: '🤷🏻‍♂️' },
	emi: { name: 'EMI', emoji: '🤑' },
	creditcard: { name: 'Credit Card', emoji: '💳' },
	medical: { name: 'Medical', emoji: '🏥' },
	rent: { name: 'Rent', emoji: '🏠' },
	shopping: { name: 'Shopping', emoji: '🛍️' },
	travel: { name: 'Travel', emoji: '✈️' },
};

export const incomeCategory = {
	'': 'Select',
	ads: 'Ads',
	other: 'Other',
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

export const datePattern = 'd{2}-d{2}-d{4}';
export const dateFormatStr = 'yyyy-MM-dd';

export const payingKey = {
	monthly: 'monthly',
	yearly: 'yearly',
};

export const subscriptionPayment = {
	[payingKey.monthly]: 'Month',
	[payingKey.yearly]: 'Year',
};

export const siteUrls = {
	app: 'https://app.expense.fyi',
	home: 'expense.fyi',
	signup: 'https://app.expense.fyi/signup',
	signin: 'https://app.expense.fyi/signin',
	local: 'localhost:3000',
	appLocal: 'http://app.localhost:3000',
	localSignup: `http://app.localhost:3000/signup`,
	localSignin: `http://app.localhost:3000/signin`,
	subdomain: '.expense.fyi',
	subdomainLocal: '.localhost:3000',
	githubUrl: 'https://github.com/gokulkrishh/expense.fyi',
	twitterUrl: 'https://twitter.com/gokul_i',
};

const originalPriceMonthly = 400;
const originalPriceYearly = 6000;
const discountPercentage = 40;

export const tiers = {
	monthly: { basic: 0, premium: (originalPriceMonthly / 100) * discountPercentage, og: originalPriceMonthly },
	yearly: { basic: 0, premium: (originalPriceYearly / 100) * discountPercentage, og: originalPriceYearly },
};

export const paymentOptions = { currency: 'INR', locale: 'en' };

export const tierNames = {
	basic: {
		key: 'basic',
		name: 'Basic',
		usageLimit: 100,
	},
	premium: {
		key: 'premium',
		name: 'Premium',
		usageLimit: 2500,
	},
	expired: {
		key: 'expired',
		name: 'Expired',
	},
};

export const siteName = 'Expense.fyi';

export const logo = `https://${siteUrls.home}/static/icons/logo.png`;

export const basicPlanUsageLimit = 100;
export const premiumPlanUsageLimit = 2500;

export const sentFromEmailId = 'Gokul from Expense.fyi <hello@expense.fyi>';
