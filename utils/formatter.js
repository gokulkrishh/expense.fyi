const dateStyle = { day: '2-digit', year: 'numeric', month: 'short' };
const timeStyle = { hour: 'numeric', minute: 'numeric' };
const currencyStyle = { style: 'currency', currency: '', minimumFractionDigits: 2, maximumFractionDigits: 2 };

export const formatCurrency = (
	number,
	currency,
	locale = undefined,
	minimumFractionDigits = currencyStyle.maximumFractionDigits,
	maximumFractionDigits = currencyStyle.maximumFractionDigits
) => {
	return new Intl.NumberFormat(locale, { ...currencyStyle, minimumFractionDigits, maximumFractionDigits, currency })
		.format(number)
		.replace(/^(\D+)/, '$1 ');
};

export const formatDate = (date, locale = undefined, customDateStyle = dateStyle) => {
	return new Intl.DateTimeFormat(locale, customDateStyle).format(new Date(date));
};

export const formatDateToRelative = (date, locale = undefined) => {
	return new Intl.DateTimeFormat(locale, { ...timeStyle }).format(new Date(date));
};

export const isItToday = (date1, date2, locale) => {
	return formatDate(date1, locale) === formatDate(date2, locale);
};

export const getCurrencySymbol = (currency, locale = undefined) => {
	return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
		.formatToParts(1)
		.find((x) => x.type === 'currency').value;
};
