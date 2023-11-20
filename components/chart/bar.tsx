'use client';

import { useMemo } from 'react';

import { BarChart } from '@tremor/react';

import { useUser } from 'components/context/auth-provider';
import { useOverview } from 'components/context/overview-provider';
import ChartLoader from 'components/loader/chart';

import { extractChartAxis, extractExpenses, extractExpensesCategory } from 'lib/extractor';
import { formatCurrency } from 'lib/formatter';

const dataFormatter = (number: number) => {
	return '$ ' + Intl.NumberFormat('us').format(number).toString();
};

const customTooltip = ({ payload, active, user }: { payload?: any; active?: boolean; user: any }) => {
	if (!active || !payload) return null;
	return (
		<div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
			{payload.map((category: any, idx: number) => (
				<div className={`flex items-center justify-between`} key={idx}>
					<div className="flex items-center">
						<span className={`bg-${category.color}-500 p-0.5 rounded-full inline-block w-2 h-2`}></span>
						<span className="text-black ml-2 capitalize ">{category.dataKey}</span>
					</div>
					<span className="text-black flex ml-2">
						{formatCurrency({ value: category.value, currency: user.currency, locale: user.locale })}
					</span>
				</div>
			))}
		</div>
	);
};

export default function ExpesenseChart() {
	const user = useUser();
	const { data, loading } = useOverview();
	const chartData = useMemo<Array<any>>(
		() => extractExpenses(data.expenses, user.locale),
		[data.expenses, user.locale]
	);
	const categoriesData = useMemo<Array<string>>(() => extractExpensesCategory(data.expenses), [data.expenses]);
	const [maxXAxisValue] = useMemo<Array<any>>(() => extractChartAxis(data.expenses), [data.expenses]);

	if (loading) {
		return <ChartLoader className="h-[340px]" type="bar" />;
	}

	if (!chartData.length) {
		return <p className="flex h-80 items-center justify-center text-sm">No data</p>;
	}

	return (
		<BarChart
			className="-mt-4 h-96"
			data={chartData}
			index="date"
			categories={categoriesData}
			valueFormatter={(value) => {
				return formatCurrency({ value, currency: user.currency, locale: user.locale });
			}}
			yAxisWidth={84}
			maxValue={maxXAxisValue?.value}
			customTooltip={(props) => customTooltip({ ...props, user })}
			showLegend
			showGridLines
			stack
		/>
	);
}
