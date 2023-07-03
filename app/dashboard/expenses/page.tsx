import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';
import ExpensesSummary from 'components/summary/expenses';

import { columns } from './columns';
import { DataTable } from './data-table';

const title = 'Expense.fyi – Expenses';
const description = 'Effortlessly Track and Manage Expenses.';

export const metadata = {
	title,
	description,
};

async function getData(): Promise<any[]> {
	// Fetch data from your API here.
	return [
		{
			notes: '',
			name: 'Rohi Foundation',
			price: '2000',
			category: 'bills',
			paid_via: 'upi',
			id: 'd2fdb995-a03e-43ea-b61b-1e8a2c20750b',
			date: '2023-07-02',
			created_at: '2023-07-02T03:54:50.967Z',
			updated_at: '2023-07-02T03:54:50.967Z',
		},
		{
			notes: '',
			name: 'Finger Sleeve',
			price: '297',
			category: 'bills',
			paid_via: 'upi',
			id: '3ea7157e-f049-4f5b-b5d0-2a1040f11f33',
			date: '2023-07-02',
			created_at: '2023-07-02T04:40:36.492Z',
			updated_at: '2023-07-02T04:40:36.492Z',
		},
		{
			notes: '',
			name: 'Test',
			price: '123',
			category: 'food',
			paid_via: 'upi',
			id: '802a65e2-6836-428c-81a1-d0e38a78f8ee',
			date: '2023-07-02',
			created_at: '2023-07-02T10:14:45.493Z',
			updated_at: '2023-07-02T10:14:45.493Z',
		},
		{
			notes: '',
			name: 'Tyre pressure tips',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '64011883-bd98-45be-92a0-1a54240199f0',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:37.284Z',
			updated_at: '2023-07-01T03:22:37.284Z',
		},
		{
			notes: '',
			name: 'Theater fopd',
			price: '610',
			category: 'food',
			paid_via: 'upi',
			id: '291dc8f9-562b-49ad-a57e-d40b559cdd27',
			date: '2023-07-01',
			created_at: '2023-07-01T04:52:20.943Z',
			updated_at: '2023-07-01T04:52:20.943Z',
		},
		{
			notes: '',
			name: 'Tea',
			price: '30',
			category: 'food',
			paid_via: 'upi',
			id: 'fbc3a923-eb16-4415-a44c-0ebffdd94d2e',
			date: '2023-07-01',
			created_at: '2023-07-01T03:21:40.606Z',
			updated_at: '2023-07-01T03:21:40.606Z',
		},
		{
			notes: '',
			name: 'Grocery ',
			price: '616',
			category: 'grocery',
			paid_via: 'upi',
			id: 'd587ceb1-469d-4dcc-ac45-db53683cb5de',
			date: '2023-07-01',
			created_at: '2023-07-01T11:19:13.967Z',
			updated_at: '2023-07-01T11:19:13.967Z',
		},
		{
			notes: 'sdfsdf',
			name: 'Mani biriyani',
			price: '242',
			category: 'food',
			paid_via: 'upi',
			id: '62425ed3-ad3a-4116-972f-8cb8c540617b',
			date: '2023-07-01',
			created_at: '2023-07-01T08:11:16.430Z',
			updated_at: '2023-07-01T08:11:16.430Z',
		},
		{
			notes: 'sdfsdfsdfsdfsdf',
			name: 'Petrol polo',
			price: '2000',
			category: 'travel',
			paid_via: 'upi',
			id: '80648147-7943-4f62-9ed1-377f5fc550de',
			date: '2023-07-01',
			created_at: '2023-07-01T03:21:54.193Z',
			updated_at: '2023-07-01T03:21:54.193Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
		{
			notes: 'testsesdfsdfsdfsdf',
			name: 'Tyre pressure tips ',
			price: '20',
			category: 'bills',
			paid_via: 'upi',
			id: '4cd09763-2486-4377-9678-c3fb8c04b646',
			date: '2023-07-01',
			created_at: '2023-07-01T03:22:18.463Z',
			updated_at: '2023-07-01T03:22:18.463Z',
		},
	];
}

export default async function Page() {
	const data = await getData();
	return (
		<>
			<LayoutHeader title="expenses" />
			<div className="p-4 pt-3">
				{/* <ExpensesSummary /> */}
				<h2 className="mb-4 mt-4 font-semibold text-primary dark:text-white">Reports</h2>
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
