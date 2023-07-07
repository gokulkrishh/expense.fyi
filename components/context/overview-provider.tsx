'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getExpenses, getIncome, getInvestments, getSubscriptions } from 'app/dashboard/apis';
import { format, isValid } from 'date-fns';
import useSWR from 'swr';

import { dateFormat } from 'constants/date';

import { useDate } from './datepicker-provider';

const OverviewContext = createContext(null);

interface Data {
	expenses: Array<any>;
	income: Array<any>;
	subscriptions: Array<any>;
	investments: Array<any>;
}

export const OverviewContextProvider = (props: any) => {
	const { date } = useDate();
	const formattedDate = { from: format(date.from, dateFormat), to: format(date.to, dateFormat) };
	const { children, ...others } = props;
	const { data: expensesData = [], isLoading: isExpenseLoading } = useSWR(
		`/api/expenses?from=${formattedDate.from}&to=${formattedDate.to}`
	);
	const { data: investmentsData = [], isLoading: isInvestmentsLoading } = useSWR(
		`/api/investments?from=${formattedDate.from}&to=${formattedDate.to}`
	);
	const { data: incomeData = [], isLoading: isIncomeLoading } = useSWR(
		`/api/income?from=${formattedDate.from}&to=${formattedDate.to}`
	);
	const { data: subscriptionsData = [], isLoading: isSubscriptionsLoading } = useSWR(
		`/api/subscriptions?from=${formattedDate.from}&to=${formattedDate.to}`
	);

	const data = {
		expenses: expensesData,
		investments: investmentsData,
		income: incomeData,
		subscriptions: subscriptionsData,
	};
	const loading = isExpenseLoading || isInvestmentsLoading || isIncomeLoading || isSubscriptionsLoading;

	return (
		<OverviewContext.Provider value={{ loading, data }} {...others}>
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
