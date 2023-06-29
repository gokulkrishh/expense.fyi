import Summary from 'components/card/summary';
import ExpesenseChart from 'components/chart/bar';
import DonutChart from 'components/chart/donut';
import { DatePickerProvider } from 'components/context/datepicker-provider';
import { OverviewContextProvider } from 'components/context/overview-provider';
import LayoutHeader from 'components/layout/header';
import ChartLoader from 'components/loader/chart';
import RecentActivitiesTable from 'components/recent-activities/table';
import { Card, CardContent, CardHeader } from 'components/ui/card';

export default async function Page() {
	return (
		<>
			<DatePickerProvider>
				<OverviewContextProvider>
					<LayoutHeader title="overview" showDatePicker={true} />
					<div className="p-4 pt-3">
						<Summary />
						<h2 className="mb-4 mt-4 font-semibold text-primary dark:text-white">Reports</h2>
						<div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
							<div className="mr-4 flex min-h-full w-full flex-col">
								<Card className="h-full">
									<CardHeader>
										<h3>Expenses</h3>
										<p className="relative top-[-4px] pb-2 text-sm font-normal text-muted-foreground">
											Amount spent for the selected date range.
										</p>
									</CardHeader>
									<CardContent className="mt-4">
										<ExpesenseChart />
									</CardContent>
								</Card>
							</div>

							<div className="mb-8 flex min-h-full w-full flex-col md:mb-0 md:mt-0">
								<Card className="h-full w-full">
									<CardHeader>
										<h3>Subscriptions</h3>
										<p className="relative top-[-4px] pb-2 text-sm font-normal text-muted-foreground">
											Estimated spent amount for selected date range.
										</p>
									</CardHeader>
									<CardContent className="mt-4">
										<DonutChart />
									</CardContent>
								</Card>
							</div>

							<div className="mb-8 flex min-h-full w-full flex-col md:mb-0 md:mt-0">
								<Card className="h-full w-full">
									<CardHeader>
										<h3>Recent Activities</h3>
									</CardHeader>
									<CardContent>
										<RecentActivitiesTable />
									</CardContent>
								</Card>
							</div>

							<div className="mb-8 flex min-h-full w-full flex-col md:mb-0 md:mt-0">
								<Card className="h-full w-full">
									<CardHeader>
										<h3>Top Spent Expenses</h3>
									</CardHeader>
									<CardContent>
										<ChartLoader className="h-[230px] pl-0" type="barlist" />
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</OverviewContextProvider>
			</DatePickerProvider>
		</>
	);
}
