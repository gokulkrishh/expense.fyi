import { BellIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

const numberStyle = { style: 'currency', currency: 'INR' };
const thClassNames = 'border p-4 pl-8 pt-4 pb-3 text-left font-semibold border-gray-100 text-slate-700';
const tdClassNames = 'border-b relative first:border-l last:border-r border-gray-100 p-4 pl-8 text-black';
const thList = ['Name', 'Price', 'Paying', 'Renewal Date', 'Notes', 'Actions'];

export default function SubscriptionTable({ data = [], onEdit, onDelete }) {
	return (
		<table className='relative mb-10 w-full table-auto border-collapse overflow-hidden rounded-md bg-slate-100 text-sm '>
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
				{data
					.sort((a, b) => (a.created_at < b.created_at ? -1 : 1))
					.map((datum) => (
						<tr key={datum.id}>
							<td className={tdClassNames}>
								<div className='flex items-center'>
									<Image
										className='absolute left-2 inline-block'
										src={`https://www.google.com/s2/favicons?domain=${datum.url}`}
										width={16}
										height={16}
										alt={datum.name}
									/>
									<a target='_blank' className='underline' href={datum.url} rel='noreferrer'>
										{datum.name}
									</a>
								</div>
							</td>
							<td className={tdClassNames}>{new Intl.NumberFormat('en-IN', numberStyle).format(datum.price)}</td>
							<td className={tdClassNames}>{datum.paid}</td>
							<td className={tdClassNames}>{datum.renewal}</td>
							<td className={`${tdClassNames}`}>{datum.notes}</td>
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
