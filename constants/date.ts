import { endOfMonth, endOfWeek, startOfMonth, startOfWeek, sub, subMonths, subWeeks } from 'date-fns';
import { format } from 'date-fns';

import { views } from './table';

export const dateFormat: string = 'yyyy-MM-dd';
export const datePattern: string = 'd{2}-d{2}-d{4}';

export const getRangeDateForFilter = (filter: any) => {
	const dateObj = new Date();
	if (filter === views.pastWeek.key) {
		return [format(subWeeks(startOfWeek(dateObj), 1), dateFormat), format(subWeeks(endOfWeek(dateObj), 1), dateFormat)];
	} else if (filter === views.pastMonth.key) {
		return [
			format(subMonths(startOfMonth(dateObj), 1), dateFormat),
			format(subMonths(endOfMonth(dateObj), 1), dateFormat),
		];
	} else if (filter === views.thisWeek.key) {
		return [format(startOfWeek(dateObj), dateFormat), format(endOfWeek(dateObj), dateFormat)];
	} else {
		return [format(startOfMonth(dateObj), dateFormat), format(endOfMonth(dateObj), dateFormat)];
	}
};
