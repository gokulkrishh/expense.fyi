'use client';

import { useCallback, useState } from 'react';

import { toast } from 'sonner';

import Add from 'components/add-button';
import { useUser } from 'components/context/auth-provider';
import { useData } from 'components/context/data-provider';
import DataTable from 'components/table/data-table';

import { sortByKey } from 'lib/extractor';
import { lookup } from 'lib/lookup';

import messages from 'constants/messages';

import { SubscriptionsData, deleteSubscription, editSubscription } from './apis';
import { columns } from './columns';

export default function SubscriptionsTable() {
	const [selected, setSelected] = useState({});
	const { data, loading, filter, mutate } = useData();
	const user = useUser();

	const onDelete = useCallback(
		async (id: string) => {
			try {
				await deleteSubscription(id);
				toast.success(messages.deleted);
				mutate();
			} catch {
				toast.error(messages.error);
			}
		},
		[mutate]
	);

	const onChange = useCallback(
		async (data: SubscriptionsData | any) => {
			try {
				await editSubscription(data);
				toast.success(messages.updated);
				mutate();
			} catch {
				toast.error(messages.error);
			}
		},
		[mutate]
	);

	const onEdit = useCallback((data: SubscriptionsData | any) => {
		setSelected(data);
	}, []);

	const onHide = useCallback(() => {
		setSelected({});
	}, []);

	const onLookup = useCallback((name: string) => lookup({ data, name }), [data]);

	return (
		<>
			<DataTable
				options={{ user, onDelete, onEdit, onChange }}
				filter={filter}
				columns={columns}
				data={sortByKey(sortByKey(data, 'renewal_date'), 'active')}
				loading={loading}
				filename="Subscriptions"
				hideViewOptions
			/>
			<Add onHide={onHide} onLookup={onLookup} selected={selected} mutate={mutate} type="subscriptions" />
		</>
	);
}
