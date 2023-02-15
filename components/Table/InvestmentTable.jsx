import Image from 'next/image';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import Table from 'components/Table';

import { sortByKey } from 'utils/array';
import { formatCurrency, formatDate, isItToday } from 'utils/formatter';

import { investmentCategory } from 'constants/index';

const tdClassNames = 'relative p-4 pl-8 text-zinc-800 text-sm font-normal';
const thList = ['Name', 'Price', 'Units', 'Bought Date ↓', 'Category', 'Notes', 'Actions'];

export default function InvestmentTable({ isLoading, data = [], onEdit, onDelete, user }) {
	const { currency, locale, isPremiumPlan, isPremiumPlanEnded } = user;

	if (!isLoading && !data.length) {
		return (
			<>
				<div className="flex flex-col items-center justify-center ">
					<p className="mt-2 font-medium text-black sm:mt-10">You don{"'"}t have any investments yet!</p>
					<Image
						className="mt-2"
						src="/static/illustrations/man-riding-a-rocket.svg"
						width={300}
						height={300}
						alt="No records"
					/>
				</div>
			</>
		);
	}

	return (
		<Table
			title="Investments"
			thList={thList}
			isLoading={isLoading}
			isPremiumPlan={isPremiumPlan && !isPremiumPlanEnded}
		>
			{sortByKey(data, 'date').map((datum) => {
				const isToday = isItToday(new Date(datum.date), new Date());
				return (
					<tr key={datum.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
						<td className={`${tdClassNames}`}>{datum.name}</td>
						<td className={tdClassNames}>{formatCurrency(datum.price, currency, locale)}</td>
						<td className={`${tdClassNames}`}>{datum.units}</td>
						<td className={tdClassNames}>{isToday ? 'Today' : formatDate(datum.date, locale)}</td>
						<td className={`${tdClassNames} capitalize`}>{investmentCategory[datum.category]}</td>
						<td className={`${tdClassNames}  break-words`}>{datum.notes}</td>
						<td className={`${tdClassNames}`}>
							<div className="flex w-12 items-center justify-between">
								<button onClick={() => onEdit(datum)} title="Edit">
									<PencilIcon className="h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500" />
								</button>
								<button onClick={() => onDelete(datum.id)} title="Delete">
									<TrashIcon className="h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500" />
								</button>
							</div>
						</td>
					</tr>
				);
			})}
		</Table>
	);
}
