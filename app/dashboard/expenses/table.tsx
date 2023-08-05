'use client';

import { useCallback, useState } from 'react';

import Add from 'components/add-button';
import { useUser } from 'components/context/auth-provider';
import { useData } from 'components/context/data-provider';
import DataTable from 'components/table/data-table';
import { useToast } from 'components/ui/use-toast';

import { lookup } from 'lib/lookup';

import { expensesCategory } from 'constants/categories';
import messages from 'constants/messages';

import { ExpenseData, deleteExpense } from './apis';
import { columns } from './columns';

const categories = Object.keys(expensesCategory)
	.filter(Boolean)
	.map((categoryKey) => ({
		label: expensesCategory[categoryKey].name,
		value: categoryKey,
	}));

export default function ExpenseTable() {
	const [selected, setSelected] = useState({});
	const { data, loading, filter, mutate } = useData();
	const user = useUser();
	const { toast } = useToast();

	const onDelete = useCallback(
		async (id: string) => {
			try {
				await deleteExpense(id);
				toast({ description: messages.deleted, variant: 'success' });
				mutate();
			} catch {
				toast({ description: messages.error, variant: 'destructive' });
			}
		},
		[mutate, toast]
	);

	const onEdit = useCallback(async (data: ExpenseData | any) => {
		setSelected(data);
	}, []);

	const onHide = useCallback(() => {
		setSelected({});
	}, []);

	const onLookup = useCallback((name: string) => lookup({ data, name }), [data]);

	return (
		<>
			<DataTable
				options={{ user, onDelete, onEdit }}
				filter={filter}
				columns={columns}
				data={data}
				loading={loading}
				filename="Expenses"
				categories={categories}
			/>
			<Add onHide={onHide} onLookup={onLookup} selected={selected} mutate={mutate} type="expenses" />
		</>
	);
}
