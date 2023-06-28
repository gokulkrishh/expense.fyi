'use client';

import { Separator } from '@/components/ui/separator';

import DatePicker from './datepicker';

export default function LayoutHeader({ title, showDatePicker = false }: { title: string; showDatePicker?: boolean }) {
	return (
		<>
			<div className="flex flex-col justify-between p-3 pl-4 pr-4 text-gray-950 dark:text-gray-200 sm:flex-row">
				<h2 className="text-2xl font-extrabold capitalize leading-snug tracking-tight">{title}</h2>
				<div className="mt-3 flex items-center sm:mt-0">
					{showDatePicker ? (
						<div className="date-picker mr-2 flex items-center sm:mr-4">
							<span className="mr-2 hidden text-xs font-semibold uppercase sm:inline-block">Showing:</span>
							<DatePicker />
						</div>
					) : null}
					{/* <Feedback /> */}
				</div>
			</div>
			<Separator />
		</>
	);
}
