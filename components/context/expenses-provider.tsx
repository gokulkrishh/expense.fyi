'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getExpenses } from 'app/dashboard/apis';
import { format, startOfMonth, startOfWeek } from 'date-fns';

import { dateFormat } from 'constants/date';
import { views } from 'constants/table';

const ExpensesContext = createContext(null);

interface Data {
	expenses: Array<any>;
}

const getFromAndTo = (filter: string) => {
	let from, to;
	if (filter === views.thisMonth.key) {
		from = format(startOfMonth(new Date()), dateFormat);
		to = format(new Date(), dateFormat);
	} else if (filter === views.thisWeek.key) {
		from = format(startOfWeek(new Date()), dateFormat);
		to = format(new Date(), dateFormat);
	} else {
		return { from: 'all', to: 'all' };
	}
	return { from, to };
};

export const ExpensesContextProvider = (props: any) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState(views.thisMonth.key);
	const { children, ...others } = props;

	useEffect(() => {
		const fetchExpenses = async () => {
			setData([]);
			setLoading(true);
			const data = await getExpenses(getFromAndTo(filter));
			setData(data);
			setLoading(false);
		};
		fetchExpenses();
	}, [filter]);

	const value = useMemo(() => ({ data, loading, filter, setFilter }), [data, loading, filter]);

	return (
		<ExpensesContext.Provider value={value} {...others}>
			{children}
		</ExpensesContext.Provider>
	);
};

export const useExpenses = () => {
	const context = useContext<any>(ExpensesContext);
	if (context === undefined) {
		throw new Error(`useExpenses must be used within a ExpensesContext.`);
	}
	return context;
};
