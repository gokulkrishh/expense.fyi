'use client';

import { useMemo } from 'react';

import { useOverview } from 'components/context/overview-provider';
import { DataTable } from 'components/recent-activities/data-table';

import { extractRecentData } from 'lib/extractor';

import { columns } from './columns';

const initialData = {
	no: '',
	category: '',
	amount: '',
	name: '',
};

export default function RecentActivitiesTable() {
	const { data, loading } = useOverview();

	const recentData = useMemo(
		() => extractRecentData(data.expenses, data.subscriptions, data.investments, data.income),
		[data]
	);

	if (loading) {
		return (
			<DataTable
				data={[initialData, initialData, initialData, initialData, initialData]}
				loading={loading}
				columns={columns}
			/>
		);
	}

	if (!recentData.length) {
		return <p className="flex h-64 items-center justify-center text-sm">No data</p>;
	}

	return (
		<DataTable
			columns={columns}
			data={recentData.map((datum, index) => ({
				no: `${index + 1}.`,
				category: datum.category,
				amount: datum.price,
				name: datum.name,
			}))}
		/>
	);
}
