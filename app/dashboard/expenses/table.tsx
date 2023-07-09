'use client';

import { useCallback, useState } from 'react';

import textFilter from 'text-filter';

import Add from 'components/add-button';
import { useUser } from 'components/context/auth-provider';
import { useExpenses } from 'components/context/expenses-provider';
import DataTable from 'components/table/data-table';
import { useToast } from 'components/ui/use-toast';

import messages from 'constants/messages';

import { ExpenseData, deleteExpense } from './apis';
import { columns } from './columns';

export default function ExpenseTable() {
	const [selected, setSelected] = useState({});
	const { data, loading, filter, mutate } = useExpenses();
	const user = useUser();
	const { toast } = useToast();

	const onDelete = useCallback((id: string) => {
		deleteExpense(id);
		toast({ description: messages.deleted });
		mutate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onEdit = useCallback(async (data: ExpenseData | any) => {
		setSelected(data);
	}, []);

	const onHide = useCallback(() => {
		setSelected({});
	}, []);

	const onLookup = useCallback(
		(name: string) => {
			const result = data.filter(textFilter({ query: name, fields: ['name'] }));
			if (result.length)
				return Object.values(
					result.reduce((acc: any, datum: any) => {
						const name = datum.name.toLowerCase();
						if (!acc[name]) {
							acc[name] = datum;
						}
						return acc;
					}, {})
				).slice(0, 3);
			return result;
		},
		[data]
	);

	return (
		<>
			<DataTable
				options={{ user, onDelete, onEdit }}
				filter={filter}
				columns={columns}
				data={data}
				loading={loading}
				filename="Expenses"
			/>
			<Add onHide={onHide} onLookup={onLookup} selected={selected} mutate={mutate} type="expenses" />
		</>
	);
}
