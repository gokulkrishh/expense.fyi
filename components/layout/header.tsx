'use client';

import { useSidebar } from 'components/context/sidebar-provider';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';

import DatePicker from '../datepicker';
import Feedback from '../feedback';

const MenuIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		aria-hidden="true"
		className="m-auto h-6 w-6 text-black dark:text-white"
	>
		<title>Open menu</title>
		<path
			fillRule="evenodd"
			d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
			clipRule="evenodd"
		></path>
	</svg>
);

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
					<Button className="mr-2 mt-[-1px] p-1 sm:hidden" onClick={() => setShow(!show)} variant={'ghost'}>
						<MenuIcon />
					</Button>
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
						<div className="date-picker mr-0 flex w-full items-center sm:mr-4 max-sm:mt-1">
							{/* <span className="mr-2 hidden text-xs font-semibold uppercase md:inline-block">Showing:</span> */}
							<DatePicker />
						</div>
					) : null}
					<Feedback
						showDatePicker={showDatePicker}
						className="absolute right-[16px] top-[12px] sm:relative sm:right-0 sm:top-0"
					/>
				</div>
			</div>
			<Separator />
		</>
	);
}
