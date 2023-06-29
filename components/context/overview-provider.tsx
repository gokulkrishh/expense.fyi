'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getExpenses, getIncome, getInvestments, getSubscriptions } from 'app/dashboard/apis';

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
			const [expenses = [], income = [], subscriptions = [], investments = []] = await Promise.all([
				getExpenses(date),
				getIncome(date),
				getSubscriptions(date),
				getInvestments(date),
			]);
			setData({ expenses, income, subscriptions, investments });
			setLoading(false);
		};
		fetchAll();
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
