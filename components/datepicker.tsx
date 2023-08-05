import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format, startOfMonth, startOfYear, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { Button } from 'components/ui/button';
import { Calendar } from 'components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';

import { cn } from 'lib/utils';

import { useDate } from './context/datepicker-provider';

export default function DatePicker() {
	const { date, onChange } = useDate();

	return (
		<div className="flex w-full">
			<DatePickerWithRange date={date} onChange={onChange} />
			<DatePickerSelect onChange={onChange} selectedValue={date?.selected} />
		</div>
	);
}

function DatePickerWithRange({ className, date, onChange }: { className?: string; date: DateRange; onChange: any }) {
	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={'outline'}
						className={cn(
							'mr-[1px] h-[32px] w-[200px] justify-start rounded-br-none rounded-tr-none border-r !border-border border-gray-100 p-2 text-left font-normal hover:bg-accent focus:bg-accent focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8] sm:min-w-[235px]',
							!date && 'text-muted-foreground'
						)}
					>
						<CalendarIcon className={`mr-2 hidden h-4 w-4 sm:inline-block`} />
						{date?.from ? (
							date.to ? (
								<span className="overflow-hidden text-ellipsis whitespace-nowrap">
									{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
								</span>
							) : (
								<span>{format(date.from, 'LLL dd, y')}</span>
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						initialFocus
						mode="range"
						defaultMonth={date?.from}
						selected={date}
						onSelect={onChange}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}

function DatePickerSelect({ onChange, selectedValue }: { onChange: any; selectedValue: string }) {
	return (
		<Select
			value={selectedValue}
			onValueChange={(selected) => {
				switch (selected) {
					case 'tdy': {
						onChange({ selected, from: addDays(new Date(), 0), to: addDays(new Date(), 0) });
						break;
					}
					case '7days': {
						onChange({
							selected,
							to: addDays(new Date(), 0),
							from: subDays(new Date(), 7),
						});
						break;
					}
					case '30days': {
						onChange({
							selected,
							from: subDays(new Date(), 30),
							to: addDays(new Date(), 0),
						});
						break;
					}
					case 'm': {
						onChange({
							selected,
							from: startOfMonth(new Date()),
							to: addDays(new Date(), 0),
						});
						break;
					}
					case 'y': {
						onChange({
							selected,
							from: startOfYear(new Date()),
							to: addDays(new Date(), 0),
						});
						break;
					}
				}
			}}
		>
			<SelectTrigger className="h-[32px] w-full min-w-[100px] rounded-bl-none rounded-tl-none !border-border p-2 hover:bg-accent focus:ring-0 focus-visible:!ring-1 focus-visible:!ring-gray-400 dark:bg-muted dark:hover:opacity-[0.8]">
				<SelectValue className="overflow-hidden text-ellipsis whitespace-nowrap" placeholder="Select" />
			</SelectTrigger>
			<SelectContent className="!border-border" position="popper">
				<SelectItem value="none">Select</SelectItem>
				<SelectItem value="tdy">Today</SelectItem>
				<SelectItem value="7days">Last 7 days</SelectItem>
				<SelectItem value="30days">Last 30 days</SelectItem>
				<SelectItem value="m">Month to Date</SelectItem>
				<SelectItem value="y">Year to Date</SelectItem>
			</SelectContent>
		</Select>
	);
}
