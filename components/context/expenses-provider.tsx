'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getExpenses } from 'app/dashboard/apis';
import { format, startOfMonth, startOfWeek } from 'date-fns';
import useSWR from 'swr';

import { dateFormat } from 'constants/date';
import { views } from 'constants/table';
import { getApiUrl } from 'constants/url';

const ExpensesContext = createContext(null);

interface Data {
	expenses: Array<any>;
}

export const ExpensesContextProvider = (props: any) => {
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState([]);
	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, 'expenses', categories));
	const { children, ...others } = props;

	const value = useMemo(
		() => ({ data, loading: isLoading, filter, setFilter, mutate }),
		[data, isLoading, filter, mutate]
	);

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
