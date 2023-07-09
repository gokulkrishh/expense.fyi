'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import useSWR from 'swr';

import { views } from 'constants/table';
import { getApiUrl } from 'constants/url';

const IncomeContext = createContext(null);

interface Data {
	income: Array<any>;
}

export const IncomeContextProvider = (props: any) => {
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState([]);

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, 'income', categories));
	const { children, ...others } = props;

	const value = useMemo(
		() => ({ data, loading: isLoading, filter: { name: filter, setFilter }, mutate }),
		[data, isLoading, filter, mutate]
	);

	return (
		<IncomeContext.Provider value={value} {...others}>
			{children}
		</IncomeContext.Provider>
	);
};

export const useIncome = () => {
	const context = useContext<any>(IncomeContext);
	if (context === undefined) {
		throw new Error(`useIncome must be used within a IncomeContext.`);
	}
	return context;
};
