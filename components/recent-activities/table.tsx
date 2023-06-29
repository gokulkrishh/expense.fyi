import { DataTable } from 'components/table/data-table';

import { columns } from './columns';

const data = [
	{
		notes: '',
		name: 'Tea ',
		price: '48',
		category: 'food',
		paid_via: 'upi',
		id: '71cddf5f-165a-4688-94e8-2d27de2e56da',
		date: '2023-06-28',
		created_at: '2023-06-28T16:29:23.723Z',
		updated_at: '2023-06-28T16:29:23.723Z',
	},
	{
		notes: '',
		name: 'Zepto Grocery ',
		price: '212',
		category: 'grocery',
		paid_via: 'upi',
		id: 'af2d5118-c224-4657-97fd-901431ae9dea',
		date: '2023-06-28',
		created_at: '2023-06-28T02:58:43.407Z',
		updated_at: '2023-06-28T02:58:43.407Z',
	},
	{
		notes: '',
		name: 'CA Charges',
		price: '9500',
		category: 'bills',
		paid_via: 'upi',
		id: '507d543a-1f90-449f-a7ea-a2def3c0ce7c',
		date: '2023-06-27',
		created_at: '2023-06-27T09:19:59.571Z',
		updated_at: '2023-06-27T09:20:05.152Z',
	},
	{
		notes: 'ICICI',
		name: 'CA Income Tax',
		price: '306900',
		category: 'bills',
		paid_via: 'debitcard',
		id: '03625a90-52a0-4627-a7c0-621e889f5ba0',
		date: '2023-06-27',
		created_at: '2023-06-27T09:21:22.526Z',
		updated_at: '2023-06-27T09:21:22.526Z',
	},
	{
		notes: '',
		name: 'Income Tax E-Payment',
		price: '310130',
		category: 'bills',
		paid_via: 'netbanking',
		id: '6c141017-2c30-4004-a0bb-f9bcace5caac',
		date: '2023-06-27',
		created_at: '2023-06-27T09:21:00.380Z',
		updated_at: '2023-06-27T09:21:00.380Z',
	},
];

export default async function RecentActivitiesTable() {
	return (
		<DataTable
			loading={true}
			columns={columns}
			data={data.map((datum, index) => ({
				no: index + 1,
				category: datum.category,
				amount: datum.price,
				name: datum.name,
			}))}
		/>
	);
}
