import { expensesCategory } from 'constants/index';

import { sortByKey } from './array';
import { formatDate } from './formatter';

const recentIndex = 4;

export const extractExpensesData = (data, locale) => {
	return sortByKey(data, 'date')
		.map((datum) => ({
			date: formatDate(datum.date, locale, { day: '2-digit', year: '2-digit', month: 'short' }),
			[datum.category]: Number(datum.price),
			value: Number(datum.price),
		}))
		.reverse();
};

export const extractExpensesCategories = (data) => {
	return data.map((datum) => datum.category);
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
	return isInRangeOfSelectedDate(data, start, end).reduce((acc, datum) => {
		acc.push(datum.name);
		return acc;
	}, []);
};

export const extractSubscriptionData = (data, { start, end }) => {
	return isInRangeOfSelectedDate(data, start, end).reduce((acc, c) => {
		acc.push({ name: c.name, price: Number(c.price) });
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
