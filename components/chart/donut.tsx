'use client';

import { useMemo } from 'react';

import { DonutChart, Legend } from '@tremor/react';

import { useUser } from 'components/context/auth-provider';
import { useOverview } from 'components/context/overview-provider';
import ChartLoader from 'components/loader/chart';

import { extractSubscriptions, extractSubscriptionsCategories } from 'lib/extractor';
import { formatCurrency } from 'lib/formatter';

const customTooltip = ({ payload, active, user }: { payload?: any; active?: boolean; user: any }) => {
	if (!active || !payload) return null;
	const categoryPayload = payload?.[0];
	if (!categoryPayload) return null;
	return (
		<div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
			<div className="flex flex-1 space-x-2.5">
				<div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
				<div className="w-full">
					<div className="flex items-center justify-between space-x-8">
						<p className="text-black whitespace-nowrap">{categoryPayload.name}</p>
						<p className="whitespace-nowrap text-black">
							{formatCurrency({ value: categoryPayload.value, currency: user.currency, locale: user.locale })}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

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

	if (!chartData.length) {
		return <p className="flex h-80 items-center justify-center text-sm">No data</p>;
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
				customTooltip={(props) => customTooltip({ ...props, user })}
				showLabel
				className="mt-8 h-80"
			/>
		</>
	);
}
