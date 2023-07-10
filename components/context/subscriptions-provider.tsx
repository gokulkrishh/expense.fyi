'use client';

import { createContext, useContext, useMemo, useState } from 'react';

import useSWR from 'swr';

import { views } from 'constants/table';
import { getApiUrl } from 'constants/url';

const SubscriptionsContext = createContext(null);

interface Data {
	Subscriptions: Array<any>;
}

export const SubscriptionsContextProvider = (props: any) => {
	const [filter, setFilter] = useState(views.thisMonth.key);
	const [categories, setCategories] = useState([]);

	const { data = [], mutate, isLoading } = useSWR(getApiUrl(filter, 'subscriptions', categories));
	const { children, ...others } = props;

	const value = useMemo(
		() => ({
			data: data
				.sort((a: any, b: any) => (new Date(a.renewal_date) > new Date(b.renewal_date) ? 1 : -1))
				.sort((a: any, b: any) => (a.active > b.active ? -1 : 1)),
			loading: isLoading,
			filter: { name: filter, setFilter },
			mutate,
		}),
		[data, isLoading, filter, mutate]
	);

	return (
		<SubscriptionsContext.Provider value={value} {...others}>
			{children}
		</SubscriptionsContext.Provider>
	);
};

export const useSubscriptions = () => {
	const context = useContext<any>(SubscriptionsContext);
	if (context === undefined) {
		throw new Error(`useSubscriptions must be used within a SubscriptionsContext.`);
	}
	return context;
};
