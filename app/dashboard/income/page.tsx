import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';
import ExpensesSummary from 'components/summary/expenses';

import { columns } from './columns';
import { DataTable } from './data-table';

const title = 'Expense.fyi – Income';
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
			name: 'Salary',
			price: '290831',
			category: 'salary',
			id: 'd8b5212b-309b-4912-9e16-41bdc1558658',
			date: '2023-06-28',
			created_at: '2023-06-28T02:59:03.090Z',
			updated_at: '2023-06-28T02:59:03.090Z',
		},
		{
			notes: '',
			name: 'Ads Income',
			price: '235197.19',
			category: 'ads',
			id: '30c816cc-b20f-4f4b-8dfa-3a5d3cf6f99d',
			date: '2023-06-23',
			created_at: '2023-06-26T03:19:14.633Z',
			updated_at: '2023-06-26T03:19:14.633Z',
		},
		{
			notes: '',
			name: 'Salary',
			price: '290831',
			category: 'salary',
			id: '54657c21-5915-4921-993e-1841dbfd6e8c',
			date: '2023-05-26',
			created_at: '2023-05-26T04:11:56.188Z',
			updated_at: '2023-05-26T04:11:56.188Z',
		},
		{
			notes: '',
			name: 'Ads June',
			price: '187879.83',
			category: 'ads',
			id: '64066621-7ec9-4c3e-868d-f20d4daf5cb5',
			date: '2023-05-23',
			created_at: '2023-05-23T12:41:41.762Z',
			updated_at: '2023-05-23T12:41:41.762Z',
		},
		{
			notes: '',
			name: 'Salary + Bonus',
			price: '415560.00',
			category: 'salary',
			id: 'a4c60c43-4c8d-4744-8bf8-151a6ce0f3c2',
			date: '2023-04-27',
			created_at: '2023-04-27T02:16:04.092Z',
			updated_at: '2023-04-27T02:16:04.092Z',
		},
		{
			notes: '',
			name: 'ads apr 23',
			price: '214660.37',
			category: 'ads',
			id: 'ee9ebacb-442c-43d4-97e9-cc9dbd853e24',
			date: '2023-04-27',
			created_at: '2023-04-27T02:16:24.364Z',
			updated_at: '2023-06-10T13:34:41.707Z',
		},
		{
			notes: '',
			name: 'Salary',
			price: '265472.00',
			category: 'salary',
			id: '5262a838-3b4d-4eb8-934f-3968ea6a7172',
			date: '2023-03-28',
			created_at: '2023-03-29T12:53:53.587Z',
			updated_at: '2023-03-29T12:53:53.587Z',
		},
		{
			notes: '',
			name: 'Ads Mar 23',
			price: '193890.66',
			category: 'ads',
			id: 'd6968d38-a251-44d1-abae-8ecedee1c3cd',
			date: '2023-03-27',
			created_at: '2023-03-29T12:53:37.610Z',
			updated_at: '2023-06-10T13:29:28.255Z',
		},
		{
			notes: 'from flipkart',
			name: 'Refund flipkart',
			price: '599',
			category: 'other',
			id: '0e1133f1-fb2b-44f7-9599-f95a59c9c74a',
			date: '2023-03-20',
			created_at: '2023-03-20T02:41:21.402Z',
			updated_at: '2023-03-20T02:41:21.402Z',
		},
		{
			notes: '',
			name: 'Salary from salesforce',
			price: '265473',
			category: 'salary',
			id: '42ed896d-8399-478e-be98-1d55026d2c94',
			date: '2023-02-27',
			created_at: '2023-02-28T02:19:20.704Z',
			updated_at: '2023-02-28T02:19:20.704Z',
		},
		{
			notes: '',
			name: 'ads feb 23',
			price: '198192.24',
			category: 'ads',
			id: 'e36639c9-3490-4655-9202-d2b0b02a7774',
			date: '2023-02-23',
			created_at: '2023-02-28T02:19:48.884Z',
			updated_at: '2023-06-10T13:29:21.422Z',
		},
		{
			notes: '',
			name: 'Paytm Bank Savings',
			price: '7576.52',
			category: 'other',
			id: '8994c766-ef86-42df-874b-0e54b0d78170',
			date: '2023-02-05',
			created_at: '2023-02-06T03:34:28.577Z',
			updated_at: '2023-02-06T03:34:28.577Z',
		},
		{
			notes: 'From Web Security E-Book via gumroad',
			name: 'Gumroad',
			price: '980.42',
			category: 'other',
			id: '1470ef64-53d4-4fb2-a927-0d90d6cb9677',
			date: '2023-01-30',
			created_at: '2023-02-06T03:19:24.357Z',
			updated_at: '2023-03-16T02:55:49.335Z',
		},
		{
			notes: '',
			name: 'Ads Jan 23',
			price: '225785.14',
			category: 'ads',
			id: 'a4397ef9-366f-4f32-87cf-0b08040cf985',
			date: '2023-01-27',
			created_at: '2023-02-06T03:12:43.964Z',
			updated_at: '2023-06-10T13:29:12.589Z',
		},
		{
			notes: '',
			name: 'Salary',
			price: '273936.00',
			category: 'salary',
			id: 'b84e7959-6aca-441a-94bb-99cc355b6255',
			date: '2023-01-25',
			created_at: '2023-02-05T16:30:10.234Z',
			updated_at: '2023-02-06T03:12:55.807Z',
		},
		{
			notes: '',
			name: 'Ads Dec 22',
			price: '252244.08',
			category: 'ads',
			id: 'ef767a57-9e70-4006-b45a-83c976c76ba7',
			date: '2022-12-23',
			created_at: '2023-06-10T13:28:51.012Z',
			updated_at: '2023-06-10T13:28:51.012Z',
		},
		{
			notes: '',
			name: 'Ads Nov 22',
			price: '254983.47',
			category: 'ads',
			id: '7af7b98e-f909-4c2e-b149-bdd4db2b3d6a',
			date: '2022-11-23',
			created_at: '2023-06-10T13:26:54.486Z',
			updated_at: '2023-06-10T13:28:22.833Z',
		},
		{
			notes: '',
			name: 'Ads oct 22',
			price: '244916.19',
			category: 'ads',
			id: '9b1d8cf6-08da-4f6f-8b7d-88b98627d809',
			date: '2022-10-27',
			created_at: '2023-06-10T13:26:30.529Z',
			updated_at: '2023-06-10T13:26:30.529Z',
		},
		{
			notes: '',
			name: 'Ads Sep 22',
			price: '210878.00',
			category: 'ads',
			id: 'aef9708b-f176-4df5-a3c5-223f6ef045fc',
			date: '2022-09-23',
			created_at: '2023-06-10T13:25:44.055Z',
			updated_at: '2023-06-10T13:28:14.554Z',
		},
		{
			notes: '',
			name: 'Ads Aug 22',
			price: '167329.25',
			category: 'ads',
			id: '6e59c156-5b6a-43f3-9792-4a71e589a64b',
			date: '2022-08-24',
			created_at: '2023-06-10T13:26:05.087Z',
			updated_at: '2023-06-10T13:27:55.145Z',
		},
		{
			notes: '',
			name: 'Ads july 22',
			price: '172596.95',
			category: 'ads',
			id: 'f4109a22-5ec8-4240-9a3b-5625971814ec',
			date: '2022-07-25',
			created_at: '2023-06-10T13:25:15.936Z',
			updated_at: '2023-06-10T13:25:15.936Z',
		},
		{
			notes: '',
			name: 'ads june 22',
			price: '166989.77',
			category: 'ads',
			id: 'f865a62a-b778-41b4-9d7d-677800d71f63',
			date: '2022-06-24',
			created_at: '2023-06-10T13:24:19.297Z',
			updated_at: '2023-06-10T13:24:19.297Z',
		},
		{
			notes: '',
			name: 'ads may 22',
			price: '151498.26',
			category: 'ads',
			id: '32c751d8-4a25-40f8-b0d2-c8fde96ad180',
			date: '2022-05-24',
			created_at: '2023-06-10T13:23:51.247Z',
			updated_at: '2023-06-10T13:23:51.247Z',
		},
		{
			notes: '',
			name: 'Ads apr 22',
			price: '184856.91',
			category: 'ads',
			id: '70113372-f3a4-4b99-be78-82e5dcfb3151',
			date: '2022-04-25',
			created_at: '2023-06-10T13:23:20.106Z',
			updated_at: '2023-06-10T13:23:20.106Z',
		},
	];
}

export default async function Page() {
	const data = await getData();
	return (
		<>
			<LayoutHeader title="income" />
			<div className="w-full overflow-x-auto p-4 pt-3">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
