'use client';

import { MenuIcon } from 'lucide-react';
import { ChevronRightSquare } from 'lucide-react';

import { useSidebar } from 'components/context/sidebar-provider';
import { Separator } from 'components/ui/separator';

import DatePicker from '../datepicker';
import Feedback from '../feedback';

export default function LayoutHeader({ title, showDatePicker = false }: { title: string; showDatePicker?: boolean }) {
	const { show, setShow } = useSidebar();
	return (
		<>
			<div
				className={`flex justify-between p-3 pl-4 pr-4 text-gray-950 dark:text-gray-200 ${
					showDatePicker ? 'flex-col sm:flex-row' : 'flex-row items-center'
				}`}
			>
				<div className="flex">
					<MenuIcon
						onClick={() => setShow(!show)}
						className="ml-0 mr-2 mt-[2px] h-7 w-7 text-primary hover:opacity-80 active:opacity-80 sm:hidden"
					/>
					<h2
						className={`text-2xl font-extrabold capitalize leading-snug tracking-tight ${
							showDatePicker ? 'mb-2 sm:mb-0' : ''
						}`}
					>
						{title}
					</h2>
				</div>
				<div className="flex items-center justify-between sm:mt-0">
					{showDatePicker ? (
						<div className="date-picker mr-0 flex w-full items-center sm:mr-4">
							<span className="mr-2 hidden text-xs font-semibold uppercase md:inline-block">Showing:</span>
							<DatePicker />
						</div>
					) : null}
					<Feedback className="absolute right-[16px] top-[12px] sm:relative sm:right-0 sm:top-0" />
				</div>
			</div>
			<Separator />
		</>
	);
}
