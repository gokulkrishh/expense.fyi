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
			showTooltip
			showLegend
			showGridLines
			stack
		/>
	);
}
