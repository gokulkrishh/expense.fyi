import Image from 'next/image';

import { formatCurrency } from 'utils/formatter';

import { expensesCategory, incomeCategory, investmentCategory } from 'constants/index';

const allCategory = {
	...Object.keys(expensesCategory).reduce((acc, key) => {
		acc[key] = expensesCategory[key].name;
		return acc;
	}, {}),
	...incomeCategory,
	...investmentCategory,
};

export default function RecentActivityTable({ data, locale, currency }) {
	return (
		<>
			<table className="mt-2 w-full table-auto border-collapse overflow-hidden">
				<thead>
					<tr>
						<th className="font-default text-sm font-medium text-zinc-500">No.</th>
						<th className="font-default text-sm font-medium text-zinc-500">Name</th>
						<th className="font-default text-sm font-medium text-zinc-500">In / Category</th>
						<th className="font-default text-sm font-medium text-zinc-500">Amount</th>
					</tr>
				</thead>
				<tbody className="mb-2 text-sm font-medium text-zinc-800">
					{data.map((datum, index) => {
						return (
							<tr key={datum.id} className={`border-b-[1px] last:border-b-[0] `}>
								<td className="max-w-[50px] pb-1">{index + 1}.</td>
								<td className="pt-1 pb-1">{datum.name}</td>
								<td className="flex flex-col pt-2 pb-1 pl-0">
									<span className="capitalize">{datum.from}</span>
									<span className="mb-1 text-xs text-gray-500">
										{allCategory[datum.category] ? (
											expensesCategory[datum.category] ? (
												`${expensesCategory[datum.category].emoji} ${expensesCategory[datum.category].name}`
											) : (
												allCategory[datum.category]
											)
										) : (
											<Image
												className="mt-1 text-transparent"
												src={`http://www.google.com/s2/favicons?domain=${datum.url}&sz=125`}
												width={10}
												height={10}
												alt={datum.name}
											/>
										)}
									</span>
								</td>
								<td className="pt-1 pb-1">{formatCurrency(datum.price, currency, locale)}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</>
	);
}
