import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { format } from 'date-fns';

import { views } from './table';

export const dateFormat: string = 'yyyy-MM-dd';
export const datePattern: string = 'd{2}-d{2}-d{4}';

export const getRangeDateForFilter = (filter: any) => {
	const dateObj = new Date();
	if (filter === views.thisWeek) {
		return [format(startOfWeek(dateObj), dateFormat), format(endOfWeek(dateObj), dateFormat)];
	} else {
		return [format(startOfMonth(dateObj), dateFormat), format(endOfMonth(dateObj), dateFormat)];
	}
};
