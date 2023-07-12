'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import useSWR from 'swr';

import { views } from 'constants/table';
import { getApiUrl } from 'constants/url';

const DataContext = createContext(null);

interface Data {
	Data: Array<any>;
}

type Props = {
	children: React.ReactNode;
	name: string;
};

export const DataContextProvider = (props: Props) => {
	const { children, name } = props;
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState([]);

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, name, categories));

	const value = useMemo(
		() => ({ data, loading: isLoading, filter: { name: filter, setFilter }, mutate }),
		[data, isLoading, filter, mutate]
	);

	return <DataContext.Provider value={value as any}>{children}</DataContext.Provider>;
};

export const useData = () => {
	const context = useContext<any>(DataContext);
	if (context === undefined) {
		throw new Error(`useData must be used within a DataContext.`);
	}
	return context;
};
