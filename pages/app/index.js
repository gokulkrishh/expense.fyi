import Head from 'next/head';

import { useMemo, useState } from 'react';

import { BarChart, BarList, DateRangePicker, DonutChart, Legend } from '@tremor/react';
import { format } from 'date-fns';
import useSWR from 'swr';

import enforceAuth from 'components/Auth/enforceAuth';
import Card from 'components/Card';
import Summary from 'components/Card/Summary';
import Feedback from 'components/Feedback';
import ChartLoading from 'components/Loader/ChartCard';
import RecentActivityTable from 'components/Table/RecentActivityTable';

import {
	extractCategoriesFromData,
	extractExpensesCategories,
	extractExpensesData,
	extractMaxXAxisValue,
	extractRecentActivityData,
	extractSubscriptionData,
	extractTopExpenseCategoryData,
} from 'utils/dataExtraction';
import { getCurrentMonth, getStartDateOfMonth, getTodayDate } from 'utils/date';
import { formatCurrency } from 'utils/formatter';

import { dateFormatStr } from 'constants/index';

const currentMonthStr = getCurrentMonth();
const start = getStartDateOfMonth(currentMonthStr);
const end = getTodayDate(new Date(), dateFormatStr);

export default function Home({ user }) {
	const [selectedDateObj, setSelectedDateObj] = useState({ start, end, dropdown: 'm' });

	const rangeParams = `start=${selectedDateObj.start}&end=${selectedDateObj.end}`;
	const { data: expensesData = [], isLoading: isExpensesLoading } = useSWR(`/api/expenses/range?${rangeParams}`);
	const { data: investmentsData = [] } = useSWR(`/api/investments/range?${rangeParams}`);
	const { data: incomeData = [], isLoading } = useSWR(`/api/income/range?${rangeParams}`);
	const { data: subscriptionsData = [], isLoading: isSubscriptionsLoading } = useSWR(
		`/api/subscriptions/all?active=true`
	);

	const chartdata = useMemo(() => extractExpensesData(expensesData, user.locale), [expensesData, user.locale]);
	const categoriesForChartData = useMemo(() => extractExpensesCategories(expensesData), [expensesData]);
	const [maxValueForXAxisBarChart] = useMemo(() => extractMaxXAxisValue(chartdata), [chartdata]);
	const topSpendExpenseCategory = useMemo(() => extractTopExpenseCategoryData(expensesData), [expensesData]);
	const subscriptionDataForLegend = useMemo(
		() => extractCategoriesFromData(subscriptionsData, selectedDateObj),
		[subscriptionsData, selectedDateObj]
	);

	const chartDataForSubscription = useMemo(
		() => extractSubscriptionData(subscriptionsData, selectedDateObj),
		[subscriptionsData, selectedDateObj]
	);

	const recentActivityData = useMemo(
		() => extractRecentActivityData(subscriptionsData, expensesData, investmentsData, incomeData),
		[subscriptionsData, expensesData, investmentsData, incomeData]
	);

	return (
		<>
			<Head>
				<title>Expense.fyi - Overview</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
			</Head>

			<div className="2xl:container h-full w-full">
				<div className="mb-4 flex flex-col justify-between sm:flex-row ">
					<h1 className="mr-2 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">Overview</h1>
					<div className="flex items-center font-medium">
						<div className="ranger-picker mr-2 flex w-[calc(100%-51px)] items-center sm:mr-4">
							<span className="mr-2 hidden text-xs font-semibold uppercase sm:inline-block">Showing:</span>
							<DateRangePicker
								defaultValue={[
									new Date(selectedDateObj.start),
									new Date(selectedDateObj.end),
									selectedDateObj.dropdown,
								]}
								onValueChange={(value) => {
									const [startDate, endDate, dropdown] = value;
									setSelectedDateObj({
										start: format(new Date(startDate), dateFormatStr),
										end: format(new Date(endDate), dateFormatStr),
										dropdown,
									});
								}}
								enableDropdown={true}
								placeholder="Select a date"
								enableYearPagination={true}
								maxWidth="max-w-none"
								marginTop="mt-0"
								color="blue"
							/>
						</div>
						<Feedback user={user} />
					</div>
				</div>

				<Summary
					currency={user.currency}
					locale={user.locale}
					expensesData={expensesData}
					incomeData={incomeData}
					investmentsData={investmentsData}
					subscriptionsData={chartDataForSubscription}
					isLoading={isLoading}
				/>

				<h2 className="mt-8 mb-4 text-black">Report</h2>
				<div className="mb-8 grid grid-cols-1 gap-8 font-semibold lg:grid-cols-2">
					<div className="mr-4 flex min-h-full w-full flex-col">
						<Card className="h-full">
							<h3 className="text-md font-semibold text-black">Expenses</h3>
							<p className="mt-1 pb-2 text-sm font-normal text-zinc-500">Showing based on selected date range.</p>
							{isExpensesLoading ? (
								<ChartLoading className="h-[340px]" />
							) : (
								<BarChart
									data={chartdata}
									categories={categoriesForChartData}
									dataKey="date"
									valueFormatter={(number) => {
										return formatCurrency(number, user.currency, user.locale);
									}}
									showTooltip={true}
									showLegend={true}
									showAnimation={true}
									minValue={0}
									maxValue={maxValueForXAxisBarChart?.value}
									showGridLines={true}
									marginTop="mt-4"
									height="h-80"
									yAxisWidth="w-18"
								/>
							)}
						</Card>
					</div>

					<div className="mb-8 flex min-h-full w-full flex-col md:mt-0 md:mb-0">
						<Card className="h-full w-full">
							<h3 className="text-md font-semibold text-black">Subscriptions</h3>
							<p className="mt-1 pb-2 text-sm font-normal text-zinc-500">
								Showing based on selected date range for the upcoming renewal dates.
							</p>
							{isSubscriptionsLoading ? (
								<ChartLoading className="h-[340px]" />
							) : (
								<>
									<Legend categories={subscriptionDataForLegend} marginTop="mt-3" />
									<DonutChart
										data={chartDataForSubscription}
										category={'price'}
										dataKey="name"
										valueFormatter={(number) => {
											return formatCurrency(number, user.currency, user.locale);
										}}
										showLabel={true}
										showAnimation={true}
										showTooltip={true}
										height="h-80"
										marginTop="mt-4"
									/>
								</>
							)}
						</Card>
					</div>
				</div>

				{user.isPremiumPlan && !user.isPremiumPlanEnded ? (
					<div className="grid grid-cols-1 gap-8 font-semibold lg:grid-cols-2">
						<div className="flex w-full flex-col md:mb-6">
							<Card className="h-full w-full">
								<h3 className="text-md font-semibold text-black">Recent Activity</h3>
								{isExpensesLoading ? (
									<ChartLoading className="h-[264px]" />
								) : (
									<RecentActivityTable currency={user.currency} locale={user.locale} data={recentActivityData} />
								)}
							</Card>
						</div>
						<div className="mb-6 flex w-full flex-col">
							<Card className="h-full w-full">
								<h3 className="text-md font-semibold text-black">Top Spent Expenses</h3>

								{isExpensesLoading ? (
									<ChartLoading className="h-[264px]" />
								) : (
									<>
										<div className="mt-2 flex justify-between">
											<p className="font-default text-sm font-medium text-zinc-500">Category</p>
											<p className="font-default text-sm font-medium text-zinc-500">Amount</p>
										</div>
										<BarList
											data={topSpendExpenseCategory}
											valueFormatter={(number) => {
												return formatCurrency(number, user.currency, user.locale);
											}}
											color="amber"
											showAnimation={true}
											marginTop="mt-4"
										/>
									</>
								)}
								<p className="mb-3" />
							</Card>
						</div>
					</div>
				) : null}
			</div>
		</>
	);
}

export const getServerSideProps = enforceAuth();
