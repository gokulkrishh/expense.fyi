import {
	addMonths,
	addYears,
	differenceInMonths,
	differenceInYears,
	endOfMonth,
	format,
	isToday,
	startOfMonth,
} from 'date-fns';

import { dateFormatStr, payingKey } from 'constants/index';

export const getCurrentMonth = () => {
	const date = new Date();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const year = date.getFullYear();
	return `${year}-${month}`;
};

export const getStartDateOfMonth = (date) => {
	return format(startOfMonth(new Date(date)), dateFormatStr);
};

export const getTodayDate = () => {
	return format(new Date(), dateFormatStr);
};

export const getEndDateOfMonth = (date) => {
	return format(endOfMonth(new Date(date)), dateFormatStr);
};

export const calculateRenewalDate = (dateStr, paid) => {
	const createdDateObj = new Date(dateStr);
	const today = new Date();

	if (paid === payingKey.monthly) {
		const monthlyDate = addMonths(createdDateObj, differenceInMonths(today, createdDateObj));
		if (isToday(monthlyDate) && !isToday(createdDateObj)) return today;
		return addMonths(monthlyDate, 1);
	}

	const yearRenewalDate = addYears(createdDateObj, differenceInYears(today, createdDateObj));
	if (isToday(yearRenewalDate) && !isToday(createdDateObj)) return today;
	return addYears(yearRenewalDate, 1);
};

export const calculatePaidDate = (dateStr, paid) => {
	const dateObj = new Date(dateStr);
	const today = new Date();

	if (paid === payingKey.monthly) {
		const monthlyDate = addMonths(new Date(dateStr), differenceInMonths(today, dateObj));
		return addMonths(monthlyDate, 0);
	} else {
		const yearRenewalDate = addYears(new Date(dateStr), differenceInYears(today, dateObj));
		return addYears(yearRenewalDate, 0);
	}
};

export const calculateTopCategory = (data) => {
	const result = data.reduce((acc, datum) => {
		acc[datum.category] = acc[datum.category] ? acc[datum.category] + Number(datum.price) : Number(datum.price);
		return acc;
	}, {});

	return result;
};

export const getFirstAndLastDateOfWeek = () => {
	let start = new Date();
	let end = new Date();
	const weekDay = start.getDay();

	if (weekDay === 0) {
		start.setDate(start.getDate() - 6);
	} else if (weekDay === 1) {
		end.setDate(end.getDate() + 7 - end.getDay());
	} else if (weekDay >= 1) {
		start.setDate(start.getDate() - start.getDay() + 1);
		end.setDate(end.getDate() + 7 - end.getDay());
	}

	return { start, end };
};

export const getFirstAndLastDateOfMonth = () => {
	const date = new Date();
	const y = date.getFullYear();
	const m = date.getMonth();
	const start = new Date(y, m, 1);
	const end = new Date(y, m + 1, 0);

	return { start, end };
};
