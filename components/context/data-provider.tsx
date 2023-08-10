'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

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
	isNotRange?: boolean;
};

export const DataContextProvider = (props: Props) => {
	const { children, name, isNotRange = false } = props;
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState<string[]>([]);

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, name, categories, isNotRange));

	const onFilter = useCallback((categories: string[] = []) => {
		setCategories(categories);
	}, []);

	const value = useMemo(
		() => ({ data, loading: isLoading, filter: { name: filter, setFilter, onFilter }, mutate }),
		[data, isLoading, filter, mutate, onFilter]
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
