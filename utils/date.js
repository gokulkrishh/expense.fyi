import {
	addMonths,
	addYears,
	differenceInMonths,
	differenceInYears,
	endOfMonth,
	format,
	isFuture,
	isThisMonth,
	isToday,
	isValid,
	isWithinInterval,
	startOfMonth,
	subMonths,
	subYears,
} from 'date-fns';

import { dateFormatStr, payingKey } from 'constants/index';

import { formatDate } from './formatter';

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
	const startDate = new Date(dateStr);
	const today = new Date();

	if (isFuture(startDate)) {
		return startDate;
	}

	if (paid === payingKey.monthly) {
		const monthlyDate = addMonths(startDate, differenceInMonths(today, startDate));
		if (isToday(monthlyDate) && !isToday(startDate)) return today;
		return addMonths(monthlyDate, 1);
	}

	const yearRenewalDate = addYears(startDate, differenceInYears(today, startDate));
	if (isToday(yearRenewalDate) && !isToday(startDate)) return today;
	return addYears(yearRenewalDate, 1);
};

export const calculatePreviousRenewalDate = (dateStr, { paid, date }) => {
	let previousRenewalDate = null;
	const startDate = new Date(date);

	if (isFuture(startDate)) {
		return startDate;
	}

	if (paid === payingKey.monthly) {
		previousRenewalDate = subMonths(dateStr, 1);
		return previousRenewalDate > startDate ? previousRenewalDate : startDate;
	}

	previousRenewalDate = subYears(dateStr, 1);
	return previousRenewalDate > startDate ? previousRenewalDate : startDate;
};

export const calculatePaidDates = (datum, start, end) => {
	if (!start || !end) return 0;

	const hasValidCancelledAt = !datum.active && datum.cancelled_at !== null && isValid(new Date(datum.cancelled_at));
	const startDate = new Date(datum.date);
	const rangeStartDate = new Date(start);
	const rangeEndDate = hasValidCancelledAt ? new Date(new Date(datum.cancelled_at)) : new Date(end);
	let startDateCount = 1;
	let noOfPaidDurations = 0;

	if (datum.paid === payingKey.monthly) {
		if (!isFuture(startDate)) {
			noOfPaidDurations = differenceInMonths(rangeEndDate, startDate) + startDateCount;
		}
	} else {
		if (!isFuture(startDate)) {
			noOfPaidDurations = differenceInYears(rangeEndDate, startDate) + startDateCount;
		}
	}

	return [...Array(noOfPaidDurations).keys()]
		.map((_, index) => {
			return addMonths(startDate, index);
		})
		.filter((rD) => rD >= rangeStartDate && rD <= rangeEndDate);
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

export const thisMonth = (datum) => isThisMonth(new Date(datum.date));
