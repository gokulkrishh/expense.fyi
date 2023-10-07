'use client';

import { useState } from 'react';

import { DropdownMenuRadioGroup, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Filter } from 'lucide-react';

import { DatePickerWithRange } from 'components/datepicker';
import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioItem } from 'components/ui/dropdown-menu';

import { views } from 'constants/table';

export default function DataTableFilterOptions<TData>({
	filter,
	setFilter,
}: {
	filter: string;
	setFilter: (filter: string) => void;
}) {
	const [showCal, setShowCal] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="h-8 text-sm capitalize max-sm:px-1 lg:flex">
						<Filter className="mr-1.5 h-3 w-3 sm:inline-block" />
						{views[filter].name}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[150px]">
					<DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
						{Object.keys(views).map((key) => {
							return (
								<DropdownMenuRadioItem
									onSelect={() => {
										if (views[key].key === 'custom') {
											setShowCal(true);
										}
									}}
									key={views[key].key}
									value={views[key].key}
								>
									{views[key].name}
								</DropdownMenuRadioItem>
							);
						})}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			{showCal && views[filter].key === 'custom' ? (
				<div className="relative">
					<DatePickerWithRange
						className="absolute top-[40px] left-[-110px]"
						pickerClassName="!rounded-br-md !rounded-tr-md"
						date={{ from: new Date() }}
						onChange={() => {
							setShowCal(false);
						}}
						noOfMonths={1}
					/>
				</div>
			) : null}
		</>
	);
}
