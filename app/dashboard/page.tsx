import Add from 'components/add-button';
import Summary from 'components/card/summary';
import ExpesenseChart from 'components/chart/bar';
import TopSpentExpenses from 'components/chart/bar-list';
import DonutChart from 'components/chart/donut';
import { DatePickerProvider } from 'components/context/datepicker-provider';
import { OverviewContextProvider } from 'components/context/overview-provider';
import LayoutHeader from 'components/layout/header';
import RecentActivitiesTable from 'components/recent-activities/table';
import { Card, CardContent, CardHeader } from 'components/ui/card';

import Charts from './charts';

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
							<Charts />
						</div>
					</div>
					<Add type="expenses" />
				</OverviewContextProvider>
			</DatePickerProvider>
		</>
	);
}
