import { dateFormat } from 'constants/date';

const defaultCurrency = 'INR';
const defaultLocale = 'en-IN';
const defaultDateStyle = { day: '2-digit', month: 'short', year: '' };
const timeStyle = { hour: 'numeric', minute: 'numeric' };
const currencyStyle = { style: 'currency', currency: '', minimumFractionDigits: 2, maximumFractionDigits: 2 };

export const datePattern = 'd{2}-d{2}-d{4}';
export const dateFormatStr = 'yyyy-MM-dd';

type Currency = {
	value: number | bigint;
	currency?: string;
	locale?: any;
};

type Date = {
	date: string;
	locale?: string;
	dateStyle: any;
};

export const formatCurrency = ({ value, currency = defaultCurrency, locale = defaultLocale }: Currency) => {
	return new Intl.NumberFormat(locale, { ...currencyStyle, currency }).format(value).replace(/^(\D+)/, '$1 ');
};

export const formatDate = ({ date, locale = defaultLocale, dateStyle = defaultDateStyle }: Date) => {
	return new Intl.DateTimeFormat(locale, dateStyle).format(new Date(date));
};
