'use client';

import { useMemo } from 'react';

import { DonutChart, Legend } from '@tremor/react';

import { useUser } from 'components/context/auth-provider';
import { useOverview } from 'components/context/overview-provider';
import ChartLoader from 'components/loader/chart';

import { extractSubscriptions, extractSubscriptionsCategories } from 'lib/extractor';
import { formatCurrency } from 'lib/formatter';

export default function Donut() {
	const user = useUser();
	const { data, loading } = useOverview();
	const chartData = useMemo<Array<any>>(() => extractSubscriptions(data.subscriptions), [data.subscriptions]);
	const categories = useMemo<Array<any>>(
		() => extractSubscriptionsCategories(data.subscriptions),
		[data.subscriptions]
	);

	if (loading) {
		return <ChartLoader className="h-[340px]" type="donut" />;
	}

	return (
		<>
			<div className="flex justify-end">
				<Legend className="-mt-4" categories={categories} />
			</div>
			<DonutChart
				data={chartData}
				category={'price'}
				index="name"
				valueFormatter={(value) => {
					return formatCurrency({ value, currency: user.currency, locale: user.locale });
				}}
				showAnimation={false}
				showTooltip
				showLabel
				className="mt-8 h-80"
			/>
		</>
	);
}
