'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getExpenses, getIncome, getInvestments, getSubscriptions } from 'app/dashboard/apis';
import { format, isValid } from 'date-fns';

import { dateFormat } from 'constants/date';

import { useDate } from './datepicker-provider';

const OverviewContext = createContext(null);

interface Data {
	expenses: Array<any>;
	income: Array<any>;
	subscriptions: Array<any>;
	investments: Array<any>;
}

const initialState = { expenses: [], income: [], subscriptions: [], investments: [] };

export const OverviewContextProvider = (props: any) => {
	const { date } = useDate();
	const [data, setData] = useState<Data>(initialState);
	const [loading, setLoading] = useState(true);
	const { children, ...others } = props;

	useEffect(() => {
		const fetchAll = async () => {
			setLoading(true);
			const formattedDate = { from: format(date.from, dateFormat), to: format(date.to, dateFormat) };
			const [expenses = [], income = [], subscriptions = [], investments = []] = await Promise.all([
				getExpenses(formattedDate),
				getIncome(formattedDate),
				getSubscriptions(formattedDate),
				getInvestments(formattedDate),
			]);
			setData({ expenses, income, subscriptions, investments });
			setLoading(false);
		};
		if (isValid(date.from) && isValid(date.to)) fetchAll();
	}, [date]);

	const value = useMemo(() => ({ data, loading }), [data, loading]);

	return (
		<OverviewContext.Provider value={value} {...others}>
			{children}
		</OverviewContext.Provider>
	);
};

export const useOverview = () => {
	const context = useContext<any>(OverviewContext);
	if (context === undefined) {
		throw new Error(`useUser must be used within a OverviewContext.`);
	}
	return context;
};
