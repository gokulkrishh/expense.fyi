'use client';

import { useCallback, useState } from 'react';

import Add from 'components/add-button';
import { useUser } from 'components/context/auth-provider';
import { useData } from 'components/context/data-provider';
import DataTable from 'components/table/data-table';
import { useToast } from 'components/ui/use-toast';

import { lookup } from 'lib/lookup';

import messages from 'constants/messages';

import { ExpenseData, deleteExpense } from './apis';
import { columns } from './columns';

export default function ExpenseTable() {
	const [selected, setSelected] = useState({});
	const { data, loading, filter, mutate } = useData();
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
			/>
			<Add onHide={onHide} onLookup={onLookup} selected={selected} mutate={mutate} type="expenses" />
		</>
	);
}
