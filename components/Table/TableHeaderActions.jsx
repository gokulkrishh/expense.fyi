import { format } from 'date-fns';

import { dateFormatStr } from 'constants/index';

import ExportButton, { ExportButtonDummy } from './ExportButton';
import TableFilter from './TableFilter';

export default function TableHeaderActions({ isPremiumPlan, filterKey, title, isLoading, showFilter, onFilterChange }) {
	return (
		<div className="mb-4 flex h-[34px] w-full items-center justify-between">
			<h3 className="text-black">Data</h3>
			<div className="flex justify-end">
				{showFilter && !isLoading ? <TableFilter filterKey={filterKey} onFilterChange={onFilterChange} /> : null}
				{isPremiumPlan && !isLoading ? (
					<ExportButton filename={`${title}-${format(new Date(), dateFormatStr)}.csv`} />
				) : !isLoading ? (
					<ExportButtonDummy />
				) : null}
			</div>
		</div>
	);
}
