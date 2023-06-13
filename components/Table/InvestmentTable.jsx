import Image from 'next/image';

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import Table from 'components/Table';

import { formatCurrency, formatDate, isItToday } from 'utils/formatter';

import { investmentCategory } from 'constants/index';

import NoDataTable from './NoDataTable';

const tdClassNames = 'relative p-4 pl-8 text-sm';
const thList = ['Name', 'Price', 'Units', 'Bought Date ↓', 'Category', 'Notes', 'Actions'];

const categoryFilterData = Object.keys(investmentCategory)
	.filter(Boolean)
	.map((key) => ({ name: investmentCategory[key]?.name, key }));

export default function InvestmentTable({
	isLoading,
	data = [],
	onEdit,
	onDelete,
	user,
	onFilterChange,
	filterKey,
	onCategoryFilterChange,
	categories,
}) {
	const { currency, locale, isPremiumPlan, isPremiumPlanEnded } = user;

	if (!isLoading && !data.length) {
		return (
			<NoDataTable filterKey={filterKey} isPremiumPlan={isPremiumPlan} onFilterChange={onFilterChange}>
				<div className="flex flex-col items-center justify-center ">
					<p className="mt-2 font-medium text-black sm:mt-10">You don{"'"}t have any investment yet.</p>
					<Image className="mt-2" src="/static/illustrations/rich.svg" width={300} height={300} alt="No investment" />
				</div>
			</NoDataTable>
		);
	}

	return (
		<Table
			showFilter
			onFilterChange={onFilterChange}
			filterKey={filterKey}
			title="Investments"
			thList={thList}
			isLoading={isLoading}
			isPremiumPlan={isPremiumPlan && !isPremiumPlanEnded}
			categories={categories}
			enableCategoryFilter
			onCategoryFilterChange={onCategoryFilterChange}
			categoryFilterData={categoryFilterData}
		>
			{data.map((datum) => {
				const isToday = isItToday(new Date(datum.date), new Date());
				return (
					<tr key={datum.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50">
						<td className={`${tdClassNames} font-medium text-zinc-900`}>{datum.name}</td>
						<td className={`${tdClassNames} font-semibold text-zinc-900`}>
							{formatCurrency(datum.price, currency, locale)}
						</td>
						<td className={`${tdClassNames} font-medium text-zinc-900`}>{datum.units}</td>
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
