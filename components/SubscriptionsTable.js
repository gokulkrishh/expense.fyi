import { BellIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const thClassNames = 'border-b p-4 pl-8 pt-4 pb-3 text-left font-semibold text-slate-700';
const tdClassNames = 'border-b border-slate-100 p-4 pl-8 text-black';
const thList = ['Name', 'Price', 'Paid', 'Notes (optional)', 'Actions'];

export default function SubscriptionTable({ data = [], onEdit, onDelete }) {
	return (
		<table className='relative w-full table-auto border-collapse overflow-hidden rounded-md bg-slate-100 text-sm shadow-sm'>
			<thead className='p-10'>
				<tr>
					{thList.map((thItem) => (
						<th key={thItem} className={thClassNames}>
							{thItem}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='w-full bg-white'>
				{data.map((datum) => (
					<tr key={datum.id}>
						<td className={tdClassNames}>
							{/* <Image
								className='relative -left-5 inline-block'
								src={`https://img.icons8.com/color/30px/icon.svg`}
								width={20}
								height={20}
								alt={datum.name}
							/> */}
							{datum.name}
						</td>
						<td className={tdClassNames}>{datum.price}</td>
						<td className={tdClassNames}>{datum.paid}</td>
						<td className={tdClassNames}>{datum.notes}</td>
						<td className={`${tdClassNames} flex`}>
							<BellIcon className='mr-2 h-5 w-5 cursor-pointer text-slate-700 hover:text-slate-500' />
							<PencilIcon
								className='mr-2 h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500'
								onClick={() => {
									onEdit(datum);
								}}
							/>
							<TrashIcon
								className='h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500'
								onClick={() => onDelete(datum.id)}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
