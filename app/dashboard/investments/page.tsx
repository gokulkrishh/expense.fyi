import Summary from 'components/card/summary';
import LayoutHeader from 'components/layout/header';
import ExpensesSummary from 'components/summary/expenses';

import { columns } from './columns';
import { DataTable } from './data-table';

const title = 'Expense.fyi – Investments';
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
			name: 'Tesla',
			price: '14000',
			units: '1.05',
			category: 'usstock',
			date: '2023-04-26',
			id: '95577bf8-bec0-429c-8820-9823150035be',
			created_at: '2023-04-27T02:33:51.434Z',
			updated_at: '2023-04-27T02:33:51.434Z',
		},
		{
			notes: 'Bought it via INDMoney.',
			name: 'Tesla',
			price: '9800',
			units: '10',
			category: 'usstock',
			date: '2023-01-03',
			id: '7041566d-45a7-435a-b230-7dd7c7804755',
			created_at: '2023-02-15T09:37:27.085Z',
			updated_at: '2023-03-16T02:54:04.525Z',
		},
	];
}

export default async function Page() {
	const data = await getData();
	return (
		<>
			<LayoutHeader title="investments" />
			<div className="w-full overflow-x-auto p-4 pt-3">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	);
}
