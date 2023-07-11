'use client';

import ExpesenseChart from 'components/chart/bar';
import TopSpentExpenses from 'components/chart/bar-list';
import DonutChart from 'components/chart/donut';
import { useUser } from 'components/context/auth-provider';
import RecentActivitiesTable from 'components/recent-activities/table';
import { Card, CardContent, CardHeader } from 'components/ui/card';

export default function Charts() {
	const user = useUser();
	return (
		<>
			<div className="mr-4 flex min-h-full w-full flex-col">
				<Card className="h-full">
					<CardHeader>
						<h3 className="font-medium">Expenses</h3>
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
						<h3 className="font-medium">Subscriptions</h3>
						<p className="relative top-[-4px] pb-2 text-sm font-normal text-muted-foreground">
							Amount spent for selected date range.
						</p>
					</CardHeader>
					<CardContent className="mt-4">
						<DonutChart />
					</CardContent>
				</Card>
			</div>
			{user.isPremium ? (
				<>
					<div className="mb-8 flex min-h-full w-full flex-col md:mb-0 md:mt-0">
						<Card className="h-full w-full">
							<CardHeader>
								<h3 className="pb-0 font-medium">Recent Activities</h3>
							</CardHeader>
							<CardContent>
								<RecentActivitiesTable />
							</CardContent>
						</Card>
					</div>

					<div className="mb-8 flex min-h-full w-full flex-col md:mb-0 md:mt-0">
						<Card className="h-full w-full">
							<CardHeader>
								<h3 className="pb-0 font-medium">Top Spent Expenses</h3>
							</CardHeader>
							<CardContent>
								<TopSpentExpenses />
							</CardContent>
						</Card>
					</div>
				</>
			) : null}
		</>
	);
}
