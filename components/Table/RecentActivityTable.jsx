import Image from 'next/image';

import LoaderTable, { LoaderTableHeader } from 'components/Loader/LoaderTable';

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

const thClassNames = 'text-zinc-600 h-[44px] tracking-wide leading-tight text-left text-xs font-bold uppercase';

export default function RecentActivityTable({ isLoading = false, data, locale, currency }) {
	if (!isLoading && !data.length) {
		return (
			<>
				<div className="flex flex-col items-center justify-center">
					<Image
						className="mb-6 mt-11"
						src="/static/illustrations/no-category.svg"
						width={170}
						height={170}
						alt="No records"
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<table className="mt-2 w-full table-auto border-collapse overflow-hidden">
				<thead>
					<tr>
						{isLoading ? (
							<LoaderTableHeader thList={[1, 2, 3, 4, 5]} thClassNames={thClassNames} />
						) : (
							<>
								<th className={thClassNames}>No.</th>
								<th className={thClassNames}>Name</th>
								<th className={thClassNames}>In / Category</th>
								<th className={thClassNames}>Amount</th>
							</>
						)}
					</tr>
				</thead>
				<tbody className="text-sm font-medium">
					{isLoading ? (
						<LoaderTable tr={5} td={4} />
					) : (
						data.map((datum, index) => {
							return (
								<tr key={datum.id} className={`border-b-[1px] last:border-b-[0] `}>
									<td className="font-zinc-600 max-w-[50px]">{index + 1}.</td>
									<td className="pt-1 text-zinc-900">{datum.name}</td>
									<td className="flex flex-col pl-0 pt-2 text-zinc-600">
										<span className="capitalize text-zinc-600">{datum.from}</span>
										<span className="mb-1 text-xs text-zinc-600">
											{allCategory[datum.category] ? (
												expensesCategory[datum.category] ? (
													`${expensesCategory[datum.category].emoji} ${expensesCategory[datum.category].name}`
												) : (
													allCategory[datum.category]
												)
											) : (
												<Image
													className="mb-1 mt-1 text-transparent"
													src={`http://www.google.com/s2/favicons?domain=${datum.url}&sz=125`}
													width={10}
													height={10}
													alt={datum.name}
												/>
											)}
										</span>
									</td>
									<td className="pt-1 text-zinc-900">{formatCurrency(datum.price, currency, locale)}</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</>
	);
}
