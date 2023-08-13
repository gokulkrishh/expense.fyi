'use client';

import { useCallback } from 'react';

import Add from 'components/add-button';
import { useOverview } from 'components/context/overview-provider';

import { lookup } from 'lib/lookup';

const AddData = () => {
	const { data } = useOverview();
	const { mutateExpenses } = data.mutate;
	const onLookupExpenses = useCallback((name: string) => lookup({ data: data.expenses, name }), [data]);
	return <Add type="expenses" mutate={mutateExpenses} onLookup={onLookupExpenses} />;
};

export default AddData;
