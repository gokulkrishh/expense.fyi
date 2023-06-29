import { formatDate } from './formatter';

const dateStyle = { day: '2-digit', year: '2-digit', month: 'short' };

export const sortByKey = (arr: Array<any>, key: string) => {
	return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
};

export const extractExpenses = (data: Array<Object>, locale: string) => {
	const groupByDate = data.reduce((acc: any, datum: any) => {
		const date = formatDate({ date: datum.date, locale, dateStyle });
		acc[date] = acc[date]
			? {
					...acc[date],
					[datum.category]: acc[date][datum.category]
						? acc[date][datum.category] + Number(datum.price)
						: Number(datum.price),
			  }
			: { date, [datum.category]: Number(datum.price) };

		return acc;
	}, {});

	return Object.values(groupByDate).reverse();
};

export const extractExpensesCategory = (data: Array<Object>) => {
	return Object.keys(
		data.reduce((acc: any, datum: any) => {
			acc[datum.category] = true;
			return acc;
		}, {})
	);
};

export const extractChartAxis = (data: Array<Object>) => data.sort((a: any, b: any) => b - a);

export const extractSubscriptions = (data: Array<any>) => {
	return data
		.filter((datum) => datum.paid_dates?.length > 0)
		.reduce((acc, c) => {
			acc.push({ name: c.name, price: Number(c.price) * Number(c.paid_dates.length) });
			return acc;
		}, []);
};

export const extractSubscriptionsCategories = (data: Array<any>) => {
	return data
		.filter((datum) => datum.paid_dates && datum.paid_dates.length > 0)
		.reduce((acc, datum) => {
			acc.push(datum.name);
			return acc;
		}, []);
};

export const extractRecentData = (
	expenses: Array<Object>,
	subscriptions: Array<Object>,
	investments: Array<Object>,
	income: Array<Object>
) => {
	const allData = [
		...subscriptions.map((datum) => ({ ...datum, from: 'subcriptions' })),
		...expenses.map((datum) => ({ ...datum, from: 'expenses' })),
		...investments.map((datum) => ({ ...datum, from: 'investments' })),
		...income.map((datum) => ({ ...datum, from: 'income' })),
	];
	return sortByKey(allData, 'updated_at').filter((_, index) => index <= 4);
};
