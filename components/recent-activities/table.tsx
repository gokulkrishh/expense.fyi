'use client';

import { useMemo } from 'react';

import { useUser } from 'components/context/auth-provider';
import { useOverview } from 'components/context/overview-provider';
import { DataTable } from 'components/recent-activities/data-table';

import { extractRecentData } from 'lib/extractor';
import { formatCurrency } from 'lib/formatter';

import { columns } from './columns';

const dummy = {
	no: '1.',
	category: 'Food',
	amount: '$ 100',
	name: 'McDonalds',
};

export default function RecentActivitiesTable() {
	const user = useUser();
	const { data, loading } = useOverview();

	const recentData = useMemo(
		() => extractRecentData(data.expenses, data.subscriptions, data.investments, data.income),
		[data]
	);

	if (loading) {
		return <DataTable data={[dummy, dummy, dummy, dummy, dummy]} loading={loading} columns={columns} />;
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
				amount: formatCurrency({ value: datum.price, currency: user.currency, locale: user.locale }),
				name: datum.name,
			}))}
		/>
	);
}
