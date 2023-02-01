import Image from 'next/image';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import { sortByKey } from 'utils/array';
import { formatCurrency, formatDate, isItToday } from 'utils/formatter';

import { expensesCategory } from 'constants/index';

import Table from '.';

const tdClassNames = 'relative p-4 pl-8 text-zinc-800 text-sm font-normal';
const thList = ['Name', 'Price', 'Spent Date ↓', 'Category', 'Notes', 'Actions'];

export default function ExpensesTable({ isLoading, data = [], onEdit, onDelete, user }) {
	const { currency, locale, isPremiumPlan, isPremiumPlanEnded } = user;

	if (!isLoading && !data.length) {
		return (
			<>
				<div className="flex flex-col items-center justify-center ">
					<p className="mt-2 font-medium text-black sm:mt-10">You don{"'"}t have any expenses yet!</p>
					<Image
						className="mt-2"
						src="/static/illustrations/spending-money.svg"
						width={300}
						height={300}
						alt="No records"
					/>
				</div>
			</>
		);
	}

	return (
		<Table title="Expenses" thList={thList} isLoading={isLoading} isPremiumPlan={isPremiumPlan && !isPremiumPlanEnded}>
			{!isLoading && !data.length ? (
				<span className="text-black">No records</span>
			) : (
				sortByKey(data, 'date').map((datum) => {
					const isToday = isItToday(new Date(datum.date), new Date());
					return (
						<tr key={datum.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
							<td className={tdClassNames}>
								<div className="flex items-center">
									<span className="absolute left-2 inline-block">{expensesCategory[datum.category].emoji}</span>{' '}
									<a target="_blank" className="" href={datum.url} rel="noreferrer">
										{datum.name}
									</a>
								</div>
							</td>
							<td className={tdClassNames}>{formatCurrency(datum.price, currency, locale)}</td>
							<td className={tdClassNames}>{isToday ? 'Today' : formatDate(datum.date, locale)}</td>
							<td className={`${tdClassNames} capitalize`}>{expensesCategory[datum.category].name}</td>
							<td className={`${tdClassNames} max-w-[200px] break-words`}>{datum.notes}</td>
							<td className={`${tdClassNames}`}>
								<div className="flex w-14 items-center justify-between">
									<button onClick={() => onEdit(datum)} title="Edit">
										<PencilIcon className="mr-2 h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500" />
									</button>
									<button onClick={() => onDelete(datum.id)} title="Delete">
										<TrashIcon className="mr-2 h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500" />
									</button>
								</div>
							</td>
						</tr>
					);
				})
			)}
		</Table>
	);
}