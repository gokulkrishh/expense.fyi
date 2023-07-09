'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import useSWR from 'swr';

import { views } from 'constants/table';
import { getApiUrl } from 'constants/url';

const InvestmentsContext = createContext(null);

interface Data {
	Investments: Array<any>;
}

export const InvestmentsContextProvider = (props: any) => {
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState([]);

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, 'investments', categories));
	const { children, ...others } = props;

	const value = useMemo(
		() => ({ data, loading: isLoading, filter: { name: filter, setFilter }, mutate }),
		[data, isLoading, filter, mutate]
	);

	return (
		<InvestmentsContext.Provider value={value} {...others}>
			{children}
		</InvestmentsContext.Provider>
	);
};

export const useInvestments = () => {
	const context = useContext<any>(InvestmentsContext);
	if (context === undefined) {
		throw new Error(`useInvestments must be used within a InvestmentsContext.`);
	}
	return context;
};
