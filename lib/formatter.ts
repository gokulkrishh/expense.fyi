import { dateFormat } from 'constants/date';

const defaultCurrency = 'INR';
const defaultLocale = 'en-IN';
const defaultDateStyle = { day: '2-digit', month: 'short', year: 'numeric' };
const timeStyle = { hour: 'numeric', minute: 'numeric' };
const currencyStyle = { style: 'currency', currency: '', minimumFractionDigits: 0, maximumFractionDigits: 2 };

type Currency = {
	value: number | bigint;
	currency?: string;
	locale?: any;
};

type Date = {
	date: string;
	locale?: string;
	dateStyle?: any;
};

export const formatCurrency = ({ value, currency = defaultCurrency, locale = defaultLocale }: Currency): any => {
	try {
		return new Intl.NumberFormat(locale, { ...currencyStyle, currency }).format(value).replace(/^(\D+)/, '$1 ');
	} catch {
		return value;
	}
};

export const formatDate = ({ date, locale = defaultLocale, dateStyle = defaultDateStyle }: Date): any => {
	try {
		return new Intl.DateTimeFormat(locale, dateStyle).format(new Date(date));
	} catch {
		return date;
	}
};

export const getCurrencySymbol = (
	currency: string = defaultCurrency,
	locale: string = defaultLocale
): String | undefined => {
	try {
		return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
			?.formatToParts(1)
			?.find((x) => x.type === 'currency')?.value;
	} catch {
		return '';
	}
};
