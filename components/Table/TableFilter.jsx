import { useState } from 'react';

export const filterMap = { all: 'all', thisweek: 'thisweek', thismonth: 'thismonth' };

const filterList = [
	{ name: 'All', id: filterMap.all },
	{ name: 'This week', id: filterMap.thisweek },
	{ name: 'This month', id: filterMap.thismonth },
];

export default function TableFilter({ filterKey = filterMap.all, onFilterChange }) {
	return (
		<div className="font-xs font-xs mr-4 flex">
			<span className="mr-2 flex items-center font-medium text-zinc-800">
				<svg xmlns="http://www.w3.org/2000/svg" className="mr-[1px]" height="20" width="20" fill="currentColor">
					<path d="M9.5 16.167q-.271 0-.469-.198-.198-.198-.198-.469v-4.667L3.979 4.917q-.271-.334-.094-.709.177-.375.615-.375h11q.438 0 .615.375t-.094.709l-4.854 5.916v4.729q0 .25-.177.428-.178.177-.428.177Zm.5-6.646 3.25-3.959H6.729Zm0 0Z" />
				</svg>{' '}
				Filter:
			</span>
			<select
				name="table-filter"
				className="inline-flex w-[112px] items-center rounded-md border border-gray-300 bg-white py-[6px] px-[9px] text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 xs:w-[120px]"
				onChange={(event) => {
					onFilterChange(event.target.value);
				}}
				value={filterKey}
			>
				{filterList.map((list) => {
					return (
						<option key={list.id} value={list.id}>
							{list.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}
