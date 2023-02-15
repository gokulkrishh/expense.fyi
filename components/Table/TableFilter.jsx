const filterList = [
	{
		name: 'All',
		id: 'all',
	},
	{
		name: 'This week',
		id: 'thisweek',
	},
	{
		name: 'This month',
		id: 'thismonth',
	},
];

export default function TableFilter({ selected = filterList[0].id, onChange }) {
	return (
		<div className="font-xs font-xs mr-4">
			<span className="mr-2 font-medium text-zinc-800 ">Filter:</span>
			<select
				name="table-filter"
				className="inline-flex w-[120px] items-center rounded-md border border-gray-300 bg-white py-[6px] px-[9px] text-sm font-medium text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
				onChange={(event) => {
					onChange(event.target.value);
				}}
				value={selected.id}
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
