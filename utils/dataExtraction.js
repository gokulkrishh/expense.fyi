import { expensesCategory } from 'constants/index';

import { sortByKey } from './array';
import { formatDate } from './formatter';

const recentIndex = 4;

export const extractExpensesData = (data, locale) => {
	const groupByDate = sortByKey(data, 'date').reduce((acc, datum) => {
		const date = formatDate(datum.date, locale, { day: '2-digit', year: '2-digit', month: 'short' });
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

export const extractExpensesCategories = (data) => {
	return Object.keys(
		data.reduce((acc, datum) => {
			acc[datum.category] = true;
			return acc;
		}, {})
	);
};

export const extractMaxXAxisValue = (data) => data.sort((a, b) => b - a);

const sortValueByAsc = (a, b) => (a.value > b.value ? -1 : 1);

export const extractTopExpenseCategoryData = (data) => {
	const dataMap = data.reduce((acc, datum) => {
		const obj = {
			name: `${expensesCategory[datum.category].emoji}  ${datum.category}`,
			value: acc[datum.category] ? Number(acc[datum.category].value) + Number(datum.price) : Number(datum.price),
		};
		acc[datum.category] = obj;
		return acc;
	}, {});

	return Object.values(dataMap)
		.sort(sortValueByAsc)
		.filter((_, index) => index <= recentIndex);
};

const isInRangeOfSelectedDate = (data, start, end) => {
	return data.filter((datum) => {
		const renewalDateObj = new Date(datum.renewal_date);
		return renewalDateObj >= new Date(start) && renewalDateObj <= new Date(end);
	});
};

export const extractCategoriesFromData = (data, { start, end }) => {
	return data
		.filter((datum) => datum.paidCount > 0)
		.reduce((acc, datum) => {
			acc.push(datum.name);
			return acc;
		}, []);
};

export const extractSubscriptionData = (data, { start, end }) => {
	return data.reduce((acc, c) => {
		acc.push({ name: c.name, price: Number(c.price) * Number(c.paidCount) });
		return acc;
	}, []);
};

export const extractRecentActivityData = (subscriptionsData, expensesData, investmentsData, incomeData) => {
	const allData = [
		...subscriptionsData.map((datum) => ({ ...datum, from: 'subcriptions' })),
		...expensesData.map((datum) => ({ ...datum, from: 'expenses' })),
		...investmentsData.map((datum) => ({ ...datum, from: 'investments' })),
		...incomeData.map((datum) => ({ ...datum, from: 'income' })),
	];
	return sortByKey(allData, 'updated_at').filter((_, index) => index <= recentIndex);
};
